import { pb } from '$lib/pocketbase';
import { isAuthenticated, user } from '$lib/stores';

export type AuthCollection = 'customers' | 'technicians';

export async function loadUser() {
	if (pb.authStore.isValid && pb.authStore.record) {
		user.set(pb.authStore.record);
		isAuthenticated.set(true);
		return pb.authStore.record;
	}

	user.set(null);
	isAuthenticated.set(false);
	return null;
}

export async function login(
	email: string,
	password: string,
	collection: AuthCollection = 'customers'
) {
	try {
		const authData = await pb.collection(collection).authWithPassword(email, password);
		user.set(authData.record);
		isAuthenticated.set(true);
		return { success: true, record: authData.record };
	} catch (error: any) {
		return { success: false, error: error.message };
	}
}

export function logout() {
	pb.authStore.clear();
	user.set(null);
	isAuthenticated.set(false);
}

export async function registerCustomer(email: string, password: string, name: string, phone: string) {
	try {
		const record = await pb.collection('customers').create({
			email,
			emailVisibility: true,
			password,
			passwordConfirm: password,
			name,
			phone,
			role: 'customer'
		});
		await login(email, password, 'customers');
		return { success: true, record };
	} catch (error: any) {
		return { success: false, error: error.message };
	}
}

export async function registerTechnician(email: string, password: string, name: string) {
	try {
		const record = await pb.collection('technicians').create({
			email,
			emailVisibility: true,
			password,
			passwordConfirm: password,
			name,
			role: 'technician',
			active: true
		});
		await login(email, password, 'technicians');
		return { success: true, record };
	} catch (error: any) {
		return { success: false, error: error.message };
	}
}
