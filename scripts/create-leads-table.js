const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const dbUrlMatch = envContent.match(/DATABASE_URL="?([^"\n]+)"?/);

if (!dbUrlMatch) {
    console.error('DATABASE_URL not found in .env.local');
    process.exit(1);
}

const databaseUrl = dbUrlMatch[1].replace('&channel_binding=require', '');

const pool = new Pool({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false }
});

async function createTable() {
    const client = await pool.connect();
    try {
        console.log('Connected to database.');

        // Based on src/app/api/contact/route.ts usage
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS public."Leads" (
                id SERIAL PRIMARY KEY, 
                name VARCHAR(255) NOT NULL,
                phone VARCHAR(50) NOT NULL,
                client_id VARCHAR(100) DEFAULT 'default',
                utm_source VARCHAR(255),
                utm_medium VARCHAR(255),
                utm_campaign VARCHAR(255),
                page_path VARCHAR(255),
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW(),
                CONSTRAINT leads_client_phone_unique UNIQUE (client_id, phone)
            );
        `;

        console.log('Creating table "Leads"...');
        await client.query(createTableQuery);
        console.log('Table "Leads" created successfully (or already existed).');

    } catch (err) {
        console.error('Error creating table:', err);
    } finally {
        client.release();
        pool.end();
    }
}

createTable();
