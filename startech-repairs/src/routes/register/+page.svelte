<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import { registerCustomer } from '$lib/hooks/auth';
	import { addNotification } from '$lib/stores';

	let name = '';
	let email = '';
	let phone = '';
	let password = '';
	let passwordConfirm = '';
	let loading = false;
	let error = '';

	async function submit() {
		loading = true;
		error = '';
		if (password !== passwordConfirm) {
			error = 'Passwords do not match';
			loading = false;
			return;
		}
		const result = await registerCustomer(email, password, name, phone);
		loading = false;

		if (!result.success) {
			error = result.error || 'Unable to create account';
			addNotification('error', error);
			return;
		}

		addNotification('success', 'Customer account created');
		await goto('/customer/dashboard');
	}
</script>

<svelte:head>
	<title>Create Account | Star Tech Phone Repairs</title>
</svelte:head>

<section class="bg-light py-16 md:py-24">
	<div class="mx-auto max-w-md px-4">
		<h1 class="text-4xl font-bold text-primary">Create account</h1>
		<p class="mt-3 text-muted">Save repair history, invoices, messages, and tracking IDs in one place.</p>
		<form class="mt-8 space-y-5 rounded-lg border border-border bg-white p-6" on:submit|preventDefault={submit}>
			<Input label="Full name" bind:value={name} />
			<Input label="Email" type="email" bind:value={email} error={error} />
			<Input label="Phone" type="tel" bind:value={phone} />
			<Input label="Password" type="password" bind:value={password} />
			<Input label="Confirm password" type="password" bind:value={passwordConfirm} />
			{#if error}
				<p class="rounded-lg bg-danger/10 p-3 text-sm font-medium text-danger">{error}</p>
			{/if}
			<Button type="submit" className="w-full" {loading}>Create account</Button>
		</form>
	</div>
</section>
