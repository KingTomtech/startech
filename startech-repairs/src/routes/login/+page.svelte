<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Select from '$lib/components/ui/Select.svelte';
	import { login, type AuthCollection } from '$lib/hooks/auth';
	import { addNotification } from '$lib/stores';

	let email = '';
	let password = '';
	let role: AuthCollection = 'customers';
	let loading = false;
	let error = '';

	async function submit() {
		loading = true;
		error = '';
		const result = await login(email, password, role);
		loading = false;

		if (!result.success) {
			error = result.error || 'Unable to log in';
			addNotification('error', error);
			return;
		}

		await goto(role === 'technicians' ? '/technician/dashboard' : '/customer/dashboard');
	}
</script>

<svelte:head>
	<title>Login | Star Tech Phone Repairs</title>
</svelte:head>

<section class="bg-light py-16 md:py-24">
	<div class="mx-auto max-w-md px-4">
		<h1 class="text-4xl font-bold text-primary">Login</h1>
		<p class="mt-3 text-muted">Access customer repair history or technician tools.</p>
		<form class="mt-8 space-y-5 rounded-lg border border-border bg-white p-6" on:submit|preventDefault={submit}>
			<Select
				label="Account type"
				options={[
					{ value: 'customers', label: 'Customer' },
					{ value: 'technicians', label: 'Technician' }
				]}
				bind:value={role}
			/>
			<Input label="Email" type="email" bind:value={email} error={error} />
			<Input label="Password" type="password" bind:value={password} />
			<Button type="submit" className="w-full" {loading}>Login</Button>
			<div class="flex justify-between text-sm">
				<a class="text-accent hover:underline" href="/register">Create customer account</a>
				<a class="text-accent hover:underline" href="/technician/register">Technician profile</a>
			</div>
		</form>
	</div>
</section>
