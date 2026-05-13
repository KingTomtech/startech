<script lang="ts">
  import { fade, slide } from 'svelte/transition';
  import { goto } from '$app/navigation';

  let form = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    terms: false
  };

  let loading = false;
  let error = '';

  async function handleRegister() {
    error = '';
    
    if (!form.name || !form.email || !form.password) {
      error = 'Please fill in all required fields';
      return;
    }

    if (form.password !== form.confirmPassword) {
      error = 'Passwords do not match';
      return;
    }

    if (!form.terms) {
      error = 'You must accept the terms and conditions';
      return;
    }

    loading = true;

    try {
      // TODO: Integrate with PocketBase registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Registration:', { ...form, password: '[REDACTED]' });
      
      goto('/login?registered=true');
    } catch (err) {
      error = 'Registration failed. Please try again.';
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Create Account | StarTech Repairs</title>
  <meta name="description" content="Create your StarTech account for faster bookings and repair tracking." />
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex items-center justify-center p-6">
  <div in:fade={{ duration: 500 }} class="w-full max-w-md">
    
    <!-- Logo -->
    <div class="text-center mb-8">
      <a href="/" class="inline-block">
        <div class="flex items-center justify-center space-x-2">
          <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
            </svg>
          </div>
          <span class="text-2xl font-bold text-gray-900 dark:text-white">StarTech</span>
        </div>
      </a>
    </div>

    <!-- Register Card -->
    <div class="bg-white dark:bg-[#161617] rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">Create Account</h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8 text-center">Join thousands of satisfied customers</p>

      {#if error}
        <div class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
          <p class="text-red-600 dark:text-red-400 text-sm">{error}</p>
        </div>
      {/if}

      <form on:submit|preventDefault={handleRegister} class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name *</label>
          <input
            type="text"
            bind:value={form.name}
            required
            class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="John Smith"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address *</label>
          <input
            type="email"
            bind:value={form.email}
            required
            class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
          <input
            type="tel"
            bind:value={form.phone}
            class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="+61 400 000 000"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password *</label>
          <input
            type="password"
            bind:value={form.password}
            required
            class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm Password *</label>
          <input
            type="password"
            bind:value={form.confirmPassword}
            required
            class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="••••••••"
          />
        </div>

        <div class="flex items-start">
          <input
            type="checkbox"
            id="terms"
            bind:checked={form.terms}
            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
          />
          <label for="terms" class="ml-2 text-sm text-gray-600 dark:text-gray-400">
            I agree to the <a href="/terms" class="text-blue-600 dark:text-blue-400 hover:underline">Terms of Service</a> and <a href="/privacy" class="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a>
          </label>
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
            Creating account...
          {:else}
            Create Account
          {/if}
        </button>
      </form>

      <div class="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
        <p class="text-center text-gray-600 dark:text-gray-400">
          Already have an account?
          <a href="/login" class="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Sign in</a>
        </p>
      </div>
    </div>
  </div>
</div>
