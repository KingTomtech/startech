import type { Handle } from '@sveltejs/kit';
import { createServerPb } from '$lib/server/pocketbase';

export const handle: Handle = async ({ event, resolve }) => {
	const pb = createServerPb(event.cookies);
	event.locals.user = pb.authStore.isValid ? (pb.authStore.record as any) : null;
	return resolve(event);
};
