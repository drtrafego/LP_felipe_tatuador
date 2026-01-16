import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone } = body;

        // Basic Validation
        if (!name || !email || !phone) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // UPSERT Logic: Insert new lead or update existing one based on email
        // Note: User specified table name "Leads" and explicit schema "public"
        const query = `
      INSERT INTO public."Leads" (name, email, phone, updated_at)
      VALUES ($1, $2, $3, NOW())
      ON CONFLICT (email) 
      DO UPDATE SET 
        name = EXCLUDED.name,
        phone = EXCLUDED.phone,
        updated_at = NOW()
      RETURNING *;
    `;

        // Execute DB Query
        let lead;
        try {
            const result = await db.query(query, [name, email, phone]);
            lead = result.rows[0];
        } catch (dbError) {
            console.error('Database Error:', dbError);
            // Fallback or specific error handling (e.g. table not found)
            return NextResponse.json({ error: 'Database operation failed' }, { status: 500 });
        }

        // Send Email Notification
        // Only attempt if variables are set
        if (process.env.EMAIL_HOST && process.env.EMAIL_USER) {
            try {
                const transporter = nodemailer.createTransport({
                    host: process.env.EMAIL_HOST,
                    port: Number(process.env.EMAIL_PORT) || 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS,
                    },
                });

                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: process.env.EMAIL_TO || process.env.EMAIL_USER, // Default to self if TO not set
                    subject: `Novo Lead: ${name}`,
                    text: `Novo cadastro no site!\n\nNome: ${name}\nEmail: ${email}\nTelefone: ${phone}`,
                    html: `
                    <div style="font-family: sans-serif; color: #333;">
                        <h2>Novo Lead Capturado</h2>
                        <p><strong>Nome:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Telefone:</strong> ${phone}</p>
                        <p><em>Verifique o painel do banco de dados para mais detalhes.</em></p>
                    </div>
                `,
                });
                console.log('Notification email sent for:', email);
            } catch (emailError) {
                console.error('Email sending failed:', emailError);
                // Non-critical error, continue to return success for the lead capture
            }
        }

        return NextResponse.json({ success: true, lead });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
