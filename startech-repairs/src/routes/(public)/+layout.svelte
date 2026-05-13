<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Notification from '$lib/components/ui/Notification.svelte';
	import { notifications } from '$lib/stores';

	const businessJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		name: 'Star Tech Phone Repairs',
		url: 'https://www.startechphonerepairs.com.au/',
		telephone: '+61 8 9453 9954',
		address: {
			'@type': 'PostalAddress',
			streetAddress: '33 Crimson Blvd',
			addressLocality: 'Forrestfield',
			addressRegion: 'WA',
			postalCode: '6058',
			addressCountry: 'AU'
		},
		areaServed: ['Forrestfield', 'Perth', 'Western Australia'],
		priceRange: '$$',
		description: 'Phone, tablet, computer and console repair services in Forrestfield and Perth.'
	};
</script>

<svelte:head>
	<meta name="robots" content="index,follow" />
	<meta property="og:site_name" content="Star Tech Phone Repairs" />
	<meta property="og:type" content="website" />
	<script type="application/ld+json">{JSON.stringify(businessJsonLd)}</script>
</svelte:head>

<div class="min-h-screen flex flex-col">
	<Header />
	<main class="flex-1">
		<slot />
	</main>
	<Footer />
	<Notification notifications={$notifications} />
</div>
