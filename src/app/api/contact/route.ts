import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, phone } = body;

        // Basic Validation
        if (!name || !phone) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Format Phone: Remove '+' and any non-numeric characters to get pure DDI+Code+Phone
        // React-phone-number-input returns +55119..., so we just strip the +
        const formattedPhone = phone.replace('+', '').replace(/\D/g, '');


        // UPSERT Logic: Insert new lead or update existing one based on PHONE
        const query = `
      INSERT INTO public."Leads" (name, phone, updated_at)
      VALUES ($1, $2, NOW())
      ON CONFLICT (phone) 
      DO UPDATE SET 
        name = EXCLUDED.name,
        updated_at = NOW()
      RETURNING *;
    `;

        // Execute DB Query
        let lead;
        try {
            const result = await db.query(query, [name, phone]); // Save original phone format (+55...) in DB for readability
            lead = result.rows[0];
        } catch (dbError) {
            console.error('Database Error:', dbError);
            return NextResponse.json({ error: 'Database operation failed' }, { status: 500 });
        }

        // CRM Integration
        const crmWebhookUrl = process.env.CRM_WEBHOOK_URL;
        if (crmWebhookUrl) {
            try {
                await fetch(crmWebhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name,
                        phone: formattedPhone, // Clean DDI+DDD+Num format
                        date: new Date().toISOString()
                    })
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
