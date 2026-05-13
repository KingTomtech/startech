import PocketBase from 'pocketbase';
import type { Cookies } from '@sveltejs/kit';

const POCKETBASE_URL = import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8090';

export type ServerAuthCollection = 'customers' | 'technicians';

export function createServerPb(cookies?: Cookies) {
	const pb = new PocketBase(POCKETBASE_URL);
	pb.autoCancellation(false);
	if (cookies) {
		pb.authStore.loadFromCookie(cookies.get('pb_auth') ? `pb_auth=${cookies.get('pb_auth')}` : '');
	}
	return pb;
}

export function setAuthCookie(cookies: Cookies, token: string, model: unknown, secure: boolean) {
	cookies.set('pb_auth', JSON.stringify({ token, model }), {
		path: '/',
		httpOnly: false,
		sameSite: 'lax',
		secure,
		maxAge: 60 * 60 * 24 * 30
	});
}

export function clearAuthCookie(cookies: Cookies) {
	cookies.delete('pb_auth', { path: '/' });
}

export function portalPath(record: any) {
	if (record?.collectionName === 'technicians') {
		return record.role === 'admin' ? '/admin/dashboard' : '/technician/dashboard';
	}
	return '/customer/dashboard';
}
