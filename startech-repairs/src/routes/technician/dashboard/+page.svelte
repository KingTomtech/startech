<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Select from '$lib/components/ui/Select.svelte';
	import Textarea from '$lib/components/ui/Textarea.svelte';
	import { repairStatuses } from '$lib/data/repair';
	import { logout } from '$lib/hooks/auth';
	import { pb } from '$lib/pocketbase';
	import { addNotification } from '$lib/stores';
	import { formatCurrency, formatDate } from '$lib/utils';

	let repairs: any[] = [];
	let inventory: any[] = [];
	let devices: any[] = [];
	let activeTab: 'repairs' | 'prices' | 'devices' = 'repairs';
	let loading = true;

	let selectedRepair = '';
	let status = 'Diagnosing';
	let notes = '';
	let message = '';

	let priceName = '';
	let priceSku = '';
	let sellPrice = '';

	let deviceBrand = '';
	let deviceModel = '';
	let deviceVariant = '';
	let deviceYear = '';

	onMount(async () => {
		if (!pb.authStore.isValid || pb.authStore.record?.collectionName !== 'technicians') {
			await goto('/login');
			return;
		}

		await loadData();
	});

	async function loadData() {
		loading = true;
		[repairs, inventory, devices] = await Promise.all([
			pb.collection('repairs').getFullList({ sort: '-created', expand: 'customer,technician,device' }),
			pb.collection('inventory_parts').getFullList({ sort: 'name' }),
			pb.collection('devices').getFullList({ sort: 'brand,model' })
		]);
		loading = false;
	}

	async function updateRepair() {
		if (!selectedRepair) return;
		const repair = repairs.find((item) => item.id === selectedRepair);
		const updatedNotes = [repair?.notes, notes].filter(Boolean).join('\n\n');
		await pb.collection('repairs').update(selectedRepair, {
			status,
			notes: updatedNotes,
			technician: pb.authStore.record?.id,
			completed_at: status === 'Completed' ? new Date().toISOString() : null
		});

		await pb.collection('repair_status_logs').create({
			repair: selectedRepair,
			status,
			changed_by: pb.authStore.record?.id,
			notes
		}).catch(() => undefined);

		if (message && repair?.customer) {
			await pb.collection('repair_messages').create({
				repair: selectedRepair,
				customer: repair.customer,
				sender: repair.customer,
				message
			}).catch(() => undefined);
			await pb.collection('notifications').create({
				customer: repair.customer,
				repair: selectedRepair,
				title: `Repair update: ${status}`,
				message,
				channel: 'Email'
			}).catch(() => undefined);
		}

		addNotification('success', 'Repair updated. Notification record saved for email/SMS workflow.');
		notes = '';
		message = '';
		await loadData();
	}

	async function savePrice() {
		await pb.collection('inventory_parts').create({
			name: priceName,
			sku: priceSku,
			quantity: 1,
			sell_price: Number(sellPrice),
			low_stock_threshold: 1,
			archived: false
		});
		priceName = '';
		priceSku = '';
		sellPrice = '';
		addNotification('success', 'Price item saved');
		await loadData();
	}

	async function updatePrice(item: any, value: string) {
		await pb.collection('inventory_parts').update(item.id, { sell_price: Number(value) });
		addNotification('success', 'Price updated');
		await loadData();
	}

	async function saveDevice() {
		await pb.collection('devices').create({
			brand: deviceBrand,
			model: deviceModel,
			variant: deviceVariant,
			year: deviceYear ? Number(deviceYear) : null,
			repairable: true
		});
		deviceBrand = '';
		deviceModel = '';
		deviceVariant = '';
		deviceYear = '';
		addNotification('success', 'Device added');
		await loadData();
	}

	async function signOut() {
		logout();
		await goto('/');
	}
</script>

<svelte:head>
	<title>Technician Dashboard | Star Tech Phone Repairs</title>
</svelte:head>

<section class="bg-light py-10 md:py-16">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
			<div>
				<h1 class="text-4xl font-bold text-primary">Technician dashboard</h1>
				<p class="mt-2 text-muted">Update repairs, notify customers, manage prices, and add supported devices.</p>
			</div>
			<div class="flex flex-wrap gap-3">
				<a class="inline-flex items-center justify-center rounded-lg border-2 border-primary px-4 py-2 font-medium text-primary transition-colors hover:bg-primary hover:text-white" href="/technician/settings">Settings</a>
				<Button variant="outline" onClick={signOut}>Logout</Button>
			</div>
		</div>

		<div class="mt-8 flex flex-wrap gap-3">
			{#each [['repairs', 'Repairs'], ['prices', 'Prices'], ['devices', 'Devices']] as tab}
				<button class="rounded-lg px-4 py-2 font-medium {activeTab === tab[0] ? 'bg-primary text-white' : 'bg-white text-primary'}" on:click={() => activeTab = tab[0] as any}>{tab[1]}</button>
			{/each}
		</div>

		{#if loading}
			<p class="mt-10 text-muted">Loading technician tools...</p>
		{:else if activeTab === 'repairs'}
			<div class="mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
				<form class="rounded-lg border border-border bg-white p-5 space-y-4" on:submit|preventDefault={updateRepair}>
					<h2 class="text-xl font-semibold text-primary">Update repair</h2>
					<Select label="Repair" bind:value={selectedRepair} options={repairs.map((repair) => ({ value: repair.id, label: `${repair.booking_id || repair.id} - ${repair.issue_type}` }))} />
					<Select label="Status" bind:value={status} options={repairStatuses.map((item) => ({ value: item, label: item }))} />
					<Textarea label="Technician notes" bind:value={notes} />
					<Textarea label="Customer message / email note" bind:value={message} />
					<Button type="submit">Save update</Button>
				</form>

				<section class="rounded-lg border border-border bg-white">
					<div class="border-b border-border p-5"><h2 class="text-xl font-semibold text-primary">Repair queue</h2></div>
					<div class="divide-y divide-border">
						{#each repairs as repair}
							<article class="p-5">
								<div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
									<div>
										<p class="font-semibold text-primary">{repair.booking_id || repair.id}</p>
										<p class="text-sm text-muted">{repair.issue_type} · {formatDate(repair.created)}</p>
									</div>
									<span class="rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent">{repair.status}</span>
								</div>
								<p class="mt-3 whitespace-pre-line text-sm text-muted">{repair.notes}</p>
							</article>
						{/each}
					</div>
				</section>
			</div>
		{:else if activeTab === 'prices'}
			<div class="mt-8 grid gap-6 lg:grid-cols-[380px_1fr]">
				<form class="rounded-lg border border-border bg-white p-5 space-y-4" on:submit|preventDefault={savePrice}>
					<h2 class="text-xl font-semibold text-primary">Add price item</h2>
					<Input label="Name" bind:value={priceName} />
					<Input label="SKU" bind:value={priceSku} />
					<Input label="Sell price" bind:value={sellPrice} />
					<Button type="submit">Add price</Button>
				</form>
				<section class="rounded-lg border border-border bg-white p-5">
					<h2 class="text-xl font-semibold text-primary">Current prices</h2>
					<div class="mt-5 grid gap-3 md:grid-cols-2">
						{#each inventory as item}
							<div class="rounded-lg bg-light p-3">
								<p class="font-medium text-primary">{item.name}</p>
								<p class="text-xs text-muted">{item.sku}</p>
								<div class="mt-2 flex items-center gap-2">
									<span class="text-sm text-muted">{formatCurrency(item.sell_price || 0)}</span>
									<input class="w-24 rounded border border-border px-2 py-1 text-sm" value={item.sell_price} on:change={(event) => updatePrice(item, (event.target as HTMLInputElement).value)} />
								</div>
							</div>
						{/each}
					</div>
				</section>
			</div>
		{:else}
			<div class="mt-8 grid gap-6 lg:grid-cols-[380px_1fr]">
				<form class="rounded-lg border border-border bg-white p-5 space-y-4" on:submit|preventDefault={saveDevice}>
					<h2 class="text-xl font-semibold text-primary">Add device</h2>
					<Input label="Brand" bind:value={deviceBrand} />
					<Input label="Model" bind:value={deviceModel} />
					<Input label="Variant" bind:value={deviceVariant} />
					<Input label="Year" bind:value={deviceYear} />
					<Button type="submit">Add device</Button>
				</form>
				<section class="rounded-lg border border-border bg-white p-5">
					<h2 class="text-xl font-semibold text-primary">Supported devices</h2>
					<div class="mt-5 grid gap-3 md:grid-cols-3">
						{#each devices as device}
							<div class="rounded-lg bg-light p-3">
								<p class="font-medium text-primary">{device.brand}</p>
								<p class="text-sm text-muted">{device.model}</p>
							</div>
						{/each}
					</div>
				</section>
			</div>
		{/if}
	</div>
</section>
