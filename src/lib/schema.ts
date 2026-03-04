import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const leads = pgTable('leads', {
    id: serial('id').primaryKey(),
    clientId: text('organization_id').notNull(), // Switched to existing organization_id column
    name: text('name').notNull(),
    email: text('email'), // Optional as per current form
    whatsapp: varchar('whatsapp', { length: 255 }).notNull(), // Mapping to existing whatsapp column
    utm_source: text('utm_source'),
    utm_medium: text('utm_medium'),
    utm_campaign: text('utm_campaign'),
    utm_term: text('utm_term'),
    page_path: text('page_path'),
    // Meta dynamic UTMs
    ad_id: text('ad_id'),
    adset_id: text('adset_id'),
    campaign_id: text('campaign_id'),
    ad_name: text('ad_name'),
    adset_name: text('adset_name'),
    campaign_name: text('campaign_name'),
    placement: text('placement'),
    site_source_name: text('site_source_name'),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
});
