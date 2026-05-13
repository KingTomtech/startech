import type { PageServerLoad, Actions } from './$types';
import { createServerPb } from '$lib/server/pocketbase';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
	const pb = createServerPb(cookies);
	
	try {
		const technicians = await pb.collection('technicians').getFullList({ sort: 'name' });
		return {
			technicians: structuredClone(technicians)
		};
	} catch (e) {
		return {
			technicians: []
		};
	}
};

export const actions: Actions = {
	createTechnician: async ({ request, cookies }) => {
		const pb = createServerPb(cookies);
		const data = await request.formData();
		const name = data.get('name')?.toString();
		const email = data.get('email')?.toString();
		const phone = data.get('phone')?.toString();
		const role = data.get('role')?.toString() || 'technician';
		
		if (!name || !email || !phone) {
			return fail(400, { message: 'All fields are required' });
		}
		
		try {
			const password = `St-${Math.random().toString(36).slice(2, 8)}-${Date.now().toString(36).slice(-4)}`;
			await pb.collection('technicians').create({
				email,
				emailVisibility: true,
				password,
				passwordConfirm: password,
				name,
				phone,
				role,
				active: true
			});
			return { success: true, credential: `${email} / ${password}` };
		} catch (e) {
			return fail(500, { message: 'Failed to create technician' });
		}
	},
	toggleTechnician: async ({ request, cookies }) => {
		const pb = createServerPb(cookies);
		const data = await request.formData();
		const id = data.get('id')?.toString();
		const active = data.get('active')?.toString() === 'true';
		
		if (!id) return fail(400, { message: 'ID is required' });
		
		try {
			await pb.collection('technicians').update(id, { active });
			return { success: true };
		} catch (e) {
			return fail(500, { message: 'Failed to update technician status' });
		}
	}
};
