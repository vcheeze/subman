import { z } from 'zod';

import { Frequency, ReminderUnit } from '$lib/constants';

export const subscriptionSchema = z.object({
	id: z.string().nanoid(),
	name: z.string().min(1),
	price: z.number().min(1),
	frequency: z.enum([Frequency.Monthly, Frequency.Annually]),
	subscribedOn: z.string().date(),
	rating: z.number().min(1).max(5).optional(),
	reminders: z
		.array(
			z.object({
				amount: z.number().min(1),
				unit: z.enum([
					ReminderUnit.Minutes,
					ReminderUnit.Hours,
					ReminderUnit.Days,
					ReminderUnit.Weeks
				])
			})
		)
		.default([{ amount: 1, unit: ReminderUnit.Days }])
});

export type SubscriptionSchema = typeof subscriptionSchema;
