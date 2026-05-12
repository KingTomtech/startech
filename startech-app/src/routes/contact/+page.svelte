<script lang="ts">
  import { fade, slide } from 'svelte/transition';

  let form = {
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: ''
  };

  let submitted = false;
  let loading = false;

  async function handleSubmit() {
    loading = true;
    
    // TODO: Replace with actual form submission to backend
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    submitted = true;
    loading = false;
    
    setTimeout(() => {
      submitted = false;
      form = { name: '', email: '', phone: '', subject: 'general', message: '' };
    }, 5000);
  }
</script>

<svelte:head>
  <title>Contact Us | StarTech Repairs</title>
  <meta name="description" content="Get in touch with StarTech Repairs. We're here to help with any questions." />
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] pt-32 pb-20">
  <div class="container mx-auto px-6 max-w-6xl">
    
    <!-- Header -->
    <div in:fade={{ duration: 600 }} class="text-center mb-16">
      <h1 class="text-5xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Have a question? Need help with a repair? We're here to assist you.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      
      <!-- Contact Form -->
      <div in:slide={{ duration: 400, delay: 200 }}>
        <div class="bg-white dark:bg-[#161617] rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-800">
          {#if submitted}
            <div class="text-center py-12">
              <div class="text-6xl mb-4">✅</div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
              <p class="text-gray-600 dark:text-gray-400">We'll get back to you within 24 hours.</p>
            </div>
          {:else}
            <form on:submit|preventDefault={handleSubmit} class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name *</label>
                <input
                  type="text"
                  bind:value={form.name}
                  required
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email *</label>
                <input
                  type="email"
                  bind:value={form.email}
                  required
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                <input
                  type="tel"
                  bind:value={form.phone}
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="+61 400 000 000"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject *</label>
                <select
                  bind:value={form.subject}
                  required
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  <option value="general">General Inquiry</option>
                  <option value="support">Repair Support</option>
                  <option value="warranty">Warranty Claim</option>
                  <option value="business">Business Partnerships</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message *</label>
                <textarea
                  bind:value={form.message}
                  required
                  rows="5"
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                class="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center"
              >
                {#if loading}
                  <svg class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Sending...
                {:else}
                  Send Message
                {/if}
              </button>
            </form>
          {/if}
        </div>
      </div>

      <!-- Contact Info -->
      <div in:slide={{ duration: 400, delay: 400 }} class="space-y-8">
        <div class="bg-white dark:bg-[#161617] rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-800">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get in Touch</h3>
          
          <div class="space-y-6">
            <div class="flex items-start space-x-4">
              <div class="text-2xl">📍</div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">Visit Us</h4>
                <p class="text-gray-600 dark:text-gray-400">123 Tech Street, Melbourne VIC 3000<br/>Australia</p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="text-2xl">📞</div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">Call Us</h4>
                <p class="text-gray-600 dark:text-gray-400">+61 3 9000 0000<br/>Mon-Fri 9am-6pm, Sat 10am-4pm</p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="text-2xl">✉️</div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">Email Us</h4>
                <p class="text-gray-600 dark:text-gray-400">support@startechrepairs.au<br/>responses within 24 hours</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
          <h3 class="text-2xl font-bold mb-4">Emergency Repair?</h3>
          <p class="opacity-90 mb-6">
            For urgent repairs, walk-ins are always welcome. No appointment necessary.
          </p>
          <a href="/book" class="inline-block bg-white text-blue-600 font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors">
            Book Now
          </a>
        </div>

        <div class="bg-white dark:bg-[#161617] rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-800">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">FAQ</h3>
          <div class="space-y-4">
            {[
              { q: 'How long do repairs take?', a: 'Most repairs are completed within 30-60 minutes.' },
              { q: 'Do you offer warranty?', a: 'Yes, lifetime warranty on all repairs.' },
              { q: 'Can I book online?', a: 'Absolutely! Use our booking system for priority service.' }
            ].map((faq) => (
              <details class="group">
                <summary class="font-medium text-gray-900 dark:text-white cursor-pointer list-none flex justify-between items-center">
                  {faq.q}
                  <span class="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p class="mt-2 text-gray-600 dark:text-gray-400 text-sm">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
