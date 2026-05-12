<script lang="ts">
	import { cn } from '$lib/utils';

	export let variant: 'primary' | 'secondary' | 'outline' | 'ghost' = 'primary';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let disabled: boolean = false;
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let loading: boolean = false;
	export let className: string = '';

	const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

	const variants = {
		primary: 'bg-primary text-white hover:bg-secondary',
		secondary: 'bg-accent text-white hover:bg-blue-600',
		outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
		ghost: 'text-primary hover:bg-gray-100'
	};

	const sizes = {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2 text-base',
		lg: 'px-6 py-3 text-lg'
	};
</script>

<button
	type={type}
	class={cn(baseStyles, variants[variant], sizes[size], className)}
	disabled={disabled || loading}
>
	{#if loading}
		<svg class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
			<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
		</svg>
	{/if}
	<slot />
</button>
