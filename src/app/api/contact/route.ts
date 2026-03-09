import { NextResponse, NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { leads } from '@/lib/schema';
import nodemailer from 'nodemailer';
import { sendMetaCAPI } from '@/lib/tracking-server';
import { sendGA4Event, extractGAClientId } from '@/lib/ga4-server';
import { withTimeout, generateBackupId } from '@/lib/utils';
import { sql } from 'drizzle-orm';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            name,
            phone,
            utm_source,
            utm_medium,
            utm_campaign,
            utm_term,
            page_path,
            fbp,
            fbc,
            externalId,
            ad_id,
            adset_id,
            campaign_id,
            ad_name,
            adset_name,
            campaign_name,
            placement,
            site_source_name
        } = body;

        // Basic Validation
        if (!name || !phone) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const formattedPhone = phone.replace('+', '').replace(/\D/g, '');
        let tenantId = process.env.NEXT_PUBLIC_TENANT_ID || 'a20d05cd-ea77-4456-8feb-586eeca3cfea';
        if (tenantId === 'felipe-matias-lp') {
            tenantId = 'a20d05cd-ea77-4456-8feb-586eeca3cfea'; // Force the correct UUID
        }

        // 🎯 2. Persistência Síncrona com Timeout (Drizzle)
        const upsertLead = async () => {
            try {
                const result = await db.insert(leads).values({
                    clientId: tenantId,
                    name,
                    whatsapp: formattedPhone,
                    utm_source,
                    utm_medium,
                    utm_campaign,
                    utm_term,
                    page_path,
                    ad_id,
                    adset_id,
                    campaign_id,
                    ad_name,
                    adset_name,
                    campaign_name,
                    placement,
                    site_source_name,
                }).returning();
                return result[0];
            } catch (err) {
                console.error('DB Upsert Error:', err);
                return null;
            }
        };

        const leadResult = await withTimeout(upsertLead(), 5000, null);
        const finalLeadId = leadResult?.id?.toString() || generateBackupId();

        // 🛰️ 3. Processamento de Fundo (Assíncrono)
        (async () => {
            try {
                const userAgent = req.headers.get('user-agent') || '';
                const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || '';
                const fbpServer = req.cookies.get('_fbp')?.value || fbp;
                const fbcServer = req.cookies.get('_fbc')?.value || fbc;
                const gaCookie = req.cookies.get('_ga')?.value;
                const gaClientId = extractGAClientId(gaCookie) || externalId || finalLeadId;
                const origin = req.headers.get('origin') || 'https://www.felptattoo.com';
                const referer = req.headers.get('referer');
                const sourceUrl = referer || `${origin}${page_path || '/'}`;

                await Promise.all([
                    // META CAPI
                    sendMetaCAPI('Lead', {
                        ph: formattedPhone,
                        fn: name.split(' ')[0],
                        ln: name.split(' ').slice(1).join(' ') || undefined,
                        ip,
                        ua: userAgent,
                        fbc: fbcServer,
                        fbp: fbpServer,
                        external_id: externalId,
                        event_source_url: sourceUrl,
                    }, {
                        content_name: 'Lead Tatuagem',
                        currency: 'BRL',
                        value: 0,
                        utm_source,
                        utm_medium,
                        utm_campaign,
                        utm_term,
                    }, finalLeadId).catch(e => console.error('CAPI Background Error:', e)),

                    // GOOGLE ANALYTICS 4 (API)
                    sendGA4Event(gaClientId, 'generate_lead', {
                        value: 0,
                        currency: 'BRL',
                        transaction_id: finalLeadId,
                        utm_source: utm_source || "Site Orgânico",
                        utm_medium: utm_medium || "Landing Page",
                        utm_campaign: utm_campaign || "",
                        page_location: sourceUrl,
                    }).catch(e => console.error('GA4 Background Error:', e)),

                    // CRM
                    process.env.CRM_WEBHOOK_URL ? fetch(process.env.CRM_WEBHOOK_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            name,
                            email: "",
                            whatsapp: formattedPhone,
                            company: "",
                            notes: "",
                            // Variações comuns para garantir reconhecimento no CRM
                            utm_source: utm_source || "Site Orgânico",
                            utm_medium: utm_medium || "Landing Page",
                            utm_campaign: utm_campaign || "",
                            source: utm_source || "Site Orgânico",
                            medium: utm_medium || "Landing Page",
                            campaign: utm_campaign || "",
                            traffic_source: utm_source || "Site Orgânico",
                            // Mantendo o campo original também
                            campaignSource: utm_source ? `${utm_source} / ${utm_medium}` : "Site Orgânico / Landing Page",
                            message: "",
                            page_path
                        })
                    }).catch(e => console.error('CRM Background Error:', e)) : Promise.resolve(),

                    // EMAIL
                    (async () => {
                        if (process.env.EMAIL_HOST && process.env.EMAIL_USER) {
                            try {
                                const transporter = nodemailer.createTransport({
                                    host: process.env.EMAIL_HOST,
                                    port: parseInt(process.env.EMAIL_PORT || '465'),
                                    secure: process.env.EMAIL_PORT === '465',
                                    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
                                });
                                await transporter.sendMail({
                                    from: `"Felp Tattoo" <${process.env.EMAIL_USER}>`,
                                    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
                                    subject: `Novo Lead: ${name}`,
                                    html: `<p>Novo lead: ${name}<br>Whatsapp: ${formattedPhone}<br>Origem: ${utm_source || 'Direto'}</p>`,
                                });
                            } catch (e) { console.error('Email Background Error:', e); }
                        }
                    })()
                ]);
            } catch (bgError) {
                console.error('Background Processing Outer Error:', bgError);
            }
        })().catch(e => console.error('Background IIFE Error:', e));

        // ✅ 4. Resposta Imediata
        return NextResponse.json({
            success: true,
            lead: { id: finalLeadId }
        });

    } catch (error) {
        console.error('API Critical Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

