<script lang="ts">
	import { page } from '$app/stores';

	$: status = $page.status;
	$: message = $page.error?.message || 'Something went wrong.';
</script>

<svelte:head>
	<title>{status} | Star Tech Phone Repairs</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="min-h-[70vh] bg-light py-16 md:py-24">
	<div class="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
		<p class="text-sm font-semibold uppercase text-accent">Error {status}</p>
		<h1 class="mt-4 text-4xl font-bold text-primary md:text-5xl">
			{status === 404 ? 'Page not found' : 'We could not load that page'}
		</h1>
		<p class="mt-5 text-lg text-muted">{message}</p>
		<div class="mt-8 flex flex-wrap justify-center gap-3">
			<a class="inline-flex rounded-lg bg-accent px-5 py-3 font-semibold text-white hover:bg-primary" href="/">Go home</a>
			<a class="inline-flex rounded-lg border-2 border-primary px-5 py-3 font-semibold text-primary hover:bg-primary hover:text-white" href="/contact">Contact support</a>
		</div>
	</div>
</section>
