import { fail, type Actions } from '@sveltejs/kit';
import { z } from 'zod';
import { createServerPb } from '$lib/server/pocketbase';

const schema = z.object({
	name: z.string().trim().min(2, 'Enter your name'),
	email: z.string().trim().email('Enter a valid email address'),
	phone: z.string().trim().min(8, 'Enter a valid phone number'),
	experience: z.string().trim().min(10, 'Tell us a little about the role or experience')
});

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const parsed = schema.safeParse(Object.fromEntries(formData));
		if (!parsed.success) {
			return fail(400, { error: parsed.error.errors[0].message, values: Object.fromEntries(formData) });
		}

		const pb = createServerPb();
		try {
			await pb.collection('technician_requests').create({
				name: parsed.data.name,
				email: parsed.data.email.toLowerCase(),
				phone: parsed.data.phone,
				experience: parsed.data.experience,
				status: 'Pending'
			});
		} catch (error: any) {
			return fail(400, { error: error?.message || 'Unable to submit request', values: Object.fromEntries(formData) });
		}

		return { success: true };
	}
};
