<script lang="ts">
	import { oldSitePriceCategories } from '$lib/data/old-site';
</script>

<svelte:head>
	<title>Repair Price List | Star Tech Phone Repairs</title>
	<meta name="description" content="Phone, tablet, MacBook, Samsung, iPhone, and repair service pricing from Star Tech Phone Repairs." />
</svelte:head>

<section class="bg-light py-16 md:py-24">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<h1 class="text-4xl font-bold text-primary md:text-5xl">Repair price list</h1>
		<p class="mt-5 max-w-2xl text-lg text-muted">Pricing extracted from the existing Star Tech site. Final pricing is confirmed after diagnostics and depends on device condition and part availability.</p>

		<div class="mt-10 space-y-10">
			{#each oldSitePriceCategories as category}
				<section>
					<h2 class="mb-4 text-2xl font-semibold text-primary">{category.title}</h2>
					<div class="overflow-hidden rounded-lg border border-border bg-white">
						{#each category.items as item}
							<div class="grid gap-3 border-b border-border p-4 last:border-b-0 md:grid-cols-[1.2fr_1fr_auto] md:items-center">
								<strong class="text-primary">{item.name}</strong>
								<span class="text-sm text-muted">{Object.keys(item.prices).join(', ')}</span>
								<span class="font-semibold text-accent">{Object.values(item.prices).join(', ')}</span>
							</div>
						{/each}
					</div>
				</section>
			{/each}
		</div>

		<p class="mt-8 rounded-lg bg-white p-5 text-sm text-muted">
			All repairs and parts include warranty where applicable. Prices are estimates and may vary based on device condition. Free diagnostics are available.
		</p>
	</div>
</section>
