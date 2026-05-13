<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';

	export let data: { token: string };
	export let form: { error?: string } | undefined;
</script>

<svelte:head>
	<title>Choose New Password | Star Tech Phone Repairs</title>
	<meta name="description" content="Choose a new password for your Star Tech account." />
</svelte:head>

<section class="bg-light py-16 md:py-24">
	<div class="mx-auto max-w-md px-4">
		<h1 class="text-4xl font-bold text-primary">Choose new password</h1>
		<form method="POST" use:enhance class="mt-8 space-y-5 rounded-lg border border-border bg-white p-6">
			<input type="hidden" name="token" value={data.token} />
			<Input name="password" label="New password" type="password" />
			<Input name="passwordConfirm" label="Confirm password" type="password" error={form?.error} />
			{#if form?.error}
				<p class="rounded-lg bg-danger/10 p-3 text-sm font-medium text-danger">{form.error}</p>
			{/if}
			<Button type="submit" className="w-full">Update password</Button>
		</form>
	</div>
</section>
