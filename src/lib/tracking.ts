// src/lib/tracking.ts
// Client-side tracking utilities for Meta Pixel and GA4

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

declare global {
    interface Window {
        gtag: any;
        fbq: any;
        _fbq: any;
    }
}

// Helper: read a cookie value by name
export const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null;
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }
    return null;
};

// Helper: set a cookie
export const setCookie = (name: string, value: string, days: number) => {
    if (typeof document === 'undefined') return;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
};

// Helper: ensure a persistent external_id exists in a cookie
export const getOrCreateExternalId = (): string => {
    let id = getCookie('_ext_id');
    if (!id) {
        id = crypto.randomUUID();
        setCookie('_ext_id', id, 365);
    }
    return id;
};

// Fire a Facebook Pixel event. Optionally pass an eventId for deduplication with CAPI.
export const fbEvent = (
    name: string,
    options: Record<string, unknown> = {},
    eventId?: string
) => {
    if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
    if (eventId) {
        window.fbq('track', name, options, { eventID: eventId });
    } else {
        window.fbq('track', name, options);
    }
};

// Fire a custom Facebook Pixel event
export const fbCustomEvent = (
    name: string,
    options: Record<string, unknown> = {},
    eventId?: string
) => {
    if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
    if (eventId) {
        window.fbq('trackCustom', name, options, { eventID: eventId });
    } else {
        window.fbq('trackCustom', name, options);
    }
};
