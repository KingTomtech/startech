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

	async function submit() {
		loading = true;
		error = '';
		const result = await login(email, password);
		loading = false;

		if (!result.success) {
			error = result.error || 'Unable to log in';
			addNotification('error', error);
			return;
		}

		await goto(result.portal || '/customer/dashboard');
	}
</script>

<svelte:head>
	<title>Login | Star Tech Phone Repairs</title>
</svelte:head>

<section class="bg-light py-16 md:py-24">
	<div class="mx-auto max-w-md px-4">
		<h1 class="text-4xl font-bold text-primary">Login</h1>
		<p class="mt-3 text-muted">Access your repair portal. Staff accounts route to the right workspace automatically.</p>
		<form class="mt-8 space-y-5 rounded-lg border border-border bg-white p-6" on:submit|preventDefault={submit}>
			<Input label="Email" type="email" bind:value={email} error={error} />
			<Input label="Password" type="password" bind:value={password} />
			<Button type="submit" className="w-full" {loading}>Login</Button>
			<a class="block text-sm font-medium text-accent hover:underline" href="/forgot-password">Forgot password?</a>
			<div class="flex justify-between text-sm">
				<a class="text-accent hover:underline" href="/register">Create customer account</a>
				<a class="text-accent hover:underline" href="/technician/register">Request technician access</a>
			</div>
		</form>
	</div>
</section>
