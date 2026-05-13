import type { PageServerLoad } from './$types';
import { createServerPb } from '$lib/server/pocketbase';

export const load: PageServerLoad = async ({ cookies }) => {
	const pb = createServerPb(cookies);
	
	try {
		const customers = await pb.collection('customers').getFullList({ sort: '-created' });
		return {
			customers: structuredClone(customers)
		};
	} catch (e) {
		return {
			customers: []
		};
	}
};
