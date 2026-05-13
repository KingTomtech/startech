<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import { pb } from '$lib/pocketbase';

	export let form: { error?: string; values?: Record<string, FormDataEntryValue> } | undefined;
</script>

<svelte:head>
	<title>Create Account | Star Tech Phone Repairs</title>
	<meta name="description" content="Create a Star Tech customer account to save repair history, invoices, messages, and tracking IDs." />
</svelte:head>

<section class="bg-light py-16 md:py-24">
	<div class="mx-auto max-w-md px-4">
		<h1 class="text-4xl font-bold text-primary">Create account</h1>
		<p class="mt-3 text-muted">Save repair history, invoices, messages, and tracking IDs in one place.</p>
		<form method="POST" use:enhance={() => {
			return async ({ result, update }) => {
				if (result.type === 'redirect') {
					pb.authStore.loadFromCookie(document.cookie);
				}
				update();
			};
		}} class="mt-8 space-y-5 rounded-lg border border-border bg-white p-6">
			<Input name="name" label="Full name" value={String(form?.values?.name || '')} />
			<Input name="email" label="Email" type="email" value={String(form?.values?.email || '')} error={form?.error} />
			<Input name="phone" label="Phone" type="tel" value={String(form?.values?.phone || '')} />
			<Input name="password" label="Password" type="password" />
			<Input name="passwordConfirm" label="Confirm password" type="password" />
			{#if form?.error}
				<p class="rounded-lg bg-danger/10 p-3 text-sm font-medium text-danger">{form.error}</p>
			{/if}
			<Button type="submit" className="w-full">Create account</Button>
		</form>
	</div>
</section>
