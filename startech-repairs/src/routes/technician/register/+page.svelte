<script lang="ts">
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
	let submitted = false;

	async function submit() {
		loading = true;
		error = '';
		submitted = false;
		const result = await requestTechnicianAccess(name, email, phone, experience);
		loading = false;

		if (!result.success) {
			error = result.error || 'Unable to submit request';
			addNotification('error', error);
			return;
		}

		submitted = true;
		addNotification('success', 'Technician access request sent');
	}
</script>

<svelte:head>
	<title>Request Technician Access | Star Tech Phone Repairs</title>
</svelte:head>

<section class="bg-light py-16 md:py-24">
	<div class="mx-auto max-w-md px-4">
		<h1 class="text-4xl font-bold text-primary">Request technician access</h1>
		<p class="mt-3 text-muted">Send your details to the Star Tech team. An admin will review the request and create a staff account if approved.</p>
		<form class="mt-8 space-y-5 rounded-lg border border-border bg-white p-6" on:submit|preventDefault={submit}>
			<Input label="Name" bind:value={name} />
			<Input label="Email" type="email" bind:value={email} error={error} />
			<Input label="Phone" type="tel" bind:value={phone} />
			<Textarea label="Experience / role requested" bind:value={experience} rows={4} />
			{#if submitted}
				<p class="rounded-lg bg-success/10 p-3 text-sm font-medium text-success">Request sent. The admin team will review it and contact you with next steps.</p>
			{/if}
			{#if error}
				<p class="rounded-lg bg-danger/10 p-3 text-sm font-medium text-danger">{error}</p>
			{/if}
			<Button type="submit" className="w-full" {loading}>Send access request</Button>
			<a class="block text-sm font-medium text-accent hover:underline" href="/login">Back to login</a>
		</form>
	</div>
</section>
