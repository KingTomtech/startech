import PocketBase from 'pocketbase';

const POCKETBASE_URL = import.meta.env.PUBLIC_POCKETBASE_URL || 'http://localhost:8090';

export const pb = new PocketBase(POCKETBASE_URL);

// Auto-cancel pending requests when navigating to a new page
pb.autoCancellation(true);

// Optional: Add auth store persistence for SSR
export function loadPocketBaseCookies(cookies: string | undefined) {
	if (cookies) {
		pb.authStore.loadFromCookie(cookies);
	}
}

export function savePocketBaseCookies() {
	return pb.authStore.exportToCookie({ sameSite: 'lax', secure: true, path: '/', maxAge: 60 * 60 * 24 * 7 });
}
