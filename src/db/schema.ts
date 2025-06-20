import {
  pgTable,
  uuid,
  text,
  numeric,
  date,
  timestamp,
  boolean,
  serial,
  integer,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').primaryKey(), // Clerk user ID (string UUID)
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Categories
export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  icon: text('icon'),
  sortOrder: integer('sort_order').default(0),
});

// Subscriptions
export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').default('USD'),
  billingCycle: text('billing_cycle', {
    enum: ['weekly', 'monthly', 'quarterly', 'yearly'],
  }).notNull(),
  startDate: date('start_date').notNull(),
  categoryId: integer('category_id').references(() => categories.id),
  notes: text('notes'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type User = typeof users.$inferSelect;

export type Category = typeof categories.$inferSelect;

export type Subscription = typeof subscriptions.$inferSelect;
