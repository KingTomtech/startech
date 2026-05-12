<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';

  let services = [
    {
      id: 1,
      title: 'Screen Repair',
      description: 'Premium OLED & LCD replacement with original quality parts.',
      price: 'From $89',
      time: '30 mins',
      icon: '📱',
      popular: true
    },
    {
      id: 2,
      title: 'Battery Replacement',
      description: 'Restore battery life with high-capacity certified cells.',
      price: 'From $69',
      time: '20 mins',
      icon: '🔋',
      popular: false
    },
    {
      id: 3,
      title: 'Water Damage',
      description: 'Advanced ultrasonic cleaning and component repair.',
      price: 'From $99',
      time: '24 hours',
      icon: '💧',
      popular: false
    },
    {
      id: 4,
      title: 'Charging Port',
      description: 'Fix loose or non-functional charging connections.',
      price: 'From $79',
      time: '45 mins',
      icon: '⚡',
      popular: false
    },
    {
      id: 5,
      title: 'Camera Repair',
      description: 'Replace cracked lenses or fix focus issues.',
      price: 'From $129',
      time: '1 hour',
      icon: '📷',
      popular: false
    },
    {
      id: 6,
      title: 'Back Glass',
      description: 'Laser removal and precision glass replacement.',
      price: 'From $149',
      time: '2 hours',
      icon: '🔙',
      popular: false
    }
  ];

  let selectedService: any = null;

  function selectService(service: any) {
    selectedService = service;
    window.location.href = `/book?service=${service.id}`;
  }
</script>

<svelte:head>
  <title>Services | StarTech Repairs</title>
  <meta name="description" content="Professional phone repair services in Australia. Screen, battery, water damage and more." />
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-[#0a0a0a]">
  <!-- Hero Section -->
  <section class="relative pt-32 pb-20 overflow-hidden">
    <div class="container mx-auto px-6 text-center">
      <h1 in:fade={{ duration: 600 }} class="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
        Our Services
      </h1>
      <p in:fade={{ duration: 600, delay: 200 }} class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Expert repairs using premium parts. Fast turnaround times with lifetime warranty on all services.
      </p>
    </div>
  </section>

  <!-- Services Grid -->
  <section class="py-20">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each services as service (service.id)}
          <div 
            in:slide={{ duration: 400, delay: service.id * 100 }}
            class="group relative bg-white dark:bg-[#161617] rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 cursor-pointer overflow-hidden"
            on:click={() => selectService(service)}
          >
            {#if service.popular}
              <div class="absolute top-4 right-4 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Most Popular
              </div>
            {/if}
            
            <div class="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
              {service.icon}
            </div>
            
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {service.title}
            </h3>
            
            <p class="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              {service.description}
            </p>
            
            <div class="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
              <div>
                <span class="block text-sm text-gray-500 dark:text-gray-500">Starting at</span>
                <span class="text-lg font-bold text-blue-600 dark:text-blue-400">{service.price}</span>
              </div>
              <div class="text-right">
                <span class="block text-sm text-gray-500 dark:text-gray-500">Turnaround</span>
                <span class="text-sm font-semibold text-gray-900 dark:text-white">{service.time}</span>
              </div>
            </div>

            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-20">
    <div class="container mx-auto px-6">
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
        <h2 class="text-4xl font-bold mb-4">Not sure what you need?</h2>
        <p class="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          Our experts can diagnose your device for free. Book a consultation today.
        </p>
        <a 
          href="/contact" 
          class="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors duration-300"
        >
          Contact Us
        </a>
      </div>
    </div>
  </section>
</div>
