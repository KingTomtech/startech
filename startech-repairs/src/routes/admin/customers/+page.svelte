<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { pb } from '$lib/pocketbase';

	export let data: any;

	let customers = data.customers || [];
	let loading = !data.customers;
	let unsubscribeRealtime: Array<() => void> = [];

	onMount(async () => {
		if (loading) await loadData();
		await subscribeToUpdates();
	});

	onDestroy(() => {
		unsubscribeRealtime.forEach((unsubscribe) => unsubscribe());
	});

	async function loadData() {
		loading = true;
		customers = await pb.collection('customers').getFullList({ sort: '-created' });
		loading = false;
	}

	async function subscribeToUpdates() {
		const refresh = () => loadData();
		const sub = await pb.collection('customers').subscribe('*', refresh);
		unsubscribeRealtime.push(sub);
	}
</script>

<svelte:head>
	<title>Customers | Admin Dashboard</title>
</svelte:head>

<div>
	{#if loading}
		<p class="text-muted">Loading customers...</p>
	{:else}
		<section class="mt-8 rounded-lg border border-border bg-white p-5">
			<h2 class="text-xl font-semibold text-primary">Customers</h2>
			<div class="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
				{#each customers as customer}
					<div class="rounded-lg bg-light p-3">
						<p class="font-medium text-primary">{customer.name}</p>
						<p class="text-sm text-muted">{customer.email}</p>
						<p class="text-sm text-muted">{customer.phone}</p>
					</div>
				{/each}
			</div>
		</section>
	{/if}
</div>
