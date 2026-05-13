import type { PageServerLoad, Actions } from './$types';
import { createServerPb } from '$lib/server/pocketbase';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
	const pb = createServerPb(cookies);
	
	try {
		const repairs = await pb.collection('repairs').getFullList({ sort: '-created', expand: 'customer,technician,device' });
		return {
			repairs: structuredClone(repairs)
		};
	} catch (e) {
		return {
			repairs: []
		};
	}
};

export const actions: Actions = {
	updateRepair: async ({ request, cookies }) => {
		const pb = createServerPb(cookies);
		const data = await request.formData();
		const repairId = data.get('repairId')?.toString();
		const status = data.get('status')?.toString();
		const notes = data.get('notes')?.toString();
		
		if (!repairId || !status) {
			return fail(400, { message: 'Repair ID and status are required' });
		}
		
		try {
			await pb.collection('repairs').update(repairId, {
				status,
				notes,
				completed_at: status === 'Completed' ? new Date().toISOString() : null
			});

			await pb.collection('repair_status_logs').create({
				repair: repairId,
				status,
				changed_by: pb.authStore.record?.id,
				notes
			}).catch(() => undefined); // Optional log

			return { success: true };
		} catch (e) {
			return fail(500, { message: 'Failed to update repair' });
		}
	}
};
