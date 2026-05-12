<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import { confirmPasswordReset } from '$lib/hooks/auth';
	import { addNotification } from '$lib/stores';

	let token = '';
	let password = '';
	let passwordConfirm = '';
	let loading = false;
	let error = '';

	onMount(() => {
		const params = new URLSearchParams(window.location.search);
		token = params.get('token') || '';
	});

	async function submit() {
		if (!token) {
			error = 'Missing reset token. Use the link from your email.';
			return;
		}

		if (password !== passwordConfirm) {
			error = 'Passwords do not match';
			return;
		}

		loading = true;
		error = '';
		const result = await confirmPasswordReset(token, password, passwordConfirm);
		loading = false;

		if (!result.success) {
			error = result.error || 'Unable to reset password';
			addNotification('error', error);
			return;
		}

		addNotification('success', 'Password updated. You can log in now.');
		await goto('/login');
	}
</script>

<svelte:head>
	<title>Choose New Password | Star Tech Phone Repairs</title>
</svelte:head>

<section class="bg-light py-16 md:py-24">
	<div class="mx-auto max-w-md px-4">
		<h1 class="text-4xl font-bold text-primary">Choose new password</h1>
		<form class="mt-8 space-y-5 rounded-lg border border-border bg-white p-6" on:submit|preventDefault={submit}>
			<Input label="New password" type="password" bind:value={password} />
			<Input label="Confirm password" type="password" bind:value={passwordConfirm} error={error} />
			<Button type="submit" className="w-full" {loading}>Update password</Button>
		</form>
	</div>
</section>
