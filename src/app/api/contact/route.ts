import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import nodemailer from 'nodemailer';
import { sendMetaEvent } from '@/lib/facebook';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            name,
            phone,
            utm_source,
            utm_medium,
            utm_campaign,
            utm_term,
            page_path,
            fbp,
            fbc,
            externalId
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
      INSERT INTO public."Leads" (name, phone, client_id, updated_at, utm_source, utm_medium, utm_campaign, utm_term, page_path)
      VALUES ($1, $2, $3, NOW(), $4, $5, $6, $7, $8)
      ON CONFLICT (client_id, phone) 
      DO UPDATE SET 
        name = EXCLUDED.name,
        utm_source = COALESCE(EXCLUDED.utm_source, public."Leads".utm_source),
        utm_medium = COALESCE(EXCLUDED.utm_medium, public."Leads".utm_medium),
        utm_campaign = COALESCE(EXCLUDED.utm_campaign, public."Leads".utm_campaign),
        utm_term = COALESCE(EXCLUDED.utm_term, public."Leads".utm_term),
        page_path = EXCLUDED.page_path,
        updated_at = NOW()
      RETURNING *;
    `;

        // Execute DB Query
        let lead;
        try {
            // Updated params to include tenantId and UTMs
            const result = await db.query(query, [name, phone, tenantId, utm_source, utm_medium, utm_campaign, utm_term, page_path]);
            lead = result.rows[0];

            // --- META CAPI: LEAD EVENT ---
            // Fire and forget (don't block response)
            const userAgent = req.headers.get('user-agent') || '';
            // Getting IP in Next.js App Router can be tricky without proxies, usually 'x-forwarded-for'
            const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || '';

            sendMetaEvent('Lead', {
                phone: formattedPhone, // Helper will hash this
                firstName: name,       // Helper will hash this
                userAgent: userAgent,
                ip: ip,
                url: req.headers.get('referer') || '',
                fbp: fbp,
                fbc: fbc,
                externalId: externalId
            }, {
                content_name: 'Lead Tatuagem',
                currency: 'BRL',
                value: 0, // Or potential value if known
                source: utm_source,
                medium: utm_medium,
                campaign: utm_campaign,
                term: utm_term
            }).catch(err => console.error('Meta CAPI background error:', err));
            // -----------------------------

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
                    company: "",
                    notes: "",
                    // Variações comuns para garantir reconhecimento no CRM
                    utm_source: utm_source || "Site Orgânico",
                    utm_medium: utm_medium || "Landing Page",
                    utm_campaign: utm_campaign || "",
                    source: utm_source || "Site Orgânico",
                    medium: utm_medium || "Landing Page",
                    campaign: utm_campaign || "",
                    traffic_source: utm_source || "Site Orgânico",
                    // Mantendo o campo original também
                    campaignSource: utm_source ? `${utm_source} / ${utm_medium}` : "Site Orgânico / Landing Page",
                    message: "",
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
