<script lang="ts">
	const faqs = [
		{ q: 'Do I need an appointment?', a: 'Walk-ins are welcome, but booking online helps the team prepare parts and prioritise your repair.' },
		{ q: 'How long do repairs take?', a: 'Many screen and battery repairs are completed same day. Complex repairs and water damage can take longer after diagnosis.' },
		{ q: 'Do repairs include warranty?', a: 'Most repairs include warranty coverage. The exact term depends on the part and repair type.' },
		{ q: 'Can I track my repair online?', a: 'Yes. Use your booking ID on the repair tracking page to view the latest status.' },
		{ q: 'What if my device cannot be fixed?', a: 'You will receive clear advice before paid work continues, aligned with the no fix no fee policy.' }
	];
</script>

<svelte:head>
	<title>FAQ | Star Tech Phone Repairs</title>
	<meta name="description" content="Common questions about phone repair bookings, turnaround times, warranties, and repair tracking." />
</svelte:head>

<section class="bg-light py-16 md:py-24">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<h1 class="text-4xl font-bold text-primary md:text-5xl">Repair FAQ</h1>
		<div class="mt-10 space-y-4">
			{#each faqs as faq}
				<details class="rounded-lg border border-border bg-white p-5">
					<summary class="cursor-pointer font-semibold text-primary">{faq.q}</summary>
					<p class="mt-3 text-muted">{faq.a}</p>
				</details>
			{/each}
		</div>
	</div>
</section>
