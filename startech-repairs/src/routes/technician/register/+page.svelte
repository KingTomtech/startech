<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Textarea from '$lib/components/ui/Textarea.svelte';
	import { requestTechnicianAccess } from '$lib/hooks/auth';
	import { addNotification } from '$lib/stores';

	let name = '';
	let email = '';
	let phone = '';
	let experience = '';
	let loading = false;
	let error = '';

	async function submit() {
		loading = true;
		error = '';
		const result = await requestTechnicianAccess(name, email, phone, experience);
		loading = false;

		if (!result.success) {
			error = result.error || 'Unable to submit request';
			addNotification('error', error);
			return;
		}

		addNotification('success', 'Technician access request sent');
		await goto('/login');
	}
</script>

<svelte:head>
	<title>Request Technician Access | Star Tech Phone Repairs</title>
</svelte:head>

<section class="bg-light py-16 md:py-24">
	<div class="mx-auto max-w-md px-4">
		<h1 class="text-4xl font-bold text-primary">Request technician access</h1>
		<p class="mt-3 text-muted">Staff access is approved by an admin before a technician account is created.</p>
		<form class="mt-8 space-y-5 rounded-lg border border-border bg-white p-6" on:submit|preventDefault={submit}>
			<Input label="Name" bind:value={name} />
			<Input label="Email" type="email" bind:value={email} error={error} />
			<Input label="Phone" type="tel" bind:value={phone} />
			<Textarea label="Experience / role requested" bind:value={experience} rows={4} />
			<Button type="submit" className="w-full" {loading}>Send access request</Button>
		</form>
	</div>
</section>
