<script lang="ts">
  import { fade, slide } from 'svelte/transition';
  import { onMount } from 'svelte';

  let user = { name: 'John Smith', email: 'john@example.com' };
  let activeTab = 'overview';
  
  let recentRepairs = [
    { id: 'ST-78432', device: 'iPhone 14 Pro', issue: 'Screen Replacement', status: 'Completed', date: '2024-01-15' },
    { id: 'ST-78401', device: 'Samsung S23', issue: 'Battery Replacement', status: 'In Progress', date: '2024-01-18' }
  ];

  let upcomingBookings = [
    { id: 'BK-9234', service: 'Water Damage Check', date: '2024-01-22', time: '2:00 PM' }
  ];
</script>

<svelte:head>
  <title>Dashboard | StarTech Repairs</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] pt-24 pb-20">
  <div class="container mx-auto px-6 max-w-7xl">
    
    <!-- Welcome Header -->
    <div in:fade={{ duration: 500 }} class="mb-12">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, {user.name.split(' ')[0]}!</h1>
      <p class="text-gray-600 dark:text-gray-400">Manage your repairs and bookings</p>
    </div>

    <!-- Tabs -->
    <div class="flex space-x-2 mb-8 border-b border-gray-200 dark:border-gray-800">
      {[
        { id: 'overview', label: 'Overview' },
        { id: 'repairs', label: 'My Repairs' },
        { id: 'bookings', label: 'Bookings' },
        { id: 'settings', label: 'Settings' }
      ].map(tab => (
        <button
          class="px-6 py-3 font-medium transition-colors relative"
          class:text-blue-600={activeTab === tab.id}
          class:text-gray-600={activeTab !== tab.id}
          class:dark:text-gray-400={activeTab !== tab.id}
          on:click={() => activeTab = tab.id}
        >
          {tab.label}
          {#if activeTab === tab.id}
            <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
          {/if}
        </button>
      ))}
    </div>

    <!-- Tab Content -->
    {#if activeTab === 'overview'}
      <div in:fade={{ duration: 300 }} class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <!-- Stats Cards -->
        <div class="bg-white dark:bg-[#161617] rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Active Repairs</h3>
            <div class="text-3xl">🔧</div>
          </div>
          <p class="text-4xl font-bold text-blue-600 dark:text-blue-400">1</p>
          <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">Currently being repaired</p>
        </div>

        <div class="bg-white dark:bg-[#161617] rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Completed</h3>
            <div class="text-3xl">✅</div>
          </div>
          <p class="text-4xl font-bold text-green-600 dark:text-green-400">1</p>
          <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">Total repairs completed</p>
        </div>

        <div class="bg-white dark:bg-[#161617] rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Upcoming</h3>
            <div class="text-3xl">📅</div>
          </div>
          <p class="text-4xl font-bold text-purple-600 dark:text-purple-400">1</p>
          <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">Scheduled appointments</p>
        </div>

        <!-- Recent Activity -->
        <div class="md:col-span-2 lg:col-span-2 bg-white dark:bg-[#161617] rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Repairs</h3>
          <div class="space-y-4">
            {#each recentRepairs as repair}
              <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#0a0a0a] rounded-xl">
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white">{repair.device}</p>
                  <p class="text-sm text-gray-500 dark:text-gray-500">{repair.issue}</p>
                </div>
                <div class="text-right">
                  <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                        class:bg-green-100={repair.status === 'Completed'}
                        class:text-green-700={repair.status === 'Completed'}
                        class:bg-blue-100={repair.status === 'In Progress'}
                        class:text-blue-700={repair.status === 'In Progress'}
                        class:dark:bg-green-900/30={repair.status === 'Completed'}
                        class:dark:text-green-400={repair.status === 'Completed'}
                        class:dark:bg-blue-900/30={repair.status === 'In Progress'}
                        class:dark:text-blue-400={repair.status === 'In Progress'}
                  >
                    {repair.status}
                  </span>
                  <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">{repair.date}</p>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
          <h3 class="text-xl font-bold mb-4">Quick Actions</h3>
          <div class="space-y-3">
            <a href="/book" class="block bg-white/20 hover:bg-white/30 rounded-xl p-4 transition-colors">
              <p class="font-semibold">Book New Repair</p>
              <p class="text-sm opacity-80">Schedule a repair service</p>
            </a>
            <a href="/track" class="block bg-white/20 hover:bg-white/30 rounded-xl p-4 transition-colors">
              <p class="font-semibold">Track Repair</p>
              <p class="text-sm opacity-80">Check repair status</p>
            </a>
          </div>
        </div>
      </div>
    {/if}

    {#if activeTab === 'repairs'}
      <div in:fade={{ duration: 300 }} class="bg-white dark:bg-[#161617] rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 dark:bg-[#0a0a0a]">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">ID</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Device</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Issue</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Date</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
              {#each recentRepairs as repair}
                <tr class="hover:bg-gray-50 dark:hover:bg-[#0a0a0a] transition-colors">
                  <td class="px-6 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">{repair.id}</td>
                  <td class="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">{repair.device}</td>
                  <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{repair.issue}</td>
                  <td class="px-6 py-4">
                    <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                          class:bg-green-100={repair.status === 'Completed'}
                          class:text-green-700={repair.status === 'Completed'}
                          class:bg-blue-100={repair.status === 'In Progress'}
                          class:text-blue-700={repair.status === 'In Progress'}
                    >
                      {repair.status}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{repair.date}</td>
                  <td class="px-6 py-4">
                    <a href="/track?id={repair.id}" class="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">Track</a>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    {/if}

    {#if activeTab === 'bookings'}
      <div in:fade={{ duration: 300 }} class="space-y-6">
        {#each upcomingBookings as booking}
          <div class="bg-white dark:bg-[#161617] rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{booking.service}</h3>
                <p class="text-gray-600 dark:text-gray-400">Booking ID: {booking.id}</p>
              </div>
              <div class="text-right">
                <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">{booking.date}</p>
                <p class="text-gray-600 dark:text-gray-400">{booking.time}</p>
              </div>
            </div>
            <div class="mt-6 flex space-x-4">
              <button class="px-6 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">Cancel</button>
              <button class="px-6 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">Reschedule</button>
            </div>
          </div>
        {/each}
        
        {#if upcomingBookings.length === 0}
          <div class="text-center py-12">
            <div class="text-6xl mb-4">📅</div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">No Upcoming Bookings</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">Schedule your next repair today</p>
            <a href="/book" class="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">Book Now</a>
          </div>
        {/if}
      </div>
    {/if}

    {#if activeTab === 'settings'}
      <div in:fade={{ duration: 300 }} class="max-w-2xl">
        <div class="bg-white dark:bg-[#161617] rounded-2xl p-8 border border-gray-100 dark:border-gray-800">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Account Settings</h3>
          
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
              <input type="text" value={user.name} class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white" />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input type="email" value={user.email} class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white" />
            </div>

            <div class="pt-4">
              <button class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>
