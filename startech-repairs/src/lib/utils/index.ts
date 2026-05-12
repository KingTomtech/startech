export function formatDate(date: string | Date): string {
	return new Date(date).toLocaleDateString('en-AU', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}

export function formatDateTime(date: string | Date): string {
	return new Date(date).toLocaleString('en-AU', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
}

export function formatCurrency(amount: number): string {
	return new Intl.NumberFormat('en-AU', {
		style: 'currency',
		currency: 'AUD'
	}).format(amount);
}

export function generateBookingId(): string {
	return 'ST-' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export function cn(...classes: (string | undefined | null | false)[]) {
	return classes.filter(Boolean).join(' ');
}
