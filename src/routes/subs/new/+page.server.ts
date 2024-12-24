import { fail } from '@sveltejs/kit';

import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import type { PageServerLoad, Actions } from './$types';
import { subscriptionSchema } from '../schema';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(subscriptionSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(subscriptionSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		return {
			form
		};
	}
};
