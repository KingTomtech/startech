<script lang="ts">
	import { oldSitePriceCategories } from '$lib/data/old-site';

	let search = '';
	let activeBrand = 'All';

	const brands = ['All', ...Array.from(new Set(oldSitePriceCategories.map((category) => category.brand)))];

	$: query = search.trim().toLowerCase();
	$: filteredCategories = oldSitePriceCategories
		.filter((category) => activeBrand === 'All' || category.brand === activeBrand)
		.map((category) => ({
			...category,
			items: category.items.filter((item) => {
				const priceText = Object.entries(item.prices)
					.map(([repair, price]) => `${repair} ${price}`)
					.join(' ');
				return `${category.title} ${category.brand} ${item.name} ${priceText}`
					.toLowerCase()
					.includes(query);
			})
		}))
		.filter((category) => category.items.length > 0);

	$: resultCount = filteredCategories.reduce((count, category) => count + category.items.length, 0);
</script>

<svelte:head>
	<title>Repair Price List | Star Tech Phone Repairs</title>
	<meta name="description" content="Phone, tablet, MacBook, Samsung, iPhone, and repair service pricing from Star Tech Phone Repairs." />
</svelte:head>

<section class="bg-light py-16 md:py-24">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
			<div>
				<h1 class="text-4xl font-bold text-primary md:text-5xl">Repair price list</h1>
				<p class="mt-5 text-lg text-muted">Search by model, repair type, or brand. Final pricing is confirmed after diagnostics and depends on device condition and part availability.</p>
			</div>
			<div class="rounded-lg border border-border bg-white p-4 shadow-sm">
				<label class="block text-sm font-medium text-primary" for="price-search">Search prices</label>
				<input
					id="price-search"
					class="mt-2 w-full rounded-lg border border-border px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-accent"
					placeholder="Try iPhone 15, battery, S24, iPad..."
					bind:value={search}
				/>
				<div class="mt-4 flex flex-wrap gap-2">
					{#each brands as brand}
						<button
							class="rounded-lg px-3 py-2 text-sm font-semibold transition-colors {activeBrand === brand ? 'bg-primary text-white' : 'bg-light text-primary hover:bg-border'}"
							on:click={() => activeBrand = brand}
						>
							{brand}
						</button>
					{/each}
				</div>
				<p class="mt-3 text-sm text-muted">{resultCount} matching price item{resultCount === 1 ? '' : 's'}</p>
			</div>
		</div>

		<div class="mt-10 grid gap-6 lg:grid-cols-2">
			{#each filteredCategories as category}
				<section class="rounded-lg border border-border bg-white p-5 shadow-sm">
					<div class="mb-4 flex items-start justify-between gap-4">
						<div>
							<p class="text-sm font-semibold text-accent">{category.brand}</p>
							<h2 class="text-2xl font-semibold text-primary">{category.title}</h2>
						</div>
						<span class="rounded-full bg-light px-3 py-1 text-sm font-semibold text-muted">{category.items.length}</span>
					</div>
					<div class="divide-y divide-border">
						{#each category.items as item}
							<div class="grid gap-2 py-4 md:grid-cols-[1fr_auto] md:items-center">
								<div>
									<strong class="text-primary">{item.name}</strong>
									<p class="text-sm text-muted">{Object.keys(item.prices).join(', ')}</p>
								</div>
								<span class="text-lg font-bold text-accent">{Object.values(item.prices).join(', ')}</span>
							</div>
						{/each}
					</div>
				</section>
			{:else}
				<div class="rounded-lg border border-border bg-white p-8 text-center lg:col-span-2">
					<h2 class="text-2xl font-semibold text-primary">No matching prices found</h2>
					<p class="mt-2 text-muted">Try a model name, brand, or repair type like screen, battery, or charging port.</p>
				</div>
			{/each}
		</div>

		<p class="mt-8 rounded-lg bg-white p-5 text-sm text-muted">
			All repairs and parts include warranty where applicable. Prices are estimates and may vary based on device condition. Free diagnostics are available.
		</p>
	</div>
</section>
