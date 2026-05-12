<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import { login } from '$lib/hooks/auth';
	import { addNotification } from '$lib/stores';

	let email = '';
	let password = '';
	let loading = false;
	let error = '';
	let status = '';

	async function submit() {
		loading = true;
		error = '';
		status = '';
		const result = await login(email, password);
		loading = false;

		if (!result.success) {
			error = result.error || 'We could not sign you in. Check your email and password.';
			addNotification('error', error);
			return;
		}

		status = 'Login successful. Opening your dashboard...';
		addNotification('success', 'Login successful');
		const portal = result.portal || '/customer/dashboard';
		await goto(portal, { replaceState: true, invalidateAll: true });
		setTimeout(() => {
			if (location.pathname === '/login') {
				location.assign(portal);
			}
		}, 700);
	}
</script>

<svelte:head>
	<title>Login | Star Tech Phone Repairs</title>
</svelte:head>

<section class="bg-light py-16 md:py-24">
	<div class="mx-auto max-w-md px-4">
		<h1 class="text-4xl font-bold text-primary">Login</h1>
		<p class="mt-3 text-muted">Sign in to view repairs, invoices, messages, and account details.</p>
		<form class="mt-8 space-y-5 rounded-lg border border-border bg-white p-6" on:submit|preventDefault={submit}>
			<Input label="Email" type="email" bind:value={email} error={error} />
			<Input label="Password" type="password" bind:value={password} />
			<Button type="submit" className="w-full" {loading}>Login</Button>
			{#if status}
				<p class="rounded-lg bg-success/10 p-3 text-sm font-medium text-success">{status}</p>
			{/if}
			{#if error}
				<p class="rounded-lg bg-danger/10 p-3 text-sm font-medium text-danger">{error}</p>
			{/if}
			<a class="block text-sm font-medium text-accent hover:underline" href="/forgot-password">Forgot password?</a>
			<div class="flex justify-between text-sm">
				<a class="text-accent hover:underline" href="/register">Create customer account</a>
				<a class="text-accent hover:underline" href="/technician/register">Request technician access</a>
			</div>
		</form>
	</div>
</section>
