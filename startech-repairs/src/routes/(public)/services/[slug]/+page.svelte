<script lang="ts">
	import { page } from '$app/stores';
	import { oldSiteServices } from '$lib/data/old-site';
	import { findService } from '$lib/data/content';

	$: slug = $page.params.slug;
	$: title = slug
		.split('-')
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(' ');
	$: service = oldSiteServices.find((item) => item.title.toLowerCase().includes(slug.split('-')[0]));
	$: detail = findService(slug);
	$: displayTitle = detail?.title || title;
	$: serviceJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Service',
		name: `${displayTitle} repairs`,
		description: detail?.summary || `${displayTitle} repair services in Forrestfield and Perth.`,
		provider: {
			'@type': 'LocalBusiness',
			name: 'Star Tech Phone Repairs',
			address: '33 Crimson Blvd, Forrestfield WA 6058'
		},
		areaServed: ['Forrestfield', 'Perth']
	};
</script>

<svelte:head>
	<title>{displayTitle} Repairs | Star Tech Phone Repairs</title>
	<meta name="description" content={detail?.summary || `${displayTitle} repair services in Forrestfield and Perth.`} />
	<script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
</svelte:head>

<section class="bg-white py-16 md:py-24">
	<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
		<a class="font-semibold text-accent hover:underline" href="/services">Back to services</a>
		<h1 class="mt-8 text-4xl font-bold text-primary md:text-5xl">{displayTitle} repairs</h1>
		<p class="mt-5 text-lg text-muted">{detail?.description || 'Book online, call the team, or visit Star Tech for diagnostics and a clear quote.'}</p>
		<div class="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
			<section class="rounded-lg border border-border bg-light p-6">
				<h2 class="text-2xl font-semibold text-primary">Common services</h2>
				<ul class="mt-5 grid gap-3 md:grid-cols-2">
					{#each detail?.commonRepairs || service?.repairs || ['Screen Replacement', 'Battery Replacement', 'Charging Port Repair', 'Diagnostics'] as repair}
						<li class="rounded-lg bg-white p-3 text-muted">{repair}</li>
					{/each}
				</ul>
			</section>
			<section class="rounded-lg border border-border bg-white p-6 shadow-sm">
				<h2 class="text-2xl font-semibold text-primary">Repair process</h2>
				<ol class="mt-5 space-y-3">
					{#each detail?.process || ['Free assessment', 'Clear quote', 'Repair', 'Final testing'] as step, index}
						<li class="flex gap-3 text-muted"><span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">{index + 1}</span>{step}</li>
					{/each}
				</ol>
			</section>
		</div>
		<div class="mt-8 rounded-lg border border-border bg-white p-6">
			<h2 class="text-2xl font-semibold text-primary">Devices we commonly help with</h2>
			<div class="mt-4 flex flex-wrap gap-3">
				{#each detail?.idealFor || ['iPhone', 'Samsung', 'iPad', 'Android devices'] as device}
					<span class="rounded-full bg-light px-4 py-2 text-sm font-medium text-primary">{device}</span>
				{/each}
			</div>
			<a class="mt-6 inline-flex rounded-lg bg-accent px-5 py-3 font-semibold text-white hover:bg-primary" href="/book-repair">Book this repair</a>
		</div>
	</div>
</section>
