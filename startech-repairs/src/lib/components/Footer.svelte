<script lang="ts">
	import { Phone, Mail, MapPin, Clock, Star } from 'lucide-svelte';

	const contactInfo = [
		{
			icon: Phone,
			label: 'Phone',
			value: '(08) 9456 7890',
			href: 'tel:+61894567890'
		},
		{
			icon: Mail,
			label: 'Email',
			value: 'info@startechphonerepairs.com.au',
			href: 'mailto:info@startechphonerepairs.com.au'
		},
		{
			icon: MapPin,
			label: 'Location',
			value: '33 Crimson Blvd, Forrestfield WA 6058',
			href: 'https://maps.google.com/?q=33+Crimson+Blvd,+Forrestfield+WA+6058'
		},
		{
			icon: Clock,
			label: 'Hours',
			value: 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM',
			href: undefined
		}
	];
</script>

<footer class="bg-primary text-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
			<!-- Brand -->
			<div class="space-y-4">
				<h3 class="text-2xl font-bold">Star Tech</h3>
				<p class="text-muted text-sm">
					Perth's Premier Tech Repair Service. Fast, reliable, and affordable repairs with premium quality parts.
				</p>
				<div class="flex items-center gap-1">
					{#each [1, 2, 3, 4, 5] as i}
						<Star size={18} class="fill-warning text-warning" />
					{/each}
					<span class="ml-2 text-sm">4.9 Google Reviews</span>
				</div>
			</div>

			<!-- Quick Links -->
			<div>
				<h4 class="font-semibold mb-4">Quick Links</h4>
				<ul class="space-y-2 text-sm">
					<li><a href="/services" class="text-muted hover:text-white transition-colors">Services</a></li>
					<li><a href="/pricing" class="text-muted hover:text-white transition-colors">Pricing</a></li>
					<li><a href="/book-repair" class="text-muted hover:text-white transition-colors">Book Repair</a></li>
					<li><a href="/track-repair" class="text-muted hover:text-white transition-colors">Track Repair</a></li>
					<li><a href="/faq" class="text-muted hover:text-white transition-colors">FAQ</a></li>
				</ul>
			</div>

			<!-- Services -->
			<div>
				<h4 class="font-semibold mb-4">Services</h4>
				<ul class="space-y-2 text-sm">
					<li><a href="/services/apple" class="text-muted hover:text-white transition-colors">iPhone Repair</a></li>
					<li><a href="/services/samsung" class="text-muted hover:text-white transition-colors">Samsung Repair</a></li>
					<li><a href="/services/ipad" class="text-muted hover:text-white transition-colors">iPad Repair</a></li>
					<li><a href="/services/water-damage" class="text-muted hover:text-white transition-colors">Water Damage</a></li>
					<li><a href="/business-repairs" class="text-muted hover:text-white transition-colors">Business Repairs</a></li>
				</ul>
			</div>

			<!-- Contact -->
			<div>
				<h4 class="font-semibold mb-4">Contact Us</h4>
				<ul class="space-y-3">
					{#each contactInfo as item}
						<li>
							{#if item.href}
								<a href={item.href} class="flex items-center gap-2 text-muted hover:text-white transition-colors">
									<svelte:component this={item.icon} size={16} />
									<span class="text-sm">{item.value}</span>
								</a>
							{:else}
								<div class="flex items-center gap-2 text-muted">
									<svelte:component this={item.icon} size={16} />
									<span class="text-sm">{item.value}</span>
								</div>
							{/if}
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="border-t border-secondary mt-8 pt-8 text-center text-sm text-muted">
			<p>&copy; {new Date().getFullYear()} Star Tech Phone Repairs. All rights reserved.</p>
		</div>
	</div>
</footer>
