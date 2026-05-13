<script lang="ts">
	import { page } from '$app/stores';
	import { findBlogPost } from '$lib/data/content';

	$: post = findBlogPost($page.params.slug);
	$: articleJsonLd = post
		? {
				'@context': 'https://schema.org',
				'@type': 'Article',
				headline: post.title,
				description: post.summary,
				datePublished: post.published,
				author: { '@type': 'Organization', name: 'Star Tech Phone Repairs' },
				publisher: { '@type': 'Organization', name: 'Star Tech Phone Repairs' }
			}
		: null;
</script>

<svelte:head>
	<title>{post ? `${post.title} | Star Tech Phone Repairs` : 'Guide Not Found | Star Tech Phone Repairs'}</title>
	<meta name="description" content={post?.summary || 'Repair guide from Star Tech Phone Repairs.'} />
	{#if articleJsonLd}
		<script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
	{/if}
</svelte:head>

<section class="bg-white py-16 md:py-24">
	<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
		<a class="font-semibold text-accent hover:underline" href="/blog">Back to guides</a>
		{#if post}
			<p class="mt-8 text-sm font-semibold uppercase text-accent">{post.category} - {post.readTime}</p>
			<h1 class="mt-3 text-4xl font-bold text-primary md:text-5xl">{post.title}</h1>
			<p class="mt-5 text-lg text-muted">{post.summary}</p>

			<div class="mt-10 space-y-8">
				{#each post.sections as section}
					<section>
						<h2 class="text-2xl font-semibold text-primary">{section.heading}</h2>
						<p class="mt-3 leading-8 text-muted">{section.body}</p>
					</section>
				{/each}
			</div>

			<div class="mt-12 rounded-lg border border-border bg-light p-6">
				<h2 class="text-xl font-semibold text-primary">Need a technician to check it?</h2>
				<p class="mt-2 text-muted">Book a repair or visit Star Tech in Forrestfield for diagnostics and a clear quote.</p>
				<a class="mt-5 inline-flex rounded-lg bg-accent px-5 py-3 font-semibold text-white hover:bg-primary" href="/book-repair">Book repair</a>
			</div>
		{:else}
			<h1 class="mt-8 text-4xl font-bold text-primary">Guide not found</h1>
			<p class="mt-4 text-muted">This repair guide is not available yet.</p>
		{/if}
	</div>
</section>
