import { fail, type Actions } from '@sveltejs/kit';
import { z } from 'zod';
import { createServerPb, type ServerAuthCollection } from '$lib/server/pocketbase';

const schema = z.object({
	email: z.string().trim().email('Enter a valid email address')
});

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const parsed = schema.safeParse(Object.fromEntries(formData));
		if (!parsed.success) return fail(400, { error: parsed.error.errors[0].message });

		await Promise.allSettled(
			(['customers', 'technicians'] as ServerAuthCollection[]).map((collection) =>
				createServerPb().collection(collection).requestPasswordReset(parsed.data.email.toLowerCase())
			)
		);

		return { success: true };
	}
};
