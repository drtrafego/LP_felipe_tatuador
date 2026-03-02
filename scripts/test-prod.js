const https = require('https');
const http = require('http');

const args = process.argv.slice(2);
let baseUrl = args[0];

if (!baseUrl) {
    console.error('Usage: node scripts/test-prod.js <URL>');
    console.error('Example: node scripts/test-prod.js https://felipe-tattoo.vercel.app');
    process.exit(1);
}

// Ensure URL has protocol
if (!baseUrl.startsWith('http')) {
    baseUrl = 'https://' + baseUrl;
}

// Remove trailing slash
if (baseUrl.endsWith('/')) {
    baseUrl = baseUrl.slice(0, -1);
}

const endpoint = `${baseUrl}/api/contact`;

const payload = JSON.stringify({
    name: "Prod Test Agent",
    phone: "+5511977776666",
    utm_source: "prod_test",
    utm_medium: "script",
    utm_campaign: "live_verification",
    page_path: "/test-script-prod"
});

console.log(`Targeting: ${endpoint}`);

const lib = endpoint.startsWith('https') ? https : http;
const url = new URL(endpoint);

const options = {
    hostname: url.hostname,
    port: url.port || (endpoint.startsWith('https') ? 443 : 80),
    path: url.pathname,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': payload.length
    }
};

const req = lib.request(options, (res) => {
    let data = '';

    console.log(`Status Code: ${res.statusCode}`);

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('Response Body:', data);
        if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log('✅ Request successful!');
            console.log('Now run "node scripts/check-leads.js" to verify it matches the DB.');
        } else {
            console.error('❌ Request failed.');
        }
    });
});

req.on('error', (error) => {
    console.error('Error:', error);
});

req.write(payload);
req.end();
