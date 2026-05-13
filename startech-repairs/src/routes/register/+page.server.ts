import { fail, redirect, type Actions } from '@sveltejs/kit';
import { z } from 'zod';
import { createServerPb, setAuthCookie } from '$lib/server/pocketbase';

const schema = z.object({
	name: z.string().trim().min(2, 'Enter your full name'),
	email: z.string().trim().email('Enter a valid email address'),
	phone: z.string().trim().min(8, 'Enter a valid phone number'),
	password: z.string().min(8, 'Password must be at least 8 characters'),
	passwordConfirm: z.string()
}).refine((data) => data.password === data.passwordConfirm, {
	message: 'Passwords do not match',
	path: ['passwordConfirm']
});

export const actions: Actions = {
	default: async ({ request, cookies, url }) => {
		const formData = await request.formData();
		const parsed = schema.safeParse(Object.fromEntries(formData));
		if (!parsed.success) {
			return fail(400, { error: parsed.error.errors[0].message, values: Object.fromEntries(formData) });
		}

		const pb = createServerPb();
		try {
			const email = parsed.data.email.toLowerCase();
			await pb.collection('customers').create({
				email,
				emailVisibility: true,
				password: parsed.data.password,
				passwordConfirm: parsed.data.passwordConfirm,
				name: parsed.data.name,
				phone: parsed.data.phone,
				role: 'customer'
			});
			const auth = await pb.collection('customers').authWithPassword(email, parsed.data.password);
			setAuthCookie(cookies, auth.token, auth.record, url.protocol === 'https:');
		} catch (error: any) {
			return fail(400, { error: error?.message || 'Unable to create account', values: Object.fromEntries(formData) });
		}

		throw redirect(303, '/customer/dashboard');
	}
};
