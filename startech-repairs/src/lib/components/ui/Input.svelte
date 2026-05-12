<script lang="ts">
	import { cn } from '$lib/utils';

	export let label: string = '';
	export let error: string | undefined = undefined;
	export let type: 'text' | 'email' | 'password' | 'tel' | 'date' = 'text';
	export let placeholder: string = '';
	export let value: string = '';
	export let disabled: boolean = false;
	export let className: string = '';

	export const input = createEventDispatcher<'input'>();

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		input({ detail: target.value });
	}
</script>

<div class={cn('space-y-1', className)}>
	{#if label}
		<label class="block text-sm font-medium text-primary">
			{label}
		</label>
	{/if}
	<input
		type={type}
		{placeholder}
		disabled={disabled}
		value={value}
		on:input={handleInput}
		class="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors {error ? 'border-danger' : ''}"
	/>
	{#if error}
		<p class="text-sm text-danger">{error}</p>
	{/if}
</div>
