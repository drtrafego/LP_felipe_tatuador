const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local
const envPath = path.resolve(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const dbUrlMatch = envContent.match(/DATABASE_URL="?([^"\n]+)"?/);

if (!dbUrlMatch) {
    console.error('DATABASE_URL not found in .env.local');
    process.exit(1);
}

// Strip channel_binding if present
const databaseUrl = dbUrlMatch[1].replace('&channel_binding=require', '');
console.log('Database URL prepared.');

const pool = new Pool({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false }
});

async function runTest() {
    let client;
    try {
        console.log('Connecting...');
        client = await pool.connect();
        console.log('Connected!');

        console.log('Listing tables in public schema...');
        const res = await client.query(`
            SELECT table_schema, table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public';
        `);
        console.table(res.rows);

        // Check if Leads table exists
        const leadsTable = res.rows.find(r => r.table_name === 'Leads');
        if (!leadsTable) {
            console.error('ERROR: Leads table not found in public schema!');
            // List all schemas to see where tables are
            const schemas = await client.query('SELECT schema_name FROM information_schema.schemata');
            console.log('Available schemas:', schemas.rows.map(r => r.schema_name));
            return;
        }

        const migrationQuery = `
          ALTER TABLE public."Leads" 
          ADD COLUMN IF NOT EXISTS utm_source VARCHAR(255),
          ADD COLUMN IF NOT EXISTS utm_medium VARCHAR(255),
          ADD COLUMN IF NOT EXISTS utm_campaign VARCHAR(255),
          ADD COLUMN IF NOT EXISTS page_path VARCHAR(255);
        `;

        console.log('Ensuring UTM columns exist...');
        await client.query(migrationQuery);
        console.log('Schema verified.');

        // 2. Insert Test Lead
        const testLead = {
            name: 'Test UTM Agent',
            phone: '+5511988887777',
            utm_source: 'agent_test',
            utm_medium: 'script',
            utm_campaign: 'db_conversion_v2',
            page_path: '/test-path'
        };

        const insertQuery = `
            INSERT INTO public."Leads" (name, phone, utm_source, utm_medium, utm_campaign, page_path, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, NOW())
            RETURNING *;
        `;

        console.log('Inserting test lead...');
        const resInsert = await client.query(insertQuery, [
            testLead.name,
            testLead.phone,
            testLead.utm_source,
            testLead.utm_medium,
            testLead.utm_campaign,
            testLead.page_path
        ]);

        console.log('successfully inserted lead:');
        console.log(resInsert.rows[0]);

    } catch (err) {
        console.error('Test failed with error:', err);
    } finally {
        if (client) client.release();
        await pool.end();
    }
}

runTest();
