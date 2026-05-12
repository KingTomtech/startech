<script lang="ts">
	import { page } from '$app/stores';
	import { oldSiteServices } from '$lib/data/old-site';

	$: slug = $page.params.slug;
	$: title = slug
		.split('-')
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(' ');
	$: service = oldSiteServices.find((item) => item.title.toLowerCase().includes(slug.split('-')[0]));
</script>

<svelte:head>
	<title>{title} Repairs | Star Tech Phone Repairs</title>
	<meta name="description" content={`${title} repair services in Forrestfield and Perth.`} />
</svelte:head>

<section class="bg-white py-16 md:py-24">
	<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
		<h1 class="text-4xl font-bold text-primary md:text-5xl">{title} repairs</h1>
		<p class="mt-5 text-lg text-muted">Book online, call the team, or visit Star Tech for diagnostics and a clear quote.</p>
		<div class="mt-10 rounded-lg border border-border bg-light p-6">
			<h2 class="text-2xl font-semibold text-primary">Common services</h2>
			<ul class="mt-5 grid gap-3 md:grid-cols-2">
				{#each service?.repairs || ['Screen Replacement', 'Battery Replacement', 'Charging Port Repair', 'Diagnostics'] as repair}
					<li class="rounded-lg bg-white p-3 text-muted">{repair}</li>
				{/each}
			</ul>
		</div>
	</div>
</section>
