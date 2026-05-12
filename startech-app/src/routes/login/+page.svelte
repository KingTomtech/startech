<script lang="ts">
  import { fade, slide } from 'svelte/transition';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let loading = false;
  let error = '';
  let rememberMe = false;

  async function handleLogin() {
    error = '';
    
    if (!email || !password) {
      error = 'Please fill in all fields';
      return;
    }

    loading = true;

    try {
      // TODO: Integrate with PocketBase auth
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Login attempt:', { email, rememberMe });
      
      goto('/dashboard');
    } catch (err) {
      error = 'Invalid email or password. Please try again.';
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Login | StarTech Repairs</title>
  <meta name="description" content="Access your StarTech account to track repairs and manage bookings." />
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

    <!-- Login Card -->
    <div class="bg-white dark:bg-[#161617] rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">Welcome Back</h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8 text-center">Sign in to access your account</p>

      {#if error}
        <div class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
          <p class="text-red-600 dark:text-red-400 text-sm">{error}</p>
        </div>
      {/if}

      <form on:submit|preventDefault={handleLogin} class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
          <input
            type="email"
            bind:value={email}
            class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="you@example.com"
            autocomplete="email"
          />
        </div>

        <div>
          <div class="flex justify-between items-center mb-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <a href="/forgot-password" class="text-sm text-blue-600 dark:text-blue-400 hover:underline">Forgot?</a>
          </div>
          <input
            type="password"
            bind:value={password}
            class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="••••••••"
            autocomplete="current-password"
          />
        </div>

        <div class="flex items-center">
          <input
            type="checkbox"
            id="remember"
            bind:checked={rememberMe}
            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label for="remember" class="ml-2 text-sm text-gray-600 dark:text-gray-400">Remember me</label>
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
            Signing in...
          {:else}
            Sign In
          {/if}
        </button>
      </form>

      <div class="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
        <p class="text-center text-gray-600 dark:text-gray-400">
          Don't have an account?
          <a href="/register" class="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Create one</a>
        </p>
      </div>
    </div>

    <!-- Back Link -->
    <div class="text-center mt-8">
      <a href="/" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center justify-center">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        Back to Home
      </a>
    </div>
  </div>
</div>
