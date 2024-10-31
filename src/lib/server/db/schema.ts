import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	age: integer('age'),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const subscription = pgTable('subscription', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	price: integer('price').notNull(),
})

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;

export type Subscription = typeof subscription.$inferSelect;
