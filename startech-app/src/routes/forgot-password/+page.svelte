<script lang="ts">
  import { fade, slide } from 'svelte/transition';

  let email = '';
  let submitted = false;
  let loading = false;

  async function handleSubmit() {
    if (!email) return;
    
    loading = true;
    await new Promise(resolve => setTimeout(resolve, 1500));
    submitted = true;
    loading = false;
  }
</script>

<svelte:head>
  <title>Forgot Password | StarTech Repairs</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex items-center justify-center p-6">
  <div in:fade={{ duration: 500 }} class="w-full max-w-md">
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

    <div class="bg-white dark:bg-[#161617] rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">Reset Password</h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8 text-center">Enter your email to receive reset instructions</p>

      {#if submitted}
        <div class="text-center py-8">
          <div class="text-6xl mb-4">📧</div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Check Your Email</h3>
          <p class="text-gray-600 dark:text-gray-400">We've sent password reset instructions to {email}</p>
        </div>
      {:else}
        <form on:submit|preventDefault={handleSubmit} class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
            <input
              type="email"
              bind:value={email}
              required
              class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="you@example.com"
            />
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
              Send Reset Link
            {/if}
          </button>
        </form>
      {/if}

      <div class="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 text-center">
        <a href="/login" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center justify-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Back to Login
        </a>
      </div>
    </div>
  </div>
</div>
