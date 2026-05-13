<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import { pb } from '$lib/pocketbase';

	export let form: { error?: string; email?: string } | undefined;
</script>

<svelte:head>
	<title>Login | Star Tech Phone Repairs</title>
	<meta name="description" content="Sign in to view Star Tech repairs, invoices, messages, and account details." />
</svelte:head>

<section class="bg-light py-16 md:py-24">
	<div class="mx-auto max-w-md px-4">
		<h1 class="text-4xl font-bold text-primary">Login</h1>
		<p class="mt-3 text-muted">Sign in to view repairs, invoices, messages, and account details.</p>
		<form method="POST" use:enhance={() => {
			return async ({ result, update }) => {
				if (result.type === 'redirect') {
					pb.authStore.loadFromCookie(document.cookie);
				}
				update();
			};
		}} class="mt-8 space-y-5 rounded-lg border border-border bg-white p-6">
			<Input name="email" label="Email" type="email" value={form?.email || ''} error={form?.error} />
			<Input name="password" label="Password" type="password" />
			<Button type="submit" className="w-full">Login</Button>
			{#if form?.error}
				<p class="rounded-lg bg-danger/10 p-3 text-sm font-medium text-danger">{form.error}</p>
			{/if}
			<a class="block text-sm font-medium text-accent hover:underline" href="/forgot-password">Forgot password?</a>
			<div class="flex justify-between text-sm">
				<a class="text-accent hover:underline" href="/register">Create customer account</a>
				<a class="text-accent hover:underline" href="/technician/register">Request technician access</a>
			</div>
		</form>
	</div>
</section>
