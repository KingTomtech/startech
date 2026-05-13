<script lang="ts">
	import { cn } from '$lib/utils';

	export let id: string = `textarea-${Math.random().toString(36).slice(2)}`;
	export let name: string = id;
	export let label: string = '';
	export let error: string | undefined = undefined;
	export let placeholder: string = '';
	export let value: string = '';
	export let disabled: boolean = false;
	export let rows: number = 4;
	export let className: string = '';
</script>

<div class={cn('space-y-1', className)}>
	{#if label}
		<label for={id} class="block text-sm font-medium text-primary">
			{label}
		</label>
	{/if}
	<textarea
		{id}
		{name}
		{placeholder}
		{rows}
		disabled={disabled}
		bind:value
		aria-invalid={error ? 'true' : 'false'}
		aria-describedby={error ? `${id}-error` : undefined}
		class="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors resize-none {error ? 'border-danger' : ''}"
	></textarea>
	{#if error}
		<p id={`${id}-error`} class="text-sm text-danger">{error}</p>
	{/if}
</div>
