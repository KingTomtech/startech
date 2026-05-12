<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-svelte';

	export let notifications: Array<{
		id: string;
		type: 'success' | 'error' | 'warning' | 'info';
		message: string;
	}> = [];

	const icons = {
		success: CheckCircle,
		error: XCircle,
		warning: AlertCircle,
		info: Info
	};

	const colors = {
		success: 'bg-success text-white',
		error: 'bg-danger text-white',
		warning: 'bg-warning text-white',
		info: 'bg-accent text-white'
	};
</script>

<div class="fixed top-4 right-4 z-50 space-y-2">
	{#each notifications as notification (notification.id)}
		<div
			in:slide={{ duration: 200 }}
			out:fade={{ duration: 200 }}
			class="flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg min-w-[300px] ${colors[notification.type]}"
		>
			<svelte:component this={icons[notification.type]} size={20} />
			<span class="text-sm font-medium">{notification.message}</span>
		</div>
	{/each}
</div>
