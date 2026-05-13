<script lang="ts">
	import { blogPosts } from '$lib/data/content';
</script>

<svelte:head>
	<title>Repair Guides | Star Tech Phone Repairs</title>
	<meta name="description" content="Repair guides and device care advice from Star Tech Phone Repairs." />
</svelte:head>

<section class="bg-light py-16 md:py-24">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<h1 class="text-4xl font-bold text-primary md:text-5xl">Tech tips and repair guides</h1>
		<p class="mt-5 max-w-2xl text-lg text-muted">Practical advice for charging faults, water damage, screen issues, batteries, and repair decisions.</p>
		<div class="mt-10 grid gap-5 md:grid-cols-3">
			{#each blogPosts as post}
				<article class="rounded-lg border border-border bg-white p-6">
					<p class="text-sm font-semibold text-accent">{post.category}</p>
					<h2 class="mt-3 text-xl font-semibold text-primary">{post.title}</h2>
					<p class="mt-3 text-muted">{post.summary}</p>
					<a class="mt-5 inline-block font-semibold text-accent hover:underline" href={`/blog/${post.slug}`}>Read guide</a>
				</article>
			{/each}
		</div>
	</div>
</section>
