<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import { registerTechnician } from '$lib/hooks/auth';
	import { addNotification } from '$lib/stores';

	let name = '';
	let email = '';
	let phone = '';
	let password = '';
	let loading = false;
	let error = '';

	async function submit() {
		loading = true;
		error = '';
		const result = await registerTechnician(email, password, name, phone);
		loading = false;

		if (!result.success) {
			error = result.error || 'Unable to create technician profile';
			addNotification('error', error);
			return;
		}

		addNotification('success', 'Technician profile created');
		await goto('/technician/dashboard');
	}
</script>

<svelte:head>
	<title>Technician Profile | Star Tech Phone Repairs</title>
</svelte:head>

<section class="bg-light py-16 md:py-24">
	<div class="mx-auto max-w-md px-4">
		<h1 class="text-4xl font-bold text-primary">Technician profile</h1>
		<p class="mt-3 text-muted">Create a staff profile for repair workflow and catalog management.</p>
		<form class="mt-8 space-y-5 rounded-lg border border-border bg-white p-6" on:submit|preventDefault={submit}>
			<Input label="Name" bind:value={name} />
			<Input label="Email" type="email" bind:value={email} error={error} />
			<Input label="Phone" type="tel" bind:value={phone} />
			<Input label="Password" type="password" bind:value={password} />
			<Button type="submit" className="w-full" {loading}>Create technician profile</Button>
		</form>
	</div>
</section>
