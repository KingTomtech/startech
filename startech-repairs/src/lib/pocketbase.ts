import PocketBase from 'pocketbase';

const POCKETBASE_URL = import.meta.env.VITE_POCKETBASE_URL || 'http://localhost:8090';

export const pb = new PocketBase(POCKETBASE_URL);

// Auto-cancel pending requests on navigation
pb.autoCancellation(true);

// Subscribe to auth changes
pb.authStore.onChange((token, record) => {
	console.log('Auth changed:', token ? 'logged in' : 'logged out');
});

export default pb;
