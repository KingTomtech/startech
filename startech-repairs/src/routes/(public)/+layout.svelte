<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Notification from '$lib/components/ui/Notification.svelte';
	import { notifications } from '$lib/stores';
</script>

<div class="min-h-screen flex flex-col">
	<Header />
	<main class="flex-1">
		<slot />
	</main>
	<Footer />
	<Notification notifications={$notifications} />
</div>
