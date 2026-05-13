import type { PageServerLoad, Actions } from './$types';
import { createServerPb } from '$lib/server/pocketbase';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
	const pb = createServerPb(cookies);
	
	try {
		const [invoices, repairs] = await Promise.all([
			pb.collection('invoices').getFullList({ sort: '-created', expand: 'customer,repair' }),
			pb.collection('repairs').getFullList({ sort: '-created', expand: 'customer' })
		]);
		return {
			invoices: structuredClone(invoices),
			repairs: structuredClone(repairs)
		};
	} catch (e) {
		return {
			invoices: [],
			repairs: []
		};
	}
};

export const actions: Actions = {
	createInvoice: async ({ request, cookies }) => {
		const pb = createServerPb(cookies);
		const data = await request.formData();
		const repairId = data.get('repairId')?.toString();
		const subtotal = Number(data.get('subtotal')) || 0;
		const tax = Number(data.get('tax')) || 0;
		const status = data.get('status')?.toString() || 'Pending';
		
		if (!repairId) return fail(400, { message: 'Repair ID is required' });
		
		try {
			const repair = await pb.collection('repairs').getOne(repairId);
			if (!repair.customer) {
				return fail(400, { message: 'Repair must have an associated customer' });
			}
			
			const total = subtotal + tax;
			
			await pb.collection('invoices').create({
				repair: repairId,
				customer: repair.customer,
				subtotal,
				tax,
				total,
				status,
				invoice_number: `INV-${Date.now().toString(36).toUpperCase()}`
			});
			
			await pb.collection('repairs').update(repairId, { price: total }).catch(() => undefined);
			
			return { success: true };
		} catch (e) {
			return fail(500, { message: 'Failed to create invoice' });
		}
	},
	updateInvoiceStatus: async ({ request, cookies }) => {
		const pb = createServerPb(cookies);
		const data = await request.formData();
		const id = data.get('id')?.toString();
		const status = data.get('status')?.toString();
		
		if (!id || !status) return fail(400, { message: 'ID and status are required' });
		
		try {
			await pb.collection('invoices').update(id, {
				status,
				paid_at: status === 'Paid' ? new Date().toISOString() : null
			});
			return { success: true };
		} catch (e) {
			return fail(500, { message: 'Failed to update invoice status' });
		}
	}
};
