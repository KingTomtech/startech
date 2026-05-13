<script lang="ts">
	import {
		Battery,
		Camera,
		Cpu,
		Droplets,
		Gamepad2,
		Laptop,
		ShieldCheck,
		Smartphone,
		Speaker,
		Tablet,
		Wrench,
		Zap
	} from 'lucide-svelte';

	const featuredServices = [
		{ icon: Smartphone, title: 'Screen Replacement', detail: 'LCD, OLED, glass, touch, and display repairs across iPhone, Samsung, Pixel, iPad, and more.' },
		{ icon: Battery, title: 'Battery Replacement', detail: 'Battery health checks, safe replacement, and charging performance testing before handover.' },
		{ icon: Zap, title: 'Charging Repairs', detail: 'Charging ports, cable diagnostics, port cleaning, power faults, and board-level charging issues.' },
		{ icon: Droplets, title: 'Water Damage', detail: 'Assessment, corrosion cleaning, board inspection, and practical recovery advice.' },
		{ icon: Camera, title: 'Camera & Sensors', detail: 'Front/back camera, camera glass, Face ID, Touch ID, proximity, and sensor troubleshooting.' },
		{ icon: Speaker, title: 'Audio Repairs', detail: 'Speaker, microphone, earpiece, call quality, and media playback repairs.' }
	];

	const categories = [
		{
			icon: Smartphone,
			title: 'Phones',
			items: ['iPhone repairs', 'Samsung Galaxy repairs', 'Google Pixel repairs', 'OPPO, Huawei, Xiaomi and other Android repairs']
		},
		{
			icon: Tablet,
			title: 'Tablets',
			items: ['iPad screen repairs', 'iPad battery repairs', 'Charging port repairs', 'Home button and camera repairs']
		},
		{
			icon: Laptop,
			title: 'Computers',
			items: ['MacBook screen repairs', 'Battery replacements', 'Keyboard repairs', 'SSD and storage upgrades']
		},
		{
			icon: Gamepad2,
			title: 'Consoles',
			items: ['HDMI port repairs', 'Overheating repairs', 'Fan and cleaning service', 'Disc drive and power faults']
		},
		{
			icon: Cpu,
			title: 'Board-Level Work',
			items: ['Water damage recovery', 'Signal issues', 'Motherboard repairs', 'Microsoldering assessment']
		},
		{
			icon: ShieldCheck,
			title: 'Diagnostics & Warranty',
			items: ['Free assessment', 'No fix no fee guidance', 'Clear quotes', 'Warranty where applicable']
		}
	];
</script>

<svelte:head>
	<title>Repair Services | Star Tech Phone Repairs</title>
	<meta name="description" content="Phone, tablet, screen, battery, charging, camera, and water damage repairs in Forrestfield and Perth." />
</svelte:head>

<section class="bg-white py-16 md:py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
			<div>
			<p class="mb-3 text-sm font-semibold uppercase tracking-wide text-accent">Repair services</p>
			<h1 class="text-4xl font-bold text-primary md:text-5xl">Fast diagnostics, premium parts, clear repair paths.</h1>
			<p class="mt-5 text-lg text-muted">Book online, walk in, or contact the team for a quote. Most common repairs can be completed same day.</p>
			</div>
			<div class="grid gap-3 sm:grid-cols-3">
				{#each ['Free diagnostics', 'Same-day options', 'Quality parts'] as point}
					<div class="rounded-lg border border-border bg-light p-4 text-sm font-semibold text-primary">
						<Wrench class="mb-3 text-accent" size={22} />
						{point}
					</div>
				{/each}
			</div>
		</div>

		<div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each featuredServices as service}
				<article class="rounded-lg border border-border bg-white p-6 shadow-sm">
					<div class="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
						<svelte:component this={service.icon} size={26} />
					</div>
					<h2 class="text-xl font-semibold text-primary">{service.title}</h2>
					<p class="mt-3 text-muted">{service.detail}</p>
				</article>
			{/each}
		</div>

		<div class="mt-16 rounded-lg border border-border bg-light p-6 md:p-8">
			<div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
				<div>
					<p class="text-sm font-semibold uppercase text-accent">Repair categories</p>
					<h2 class="mt-2 text-3xl font-bold text-primary">Find the right service quickly.</h2>
				</div>
				<a class="font-semibold text-accent hover:underline" href="/pricing">Check prices</a>
			</div>
			<div class="mt-6 grid gap-5 md:grid-cols-2">
				{#each categories as category}
					<article class="rounded-lg border border-border bg-white p-5">
						<div class="flex items-center gap-3">
							<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
								<svelte:component this={category.icon} size={22} />
							</div>
							<h3 class="font-semibold text-primary">{category.title}</h3>
						</div>
						<ul class="mt-4 space-y-2 text-sm text-muted">
							{#each category.items as item}
								<li class="flex gap-2"><span class="mt-2 h-1.5 w-1.5 rounded-full bg-accent"></span><span>{item}</span></li>
							{/each}
						</ul>
					</article>
				{/each}
			</div>
		</div>
	</div>
</section>
