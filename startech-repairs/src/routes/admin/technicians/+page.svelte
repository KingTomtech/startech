<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { pb } from '$lib/pocketbase';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Select from '$lib/components/ui/Select.svelte';
	import { applyAction, enhance } from '$app/forms';

	export let data: any;

	let technicians = data.technicians || [];
	let loading = !data.technicians;
	let unsubscribeRealtime: Array<() => void> = [];

	let techName = '';
	let techEmail = '';
	let techPhone = '';
	let techRole = 'technician';

	onMount(async () => {
		if (loading) await loadData();
		await subscribeToUpdates();
	});

	onDestroy(() => {
		unsubscribeRealtime.forEach((unsubscribe) => unsubscribe());
	});

	async function loadData() {
		loading = true;
		technicians = await pb.collection('technicians').getFullList({ sort: 'name' });
		loading = false;
	}

	async function subscribeToUpdates() {
		const refresh = () => loadData();
		const sub = await pb.collection('technicians').subscribe('*', refresh);
		unsubscribeRealtime.push(sub);
	}
</script>

<svelte:head>
	<title>Technicians | Admin Dashboard</title>
</svelte:head>

<div>
	{#if loading}
		<p class="text-muted">Loading technicians...</p>
	{:else}
		<div class="mt-8 grid gap-6 lg:grid-cols-[380px_1fr]">
			<form class="space-y-4 rounded-lg border border-border bg-white p-5" method="POST" action="?/createTechnician" use:enhance={() => {
				return async ({ result, update }) => {
					if (result.type === 'success') {
						await loadData();
						update({ reset: true });
					} else {
						await applyAction(result);
					}
				};
			}}>
				<h2 class="text-xl font-semibold text-primary">Create staff account</h2>
				<Input label="Name" name="name" bind:value={techName} required />
				<Input label="Email" type="email" name="email" bind:value={techEmail} required />
				<Input label="Phone" type="tel" name="phone" bind:value={techPhone} required />
				<Select label="Role" name="role" bind:value={techRole} options={[
					{ value: 'technician', label: 'Technician' },
					{ value: 'admin', label: 'Admin' }
				]} />
				<Button type="submit">Create account</Button>
			</form>
			<section class="rounded-lg border border-border bg-white p-5">
				<h2 class="text-xl font-semibold text-primary">Staff</h2>
				<div class="mt-4 space-y-3">
					{#each technicians as technician}
						<div class="flex flex-col gap-3 rounded-lg bg-light p-3 md:flex-row md:items-center md:justify-between">
							<div>
								<p class="font-medium text-primary">{technician.name}</p>
								<p class="text-sm text-muted">{technician.email} · {technician.role} · {technician.active ? 'Active' : 'Inactive'}</p>
							</div>
							<form method="POST" action="?/toggleTechnician" use:enhance={() => {
								return async ({ result }) => {
									if (result.type === 'success') await loadData();
								};
							}}>
								<input type="hidden" name="id" value={technician.id} />
								<input type="hidden" name="active" value={(!technician.active).toString()} />
								<Button variant="outline" type="submit">{technician.active ? 'Deactivate' : 'Activate'}</Button>
							</form>
						</div>
					{/each}
				</div>
			</section>
		</div>
	{/if}
</div>
