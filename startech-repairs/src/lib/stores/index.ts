import { writable } from 'svelte/store';
import type { RecordModel } from 'pocketbase';

export const user = writable<RecordModel | null>(null);
export const isAuthenticated = writable<boolean>(false);

// Repair status store for realtime updates
export const currentRepair = writable<RecordModel | null>(null);

// Notification store
export const notifications = writable<Array<{
	id: string;
	type: 'success' | 'error' | 'warning' | 'info';
	message: string;
}>>([]);

export function addNotification(type: 'success' | 'error' | 'warning' | 'info', message: string) {
	const id = Math.random().toString(36).substring(7);
	notifications.update(n => [...n, { id, type, message }]);
	
	// Auto-remove after 5 seconds
	setTimeout(() => {
		notifications.update(n => n.filter(notification => notification.id !== id));
	}, 5000);
}
