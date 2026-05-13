import { fail, redirect, type Actions } from '@sveltejs/kit';
import { z } from 'zod';
import { createServerPb, portalPath, setAuthCookie, type ServerAuthCollection } from '$lib/server/pocketbase';

const schema = z.object({
	email: z.string().trim().email('Enter a valid email address'),
	password: z.string().min(1, 'Enter your password')
});

export const actions: Actions = {
	default: async ({ request, cookies, url }) => {
		const formData = await request.formData();
		const parsed = schema.safeParse(Object.fromEntries(formData));

		if (!parsed.success) {
			return fail(400, {
				error: parsed.error.errors[0].message,
				email: String(formData.get('email') || '')
			});
		}

		const collections: ServerAuthCollection[] = ['customers', 'technicians'];
		for (const collection of collections) {
			const pb = createServerPb();
			let destination = '';
			try {
				const auth = await pb.collection(collection).authWithPassword(parsed.data.email.toLowerCase(), parsed.data.password);
				setAuthCookie(cookies, auth.token, auth.record, url.protocol === 'https:');
				destination = portalPath(auth.record);
			} catch {
				// Try the next auth collection.
			}
			if (destination) throw redirect(303, destination);
		}

		return fail(400, {
			error: 'We could not sign you in. Check your email and password.',
			email: parsed.data.email
		});
	}
};
