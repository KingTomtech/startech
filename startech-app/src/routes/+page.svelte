<script lang="ts">
	import { onMount } from 'svelte';
	import { Phone, Wrench, Clock, Shield, ChevronRight, Star } from 'lucide-svelte';
	
	let scrolled = false;
	
	onMount(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 20;
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
	
	const services = [
		{ 
			icon: Phone, 
			title: 'iPhone Repair', 
			desc: 'Screen, battery & more',
			color: 'text-accent-blue'
		},
		{ 
			icon: Wrench, 
			title: 'Samsung Repair', 
			desc: 'Expert Galaxy fixes',
			color: 'text-accent-green'
		},
		{ 
			icon: Clock, 
			title: 'Same Day Service', 
			desc: 'Fast turnaround',
			color: 'text-accent-orange'
		},
		{ 
			icon: Shield, 
			title: '12 Month Warranty', 
			desc: 'Quality guaranteed',
			color: 'text-accent-purple'
		}
	];
	
	const stats = [
		{ value: '50K+', label: 'Repairs Completed' },
		{ value: '4.9★', label: 'Customer Rating' },
		{ value: '<60min', label: 'Avg Repair Time' },
		{ value: '100%', label: 'Satisfaction' }
	];
	
	const steps = [
		{ num: '01', title: 'Book Online', desc: 'Select your device & issue' },
		{ num: '02', title: 'Drop Off or Mail-In', desc: 'Visit us or ship free' },
		{ num: '03', title: 'Expert Repair', desc: 'Certified technicians' },
		{ num: '04', title: 'Collect & Go', desc: 'Ready when promised' }
	];
</script>

<svelte:head>
	<title>StarTech Repairs | Premium Phone Repair Australia</title>
</svelte:head>

<!-- Hero Section -->
<section class="gradient-hero min-h-[90vh] flex items-center relative overflow-hidden">
	<div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
		<div class="max-w-4xl mx-auto text-center">
			<div class="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 mb-8 animate-fade-in">
				<span class="w-2 h-2 bg-accent-green rounded-full animate-pulse"></span>
				<span class="text-sm font-medium text-gray-600">Australia's Most Trusted Repair Service</span>
			</div>
			
			<h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight animate-slide-up">
				Premium Phone<br />
				<span class="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">Repair Experts</span>
			</h1>
			
			<p class="text-xl text-gray-600 mb-10 max-w-2xl mx-auto animate-slide-up" style="animation-delay: 0.1s">
				Fast, reliable iPhone & Samsung repairs with 12-month warranty. 
				Book online in 60 seconds.
			</p>
			
			<div class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style="animation-delay: 0.2s">
				<a href="/book" class="btn-primary inline-flex items-center justify-center gap-2">
					Book Repair Now
					<ChevronRight class="w-5 h-5" />
				</a>
				<a href="/track" class="btn-secondary inline-flex items-center justify-center">
					Track Your Repair
				</a>
			</div>
			
			<div class="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500 animate-fade-in" style="animation-delay: 0.3s">
				<div class="flex items-center gap-2">
					<Shield class="w-5 h-5 text-accent-green" />
					<span>Certified Parts</span>
				</div>
				<div class="flex items-center gap-2">
					<Clock class="w-5 h-5 text-accent-orange" />
					<span>60min Average</span>
				</div>
				<div class="flex items-center gap-2">
					<Star class="w-5 h-5 text-accent-blue fill-accent-blue" />
					<span>4.9/5 Rating</span>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Stats Bar -->
<section class="bg-white border-b border-gray-100 py-12">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-2 md:grid-cols-4 gap-8">
			{#each stats as stat}
				<div class="text-center">
					<div class="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
					<div class="text-sm text-gray-500">{stat.label}</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Services Grid -->
<section class="py-20 bg-gray-50">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
			<p class="text-lg text-gray-600 max-w-2xl mx-auto">Professional repair solutions for all major smartphone brands</p>
		</div>
		
		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
			{#each services as service}
				<div class="card group cursor-pointer">
					<div class="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
						<svelte:component this={service.icon} class="w-7 h-7 {service.color}" />
					</div>
					<h3 class="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
					<p class="text-gray-600 text-sm">{service.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- How It Works -->
<section class="py-20 bg-white">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
			<p class="text-lg text-gray-600 max-w-2xl mx-auto">Simple 4-step process to get your phone repaired</p>
		</div>
		
		<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
			{#each steps as step, i}
				<div class="relative">
					{#if i < steps.length - 1}
						<div class="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-accent-blue/30 to-transparent"></div>
					{/if}
					<div class="relative z-10">
						<div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-purple text-white flex items-center justify-center text-xl font-bold mb-4 mx-auto shadow-lg">
							{step.num}
						</div>
						<h3 class="text-lg font-semibold text-gray-900 mb-2 text-center">{step.title}</h3>
						<p class="text-gray-600 text-sm text-center">{step.desc}</p>
					</div>
				</div>
			{/each}
		</div>
		
		<div class="text-center mt-12">
			<a href="/book" class="btn-primary inline-flex items-center gap-2">
				Start Your Repair
				<ChevronRight class="w-5 h-5" />
			</a>
		</div>
	</div>
</section>

<!-- CTA Banner -->
<section class="py-20 gradient-hero">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="max-w-4xl mx-auto text-center bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
			<h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Ready to Fix Your Phone?</h2>
			<p class="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
				Join thousands of satisfied customers. Book your repair now and get back to what matters.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a href="/book" class="btn-primary">Book Now - It's Free</a>
				<a href="tel:1300123456" class="btn-secondary inline-flex items-center justify-center gap-2">
					<Phone class="w-5 h-5" />
					Call 1300 123 456
				</a>
			</div>
		</div>
	</div>
</section>
