<script lang="ts">
	import { goto } from '$app/navigation';
	import { onDestroy, onMount } from 'svelte';
	import { pb } from '$lib/pocketbase';
	import { formatCurrency, formatDate } from '$lib/utils';

	let invoices: any[] = [];
	let loading = true;
	let error = '';
	let unsubscribe: (() => void) | undefined;

	onMount(async () => {
		if (!pb.authStore.isValid || pb.authStore.record?.collectionName !== 'customers') {
			await goto('/login');
			return;
		}

		await loadInvoices();
		unsubscribe = await pb.collection('invoices').subscribe('*', async (event) => {
			if (event.record?.customer === pb.authStore.record?.id) {
				await loadInvoices(false);
			}
		}).catch(() => undefined);
	});

	onDestroy(() => {
		unsubscribe?.();
	});

	async function loadInvoices(showSpinner = true) {
		if (showSpinner) loading = true;
		error = '';
		try {
			const filter = pb.filter('customer = {:customer}', { customer: pb.authStore.record?.id });
			invoices = await pb.collection('invoices').getFullList({ filter, sort: '-created', expand: 'repair' });
		} catch (err: any) {
			error = err.message || 'Invoices could not be loaded.';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Your Invoices | Star Tech Phone Repairs</title>
	<meta name="description" content="View repair invoices saved to your Star Tech Phone Repairs account." />
</svelte:head>

<section class="bg-light py-10 md:py-16">
	<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
		<a class="font-semibold text-accent hover:underline" href="/customer/dashboard">Back to dashboard</a>
		<h1 class="mt-8 text-4xl font-bold text-primary">Your invoices</h1>
		<p class="mt-3 text-muted">Invoices are saved here as technicians create or update them.</p>

		{#if loading}
			<p class="mt-10 text-muted">Loading invoices...</p>
		{:else if error}
			<p class="mt-10 rounded-lg border border-danger/30 bg-danger/10 p-4 text-danger">{error}</p>
		{:else}
			<div class="mt-10 grid gap-4">
				{#each invoices as invoice}
					<a class="rounded-lg border border-border bg-white p-5 shadow-sm transition hover:border-accent" href={`/customer/invoices/${invoice.id}`}>
						<div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
							<div>
								<p class="font-semibold text-primary">{invoice.invoice_number || invoice.id}</p>
								<p class="mt-1 text-sm text-muted">{invoice.expand?.repair?.booking_id || 'Repair invoice'} - {formatDate(invoice.created)}</p>
							</div>
							<div class="md:text-right">
								<p class="text-lg font-bold text-primary">{formatCurrency(invoice.total || 0)}</p>
								<p class="text-sm font-semibold text-accent">{invoice.status}</p>
							</div>
						</div>
					</a>
				{:else}
					<p class="rounded-lg border border-border bg-white p-5 text-muted">No invoices have been saved to this account yet.</p>
				{/each}
			</div>
		{/if}
	</div>
</section>
