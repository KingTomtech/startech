<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Textarea from '$lib/components/ui/Textarea.svelte';

	export let form: { error?: string; success?: boolean; values?: Record<string, FormDataEntryValue> } | undefined;
</script>

<svelte:head>
	<title>Request Technician Access | Star Tech Phone Repairs</title>
	<meta name="description" content="Request Star Tech technician access for repair workflow and catalog management." />
</svelte:head>

<section class="bg-light py-16 md:py-24">
	<div class="mx-auto max-w-md px-4">
		<h1 class="text-4xl font-bold text-primary">Request technician access</h1>
		<p class="mt-3 text-muted">Send your details to the Star Tech team. An admin will review the request and create a staff account if approved.</p>
		<form method="POST" use:enhance class="mt-8 space-y-5 rounded-lg border border-border bg-white p-6">
			<Input name="name" label="Name" value={String(form?.values?.name || '')} />
			<Input name="email" label="Email" type="email" value={String(form?.values?.email || '')} error={form?.error} />
			<Input name="phone" label="Phone" type="tel" value={String(form?.values?.phone || '')} />
			<Textarea name="experience" label="Experience / role requested" value={String(form?.values?.experience || '')} rows={4} />
			{#if form?.success}
				<p class="rounded-lg bg-success/10 p-3 text-sm font-medium text-success">Request sent. The admin team will review it and contact you with next steps.</p>
			{/if}
			{#if form?.error}
				<p class="rounded-lg bg-danger/10 p-3 text-sm font-medium text-danger">{form.error}</p>
			{/if}
			<Button type="submit" className="w-full">Send access request</Button>
			<a class="block text-sm font-medium text-accent hover:underline" href="/login">Back to login</a>
		</form>
	</div>
</section>
