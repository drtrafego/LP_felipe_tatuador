// src/lib/tracking-server.ts
// Server-side Meta Conversions API (CAPI) utility

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;

// Edge/Node compatible SHA-256 hash using crypto.subtle
async function hashData(data: string): Promise<string> {
    if (!data) return '';
    const encoder = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest(
        'SHA-256',
        encoder.encode(data.trim().toLowerCase())
    );
    return Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
}

interface MetaCAPIUserData {
    em?: string;        // email (plaintext - will be hashed)
    ph?: string;        // phone (plaintext - will be hashed)
    fn?: string;        // first name (plaintext - will be hashed)
    ln?: string;        // last name (plaintext - will be hashed)
    zp?: string;        // zip/postal code (plaintext - will be hashed)
    db?: string;        // date of birth (plaintext - will be hashed)
    ct?: string;        // city (plaintext - will be hashed)
    st?: string;        // state/province (plaintext - will be hashed)
    ip?: string;
    ua?: string;        // user agent
    fbc?: string;       // _fbc cookie (click id, UNHASHED)
    fbp?: string;       // _fbp cookie (browser id, UNHASHED)
    external_id?: string; // external identifier (UNHASHED)
    event_source_url?: string;
}

interface MetaCAPICustomData {
    content_name?: string;
    currency?: string;
    value?: number;
    [key: string]: unknown;
}

export async function sendMetaCAPI(
    eventName: string,
    userData: MetaCAPIUserData,
    customData: MetaCAPICustomData = {},
    eventId?: string
) {
    if (!FB_PIXEL_ID || !FB_ACCESS_TOKEN) {
        console.warn('[CAPI] Missing FB_PIXEL_ID or FB_ACCESS_TOKEN.');
        return;
    }

    const payload = {
        data: [
            {
                event_name: eventName,
                event_time: Math.floor(Date.now() / 1000),
                event_id: eventId, // For deduplication with Pixel
                action_source: 'website',
                event_source_url: userData.event_source_url,
                user_data: {
                    em: userData.em ? [await hashData(userData.em)] : undefined,
                    ph: userData.ph ? [await hashData(userData.ph)] : undefined,
                    fn: userData.fn ? [await hashData(userData.fn)] : undefined,
                    ln: userData.ln ? [await hashData(userData.ln)] : undefined,
                    zp: userData.zp ? [await hashData(userData.zp)] : undefined,
                    db: userData.db ? [await hashData(userData.db)] : undefined,
                    ct: userData.ct ? [await hashData(userData.ct)] : undefined,
                    st: userData.st ? [await hashData(userData.st)] : undefined,
                    client_ip_address: userData.ip,
                    client_user_agent: userData.ua,
                    fbc: userData.fbc, // Unhashed
                    fbp: userData.fbp, // Unhashed
                    external_id: userData.external_id ? [await hashData(userData.external_id)] : undefined, // Hashed as per documentation
                },
                custom_data: customData,
            },
        ],
    };

    try {
        const res = await fetch(
            `https://graph.facebook.com/v19.0/${FB_PIXEL_ID}/events?access_token=${FB_ACCESS_TOKEN}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            }
        );
        const json = await res.json();
        if (!res.ok) {
            console.error('[CAPI] Error:', JSON.stringify(json));
        } else {
            console.log(`[CAPI] Event "${eventName}" sent. Events received: ${json.events_received}`);
        }
    } catch (err) {
        console.error('[CAPI] Failed to send event:', err);
    }
}
