const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local to avoid 'dotenv' dependency
const envPath = path.resolve(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const dbUrlMatch = envContent.match(/DATABASE_URL="?([^"\n]+)"?/);

if (!dbUrlMatch) {
    console.error('DATABASE_URL not found in .env.local');
    process.exit(1);
}

const databaseUrl = dbUrlMatch[1];
console.log('Database connection string found.');

const pool = new Pool({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false }
});

const migrationQuery = `
  ALTER TABLE public."Leads" 
  ADD COLUMN IF NOT EXISTS utm_source VARCHAR(255),
  ADD COLUMN IF NOT EXISTS utm_medium VARCHAR(255),
  ADD COLUMN IF NOT EXISTS utm_campaign VARCHAR(255),
  ADD COLUMN IF NOT EXISTS page_path VARCHAR(255);
`;

async function runMigration() {
    console.log('Connecting to database...');
    const client = await pool.connect();
    try {
        console.log('Running migration...');
        const res = await client.query(migrationQuery);
        console.log('Migration committed successfully!');
        // console.log(res); 
    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        client.release();
        pool.end();
    }
}

runMigration();
