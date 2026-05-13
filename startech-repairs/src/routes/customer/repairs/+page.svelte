<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { pb } from '$lib/pocketbase';
	import { formatDate } from '$lib/utils';
	import Button from '$lib/components/ui/Button.svelte';

	export let data: any;

	let repairs = data.repairs || [];
	let loading = !data.repairs;
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
		const customerId = pb.authStore.record?.id;
		if (customerId) {
			repairs = await pb.collection('repairs').getFullList({ filter: pb.filter('customer = {:customer}', { customer: customerId }), sort: '-created' });
		}
		loading = false;
	}

	async function subscribeToUpdates() {
		const customerId = pb.authStore.record?.id;
		if (!customerId) return;

		const refreshIfMine = async (event: any) => {
			if (event.record?.customer === customerId) {
				await loadData();
			}
		};

		const sub = await pb.collection('repairs').subscribe('*', refreshIfMine);
		unsubscribeRealtime.push(sub);
	}
</script>

<svelte:head>
	<title>My Repairs | Customer Dashboard</title>
</svelte:head>

<section class="rounded-lg border border-border bg-white">
	<div class="border-b border-border p-5">
		<h2 class="text-xl font-semibold text-primary">Repair history</h2>
	</div>
	<div class="divide-y divide-border">
		{#if loading}
			<p class="p-5 text-muted">Loading your records...</p>
		{:else}
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
		{/if}
	</div>
</section>
