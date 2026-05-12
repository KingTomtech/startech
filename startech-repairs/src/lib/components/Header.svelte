<script lang="ts">
	import { Menu, X } from 'lucide-svelte';

	let isMenuOpen = false;

	const navLinks = [
		{ href: '/services', label: 'Services' },
		{ href: '/pricing', label: 'Pricing' },
		{ href: '/about', label: 'About' },
		{ href: '/faq', label: 'FAQ' },
		{ href: '/contact', label: 'Contact' }
	];
</script>

<header class="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-border">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			<!-- Logo -->
			<a href="/" class="flex items-center gap-2">
				<div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
					<span class="text-white font-bold text-xl">S</span>
				</div>
				<span class="font-bold text-xl text-primary">Star Tech</span>
			</a>

			<!-- Desktop Navigation -->
			<nav class="hidden md:flex items-center gap-6">
				{#each navLinks as link}
					<a href={link.href} class="text-primary hover:text-accent transition-colors font-medium">
						{link.label}
					</a>
				{/each}
			</nav>

			<!-- CTA Buttons -->
			<div class="hidden md:flex items-center gap-4">
				<a href="/track-repair" class="text-primary hover:text-accent transition-colors font-medium">
					Track Repair
				</a>
				<a 
					href="/book-repair" 
					class="bg-primary text-white px-5 py-2.5 rounded-lg font-medium hover:bg-secondary transition-colors"
				>
					Book Now
				</a>
			</div>

			<!-- Mobile Menu Button -->
			<button 
				class="md:hidden p-2 text-primary"
				on:click={() => isMenuOpen = !isMenuOpen}
			>
				{#if isMenuOpen}
					<X size={24} />
				{:else}
					<Menu size={24} />
				{/if}
			</button>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if isMenuOpen}
		<div class="md:hidden bg-white border-t border-border">
			<div class="px-4 py-4 space-y-4">
				{#each navLinks as link}
					<a 
						href={link.href} 
						class="block text-primary hover:text-accent transition-colors font-medium"
						on:click={() => isMenuOpen = false}
					>
						{link.label}
					</a>
				{/each}
				<div class="pt-4 border-t border-border space-y-3">
					<a 
						href="/track-repair" 
						class="block text-center text-primary hover:text-accent transition-colors font-medium"
						on:click={() => isMenuOpen = false}
					>
						Track Repair
					</a>
					<a 
						href="/book-repair" 
						class="block text-center bg-primary text-white px-5 py-2.5 rounded-lg font-medium hover:bg-secondary transition-colors"
						on:click={() => isMenuOpen = false}
					>
						Book Now
					</a>
				</div>
			</div>
		</div>
	{/if}
</header>
