import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, phone, email } = body;

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
                    email: email || "",
                    whatsapp: formattedPhone,
                    company: process.env.NEXT_PUBLIC_TENANT_NAME || "Empresa LTDA",
                    notes: "Interesse em Tatuagem Realista (Lead Site)",
                    campaignSource: "Site Orgânico / Landing Page",
                    message: "Solicitação de orçamento via formulário."
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
                const transporter = nodemailer.createTransport({
                    host: process.env.EMAIL_HOST,
                    port: Number(process.env.EMAIL_PORT) || 587,
                    secure: false,
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS,
                    },
                });

                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
                    subject: `Novo Lead: ${name}`,
                    text: `Novo cadastro no site!\n\nNome: ${name}\nTelefone: ${formattedPhone}`,
                    html: `
                    <div style="font-family: sans-serif; color: #333;">
                        <h2>Novo Lead Capturado</h2>
                        <p><strong>Nome:</strong> ${name}</p>
                        <p><strong>Telefone:</strong> <a href="https://wa.me/${formattedPhone}">${formattedPhone}</a></p>
                        <p><em>Enviado para CRM: ${crmWebhookUrl ? 'Sim' : 'Não Configurado'}</em></p>
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
