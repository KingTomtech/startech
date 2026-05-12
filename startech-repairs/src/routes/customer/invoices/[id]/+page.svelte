<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { pb } from '$lib/pocketbase';
	import { formatCurrency, formatDate } from '$lib/utils';

	let invoice: any = null;
	let loading = true;
	let error = '';

	onMount(async () => {
		if (!pb.authStore.isValid || pb.authStore.record?.collectionName !== 'customers') {
			await goto('/login');
			return;
		}

		try {
			invoice = await pb.collection('invoices').getOne($page.params.id, { expand: 'repair,customer' });
		} catch (err: any) {
			error = err.message || 'Invoice not found';
		} finally {
			loading = false;
		}
	});

	function printInvoice() {
		window.print();
	}
</script>

<svelte:head>
	<title>Invoice | Star Tech Phone Repairs</title>
</svelte:head>

<section class="bg-light py-10 md:py-16 print:bg-white">
	<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
		<div class="mb-6 flex items-center justify-between print:hidden">
			<a class="text-sm font-medium text-accent hover:underline" href="/customer/dashboard">Back to dashboard</a>
			<Button variant="outline" onClick={printInvoice}>Print / save PDF</Button>
		</div>

		{#if loading}
			<p class="text-muted">Loading invoice...</p>
		{:else if error}
			<p class="rounded-lg border border-danger/30 bg-danger/10 p-4 text-danger">{error}</p>
		{:else if invoice}
			<article class="rounded-lg border border-border bg-white p-8 shadow-sm print:border-0 print:shadow-none">
				<div class="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-start md:justify-between">
					<div>
						<p class="text-sm font-semibold uppercase text-accent">Star Tech Phone Repairs</p>
						<h1 class="mt-2 text-3xl font-bold text-primary">Invoice</h1>
						<p class="mt-1 text-muted">33 Crimson Blvd, Forrestfield WA 6058</p>
					</div>
					<div class="text-left md:text-right">
						<p class="font-mono text-lg font-bold text-primary">{invoice.invoice_number || invoice.id}</p>
						<p class="text-sm text-muted">{formatDate(invoice.created)}</p>
						<span class="mt-2 inline-block rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent">{invoice.status}</span>
					</div>
				</div>

				<div class="grid gap-6 border-b border-border py-6 md:grid-cols-2">
					<div>
						<h2 class="font-semibold text-primary">Billed to</h2>
						<p class="mt-2 text-muted">{invoice.expand?.customer?.name || pb.authStore.record?.name}</p>
						<p class="text-muted">{invoice.expand?.customer?.email || pb.authStore.record?.email}</p>
						<p class="text-muted">{invoice.expand?.customer?.phone || pb.authStore.record?.phone}</p>
					</div>
					<div>
						<h2 class="font-semibold text-primary">Repair</h2>
						<p class="mt-2 text-muted">{invoice.expand?.repair?.booking_id || invoice.repair || 'Repair record'}</p>
						<p class="text-muted">{invoice.expand?.repair?.issue_type || 'Device repair'}</p>
					</div>
				</div>

				<div class="py-6">
					<div class="flex justify-between py-2 text-muted">
						<span>Subtotal</span>
						<span>{formatCurrency(invoice.subtotal || 0)}</span>
					</div>
					<div class="flex justify-between py-2 text-muted">
						<span>Tax</span>
						<span>{formatCurrency(invoice.tax || 0)}</span>
					</div>
					<div class="mt-4 flex justify-between border-t border-border pt-4 text-xl font-bold text-primary">
						<span>Total</span>
						<span>{formatCurrency(invoice.total || 0)}</span>
					</div>
				</div>
			</article>
		{/if}
	</div>
</section>
