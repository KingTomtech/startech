<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Smartphone, Wrench, Clock, Star, Shield, Truck } from 'lucide-svelte';

	const stats = [
		{ value: '10K+', label: 'Repairs Completed' },
		{ value: '4.9★', label: 'Google Reviews' },
		{ value: '<2hrs', label: 'Average Turnaround' },
		{ value: '98%', label: 'Success Rate' }
	];

	const services = [
		{
			icon: Smartphone,
			title: 'Screen Repair',
			description: 'Premium quality screen replacements for all major brands',
			price: 'From $79'
		},
		{
			icon: Wrench,
			title: 'Battery Replacement',
			description: 'Restore your device battery life with genuine parts',
			price: 'From $59'
		},
		{
			icon: Shield,
			title: 'Water Damage',
			description: 'Professional water damage repair and diagnostics',
			price: 'Free Quote'
		},
		{
			icon: Clock,
			title: 'Same-Day Service',
			description: 'Most repairs completed within 2 hours',
			price: 'No Extra Cost'
		},
		{
			icon: Truck,
			title: 'Pickup & Delivery',
			description: 'Convenient pickup and delivery service available',
			price: 'From $20'
		},
		{
			icon: Star,
			title: 'Quality Parts',
			description: 'Only premium quality parts with warranty',
			price: '90-Day Warranty'
		}
	];

	const steps = [
		{
			number: '1',
			title: 'Book Online',
			description: 'Fill out our simple booking form in under 2 minutes'
		},
		{
			number: '2',
			title: 'Drop Off or Pickup',
			description: 'Bring your device to us or schedule a free pickup'
		},
		{
			number: '3',
			title: 'We Repair',
			description: 'Our expert technicians fix your device quickly'
		},
		{
			number: '4',
			title: 'Collect Device',
			description: 'Pick up your repaired device or get it delivered'
		}
	];
</script>

<svelte:head>
	<title>Star Tech Phone Repairs | Perth's most trusted tech repair specialists</title>
	<meta name="description" content="Fast, reliable phone repairs in Perth. Same-day service, premium parts, 90-day warranty. Get a free quote today!" />
</svelte:head>

<!-- Hero Section -->
<section class="relative bg-gradient-to-br from-primary via-secondary to-primary text-white overflow-hidden">
	<div class="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
		<div class="text-center space-y-8">
			<h1 class="text-5xl md:text-7xl font-bold leading-tight">
				Perth's Premier
				<span class="block text-accent">Tech Repair Service</span>
			</h1>
			<p class="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
				Fast, reliable, and affordable repairs with premium quality parts. 
				Most repairs completed same-day with 90-day warranty.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
				<a 
					href="/book-repair" 
					class="bg-accent text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 transition-colors inline-flex items-center justify-center gap-2"
				>
					Book a Repair
					<Smartphone size={20} />
				</a>
				<a 
					href="/track-repair" 
					class="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-colors inline-flex items-center justify-center"
				>
					Track Your Repair
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Stats Bar -->
<section class="bg-accent text-white py-8">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-2 md:grid-cols-4 gap-8">
			{#each stats as stat}
				<div class="text-center">
					<div class="text-3xl md:text-4xl font-bold">{stat.value}</div>
					<div class="text-sm md:text-base opacity-90">{stat.label}</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Services Section -->
<section class="py-20 bg-light">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-4xl md:text-5xl font-bold text-primary mb-4">
				Our Services
			</h2>
			<p class="text-xl text-muted max-w-2xl mx-auto">
				Premium repair services for all your devices
			</p>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each services as service}
				<div 
					in:fade={{ duration: 400 }}
					class="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-border"
				>
					<div class="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
						<svelte:component this={service.icon} class="text-accent" size={28} />
					</div>
					<h3 class="text-xl font-bold text-primary mb-3">{service.title}</h3>
					<p class="text-muted mb-4">{service.description}</p>
					<p class="text-accent font-semibold">{service.price}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- How It Works -->
<section class="py-20 bg-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-4xl md:text-5xl font-bold text-primary mb-4">
				How It Works
			</h2>
			<p class="text-xl text-muted max-w-2xl mx-auto">
				Get your device repaired in 4 simple steps
			</p>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
			{#each steps as step, i}
				<div class="relative">
					<div class="text-8xl font-bold text-accent/10 absolute -top-4 -left-4">
						{step.number}
					</div>
					<div class="relative bg-light p-8 rounded-2xl border border-border h-full">
						<div class="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
							{step.number}
						</div>
						<h3 class="text-xl font-bold text-primary mb-3">{step.title}</h3>
						<p class="text-muted">{step.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="py-20 bg-primary text-white">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
		<h2 class="text-4xl md:text-5xl font-bold">
			Ready to Fix Your Device?
		</h2>
		<p class="text-xl text-gray-300">
			Book your repair today and experience the Star Tech difference. 
			Free diagnostics, no fix no fee guarantee.
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
			<a 
				href="/book-repair" 
				class="bg-accent text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 transition-colors inline-flex items-center justify-center gap-2"
			>
				Book Now
				<Smartphone size={20} />
			</a>
			<a 
				href="tel:+61420994662" 
				class="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-colors inline-flex items-center justify-center"
			>
				Call Us: +61 420 994 662
			</a>
		</div>
	</div>
</section>
