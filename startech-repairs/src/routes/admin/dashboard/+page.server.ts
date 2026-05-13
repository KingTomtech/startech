import type { PageServerLoad, Actions } from './$types';
import { createServerPb } from '$lib/server/pocketbase';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
	const pb = createServerPb(cookies);
	
	try {
		const [repairs, invoices, inventory, requests] = await Promise.all([
			pb.collection('repairs').getFullList({ sort: '-created' }),
			pb.collection('invoices').getFullList({ sort: '-created' }),
			pb.collection('inventory_parts').getFullList({ sort: 'name' }),
			pb.collection('technician_requests').getFullList({ sort: '-created' }).catch(() => [])
		]);
		return {
			repairs: structuredClone(repairs),
			invoices: structuredClone(invoices),
			inventory: structuredClone(inventory),
			requests: structuredClone(requests)
		};
	} catch (e) {
		return {
			repairs: [],
			invoices: [],
			inventory: [],
			requests: []
		};
	}
};

export const actions: Actions = {
	approveRequest: async ({ request, cookies }) => {
		const pb = createServerPb(cookies);
		const data = await request.formData();
		const id = data.get('id')?.toString();
		const name = data.get('name')?.toString();
		const email = data.get('email')?.toString();
		const phone = data.get('phone')?.toString();
		
		if (!id || !email) return fail(400, { message: 'Missing fields' });
		
		try {
			const password = `St-${Math.random().toString(36).slice(2, 8)}-${Date.now().toString(36).slice(-4)}`;
			await pb.collection('technicians').create({
				email,
				emailVisibility: true,
				password,
				passwordConfirm: password,
				name,
				phone,
				role: 'technician',
				active: true
			});
			await pb.collection('technician_requests').update(id, { status: 'Approved' });
			return { success: true };
		} catch (e) {
			return fail(500, { message: 'Failed to approve request' });
		}
	},
	rejectRequest: async ({ request, cookies }) => {
		const pb = createServerPb(cookies);
		const data = await request.formData();
		const id = data.get('id')?.toString();
		
		if (!id) return fail(400, { message: 'Missing id' });
		
		try {
			await pb.collection('technician_requests').update(id, { status: 'Rejected' });
			return { success: true };
		} catch (e) {
			return fail(500, { message: 'Failed to reject request' });
		}
	}
};
