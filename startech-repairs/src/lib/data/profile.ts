import { pb } from '$lib/pocketbase';

export function getAvatarUrl(record: any, size = '160x160') {
	if (!record?.avatar) return '';
	return pb.files.getURL(record, record.avatar, { thumb: size });
}

export function initials(name = '') {
	const letters = name
		.split(' ')
		.filter(Boolean)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase())
		.join('');

	return letters || 'ST';
}
