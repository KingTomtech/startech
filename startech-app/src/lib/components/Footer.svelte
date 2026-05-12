<script lang="ts">
	import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-svelte';
	
	const currentYear = new Date().getFullYear();
	
	const footerLinks = {
		services: [
			{ href: '/book/iphone', label: 'iPhone Repair' },
			{ href: '/book/samsung', label: 'Samsung Repair' },
			{ href: '/book/ipad', label: 'iPad Repair' },
			{ href: '/book/other', label: 'Other Devices' }
		],
		company: [
			{ href: '/about', label: 'About Us' },
			{ href: '/locations', label: 'Locations' },
			{ href: '/careers', label: 'Careers' },
			{ href: '/contact', label: 'Contact' }
		],
		support: [
			{ href: '/faq', label: 'FAQ' },
			{ href: '/track', label: 'Track Repair' },
			{ href: '/warranty', label: 'Warranty' },
			{ href: '/privacy', label: 'Privacy Policy' }
		]
	};
	
	const socialLinks = [
		{ icon: Facebook, href: 'https://facebook.com/startechrepairs', label: 'Facebook' },
		{ icon: Instagram, href: 'https://instagram.com/startechrepairs', label: 'Instagram' },
		{ icon: Twitter, href: 'https://twitter.com/startechrepairs', label: 'Twitter' }
	];
</script>

<footer class="bg-gray-900 text-white pt-16 pb-8">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Main Footer Content -->
		<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
			<!-- Brand Column -->
			<div class="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
				<a href="/" class="flex items-center gap-2 mb-4">
					<div class="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center shadow-lg">
						<span class="text-white font-bold text-lg">S</span>
					</div>
					<div>
						<span class="text-xl font-bold">StarTech</span>
						<span class="text-xs text-gray-400 block -mt-1">Repairs AU</span>
					</div>
				</a>
				<p class="text-gray-400 text-sm mb-6 max-w-xs">
					Australia's most trusted phone repair service. Quality repairs, fast turnaround, backed by warranty.
				</p>
				<div class="flex items-center gap-4">
					{#each socialLinks as social}
						<a 
							href={social.href}
							target="_blank"
							rel="noopener noreferrer"
							class="w-10 h-10 rounded-lg bg-gray-800 hover:bg-accent-blue flex items-center justify-center transition-colors"
							aria-label={social.label}
						>
							<svelte:component this={social.icon} class="w-5 h-5" />
						</a>
					{/each}
				</div>
			</div>
			
			<!-- Services Column -->
			<div>
				<h3 class="font-semibold text-lg mb-4">Services</h3>
				<ul class="space-y-3">
					{#each footerLinks.services as link}
						<li>
							<a href={link.href} class="text-gray-400 hover:text-white text-sm transition-colors">
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>
			
			<!-- Company Column -->
			<div>
				<h3 class="font-semibold text-lg mb-4">Company</h3>
				<ul class="space-y-3">
					{#each footerLinks.company as link}
						<li>
							<a href={link.href} class="text-gray-400 hover:text-white text-sm transition-colors">
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>
			
			<!-- Support Column -->
			<div>
				<h3 class="font-semibold text-lg mb-4">Support</h3>
				<ul class="space-y-3">
					{#each footerLinks.support as link}
						<li>
							<a href={link.href} class="text-gray-400 hover:text-white text-sm transition-colors">
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>
			
			<!-- Contact Column -->
			<div>
				<h3 class="font-semibold text-lg mb-4">Contact</h3>
				<ul class="space-y-4">
					<li class="flex items-start gap-3">
						<Phone class="w-5 h-5 text-accent-blue flex-shrink-0 mt-0.5" />
						<div>
							<a href="tel:1300123456" class="text-gray-400 hover:text-white text-sm transition-colors">
								1300 123 456
							</a>
							<p class="text-xs text-gray-500 mt-1">Mon-Sat 9am-6pm</p>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<Mail class="w-5 h-5 text-accent-blue flex-shrink-0 mt-0.5" />
						<div>
							<a href="mailto:support@startech.com.au" class="text-gray-400 hover:text-white text-sm transition-colors">
								support@startech.com.au
							</a>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<MapPin class="w-5 h-5 text-accent-blue flex-shrink-0 mt-0.5" />
						<div>
							<p class="text-gray-400 text-sm">Sydney, Melbourne,<br />Brisbane & more</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
		
		<!-- Bottom Bar -->
		<div class="pt-8 border-t border-gray-800">
			<div class="flex flex-col md:flex-row justify-between items-center gap-4">
				<p class="text-gray-500 text-sm">
					&copy; {currentYear} StarTech Repairs Australia. All rights reserved.
				</p>
				<div class="flex items-center gap-6">
					<a href="/terms" class="text-gray-500 hover:text-white text-sm transition-colors">
						Terms of Service
					</a>
					<a href="/privacy" class="text-gray-500 hover:text-white text-sm transition-colors">
						Privacy Policy
					</a>
				</div>
			</div>
		</div>
	</div>
</footer>
