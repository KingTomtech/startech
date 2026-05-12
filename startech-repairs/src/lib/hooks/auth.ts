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

export function getPortalPath(record = pb.authStore.record) {
	if (record?.collectionName === 'technicians') {
		return record.role === 'admin' ? '/admin/dashboard' : '/technician/dashboard';
	}

	return '/customer/dashboard';
}

export async function login(email: string, password: string) {
	const collections: AuthCollection[] = ['customers', 'technicians'];
	let lastError = 'Unable to log in';

	for (const collection of collections) {
		try {
			const authData = await pb.collection(collection).authWithPassword(email, password);
			user.set(authData.record);
			isAuthenticated.set(true);
			return { success: true, record: authData.record, portal: getPortalPath(authData.record) };
		} catch (error: any) {
			lastError = error.message;
		}
	}

	return { success: false, error: lastError };
}

export async function requestPasswordReset(email: string, collection?: AuthCollection) {
	try {
		if (collection) {
			await pb.collection(collection).requestPasswordReset(email);
			return { success: true };
		}

		await Promise.allSettled(
			(['customers', 'technicians'] as AuthCollection[]).map((name) =>
				pb.collection(name).requestPasswordReset(email)
			)
		);
		return { success: true };
	} catch (error: any) {
		return { success: false, error: error.message };
	}
}

export async function confirmPasswordReset(
	token: string,
	password: string,
	passwordConfirm: string,
	collection?: AuthCollection
) {
	try {
		if (collection) {
			await pb.collection(collection).confirmPasswordReset(token, password, passwordConfirm);
			return { success: true };
		}

		const attempts = await Promise.allSettled(
			(['customers', 'technicians'] as AuthCollection[]).map((name) =>
				pb.collection(name).confirmPasswordReset(token, password, passwordConfirm)
			)
		);
		const fulfilled = attempts.find((item) => item.status === 'fulfilled');
		if (!fulfilled) {
			const rejected = attempts.find((item) => item.status === 'rejected') as PromiseRejectedResult | undefined;
			throw rejected?.reason || new Error('Unable to reset password');
		}
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
		await login(email, password);
		return { success: true, record };
	} catch (error: any) {
		return { success: false, error: error.message };
	}
}

export async function requestTechnicianAccess(
	name: string,
	email: string,
	phone: string,
	experience: string
) {
	try {
		const record = await pb.collection('technician_requests').create({
			name,
			email,
			phone,
			experience,
			status: 'Pending'
		});
		return { success: true, record };
	} catch (error: any) {
		return { success: false, error: error.message };
	}
}
