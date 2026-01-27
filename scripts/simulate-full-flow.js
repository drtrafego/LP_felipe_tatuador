const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

// Manually parse .env.local
const envPath = path.resolve(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

const parseEnv = (content) => {
    const env = {};
    content.split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            const key = match[1].trim();
            let value = match[2].trim();
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);
            }
            env[key] = value;
        }
    });
    return env;
};

const env = parseEnv(envContent);

if (!env.DATABASE_URL) {
    console.error('DATABASE_URL is missing in .env.local');
    process.exit(1);
}

const pool = new Pool({
    connectionString: env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function simulateFlow() {
    const client = await pool.connect();
    try {
        console.log('1. Database Connection: SUCCESS');

        const body = {
            name: "Test Full Flow Agent",
            phone: "+5511999998888",
            utm_source: "simulation_script",
            utm_medium: "node",
            utm_campaign: "full_flow_test",
            page_path: "/simulation"
        };

        const tenantId = env.NEXT_PUBLIC_TENANT_ID || 'default';
        const formattedPhone = body.phone.replace('+', '').replace(/\D/g, '');

        // 2. Insert into DB
        const query = `
            INSERT INTO public."Leads" (name, phone, client_id, updated_at, utm_source, utm_medium, utm_campaign, page_path)
            VALUES ($1, $2, $3, NOW(), $4, $5, $6, $7)
            ON CONFLICT (client_id, phone) 
            DO UPDATE SET 
                name = EXCLUDED.name,
                utm_source = COALESCE(EXCLUDED.utm_source, public."Leads".utm_source),
                utm_medium = COALESCE(EXCLUDED.utm_medium, public."Leads".utm_medium),
                utm_campaign = COALESCE(EXCLUDED.utm_campaign, public."Leads".utm_campaign),
                page_path = EXCLUDED.page_path,
                updated_at = NOW()
            RETURNING *;
        `;

        console.log('2. Inserting Lead...');
        const res = await client.query(query, [
            body.name,
            body.phone,
            tenantId,
            body.utm_source,
            body.utm_medium,
            body.utm_campaign,
            body.page_path
        ]);
        const lead = res.rows[0];
        console.log('   Lead Inserted/Updated:', lead.id, lead.name);

        // 3. CRM Integration
        const crmWebhookUrl = env.CRM_WEBHOOK_URL;
        if (crmWebhookUrl) {
            console.log(`3. Sending to CRM: ${crmWebhookUrl}`);
            const crmPayload = {
                name: body.name,
                email: "",
                whatsapp: formattedPhone,
                company: "",
                notes: "",
                utm_source: body.utm_source || "Site Orgânico",
                utm_medium: body.utm_medium || "Landing Page",
                utm_campaign: body.utm_campaign || "",
                source: body.utm_source || "Site Orgânico",
                medium: body.utm_medium || "Landing Page",
                campaign: body.utm_campaign || "",
                traffic_source: body.utm_source || "Site Orgânico",
                campaignSource: body.utm_source ? `${body.utm_source} / ${body.utm_medium}` : "Site Orgânico / Landing Page",
                message: "Solicitação de orçamento via formulário (SIMULAÇÃO).",
                page_path: body.page_path
            };

            try {
                const crmRes = await fetch(crmWebhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(crmPayload)
                });

                if (crmRes.ok) {
                    console.log('   CRM Webhook Status:', crmRes.status, 'OK');
                } else {
                    console.error('   CRM Webhook FAILED:', crmRes.status, await crmRes.text());
                }
            } catch (crmErr) {
                console.error('   CRM Fetch Error:', crmErr.message);
            }
        } else {
            console.log('3. CRM Skipped (No URL)');
        }

        // 4. Email
        if (env.EMAIL_HOST && env.EMAIL_USER) {
            console.log('4. Sending Email...');
            try {
                const transporter = nodemailer.createTransport({
                    host: env.EMAIL_HOST,
                    port: Number(env.EMAIL_PORT) || 587,
                    secure: Number(env.EMAIL_PORT) === 465,
                    auth: {
                        user: env.EMAIL_USER,
                        pass: env.EMAIL_PASS,
                    },
                });

                await transporter.sendMail({
                    from: `"Felp Tattoo Test" <${env.EMAIL_USER}>`,
                    to: env.EMAIL_TO || env.EMAIL_USER,
                    subject: `Teste de Fluxo Completo: ${body.name}`,
                    text: `Teste de verificação.\nNome: ${body.name}\nWhats: ${formattedPhone}`,
                });
                console.log('   Email sent successfully.');
            } catch (emailErr) {
                console.error('   Email Failed (Non-critical):', emailErr.message);
            }
        } else {
            console.log('4. Email Skipped (Missing credentials)');
        }

    } catch (err) {
        console.error('SIMULATION FAILED:', err);
    } finally {
        if (client) client.release();
        pool.end();
    }
}

simulateFlow();
