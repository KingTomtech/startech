<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { pb } from '$lib/pocketbase';
	import { formatDate } from '$lib/utils';
	import Button from '$lib/components/ui/Button.svelte';
	import Select from '$lib/components/ui/Select.svelte';
	import Textarea from '$lib/components/ui/Textarea.svelte';
	import { repairStatuses } from '$lib/data/repair';

	export let data: any;

	let repairs = data.repairs || [];
	let loading = !data.repairs;
	let unsubscribeRealtime: Array<() => void> = [];

	let selectedRepair = '';
	let repairStatus = 'Diagnosing';
	let repairNotes = '';

	onMount(async () => {
		if (loading) await loadData();
		await subscribeToUpdates();
	});

	onDestroy(() => {
		unsubscribeRealtime.forEach((unsubscribe) => unsubscribe());
	});

	async function loadData() {
		loading = true;
		repairs = await pb.collection('repairs').getFullList({ sort: '-created', expand: 'customer,technician,device' });
		loading = false;
	}

	async function subscribeToUpdates() {
		const refresh = () => loadData();
		const sub = await pb.collection('repairs').subscribe('*', refresh);
		unsubscribeRealtime.push(sub);
	}
</script>

<svelte:head>
	<title>Repairs | Admin Dashboard</title>
</svelte:head>

<div>
	{#if loading}
		<p class="text-muted">Loading repairs...</p>
	{:else}
		<div class="mt-8 grid gap-6 lg:grid-cols-[380px_1fr]">
			<form class="space-y-4 rounded-lg border border-border bg-white p-5" method="POST" action="?/updateRepair">
				<h2 class="text-xl font-semibold text-primary">Update repair</h2>
				
				<div class="space-y-2">
					<label for="repairId" class="block text-sm font-medium text-primary">Repair</label>
					<select id="repairId" name="repairId" class="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-primary shadow-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" bind:value={selectedRepair}>
						{#each repairs as repair}
							<option value={repair.id}>{repair.booking_id || repair.id} - {repair.issue_type}</option>
						{/each}
					</select>
				</div>

				<div class="space-y-2">
					<label for="status" class="block text-sm font-medium text-primary">Status</label>
					<select id="status" name="status" class="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-primary shadow-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" bind:value={repairStatus}>
						{#each repairStatuses as status}
							<option value={status}>{status}</option>
						{/each}
					</select>
				</div>

				<div class="space-y-2">
					<label for="notes" class="block text-sm font-medium text-primary">Admin notes</label>
					<textarea id="notes" name="notes" rows="4" class="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-primary shadow-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" bind:value={repairNotes}></textarea>
				</div>

				<Button type="submit">Save repair</Button>
			</form>
			<section class="rounded-lg border border-border bg-white p-5">
				<h2 class="text-xl font-semibold text-primary">Repair queue</h2>
				<div class="mt-4 grid gap-3 md:grid-cols-2">
					{#each repairs as repair}
						<div class="rounded-lg bg-light p-3">
							<p class="font-medium text-primary">{repair.booking_id || repair.id}</p>
							<p class="text-sm text-muted">{repair.issue_type} · {repair.status} · {formatDate(repair.created)}</p>
						</div>
					{/each}
				</div>
			</section>
		</div>
	{/if}
</div>
