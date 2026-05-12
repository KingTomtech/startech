import { pb } from '$lib/pocketbase';
import { user, isAuthenticated } from '$lib/stores';

export async function loadUser() {
	if (pb.authStore.isValid && pb.authStore.record) {
		user.set(pb.authStore.record);
		isAuthenticated.set(true);
		return pb.authStore.record;
	}
	return null;
}

export async function login(email: string, password: string) {
	try {
		const authData = await pb.collection('users').authWithPassword(email, password);
		user.set(authData.record);
		isAuthenticated.set(true);
		return { success: true };
	} catch (error: any) {
		return { success: false, error: error.message };
	}
}

export async function logout() {
	pb.authStore.clear();
	user.set(null);
	isAuthenticated.set(false);
}

export async function register(email: string, password: string, name: string) {
	try {
		const record = await pb.collection('users').create({
			email,
			password,
			passwordConfirm: password,
			name
		});
		return { success: true, record };
	} catch (error: any) {
		return { success: false, error: error.message };
	}
}
