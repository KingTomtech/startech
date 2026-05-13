<script lang="ts">
	import { goto } from '$app/navigation';
	import { onDestroy, onMount } from 'svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Select from '$lib/components/ui/Select.svelte';
	import Textarea from '$lib/components/ui/Textarea.svelte';
	import { repairStatuses } from '$lib/data/repair';
	import { logout } from '$lib/hooks/auth';
	import { pb } from '$lib/pocketbase';
	import { addNotification } from '$lib/stores';
	import { formatCurrency, formatDate } from '$lib/utils';

	type Tab = 'overview' | 'repairs' | 'invoices' | 'inventory' | 'customers' | 'technicians' | 'requests';

	let activeTab: Tab = 'overview';
	let loading = true;
	let repairs: any[] = [];
	let invoices: any[] = [];
	let inventory: any[] = [];
	let customers: any[] = [];
	let technicians: any[] = [];
	let requests: any[] = [];
	let devices: any[] = [];
	let lastCredential = '';

	let selectedRepair = '';
	let repairStatus = 'Diagnosing';
	let repairNotes = '';

	let invoiceRepair = '';
	let invoiceSubtotal = '';
	let invoiceTax = '';
	let invoiceStatus = 'Pending';

	let priceName = '';
	let priceSku = '';
	let priceAmount = '';

	let techName = '';
	let techEmail = '';
	let techPhone = '';
	let techRole = 'technician';
	let unsubscribeRealtime: Array<() => void> = [];

	const tabs: Array<{ value: Tab; label: string }> = [
		{ value: 'overview', label: 'Overview' },
		{ value: 'repairs', label: 'Repairs' },
		{ value: 'invoices', label: 'Invoices' },
		{ value: 'inventory', label: 'Inventory' },
		{ value: 'customers', label: 'Customers' },
		{ value: 'technicians', label: 'Technicians' },
		{ value: 'requests', label: 'Requests' }
	];

	$: revenue = invoices
		.filter((invoice) => invoice.status === 'Paid')
		.reduce((sum, invoice) => sum + Number(invoice.total || 0), 0);
	$: activeRepairs = repairs.filter((repair) => !['Completed', 'Cancelled'].includes(repair.status)).length;
	$: pendingRequests = requests.filter((request) => request.status === 'Pending').length;
	$: lowStock = inventory.filter((item) => Number(item.quantity || 0) <= Number(item.low_stock_threshold || 0)).length;

	onMount(async () => {
		if (!pb.authStore.isValid || pb.authStore.record?.collectionName !== 'technicians' || pb.authStore.record?.role !== 'admin') {
			await goto('/login');
			return;
		}

		await loadData();
		await subscribeToUpdates();
	});

	onDestroy(() => {
		unsubscribeRealtime.forEach((unsubscribe) => unsubscribe());
	});

	async function loadData(showSpinner = true) {
		if (showSpinner) loading = true;
		[repairs, invoices, inventory, customers, technicians, requests, devices] = await Promise.all([
			pb.collection('repairs').getFullList({ sort: '-created', expand: 'customer,technician,device' }),
			pb.collection('invoices').getFullList({ sort: '-created', expand: 'customer,repair' }),
			pb.collection('inventory_parts').getFullList({ sort: 'name' }),
			pb.collection('customers').getFullList({ sort: '-created' }),
			pb.collection('technicians').getFullList({ sort: 'name' }),
			pb.collection('technician_requests').getFullList({ sort: '-created' }).catch(() => []),
			pb.collection('devices').getFullList({ sort: 'brand,model' })
		]);
		loading = false;
	}

	async function subscribeToUpdates() {
		const refresh = () => loadData(false);
		const subscriptions = await Promise.allSettled([
			pb.collection('repairs').subscribe('*', refresh),
			pb.collection('invoices').subscribe('*', refresh),
			pb.collection('inventory_parts').subscribe('*', refresh),
			pb.collection('customers').subscribe('*', refresh),
			pb.collection('technicians').subscribe('*', refresh),
			pb.collection('technician_requests').subscribe('*', refresh),
			pb.collection('devices').subscribe('*', refresh)
		]);

		unsubscribeRealtime = subscriptions
			.filter((result): result is PromiseFulfilledResult<() => void> => result.status === 'fulfilled')
			.map((result) => result.value);
	}

	async function updateRepair() {
		if (!selectedRepair) return;
		await pb.collection('repairs').update(selectedRepair, {
			status: repairStatus,
			notes: repairNotes,
			completed_at: repairStatus === 'Completed' ? new Date().toISOString() : null
		});
		await pb.collection('repair_status_logs').create({
			repair: selectedRepair,
			status: repairStatus,
			changed_by: pb.authStore.record?.id,
			notes: repairNotes
		}).catch(() => undefined);
		addNotification('success', 'Repair updated');
		repairNotes = '';
		await loadData();
	}

	async function createInvoice() {
		const repair = repairs.find((item) => item.id === invoiceRepair);
		if (!repair?.customer) {
			addNotification('error', 'Select a repair with a customer');
			return;
		}
		const subtotal = Number(invoiceSubtotal || 0);
		const tax = Number(invoiceTax || 0);
		const total = subtotal + tax;
		await pb.collection('invoices').create({
			repair: repair.id,
			customer: repair.customer,
			subtotal,
			tax,
			total,
			status: invoiceStatus,
			invoice_number: `INV-${Date.now().toString(36).toUpperCase()}`
		});
		await pb.collection('repairs').update(repair.id, { price: total }).catch(() => undefined);
		invoiceRepair = '';
		invoiceSubtotal = '';
		invoiceTax = '';
		addNotification('success', 'Invoice created');
		await loadData();
	}

	async function updateInvoiceStatus(invoice: any, status: string) {
		await pb.collection('invoices').update(invoice.id, {
			status,
			paid_at: status === 'Paid' ? new Date().toISOString() : null
		});
		addNotification('success', 'Invoice updated');
		await loadData();
	}

	async function savePrice() {
		await pb.collection('inventory_parts').create({
			name: priceName,
			sku: priceSku,
			quantity: 1,
			sell_price: Number(priceAmount),
			low_stock_threshold: 1,
			archived: false
		});
		priceName = '';
		priceSku = '';
		priceAmount = '';
		addNotification('success', 'Inventory price saved');
		await loadData();
	}

	async function updatePrice(item: any, value: string) {
		await pb.collection('inventory_parts').update(item.id, { sell_price: Number(value) });
		addNotification('success', 'Price updated');
		await loadData();
	}

	function createPassword() {
		return `St-${Math.random().toString(36).slice(2, 8)}-${Date.now().toString(36).slice(-4)}`;
	}

	async function createTechnician(source?: any, role = techRole) {
		const password = createPassword();
		const name = source?.name || techName;
		const email = source?.email || techEmail;
		const phone = source?.phone || techPhone;
		await pb.collection('technicians').create({
			email,
			emailVisibility: true,
			password,
			passwordConfirm: password,
			name,
			phone,
			role,
			active: true
		});
		if (source?.id) {
			await pb.collection('technician_requests').update(source.id, { status: 'Approved' });
		}
		lastCredential = `${email} / ${password}`;
		techName = '';
		techEmail = '';
		techPhone = '';
		techRole = 'technician';
		addNotification('success', 'Technician account created');
		await loadData();
	}

	async function rejectRequest(request: any) {
		await pb.collection('technician_requests').update(request.id, { status: 'Rejected' });
		addNotification('success', 'Request rejected');
		await loadData();
	}

	async function toggleTechnician(technician: any) {
		await pb.collection('technicians').update(technician.id, { active: !technician.active });
		addNotification('success', 'Technician status updated');
		await loadData();
	}

	async function signOut() {
		logout();
		await goto('/');
	}
</script>

<svelte:head>
	<title>Admin Dashboard | Star Tech Phone Repairs</title>
</svelte:head>

<section class="bg-light py-10 md:py-16">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
			<div>
				<h1 class="text-4xl font-bold text-primary">Admin dashboard</h1>
				<p class="mt-2 text-muted">Manage repair operations, customers, technicians, invoices, and pricing.</p>
			</div>
			<div class="flex flex-wrap gap-3">
				<a class="inline-flex items-center justify-center rounded-lg border-2 border-primary px-4 py-2 font-medium text-primary transition-colors hover:bg-primary hover:text-white" href="/technician/settings">Profile</a>
				<Button variant="outline" onClick={signOut}>Logout</Button>
			</div>
		</div>

		<div class="mt-8 flex flex-wrap gap-3">
			{#each tabs as tab}
				<button class="rounded-lg px-4 py-2 font-medium {activeTab === tab.value ? 'bg-primary text-white' : 'bg-white text-primary'}" on:click={() => activeTab = tab.value}>{tab.label}</button>
			{/each}
		</div>

		{#if loading}
			<p class="mt-10 text-muted">Loading admin tools...</p>
		{:else if activeTab === 'overview'}
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
							<div class="rounded-lg bg-light p-3">
								<p class="font-medium text-primary">{request.name}</p>
								<p class="text-sm text-muted">{request.email} · {request.status}</p>
							</div>
						{:else}
							<p class="text-sm text-muted">No requests yet.</p>
						{/each}
					</div>
				</section>
			</div>
		{:else if activeTab === 'repairs'}
			<div class="mt-8 grid gap-6 lg:grid-cols-[380px_1fr]">
				<form class="space-y-4 rounded-lg border border-border bg-white p-5" on:submit|preventDefault={updateRepair}>
					<h2 class="text-xl font-semibold text-primary">Update repair</h2>
					<Select label="Repair" bind:value={selectedRepair} options={repairs.map((repair) => ({ value: repair.id, label: `${repair.booking_id || repair.id} - ${repair.issue_type}` }))} />
					<Select label="Status" bind:value={repairStatus} options={repairStatuses.map((status) => ({ value: status, label: status }))} />
					<Textarea label="Admin notes" bind:value={repairNotes} />
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
		{:else if activeTab === 'invoices'}
			<div class="mt-8 grid gap-6 lg:grid-cols-[380px_1fr]">
				<form class="space-y-4 rounded-lg border border-border bg-white p-5" on:submit|preventDefault={createInvoice}>
					<h2 class="text-xl font-semibold text-primary">Create invoice</h2>
					<Select label="Repair" bind:value={invoiceRepair} options={repairs.map((repair) => ({ value: repair.id, label: `${repair.booking_id || repair.id} - ${repair.issue_type}` }))} />
					<Input label="Subtotal" bind:value={invoiceSubtotal} />
					<Input label="Tax" bind:value={invoiceTax} />
					<Select label="Status" bind:value={invoiceStatus} options={[
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
									<select class="rounded border border-border px-3 py-2 text-sm" value={invoice.status} on:change={(event) => updateInvoiceStatus(invoice, (event.target as HTMLSelectElement).value)}>
										<option>Pending</option>
										<option>Paid</option>
										<option>Overdue</option>
									</select>
								</div>
							</div>
						{/each}
					</div>
				</section>
			</div>
		{:else if activeTab === 'inventory'}
			<div class="mt-8 grid gap-6 lg:grid-cols-[380px_1fr]">
				<form class="space-y-4 rounded-lg border border-border bg-white p-5" on:submit|preventDefault={savePrice}>
					<h2 class="text-xl font-semibold text-primary">Add price item</h2>
					<Input label="Name" bind:value={priceName} />
					<Input label="SKU" bind:value={priceSku} />
					<Input label="Sell price" bind:value={priceAmount} />
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
								<input class="mt-2 w-28 rounded border border-border px-2 py-1 text-sm" value={item.sell_price} on:change={(event) => updatePrice(item, (event.target as HTMLInputElement).value)} />
							</div>
						{/each}
					</div>
				</section>
			</div>
		{:else if activeTab === 'customers'}
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
		{:else if activeTab === 'technicians'}
			<div class="mt-8 grid gap-6 lg:grid-cols-[380px_1fr]">
				<form class="space-y-4 rounded-lg border border-border bg-white p-5" on:submit|preventDefault={() => createTechnician()}>
					<h2 class="text-xl font-semibold text-primary">Create staff account</h2>
					<Input label="Name" bind:value={techName} />
					<Input label="Email" type="email" bind:value={techEmail} />
					<Input label="Phone" type="tel" bind:value={techPhone} />
					<Select label="Role" bind:value={techRole} options={[
						{ value: 'technician', label: 'Technician' },
						{ value: 'admin', label: 'Admin' }
					]} />
					<Button type="submit">Create account</Button>
					{#if lastCredential}
						<p class="rounded-lg bg-warning/10 p-3 text-sm text-primary">Temporary login: {lastCredential}</p>
					{/if}
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
								<Button variant="outline" onClick={() => toggleTechnician(technician)}>{technician.active ? 'Deactivate' : 'Activate'}</Button>
							</div>
						{/each}
					</div>
				</section>
			</div>
		{:else}
			<section class="mt-8 rounded-lg border border-border bg-white p-5">
				<h2 class="text-xl font-semibold text-primary">Technician requests</h2>
				<div class="mt-4 space-y-3">
					{#each requests as request}
						<div class="rounded-lg bg-light p-4">
							<div class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
								<div>
									<p class="font-medium text-primary">{request.name}</p>
									<p class="text-sm text-muted">{request.email} · {request.phone} · {request.status}</p>
									{#if request.experience}<p class="mt-2 text-sm text-muted">{request.experience}</p>{/if}
								</div>
								<div class="flex gap-2">
									<Button onClick={() => createTechnician(request, 'technician')}>Approve</Button>
									<Button variant="outline" onClick={() => rejectRequest(request)}>Reject</Button>
								</div>
							</div>
						</div>
					{:else}
						<p class="text-sm text-muted">No technician requests yet.</p>
					{/each}
				</div>
			</section>
		{/if}
	</div>
</section>
