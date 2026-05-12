<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Select from '$lib/components/ui/Select.svelte';
	import { requestPasswordReset, type AuthCollection } from '$lib/hooks/auth';
	import { addNotification } from '$lib/stores';

	let email = '';
	let role: AuthCollection = 'customers';
	let loading = false;
	let sent = false;
	let error = '';

	async function submit() {
		loading = true;
		error = '';
		const result = await requestPasswordReset(email, role);
		loading = false;

		if (!result.success) {
			error = result.error || 'Unable to send reset email';
			addNotification('error', error);
			return;
		}

		sent = true;
		addNotification('success', 'Password reset email sent');
	}
</script>

<svelte:head>
	<title>Reset Password | Star Tech Phone Repairs</title>
</svelte:head>

<section class="bg-light py-16 md:py-24">
	<div class="mx-auto max-w-md px-4">
		<h1 class="text-4xl font-bold text-primary">Reset password</h1>
		<p class="mt-3 text-muted">Enter your account email and PocketBase will send a secure reset link.</p>
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
			<Button type="submit" className="w-full" {loading}>Send reset link</Button>
			{#if sent}
				<p class="rounded-lg bg-success/10 p-3 text-sm text-success">Check your inbox for the password reset link.</p>
			{/if}
			<a class="block text-sm font-medium text-accent hover:underline" href="/login">Back to login</a>
		</form>
	</div>
</section>
