import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            name,
            phone,
            utm_source,
            utm_medium,
            utm_campaign,
            page_path
        } = body;

        // Basic Validation
        if (!name || !phone) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Format Phone: Remove '+' and any non-numeric characters to get pure DDI+Code+Phone
        // React-phone-number-input returns +55119..., so we just strip the +
        const formattedPhone = phone.replace('+', '').replace(/\D/g, '');


        // 1. Get Tenant ID
        const tenantId = process.env.NEXT_PUBLIC_TENANT_ID || 'default';

        // UPSERT Logic: Insert new lead or update existing one based on (client_id, phone)
        const query = `
      INSERT INTO public."Leads" (name, phone, client_id, updated_at)
      VALUES ($1, $2, $3, NOW())
      ON CONFLICT (client_id, phone) 
      DO UPDATE SET 
        name = EXCLUDED.name,
        updated_at = NOW()
      RETURNING *;
    `;

        // Execute DB Query
        let lead;
        try {
            // Updated params to include tenantId
            const result = await db.query(query, [name, phone, tenantId]);
            lead = result.rows[0];
        } catch (dbError) {
            console.error('Database Error:', dbError);
            return NextResponse.json({ error: 'Database operation failed' }, { status: 500 });
        }

        // CRM Integration
        const crmWebhookUrl = process.env.CRM_WEBHOOK_URL;
        if (crmWebhookUrl) {
            try {
                // User-defined strict payload format
                const crmPayload = {
                    name,
                    email: "",
                    whatsapp: formattedPhone,
                    company: "", // Em branco conforme solicitado
                    notes: "",   // Em branco conforme solicitado
                    campaignSource: utm_source ? `${utm_source} / ${utm_medium}` : "Site Orgânico / Landing Page",
                    message: "Solicitação de orçamento via formulário.",
                    utm_campaign,
                    page_path
                };

                await fetch(crmWebhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(crmPayload)
                });
                console.log('Lead sent to CRM successfully');
            } catch (error) {
                console.error('Failed to send to CRM:', error);
                // Don't block the response
            }
        }

        // Send Email Notification
        if (process.env.EMAIL_HOST && process.env.EMAIL_USER) {
            try {
                // Configuração otimizada para Gmail
                const isGmail = process.env.EMAIL_HOST?.includes('gmail');

                const transporter = nodemailer.createTransport({
                    ...(isGmail ? { service: 'gmail' } : {
                        host: process.env.EMAIL_HOST,
                        port: Number(process.env.EMAIL_PORT) || 587,
                        secure: Number(process.env.EMAIL_PORT) === 465,
                    }),
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS,
                    },
                });

                await transporter.sendMail({
                    from: `"Felp Tattoo Lead" <${process.env.EMAIL_USER}>`,
                    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
                    subject: `Novo Lead: ${name}`,
                    text: `Novo cadastro!\nNome: ${name}\nWhats: ${formattedPhone}\nOrigem: ${utm_source || 'Direto'}`,
                    html: `
                    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px;">
                        <h2 style="color: #d97706;">🚀 Novo Lead Capturado!</h2>
                        <p>Um novo cliente em potencial acabou de se cadastrar no site.</p>
                        
                        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Nome:</strong></td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>WhatsApp:</strong></td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                                    <a href="https://wa.me/${formattedPhone}" style="color: #2563eb; text-decoration: none; font-weight: bold;" target="_blank">
                                    ${formattedPhone} (Clique para Iniciar)
                                    </a>
                                </td>
                            </tr>
                            
                            <!-- Seção de Origem (UTM) -->
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd; background-color: #f9f9f9;"><strong>Origem (UTM):</strong></td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd; background-color: #f9f9f9;">
                                    ${utm_source || '-'} / ${utm_medium || '-'}
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd; background-color: #f9f9f9;"><strong>Campanha:</strong></td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd; background-color: #f9f9f9;">
                                    ${utm_campaign || '-'}
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd; background-color: #f9f9f9;"><strong>Página:</strong></td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd; background-color: #f9f9f9;">
                                    ${page_path || '-'}
                                </td>
                            </tr>
                            
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Data:</strong></td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${new Date().toLocaleString('pt-BR')}</td>
                            </tr>
                        </table>
                        
                        <div style="margin-top: 20px; font-size: 12px; color: #666; border-top: 1px solid #eee; padding-top: 10px;">
                            <p>Este é um email automático do sistema Felp Tattoo.</p>
                        </div>
                    </div>
                `,
                });
            } catch (emailError) {
                console.error('Email sending failed:', emailError);
            }
        }

        return NextResponse.json({ success: true, lead });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
