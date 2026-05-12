<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import { getAvatarUrl, initials } from '$lib/data/profile';
	import { requestPasswordReset, updateProfile } from '$lib/hooks/auth';
	import { pb } from '$lib/pocketbase';
	import { addNotification } from '$lib/stores';

	let record: any = null;
	let name = '';
	let phone = '';
	let avatar: File | null = null;
	let loading = false;

	onMount(async () => {
		if (!pb.authStore.isValid || pb.authStore.record?.collectionName !== 'technicians') {
			await goto('/login');
			return;
		}

		record = pb.authStore.record;
		name = record.name || '';
		phone = record.phone || '';
	});

	function handleAvatar(event: Event) {
		avatar = (event.target as HTMLInputElement).files?.[0] || null;
	}

	async function saveProfile() {
		if (!record) return;
		loading = true;
		const data = new FormData();
		data.append('name', name);
		data.append('phone', phone);
		if (avatar) data.append('avatar', avatar);

		const result = await updateProfile('technicians', record.id, data);
		loading = false;

		if (!result.success) {
			addNotification('error', result.error || 'Unable to save profile');
			return;
		}

		record = result.record;
		avatar = null;
		addNotification('success', 'Technician profile updated');
	}

	async function sendReset() {
		if (!record?.email) return;
		const result = await requestPasswordReset(record.email, 'technicians');
		addNotification(result.success ? 'success' : 'error', result.success ? 'Password reset email sent' : result.error || 'Unable to send reset email');
	}
</script>

<svelte:head>
	<title>Technician Settings | Star Tech Phone Repairs</title>
</svelte:head>

<section class="bg-light py-10 md:py-16">
	<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
		<a class="text-sm font-medium text-accent hover:underline" href="/technician/dashboard">Back to dashboard</a>
		<h1 class="mt-4 text-4xl font-bold text-primary">Technician profile</h1>
		<p class="mt-2 text-muted">Keep staff contact details and account security up to date.</p>

		{#if record}
			<form class="mt-8 space-y-6 rounded-lg border border-border bg-white p-6" on:submit|preventDefault={saveProfile}>
				<div class="flex items-center gap-4">
					{#if getAvatarUrl(record)}
						<img class="h-20 w-20 rounded-full object-cover" src={getAvatarUrl(record)} alt="Profile" />
					{:else}
						<div class="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">{initials(name)}</div>
					{/if}
					<div>
						<label class="block text-sm font-medium text-primary" for="avatar">Profile picture</label>
						<input id="avatar" class="mt-2 text-sm text-muted" type="file" accept="image/png,image/jpeg,image/webp" on:change={handleAvatar} />
					</div>
				</div>

				<Input label="Full name" bind:value={name} />
				<Input label="Phone" type="tel" bind:value={phone} />
				<Input label="Email" type="email" value={record.email} disabled />

				<div class="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
					<Button type="submit" {loading}>Save profile</Button>
					<Button type="button" variant="outline" onClick={sendReset}>Email password reset</Button>
				</div>
			</form>
		{/if}
	</div>
</section>
