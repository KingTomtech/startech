<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { pb } from '$lib/pocketbase';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import { applyAction, enhance } from '$app/forms';

	export let data: any;

	let inventory = data.inventory || [];
	let devices = data.devices || [];
	let loading = !data.inventory;
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
		[inventory, devices] = await Promise.all([
			pb.collection('inventory_parts').getFullList({ sort: 'name' }),
			pb.collection('devices').getFullList({ sort: 'brand,model' })
		]);
		loading = false;
	}

	async function subscribeToUpdates() {
		const refresh = () => loadData();
		const subscriptions = await Promise.allSettled([
			pb.collection('inventory_parts').subscribe('*', refresh),
			pb.collection('devices').subscribe('*', refresh)
		]);

		unsubscribeRealtime = subscriptions
			.filter((result): result is PromiseFulfilledResult<() => void> => result.status === 'fulfilled')
			.map((result) => result.value);
	}
</script>

<svelte:head>
	<title>Inventory | Admin Dashboard</title>
</svelte:head>

<div>
	{#if loading}
		<p class="text-muted">Loading inventory...</p>
	{:else}
		<div class="mt-8 grid gap-6 lg:grid-cols-[380px_1fr]">
			<form class="space-y-4 rounded-lg border border-border bg-white p-5" method="POST" action="?/savePrice" use:enhance={() => {
				return async ({ result, update }) => {
					if (result.type === 'success') {
						await loadData();
						update({ reset: true });
					} else {
						await applyAction(result);
					}
				};
			}}>
				<h2 class="text-xl font-semibold text-primary">Add price item</h2>
				<Input label="Name" name="name" required />
				<Input label="SKU" name="sku" required />
				<Input label="Sell price" name="amount" required type="number" step="0.01" />
				<Button type="submit">Add item</Button>
			</form>

			<section class="rounded-lg border border-border bg-white p-5">
				<h2 class="text-xl font-semibold text-primary">Prices and devices</h2>
				<p class="mt-1 text-sm text-muted">{devices.length} supported devices · {inventory.length} inventory price items</p>
				<div class="mt-4 grid gap-3 md:grid-cols-2">
					{#each inventory as item}
						<div class="rounded-lg bg-light p-3">
							<p class="font-medium text-primary">{item.name}</p>
							<p class="text-xs text-muted">{item.sku}</p>
							<form method="POST" action="?/updatePrice" use:enhance={() => {
								return async ({ result, update }) => {
									if (result.type === 'success') await loadData();
								};
							}}>
								<input type="hidden" name="id" value={item.id} />
								<input 
									class="mt-2 w-28 rounded border border-border px-2 py-1 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" 
									name="price"
									value={item.sell_price} 
								/>
								<button class="ml-2 text-xs font-medium text-accent hover:underline" type="submit">Save</button>
							</form>
						</div>
					{/each}
				</div>
			</section>
		</div>
	{/if}
</div>
