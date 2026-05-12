import PocketBase from 'pocketbase';
import { browser } from '$app/environment';

const POCKETBASE_URL = import.meta.env.VITE_POCKETBASE_URL || 'http://localhost:8090';

export const pb = new PocketBase(POCKETBASE_URL);

// Auto-cancel pending requests on navigation
pb.autoCancellation(true);

if (browser) {
	pb.authStore.loadFromCookie(document.cookie);

	pb.authStore.onChange(() => {
		document.cookie = pb.authStore.exportToCookie({
			httpOnly: false,
			sameSite: 'Lax',
			secure: location.protocol === 'https:'
		});
	});
}

export default pb;
