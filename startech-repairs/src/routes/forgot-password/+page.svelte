<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';

	export let form: { error?: string; success?: boolean } | undefined;
</script>

<svelte:head>
	<title>Reset Password | Star Tech Phone Repairs</title>
	<meta name="description" content="Request a secure Star Tech account password reset link." />
</svelte:head>

<section class="bg-light py-16 md:py-24">
	<div class="mx-auto max-w-md px-4">
		<h1 class="text-4xl font-bold text-primary">Reset password</h1>
		<p class="mt-3 text-muted">Enter your account email and we will send a secure reset link if an account exists.</p>
		<form method="POST" use:enhance class="mt-8 space-y-5 rounded-lg border border-border bg-white p-6">
			<Input name="email" label="Email" type="email" error={form?.error} />
			<Button type="submit" className="w-full">Send reset link</Button>
			{#if form?.success}
				<p class="rounded-lg bg-success/10 p-3 text-sm text-success">Check your inbox for the password reset link.</p>
			{/if}
			{#if form?.error}
				<p class="rounded-lg bg-danger/10 p-3 text-sm font-medium text-danger">{form.error}</p>
			{/if}
			<a class="block text-sm font-medium text-accent hover:underline" href="/login">Back to login</a>
		</form>
	</div>
</section>
