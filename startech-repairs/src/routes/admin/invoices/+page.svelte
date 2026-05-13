<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { pb } from '$lib/pocketbase';
	import { formatCurrency, formatDate } from '$lib/utils';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Select from '$lib/components/ui/Select.svelte';
	import { applyAction, enhance } from '$app/forms';

	export let data: any;

	let invoices = data.invoices || [];
	let repairs = data.repairs || [];
	let loading = !data.invoices;
	let unsubscribeRealtime: Array<() => void> = [];

	let invoiceRepair = '';
	let invoiceSubtotal = '';
	let invoiceTax = '';
	let invoiceStatus = 'Pending';

	onMount(async () => {
		if (loading) await loadData();
		await subscribeToUpdates();
	});

	onDestroy(() => {
		unsubscribeRealtime.forEach((unsubscribe) => unsubscribe());
	});

	async function loadData() {
		loading = true;
		[invoices, repairs] = await Promise.all([
			pb.collection('invoices').getFullList({ sort: '-created', expand: 'customer,repair' }),
			pb.collection('repairs').getFullList({ sort: '-created', expand: 'customer' })
		]);
		loading = false;
	}

	async function subscribeToUpdates() {
		const refresh = () => loadData();
		const subscriptions = await Promise.allSettled([
			pb.collection('invoices').subscribe('*', refresh),
			pb.collection('repairs').subscribe('*', refresh)
		]);

		unsubscribeRealtime = subscriptions
			.filter((result): result is PromiseFulfilledResult<() => void> => result.status === 'fulfilled')
			.map((result) => result.value);
	}
</script>

<svelte:head>
	<title>Invoices | Admin Dashboard</title>
</svelte:head>

<div>
	{#if loading}
		<p class="text-muted">Loading invoices...</p>
	{:else}
		<div class="mt-8 grid gap-6 lg:grid-cols-[380px_1fr]">
			<form class="space-y-4 rounded-lg border border-border bg-white p-5" method="POST" action="?/createInvoice" use:enhance={() => {
				return async ({ result, update }) => {
					if (result.type === 'success') {
						await loadData();
						update({ reset: true });
					} else {
						await applyAction(result);
					}
				};
			}}>
				<h2 class="text-xl font-semibold text-primary">Create invoice</h2>
				<Select label="Repair" name="repairId" bind:value={invoiceRepair} options={repairs.map((repair: any) => ({ value: repair.id, label: `${repair.booking_id || repair.id} - ${repair.issue_type}` }))} />
				<Input label="Subtotal" name="subtotal" bind:value={invoiceSubtotal} type="number" step="0.01" />
				<Input label="Tax" name="tax" bind:value={invoiceTax} type="number" step="0.01" />
				<Select label="Status" name="status" bind:value={invoiceStatus} options={[
					{ value: 'Pending', label: 'Pending' },
					{ value: 'Paid', label: 'Paid' },
					{ value: 'Overdue', label: 'Overdue' }
				]} />
				<Button type="submit">Create invoice</Button>
			</form>
			
			<section class="rounded-lg border border-border bg-white p-5">
				<h2 class="text-xl font-semibold text-primary">Invoices</h2>
				<div class="mt-4 space-y-3">
					{#each invoices as invoice}
						<div class="rounded-lg bg-light p-3">
							<div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
								<div>
									<p class="font-medium text-primary">{invoice.invoice_number || invoice.id}</p>
									<p class="text-sm text-muted">{formatCurrency(invoice.total || 0)} · {formatDate(invoice.created)}</p>
								</div>
								<form method="POST" action="?/updateInvoiceStatus" use:enhance={() => {
									return async ({ result }) => {
										if (result.type === 'success') await loadData();
									};
								}}>
									<input type="hidden" name="id" value={invoice.id} />
									<select class="rounded border border-border px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" name="status" value={invoice.status} on:change={(e) => e.currentTarget.form?.requestSubmit()}>
										<option>Pending</option>
										<option>Paid</option>
										<option>Overdue</option>
									</select>
								</form>
							</div>
						</div>
					{/each}
				</div>
			</section>
		</div>
	{/if}
</div>
