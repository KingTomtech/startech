<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { pb } from '$lib/pocketbase';
	import { formatCurrency } from '$lib/utils';
	import Button from '$lib/components/ui/Button.svelte';

	export let data: any;

	// Initial data from server
	let repairs = data.repairs || [];
	let invoices = data.invoices || [];
	let inventory = data.inventory || [];
	let requests = data.requests || [];

	let loading = !data.repairs;
	let unsubscribeRealtime: Array<() => void> = [];

	$: revenue = invoices
		.filter((invoice: any) => invoice.status === 'Paid')
		.reduce((sum: number, invoice: any) => sum + Number(invoice.total || 0), 0);
	$: activeRepairs = repairs.filter((repair: any) => !['Completed', 'Cancelled'].includes(repair.status)).length;
	$: pendingRequests = requests.filter((request: any) => request.status === 'Pending').length;
	$: lowStock = inventory.filter((item: any) => Number(item.quantity || 0) <= Number(item.low_stock_threshold || 0)).length;

	onMount(async () => {
		if (loading) await loadData();
		await subscribeToUpdates();
	});

	onDestroy(() => {
		unsubscribeRealtime.forEach((unsubscribe) => unsubscribe());
	});

	async function loadData() {
		loading = true;
		[repairs, invoices, inventory, requests] = await Promise.all([
			pb.collection('repairs').getFullList({ sort: '-created' }),
			pb.collection('invoices').getFullList({ sort: '-created' }),
			pb.collection('inventory_parts').getFullList({ sort: 'name' }),
			pb.collection('technician_requests').getFullList({ sort: '-created' }).catch(() => [])
		]);
		loading = false;
	}

	async function subscribeToUpdates() {
		const refresh = () => loadData();
		const subscriptions = await Promise.allSettled([
			pb.collection('repairs').subscribe('*', refresh),
			pb.collection('invoices').subscribe('*', refresh),
			pb.collection('inventory_parts').subscribe('*', refresh),
			pb.collection('technician_requests').subscribe('*', refresh)
		]);

		unsubscribeRealtime = subscriptions
			.filter((result): result is PromiseFulfilledResult<() => void> => result.status === 'fulfilled')
			.map((result) => result.value);
	}

	async function approveRequest(request: any) {
		// Example POST replacement for request approval
		const formData = new FormData();
		formData.append('id', request.id);
		formData.append('name', request.name);
		formData.append('email', request.email);
		formData.append('phone', request.phone);

		const res = await fetch('?/approveRequest', {
			method: 'POST',
			body: formData
		});
		if (res.ok) {
			await loadData();
		}
	}

	async function rejectRequest(request: any) {
		const formData = new FormData();
		formData.append('id', request.id);

		const res = await fetch('?/rejectRequest', {
			method: 'POST',
			body: formData
		});
		if (res.ok) {
			await loadData();
		}
	}
</script>

<svelte:head>
	<title>Admin Dashboard Overview | Star Tech</title>
</svelte:head>

<section>
	<p class="text-muted">Manage repair operations, customers, technicians, invoices, and pricing.</p>

	{#if loading}
		<p class="mt-10 text-muted">Loading overview...</p>
	{:else}
		<div class="mt-8 grid gap-4 md:grid-cols-4">
			{#each [
				['Active repairs', activeRepairs],
				['Paid revenue', formatCurrency(revenue)],
				['Pending requests', pendingRequests],
				['Low stock items', lowStock]
			] as metric}
				<div class="rounded-lg border border-border bg-white p-5">
					<p class="text-sm text-muted">{metric[0]}</p>
					<p class="mt-2 text-3xl font-bold text-primary">{metric[1]}</p>
				</div>
			{/each}
		</div>
		<div class="mt-8 grid gap-6 lg:grid-cols-2">
			<section class="rounded-lg border border-border bg-white p-5">
				<h2 class="text-xl font-semibold text-primary">Recent repairs</h2>
				<div class="mt-4 space-y-3">
					{#each repairs.slice(0, 6) as repair}
						<div class="rounded-lg bg-light p-3">
							<p class="font-medium text-primary">{repair.booking_id || repair.id}</p>
							<p class="text-sm text-muted">{repair.issue_type} · {repair.status}</p>
						</div>
					{/each}
				</div>
			</section>
			<section class="rounded-lg border border-border bg-white p-5">
				<h2 class="text-xl font-semibold text-primary">Technician requests</h2>
				<div class="mt-4 space-y-3">
					{#each requests.slice(0, 6) as request}
						<div class="rounded-lg bg-light p-4">
							<div class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
								<div>
									<p class="font-medium text-primary">{request.name}</p>
									<p class="text-sm text-muted">{request.email} · {request.status}</p>
								</div>
								{#if request.status === 'Pending'}
									<div class="flex gap-2">
										<Button onClick={() => approveRequest(request)}>Approve</Button>
										<Button variant="outline" onClick={() => rejectRequest(request)}>Reject</Button>
									</div>
								{/if}
							</div>
						</div>
					{:else}
						<p class="text-sm text-muted">No requests yet.</p>
					{/each}
				</div>
			</section>
		</div>
	{/if}
</section>
