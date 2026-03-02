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

async function runMigration() {
    const client = await pool.connect();
    try {
        console.log('Connected to database.');
        
        const query = `
            ALTER TABLE public."Leads" 
            ADD COLUMN IF NOT EXISTS ad_id VARCHAR(255),
            ADD COLUMN IF NOT EXISTS adset_id VARCHAR(255),
            ADD COLUMN IF NOT EXISTS campaign_id VARCHAR(255),
            ADD COLUMN IF NOT EXISTS ad_name VARCHAR(255),
            ADD COLUMN IF NOT EXISTS adset_name VARCHAR(255),
            ADD COLUMN IF NOT EXISTS campaign_name VARCHAR(255),
            ADD COLUMN IF NOT EXISTS placement VARCHAR(255),
            ADD COLUMN IF NOT EXISTS site_source_name VARCHAR(255);
        `;
        
        console.log('Adding dynamic Meta UTM columns...');
        await client.query(query);
        console.log('Columns added successfully (or already existed).');

    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        client.release();
        pool.end();
    }
}

runMigration();
