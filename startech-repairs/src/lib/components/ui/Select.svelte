<script lang="ts">
	import { cn } from '$lib/utils';

	export let id: string = `select-${Math.random().toString(36).slice(2)}`;
	export let options: Array<{ value: string; label: string }> = [];
	export let label: string = '';
	export let error: string | undefined = undefined;
	export let placeholder: string = 'Select an option';
	export let value: string = '';
	export let disabled: boolean = false;
	export let className: string = '';
	export let onChange: ((event: Event) => void) | undefined = undefined;
</script>

<div class={cn('space-y-1', className)}>
	{#if label}
		<label for={id} class="block text-sm font-medium text-primary">
			{label}
		</label>
	{/if}
	<select
		{id}
		disabled={disabled}
		bind:value
		on:change={onChange}
		aria-invalid={error ? 'true' : 'false'}
		aria-describedby={error ? `${id}-error` : undefined}
		class="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors {error ? 'border-danger' : ''}"
	>
		<option value="" disabled>{placeholder}</option>
		{#each options as option}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
	{#if error}
		<p id={`${id}-error`} class="text-sm text-danger">{error}</p>
	{/if}
</div>
