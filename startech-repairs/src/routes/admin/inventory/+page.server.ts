import type { PageServerLoad, Actions } from './$types';
import { createServerPb } from '$lib/server/pocketbase';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
	const pb = createServerPb(cookies);
	
	try {
		const [inventory, devices] = await Promise.all([
			pb.collection('inventory_parts').getFullList({ sort: 'name' }),
			pb.collection('devices').getFullList({ sort: 'brand,model' })
		]);
		return {
			inventory: structuredClone(inventory),
			devices: structuredClone(devices)
		};
	} catch (e) {
		return {
			inventory: [],
			devices: []
		};
	}
};

export const actions: Actions = {
	savePrice: async ({ request, cookies }) => {
		const pb = createServerPb(cookies);
		const data = await request.formData();
		const name = data.get('name')?.toString();
		const sku = data.get('sku')?.toString();
		const amount = data.get('amount')?.toString();
		
		if (!name || !sku || !amount) {
			return fail(400, { message: 'Missing required fields' });
		}
		
		try {
			await pb.collection('inventory_parts').create({
				name,
				sku,
				quantity: 1,
				sell_price: Number(amount),
				low_stock_threshold: 1,
				archived: false
			});
			return { success: true };
		} catch (e) {
			return fail(500, { message: 'Failed to add item' });
		}
	},
	updatePrice: async ({ request, cookies }) => {
		const pb = createServerPb(cookies);
		const data = await request.formData();
		const id = data.get('id')?.toString();
		const price = data.get('price')?.toString();
		
		if (!id || !price) {
			return fail(400, { message: 'ID and price are required' });
		}
		
		try {
			await pb.collection('inventory_parts').update(id, { sell_price: Number(price) });
			return { success: true };
		} catch (e) {
			return fail(500, { message: 'Failed to update price' });
		}
	}
};
