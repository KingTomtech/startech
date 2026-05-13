import type { PageServerLoad } from './$types';
import { createServerPb } from '$lib/server/pocketbase';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies, locals }) => {
	if (!locals.user || locals.user.collectionName !== 'customers') {
		throw redirect(303, '/login');
	}

	const pb = createServerPb(cookies);
	
	try {
		const customerId = locals.user.id;
		const filter = pb.filter('customer = {:customer}', { customer: customerId });
		const repairs = await pb.collection('repairs').getFullList({ filter, sort: '-created' });
		
		return {
			repairs: structuredClone(repairs)
		};
	} catch (e) {
		return {
			repairs: []
		};
	}
};
