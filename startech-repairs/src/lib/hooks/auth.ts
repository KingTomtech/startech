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

export async function requestPasswordReset(email: string, collection: AuthCollection) {
	try {
		await pb.collection(collection).requestPasswordReset(email);
		return { success: true };
	} catch (error: any) {
		return { success: false, error: error.message };
	}
}

export async function confirmPasswordReset(
	token: string,
	password: string,
	passwordConfirm: string,
	collection: AuthCollection
) {
	try {
		await pb.collection(collection).confirmPasswordReset(token, password, passwordConfirm);
		return { success: true };
	} catch (error: any) {
		return { success: false, error: error.message };
	}
}

export async function updateProfile(collection: AuthCollection, recordId: string, data: FormData) {
	try {
		const record = await pb.collection(collection).update(recordId, data);
		if (pb.authStore.token) {
			pb.authStore.save(pb.authStore.token, record);
		}
		user.set(record);
		return { success: true, record };
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

export async function registerTechnician(email: string, password: string, name: string, phone = '') {
	try {
		const record = await pb.collection('technicians').create({
			email,
			emailVisibility: true,
			password,
			passwordConfirm: password,
			name,
			phone,
			role: 'technician',
			active: true
		});
		await login(email, password, 'technicians');
		return { success: true, record };
	} catch (error: any) {
		return { success: false, error: error.message };
	}
}
