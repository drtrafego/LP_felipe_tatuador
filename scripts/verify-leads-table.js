
const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

// Basic env parser
const env = {};
try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            env[key.trim()] = value.trim().replace(/^["']|["']$/g, '');
        }
    });
} catch (e) {
    console.error('Error reading .env.local:', e);
}

async function main() {
    const databaseUrl = env.DATABASE_URL;
    if (!databaseUrl) {
        console.error('DATABASE_URL is not defined in .env.local');
        return;
    }

    const sql = neon(databaseUrl);
    try {
        console.log('Listing ALL tables...');
        const tables = await sql`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `;
        console.log('Tables:', tables.map(t => t.table_name).join(', '));

        console.log('\nChecking columns for "Leads"...');
        const colsLeads = await sql`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'Leads'
        `;
        console.log('Columns in "Leads":', colsLeads.map(c => c.column_name).join(', '));

        console.log('\nChecking leads in "Leads" table since Mar 1...');
        const startDate = new Date('2026-03-01T00:00:00Z');
        const data = await sql`
            SELECT id, name, client_id, phone, created_at 
            FROM "Leads" 
            WHERE created_at >= ${startDate.toISOString()}
            ORDER BY created_at DESC LIMIT 5
        `;
        console.log('Found records:', data.length);
        data.forEach(d => console.log(`- ${d.name} (${d.client_id}) from ${d.created_at}`));

    } catch (err) {
        console.error('Error querying DB:', err);
    }
}

main().catch(console.error);
