<script lang="ts">
	import { cn } from '$lib/utils';

	export let id: string = `input-${Math.random().toString(36).slice(2)}`;
	export let name: string = id;
	export let label: string = '';
	export let error: string | undefined = undefined;
	export let type: 'text' | 'email' | 'password' | 'tel' | 'date' = 'text';
	export let placeholder: string = '';
	export let value: string = '';
	export let disabled: boolean = false;
	export let required: boolean = false;
	export let className: string = '';
</script>

<div class={cn('space-y-1', className)}>
	{#if label}
		<label for={id} class="block text-sm font-medium text-primary">
			{label}
		</label>
	{/if}
	<input
		{id}
		{name}
		type={type}
		{placeholder}
		disabled={disabled}
		required={required}
		bind:value
		aria-invalid={error ? 'true' : 'false'}
		aria-describedby={error ? `${id}-error` : undefined}
		class="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors {error ? 'border-danger' : ''}"
	/>
	{#if error}
		<p id={`${id}-error`} class="text-sm text-danger">{error}</p>
	{/if}
</div>
