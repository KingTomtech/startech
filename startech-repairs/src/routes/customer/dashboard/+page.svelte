<script lang="ts">
	import { goto } from '$app/navigation';
	import { onDestroy, onMount } from 'svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { logout } from '$lib/hooks/auth';
	import { pb } from '$lib/pocketbase';
	import { formatCurrency, formatDate } from '$lib/utils';

	let repairs: any[] = [];
	let bookings: any[] = [];
	let invoices: any[] = [];
	let messages: any[] = [];
	let loading = true;
	let unsubscribeRealtime: Array<() => void> = [];

	onMount(async () => {
		if (!pb.authStore.isValid || pb.authStore.record?.collectionName !== 'customers') {
			await goto('/login');
			return;
		}

		await loadData();
		await subscribeToUpdates();
	});

	onDestroy(() => {
		unsubscribeRealtime.forEach((unsubscribe) => unsubscribe());
	});

	async function loadData(showSpinner = true) {
		if (showSpinner) loading = true;
		const customerId = pb.authStore.record?.id;
		const filter = pb.filter('customer = {:customer}', { customer: customerId });
		[repairs, bookings, invoices, messages] = await Promise.all([
			pb.collection('repairs').getFullList({ filter, sort: '-created' }),
			pb.collection('bookings').getFullList({ filter, sort: '-created' }),
			pb.collection('invoices').getFullList({ filter, sort: '-created' }),
			pb.collection('repair_messages').getFullList({ filter, sort: '-created' }).catch(() => [])
		]);
		loading = false;
	}

	async function subscribeToUpdates() {
		const customerId = pb.authStore.record?.id;
		if (!customerId) return;

		const refreshIfMine = async (event: any) => {
			if (event.record?.customer === customerId) {
				await loadData(false);
			}
		};

		const subscriptions = await Promise.allSettled([
			pb.collection('repairs').subscribe('*', refreshIfMine),
			pb.collection('bookings').subscribe('*', refreshIfMine),
			pb.collection('invoices').subscribe('*', refreshIfMine),
			pb.collection('repair_messages').subscribe('*', refreshIfMine)
		]);

		unsubscribeRealtime = subscriptions
			.filter((result): result is PromiseFulfilledResult<() => void> => result.status === 'fulfilled')
			.map((result) => result.value);
	}

	async function signOut() {
		logout();
		await goto('/');
	}
</script>

<svelte:head>
	<title>Customer Dashboard | Star Tech Phone Repairs</title>
</svelte:head>

<section class="bg-light py-10 md:py-16">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
			<div>
				<h1 class="text-4xl font-bold text-primary">Your repairs</h1>
				<p class="mt-2 text-muted">Tracking IDs, repair records, messages, bookings, and invoices saved to your account.</p>
			</div>
			<div class="flex flex-wrap gap-3">
				<a class="inline-flex items-center justify-center rounded-lg border-2 border-primary px-4 py-2 font-medium text-primary transition-colors hover:bg-primary hover:text-white" href="/customer/settings">Settings</a>
				<Button variant="outline" onClick={signOut}>Logout</Button>
			</div>
		</div>

		{#if loading}
			<p class="mt-10 text-muted">Loading your records...</p>
		{:else}
			<div class="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
				<section class="rounded-lg border border-border bg-white">
					<div class="border-b border-border p-5">
						<h2 class="text-xl font-semibold text-primary">Repair history</h2>
					</div>
					<div class="divide-y divide-border">
						{#each repairs as repair}
							<article class="p-5">
								<div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
									<div>
										<p class="font-semibold text-primary">{repair.booking_id || repair.id}</p>
										<p class="text-sm text-muted">{repair.issue_type} · {formatDate(repair.created)}</p>
									</div>
									<span class="rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent">{repair.status}</span>
								</div>
								{#if repair.notes}
									<p class="mt-3 whitespace-pre-line text-sm text-muted">{repair.notes}</p>
								{/if}
								<a class="mt-3 inline-block text-sm font-medium text-accent hover:underline" href={`/track-repair?booking=${repair.booking_id}`}>Track this repair</a>
							</article>
						{:else}
							<p class="p-5 text-muted">No repairs saved yet.</p>
						{/each}
					</div>
				</section>

				<div class="space-y-6">
					<section class="rounded-lg border border-border bg-white p-5">
						<h2 class="text-xl font-semibold text-primary">Bookings</h2>
						<div class="mt-4 space-y-3">
							{#each bookings as booking}
								<div class="rounded-lg bg-light p-3 text-sm">
									<p class="font-medium text-primary">{booking.device}</p>
									<p class="text-muted">{booking.issue} · {booking.status}</p>
								</div>
							{:else}
								<p class="text-sm text-muted">No bookings yet.</p>
							{/each}
						</div>
					</section>

					<section class="rounded-lg border border-border bg-white p-5">
						<div class="flex items-center justify-between gap-3">
							<h2 class="text-xl font-semibold text-primary">Invoices</h2>
							<a class="text-sm font-semibold text-accent hover:underline" href="/customer/invoices">View all</a>
						</div>
						<div class="mt-4 space-y-3">
							{#each invoices as invoice}
								<div class="rounded-lg bg-light p-3 text-sm">
									<p class="font-medium text-primary">{invoice.invoice_number || invoice.id}</p>
									<p class="text-muted">{formatCurrency(invoice.total || 0)} · {invoice.status}</p>
									<a class="mt-2 inline-block font-medium text-accent hover:underline" href={`/customer/invoices/${invoice.id}`}>View invoice</a>
								</div>
							{:else}
								<p class="text-sm text-muted">No invoices yet.</p>
							{/each}
						</div>
					</section>

					<section class="rounded-lg border border-border bg-white p-5">
						<h2 class="text-xl font-semibold text-primary">Messages</h2>
						<div class="mt-4 space-y-3">
							{#each messages as message}
								<p class="rounded-lg bg-light p-3 text-sm text-muted">{message.message}</p>
							{:else}
								<p class="text-sm text-muted">No messages yet.</p>
							{/each}
						</div>
					</section>
				</div>
			</div>
		{/if}
	</div>
</section>
