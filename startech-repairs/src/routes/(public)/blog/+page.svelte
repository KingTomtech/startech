<script lang="ts">
	const posts = [
		{ title: 'What to do when your iPhone will not charge', category: 'iPhone', summary: 'Try cable, port, and battery checks before replacing parts.' },
		{ title: 'How to spot water damage early', category: 'Repair Guide', summary: 'Fast power-off and inspection can improve recovery chances.' },
		{ title: 'Repair or replace your phone?', category: 'Buying Advice', summary: 'Compare repair cost, battery health, storage needs, and resale value.' }
	];
</script>

<svelte:head>
	<title>Need Help | Star Tech Phone Repairs</title>
	<meta name="description" content="Repair guides and device care advice from Star Tech Phone Repairs." />
</svelte:head>

<section class="bg-light py-16 md:py-24">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<h1 class="text-4xl font-bold text-primary md:text-5xl">Tech tips and repair guides</h1>
		<p class="mt-5 max-w-2xl text-lg text-muted">A simple content hub ready for SEO articles from the old Need Help section.</p>
		<div class="mt-10 grid gap-5 md:grid-cols-3">
			{#each posts as post}
				<article class="rounded-lg border border-border bg-white p-6">
					<p class="text-sm font-semibold text-accent">{post.category}</p>
					<h2 class="mt-3 text-xl font-semibold text-primary">{post.title}</h2>
					<p class="mt-3 text-muted">{post.summary}</p>
				</article>
			{/each}
		</div>
	</div>
</section>
