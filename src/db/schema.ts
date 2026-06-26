import {
	boolean,
	date,
	integer,
	numeric,
	pgTable,
	serial,
	text,
	timestamp,
	uuid,
} from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: boolean('email_verified')
		.$defaultFn(() => false)
		.notNull(),
	polarCustomerId: uuid('polar_customer_id'),
	image: text('image'),
	createdAt: timestamp('created_at')
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
	updatedAt: timestamp('updated_at')
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
})

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	expiresAt: timestamp('expires_at').notNull(),
	token: text('token').notNull().unique(),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	activeOrganizationId: text('active_organization_id'),
})

export const account = pgTable('account', {
	id: text('id').primaryKey(),
	accountId: text('account_id').notNull(),
	providerId: text('provider_id').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	idToken: text('id_token'),
	accessTokenExpiresAt: timestamp('access_token_expires_at'),
	refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
	scope: text('scope'),
	password: text('password'),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
})

export const verification = pgTable('verification', {
	id: text('id').primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: timestamp('expires_at').notNull(),
	createdAt: timestamp('created_at').$defaultFn(
		() => /* @__PURE__ */ new Date(),
	),
	updatedAt: timestamp('updated_at').$defaultFn(
		() => /* @__PURE__ */ new Date(),
	),
})

export const organization = pgTable('organization', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	slug: text('slug').notNull().unique(),
	logo: text('logo'),
	metadata: text('metadata'),
	createdAt: timestamp('created_at').notNull(),
})

export const member = pgTable('member', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	organizationId: text('organization_id')
		.notNull()
		.references(() => organization.id, { onDelete: 'cascade' }),
	role: text('role').notNull().default('member'),
	createdAt: timestamp('created_at').notNull(),
})

export const invitation = pgTable('invitation', {
	id: text('id').primaryKey(),
	email: text('email').notNull(),
	inviterId: text('inviter_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	organizationId: text('organization_id')
		.notNull()
		.references(() => organization.id, { onDelete: 'cascade' }),
	role: text('role'),
	status: text('status').notNull().default('pending'),
	expiresAt: timestamp('expires_at').notNull(),
	createdAt: timestamp('created_at')
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
})

export const payment = pgTable('payment', {
	id: uuid('id').primaryKey(),
	user_id: text('user_id').references(() => user.id, { onDelete: 'cascade' }),
	polarPaymentId: uuid('polar_payment_id').unique().notNull(),
	amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
	currency: text('currency').default('USD'),
	createdAt: timestamp('created_at').$defaultFn(
		() => /* @__PURE__ */ new Date(),
	),
})

export const category = pgTable('category', {
	id: serial('id').primaryKey(),
	name: text('name').notNull().unique(),
	icon: text('icon'),
	sortOrder: integer('sort_order').default(0),
})

export const subscription = pgTable('subscription', {
	id: uuid('id').primaryKey().defaultRandom(),
	userId: text('user_id').references(() => user.id, { onDelete: 'cascade' }),
	organizationId: text('organization_id').references(() => organization.id, {
		onDelete: 'cascade',
	}),
	createdByUserId: text('created_by_user_id').references(() => user.id, {
		onDelete: 'set null',
	}),
	name: text('name').notNull(),
	canonicalServiceId: uuid('canonical_service_id').references(
		() => service.id,
		{ onDelete: 'cascade' },
	),
	rating: integer('rating').notNull(),
	amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
	currency: text('currency').default('USD'),
	billingCycle: text('billing_cycle', {
		enum: ['weekly', 'monthly', 'quarterly', 'yearly'],
	}),
	startDate: date('start_date'),
	categoryId: integer('category_id').references(() => category.id),
	notes: text('notes'),
	isActive: boolean('is_active').default(true),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
})

export const service = pgTable('service', {
	id: uuid('id').primaryKey().defaultRandom(),
	canonicalName: text('canonical_name').unique().notNull(),
	categoryId: integer('category_id').references(() => category.id),
	websiteUrl: text('website_url'),
	logoUrl: text('logo_url'),
})

export type User = typeof user.$inferSelect

export type Category = typeof category.$inferSelect

export type Subscription = typeof subscription.$inferSelect

export type Service = typeof service.$inferSelect
