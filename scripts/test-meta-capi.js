const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// 1. Load Env
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
const PIXEL_ID = env.FACEBOOK_PIXEL_ID;
const ACCESS_TOKEN = env.FACEBOOK_ACCESS_TOKEN;

if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.error('Missing Meta Credentials in .env.local');
    process.exit(1);
}

// 2. Helper Hash
const hashData = (data) => {
    return crypto.createHash('sha256').update(data.trim().toLowerCase()).digest('hex');
};

const external_id = 'test-external-id-' + Date.now();
const fbp = 'fb.1.' + Date.now() + '.123456789';

// 3. Payload
const payload = {
    data: [{
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: 'https://www.felptattoo.com/test-premium',
        user_data: {
            ph: hashData('+5511999998888'),
            fn: hashData('Premium Test User'),
            external_id: external_id,
            fbp: fbp,
            client_ip_address: '127.0.0.1',
            client_user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        custom_data: {
            content_name: 'Teste Premium CAPI',
            currency: 'BRL',
            value: 100.00,
            ad_id: '123456789',
            adset_id: '987654321',
            campaign_id: '456123789',
            ad_name: 'Ad Test',
            adset_name: 'Adset Test',
            campaign_name: 'Campaign Test',
            placement: 'facebook_mobile_feed',
            site_source_name: 'fb'
        }
    }],
    access_token: ACCESS_TOKEN
};

const dataString = JSON.stringify(payload);

console.log(`Sending Premium Test Event to Pixel ID: ${PIXEL_ID}...`);

// 4. Send Request
const options = {
    hostname: 'graph.facebook.com',
    path: `/v19.0/${PIXEL_ID}/events`,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': dataString.length
    }
};

const req = https.request(options, (res) => {
    let responseBody = '';

    res.on('data', (chunk) => {
        responseBody += chunk;
    });

    res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        console.log('Response:', responseBody);

        try {
            const json = JSON.parse(responseBody);
            if (json.events_received) {
                console.log('✅ SUCESSO! Evento Premium recebido pelo Facebook.');
            } else {
                console.log('❌ FALHA na resposta do Facebook.');
            }
        } catch (e) {
            console.log('Erro ao parsear resposta.');
        }
    });
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

req.write(dataString);
req.end();
