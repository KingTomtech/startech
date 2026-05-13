import { fail, redirect, type Actions } from '@sveltejs/kit';
import { z } from 'zod';
import { createServerPb, type ServerAuthCollection } from '$lib/server/pocketbase';

const schema = z.object({
	token: z.string().min(1, 'Missing reset token'),
	password: z.string().min(8, 'Password must be at least 8 characters'),
	passwordConfirm: z.string()
}).refine((data) => data.password === data.passwordConfirm, {
	message: 'Passwords do not match',
	path: ['passwordConfirm']
});

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const parsed = schema.safeParse(Object.fromEntries(formData));
		if (!parsed.success) return fail(400, { error: parsed.error.errors[0].message });

		const attempts = await Promise.allSettled(
			(['customers', 'technicians'] as ServerAuthCollection[]).map((collection) =>
				createServerPb().collection(collection).confirmPasswordReset(
					parsed.data.token,
					parsed.data.password,
					parsed.data.passwordConfirm
				)
			)
		);

		if (!attempts.some((attempt) => attempt.status === 'fulfilled')) {
			return fail(400, { error: 'Unable to reset password. Please request a fresh reset link.' });
		}

		throw redirect(303, '/login');
	}
};

export const load = ({ url }) => ({
	token: url.searchParams.get('token') || ''
});
