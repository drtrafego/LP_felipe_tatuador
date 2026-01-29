import crypto from 'crypto';

const PIXEL_ID = process.env.FACEBOOK_PIXEL_ID;
const ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

type MetaEventName = 'Lead' | 'PageView' | 'ViewContent' | 'Contact';

interface MetaUserData {
    em?: string; // Email (SHA256)
    ph?: string; // Phone (SHA256)
    fn?: string; // First Name (SHA256)
    client_ip_address?: string;
    client_user_agent?: string;
    fbc?: string; // Click ID
    fbp?: string; // Browser ID
}

interface MetaEvent {
    event_name: MetaEventName; // Standard event name
    event_time: number;
    user_data: MetaUserData;
    event_source_url?: string;
    action_source: 'website';
    custom_data?: any;
}

// Helper to hash data (SHA256)
export const hashData = (data: string): string => {
    if (!data) return '';
    return crypto.createHash('sha256').update(data.trim().toLowerCase()).digest('hex');
};

export const sendMetaEvent = async (
    eventName: MetaEventName,
    userData: { email?: string; phone?: string; firstName?: string; ip?: string; userAgent?: string; url?: string },
    customData?: any
) => {
    if (!PIXEL_ID || !ACCESS_TOKEN) {
        console.warn('Meta Pixel ID or Access Token not configured.');
        return;
    }

    const payload: MetaEvent = {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: userData.url,
        user_data: {
            em: userData.email ? hashData(userData.email) : undefined,
            ph: userData.phone ? hashData(userData.phone) : undefined,
            fn: userData.firstName ? hashData(userData.firstName) : undefined,
            client_ip_address: userData.ip,
            client_user_agent: userData.userAgent,
        },
        custom_data: customData,
    };

    try {
        const response = await fetch(`https://graph.facebook.com/v19.0/${PIXEL_ID}/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: [payload],
                access_token: ACCESS_TOKEN,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Meta CAPI Error:', JSON.stringify(errorData, null, 2));
        } else {
            console.log(`Meta CAPI Event (${eventName}) sent successfully.`);
        }
    } catch (error) {
        console.error('Failed to send Meta CAPI event:', error);
    }
};
