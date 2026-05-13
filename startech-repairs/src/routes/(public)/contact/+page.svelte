<script lang="ts">
	import { Clock, Mail, MapPin, Phone } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Contact | Star Tech Phone Repairs</title>
	<meta name="description" content="Contact Star Tech Phone Repairs at 33 Crimson Blvd, Forrestfield WA 6058." />
</svelte:head>

<section class="bg-white py-16 md:py-24">
	<div class="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
		<div>
			<h1 class="text-4xl font-bold text-primary md:text-5xl">Contact Star Tech</h1>
			<p class="mt-5 text-lg text-muted">Need help choosing a repair, checking part availability, or following up on a booking? Reach the Forrestfield team here.</p>
			<div class="mt-8 space-y-4">
				<a class="flex items-center gap-3 text-primary hover:text-accent" href="tel:+61420994662"><Phone size={20} /> +61 420 994 662</a>
				<a class="flex items-center gap-3 text-primary hover:text-accent" href="mailto:info@startechphonerepairs.com.au"><Mail size={20} /> info@startechphonerepairs.com.au</a>
				<a class="flex items-center gap-3 text-primary hover:text-accent" href="https://maps.google.com/?q=33+Crimson+Bvd,+Forrestfield+WA+6058"><MapPin size={20} /> 33 Crimson Bvd, Forrestfield WA 6058</a>
				<p class="flex items-center gap-3 text-primary"><Clock size={20} /> Mon closed, Tue-Fri 7AM-7PM, Sat 7AM-5PM, Sun closed</p>
			</div>
		</div>
		<div class="rounded-lg border border-border bg-light p-6">
			<h2 class="text-2xl font-semibold text-primary">Best next step</h2>
			<p class="mt-3 text-muted">For the fastest service, book online with your device model and issue details. You will receive a booking ID for tracking.</p>
			<a href="/book-repair" class="mt-6 inline-flex rounded-lg bg-primary px-5 py-3 font-semibold text-white hover:bg-secondary">Book a repair</a>
		</div>
	</div>
</section>
