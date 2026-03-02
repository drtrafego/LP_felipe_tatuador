/**
 * src/lib/ga4-server.ts
 * Google Analytics 4 Measurement Protocol Utility
 */

const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID;
const GA_API_SECRET = process.env.GA_API_SECRET;

export async function sendGA4Event(
    clientId: string,
    eventName: string,
    params: Record<string, any> = {}
) {
    if (!GA_MEASUREMENT_ID || !GA_API_SECRET) {
        console.warn('[GA4] Missing GA_MEASUREMENT_ID or GA_API_SECRET.');
        return;
    }

    // GA4 Measurement Protocol Endpoint
    const url = `https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`;

    const payload = {
        client_id: clientId,
        events: [
            {
                name: eventName,
                params: {
                    ...params,
                    engagement_time_msec: 1, // Required for some reports
                },
            },
        ],
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('[GA4] API Error:', errorText);
        } else {
            console.log(`[GA4] Event "${eventName}" sent successfully.`);
        }
    } catch (error) {
        console.error('[GA4] Failed to send event:', error);
    }
}

/**
 * Helper to extract cid from _ga cookie
 * _ga cookie format: GA1.1.123456789.1670000000
 * client_id is "123456789.1670000000"
 */
export function extractGAClientId(gaCookie?: string): string | null {
    if (!gaCookie) return null;
    const parts = gaCookie.split('.');
    if (parts.length >= 4) {
        return `${parts[2]}.${parts[3]}`;
    }
    return gaCookie; // Return as is if format is different
}
