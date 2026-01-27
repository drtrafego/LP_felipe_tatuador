const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const dbUrlMatch = envContent.match(/DATABASE_URL="?([^"\n]+)"?/);

if (!dbUrlMatch) {
    process.exit(1);
}

const databaseUrl = dbUrlMatch[1].replace('&channel_binding=require', '');

const pool = new Pool({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false }
});

async function checkLeads() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT name, phone, utm_source, utm_medium, utm_campaign, page_path, updated_at FROM public."Leads" ORDER BY updated_at DESC LIMIT 1;');
        if (res.rows.length > 0) {
            console.log(JSON.stringify(res.rows[0], null, 2));
        } else {
            console.log('No leads found.');
        }
    } catch (err) {
        console.error(err);
    } finally {
        client.release();
        pool.end();
    }
}

checkLeads();
