<script lang="ts">
  import { fade, slide } from 'svelte/transition';

  let team = [
    { name: 'Alex Chen', role: 'Lead Technician', bio: '10+ years experience in micro-soldering and board-level repairs.', image: '👨‍🔧' },
    { name: 'Sarah Johnson', role: 'Customer Success', bio: 'Dedicated to ensuring every customer has a seamless repair experience.', image: '👩‍💼' },
    { name: 'Marcus Williams', role: 'Quality Assurance', bio: 'Former Apple certified technician with expertise in premium devices.', image: '🔍' }
  ];

  let stats = [
    { value: '50,000+', label: 'Repairs Completed' },
    { value: '98%', label: 'Success Rate' },
    { value: '15min', label: 'Avg. Turnaround' },
    { value: 'Lifetime', label: 'Warranty' }
  ];
</script>

<svelte:head>
  <title>About Us | StarTech Repairs</title>
  <meta name="description" content="Learn about StarTech Repairs - Australia's most trusted phone repair service." />
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-[#0a0a0a]">
  <!-- Hero -->
  <section class="relative pt-32 pb-20">
    <div class="container mx-auto px-6 text-center">
      <h1 in:fade={{ duration: 600 }} class="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
        About StarTech
      </h1>
      <p in:fade={{ duration: 600, delay: 200 }} class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
        We're not just repair technicians – we're technology enthusiasts dedicated to extending the life of your devices with precision and care.
      </p>
    </div>
  </section>

  <!-- Stats -->
  <section class="py-16 bg-white dark:bg-[#161617]">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        {#each stats as stat, index}
          <div in:slide={{ duration: 400, delay: index * 100 }} class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stat.value}</div>
            <div class="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Story -->
  <section class="py-20">
    <div class="container mx-auto px-6">
      <div class="max-w-4xl mx-auto">
        <h2 in:fade class="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Our Story</h2>
        <div class="prose prose-lg dark:prose-invert mx-auto text-gray-600 dark:text-gray-400">
          <p>
            Founded in 2015, StarTech Repairs began with a simple mission: to provide honest, high-quality phone repairs without the markup of big corporations. What started as a small workshop in Melbourne has grown into one of Australia's most trusted repair networks.
          </p>
          <p>
            We believe in transparency, quality, and speed. Every repair comes with a detailed diagnosis, genuine or premium-grade parts, and a lifetime warranty on our workmanship. Our technicians undergo rigorous training and stay updated with the latest device technologies.
          </p>
          <p>
            Today, we serve thousands of customers across Australia, maintaining the same personal touch and attention to detail that defined us from day one.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Team -->
  <section class="py-20 bg-white dark:bg-[#161617]">
    <div class="container mx-auto px-6">
      <h2 in:fade class="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Meet Our Team</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {#each team as member, index}
          <div in:slide={{ duration: 400, delay: index * 150 }} class="bg-gray-50 dark:bg-[#0a0a0a] rounded-3xl p-8 text-center border border-gray-100 dark:border-gray-800">
            <div class="text-6xl mb-4">{member.image}</div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
            <p class="text-blue-600 dark:text-blue-400 font-medium mb-4">{member.role}</p>
            <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{member.bio}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Values -->
  <section class="py-20">
    <div class="container mx-auto px-6">
      <h2 in:fade class="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Our Values</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          { title: 'Transparency', desc: 'No hidden fees. Clear diagnostics. Honest advice.', icon: '🔍' },
          { title: 'Quality', desc: 'Premium parts. Expert technicians. Lifetime warranty.', icon: '⭐' },
          { title: 'Speed', desc: 'Fast turnaround. Most repairs done in under an hour.', icon: '⚡' }
        ].map((value, index) => (
          <div in:slide={{ duration: 400, delay: index * 150 }} class="text-center p-6">
            <div class="text-5xl mb-4">{value.icon}</div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{value.title}</h3>
            <p class="text-gray-600 dark:text-gray-400">{value.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
</div>
