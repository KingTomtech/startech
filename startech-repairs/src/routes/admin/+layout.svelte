<script lang="ts">
	import { page } from '$app/stores';
	import { logout } from '$lib/hooks/auth';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/Button.svelte';

	export let data: any;

	const links = [
		{ href: '/admin/dashboard', label: 'Overview' },
		{ href: '/admin/repairs', label: 'Repairs' },
		{ href: '/admin/invoices', label: 'Invoices' },
		{ href: '/admin/inventory', label: 'Inventory' },
		{ href: '/admin/customers', label: 'Customers' },
		{ href: '/admin/technicians', label: 'Technicians' },
		{ href: '/admin/analytics', label: 'Analytics' }
	];

	async function signOut() {
		logout();
		await goto('/');
	}
</script>

<div class="flex min-h-screen flex-col bg-light md:flex-row">
	<aside class="w-full border-b border-border bg-white md:w-64 md:border-b-0 md:border-r">
		<div class="p-6">
			<h1 class="text-xl font-bold text-primary">Star Tech Admin</h1>
		</div>
		<nav class="flex overflow-x-auto p-4 md:flex-col md:space-y-2 md:overflow-visible md:p-4">
			{#each links as link}
				<a
					href={link.href}
					class="whitespace-nowrap rounded-lg px-4 py-2 font-medium transition-colors {$page.url.pathname === link.href ? 'bg-primary text-white' : 'text-primary hover:bg-light'}"
				>
					{link.label}
				</a>
			{/each}
		</nav>
	</aside>

	<main class="flex-1 p-6 md:p-10">
		<header class="mb-8 flex items-center justify-between">
			<div>
				<h2 class="text-2xl font-bold text-primary">Welcome, {data.user?.name || 'Admin'}</h2>
			</div>
			<div class="flex gap-3">
				<a class="inline-flex items-center justify-center rounded-lg border-2 border-primary px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white" href="/technician/settings">Profile</a>
				<Button variant="outline" onClick={signOut}>Logout</Button>
			</div>
		</header>
		<slot />
	</main>
</div>
