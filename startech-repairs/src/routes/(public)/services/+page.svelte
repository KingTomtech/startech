<script lang="ts">
	import { Battery, Camera, Droplets, Smartphone, Speaker, Zap } from 'lucide-svelte';
	import { oldSiteServices } from '$lib/data/old-site';

	const services = [
		{ icon: Smartphone, title: 'Screen Replacement', detail: 'OLED, LCD, and glass repairs for iPhone, Samsung, Pixel, iPad, and more.' },
		{ icon: Battery, title: 'Battery Replacement', detail: 'Fresh batteries, battery health checks, and charging performance testing.' },
		{ icon: Zap, title: 'Charging Port Repair', detail: 'Port cleaning, replacement, cable diagnostics, and charging circuit assessment.' },
		{ icon: Droplets, title: 'Water Damage', detail: 'Full inspection, board cleaning, corrosion treatment, and recovery advice.' },
		{ icon: Camera, title: 'Camera & Face ID', detail: 'Camera glass, lens modules, Face ID, Touch ID, and sensor troubleshooting.' },
		{ icon: Speaker, title: 'Audio Repairs', detail: 'Speaker, microphone, earpiece, and call quality repairs.' }
	];
</script>

<svelte:head>
	<title>Repair Services | Star Tech Phone Repairs</title>
	<meta name="description" content="Phone, tablet, screen, battery, charging, camera, and water damage repairs in Forrestfield and Perth." />
</svelte:head>

<section class="bg-white py-16 md:py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="max-w-3xl">
			<p class="mb-3 text-sm font-semibold uppercase tracking-wide text-accent">Repair services</p>
			<h1 class="text-4xl font-bold text-primary md:text-5xl">Fast diagnostics, premium parts, clear repair paths.</h1>
			<p class="mt-5 text-lg text-muted">Book online, walk in, or contact the team for a quote. Most common repairs can be completed same day.</p>
		</div>

		<div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each services as service}
				<article class="rounded-lg border border-border bg-light p-6">
					<svelte:component this={service.icon} class="mb-5 text-accent" size={30} />
					<h2 class="text-xl font-semibold text-primary">{service.title}</h2>
					<p class="mt-3 text-muted">{service.detail}</p>
				</article>
			{/each}
		</div>

		<div class="mt-16">
			<h2 class="text-3xl font-bold text-primary">Old-site service coverage</h2>
			<div class="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
				{#each oldSiteServices as service}
					<article class="rounded-lg border border-border bg-white p-5">
						<h3 class="font-semibold text-primary">{service.title}</h3>
						<ul class="mt-4 space-y-2 text-sm text-muted">
							{#each service.repairs as repair}
								<li>{repair}</li>
							{/each}
						</ul>
					</article>
				{/each}
			</div>
		</div>
	</div>
</section>
