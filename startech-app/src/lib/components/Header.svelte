<script lang="ts">
	import { Menu, X } from 'lucide-svelte';
	
	let menuOpen = false;
	
	const navLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/services', label: 'Services' },
		{ href: '/track', label: 'Track Repair' },
		{ href: '/about', label: 'About' }
	];
</script>

<header class="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 transition-all duration-300">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16 lg:h-20">
			<!-- Logo -->
			<a href="/" class="flex items-center gap-2 group">
				<div class="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
					<span class="text-white font-bold text-lg">S</span>
				</div>
				<div>
					<span class="text-xl font-bold text-gray-900">StarTech</span>
					<span class="text-xs text-gray-500 block -mt-1">Repairs AU</span>
				</div>
			</a>
			
			<!-- Desktop Nav -->
			<nav class="hidden lg:flex items-center gap-8">
				{#each navLinks as link}
					<a 
						href={link.href} 
						class="text-gray-600 hover:text-accent-blue font-medium transition-colors"
					>
						{link.label}
					</a>
				{/each}
			</nav>
			
			<!-- CTA Buttons -->
			<div class="hidden lg:flex items-center gap-4">
				<a href="/login" class="text-gray-600 hover:text-gray-900 font-medium transition-colors">
					Login
				</a>
				<a href="/book" class="btn-primary py-2.5 px-5 text-sm">
					Book Now
				</a>
			</div>
			
			<!-- Mobile Menu Button -->
			<button 
				class="lg:hidden p-2 text-gray-600 hover:text-gray-900"
				on:click={() => menuOpen = !menuOpen}
			>
				{#if menuOpen}
					<X class="w-6 h-6" />
				{:else}
					<Menu class="w-6 h-6" />
				{/if}
			</button>
		</div>
		
		<!-- Mobile Menu -->
		{#if menuOpen}
			<div class="lg:hidden py-4 border-t border-gray-100 animate-fade-in">
				<nav class="flex flex-col gap-2">
					{#each navLinks as link}
						<a 
							href={link.href} 
							class="px-4 py-3 text-gray-600 hover:text-accent-blue hover:bg-gray-50 rounded-lg font-medium transition-colors"
							on:click={() => menuOpen = false}
						>
							{link.label}
						</a>
					{/each}
					<div class="pt-4 mt-4 border-t border-gray-100 flex flex-col gap-3">
						<a href="/login" class="px-4 py-3 text-gray-600 hover:text-gray-900 font-medium">
							Login
						</a>
						<a href="/book" class="btn-primary text-center">
							Book Now
						</a>
					</div>
				</nav>
			</div>
		{/if}
	</div>
</header>
