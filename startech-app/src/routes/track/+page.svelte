<script lang="ts">
	import { Search, Package, CheckCircle, Clock, AlertCircle } from 'lucide-svelte';
	
	let trackingId = '';
	let repairStatus = null;
	let isLoading = false;
	let error = '';
	
	// Mock status data - will be replaced with PocketBase query
	const mockStatuses = {
		'ST12345': {
			id: 'ST12345',
			device: 'iPhone 14 Pro',
			issue: 'Screen Replacement',
			status: 'in_progress',
			statusLabel: 'In Progress',
			dropoffDate: '2024-01-15',
			estimatedCompletion: '2024-01-15 4:00 PM',
			technician: 'Michael',
			steps: [
				{ label: 'Received', completed: true, time: '10:30 AM' },
				{ label: 'Diagnosis', completed: true, time: '11:00 AM' },
				{ label: 'Repairing', completed: true, time: '11:30 AM' },
				{ label: 'Quality Check', completed: false, time: null },
				{ label: 'Ready for Pickup', completed: false, time: null }
			]
		}
	};
	
	async function trackRepair() {
		if (!trackingId.trim()) {
			error = 'Please enter a tracking ID';
			return;
		}
		
		isLoading = true;
		error = '';
		repairStatus = null;
		
		// Simulate API call - replace with PocketBase query
		await new Promise(resolve => setTimeout(resolve, 800));
		
		const status = mockStatuses[trackingId.toUpperCase()];
		if (status) {
			repairStatus = status;
		} else {
			error = 'Repair not found. Please check your tracking ID.';
		}
		
		isLoading = false;
	}
	
	function getStatusColor(status: string) {
		switch (status) {
			case 'received': return 'bg-gray-100 text-gray-700';
			case 'diagnosis': return 'bg-blue-100 text-blue-700';
			case 'in_progress': return 'bg-accent-blue/10 text-accent-blue';
			case 'quality_check': return 'bg-purple-100 text-purple-700';
			case 'ready': return 'bg-accent-green/10 text-accent-green';
			case 'completed': return 'bg-accent-green/10 text-accent-green';
			default: return 'bg-gray-100 text-gray-700';
		}
	}
</script>

<svelte:head>
	<title>Track Repair | StarTech Repairs</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 py-12">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="max-w-3xl mx-auto">
			<div class="text-center mb-12">
				<h1 class="text-4xl font-bold text-gray-900 mb-4">Track Your Repair</h1>
				<p class="text-lg text-gray-600">Enter your tracking ID to see real-time status</p>
			</div>
			
			<!-- Search Box -->
			<div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
				<div class="flex gap-4">
					<div class="flex-1 relative">
						<input
							type="text"
							bind:value={trackingId}
							placeholder="Enter tracking ID (e.g., ST12345)"
							class="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-accent-blue focus:outline-none transition-colors"
							on:keydown={(e) => e.key === 'Enter' && trackRepair()}
						/>
					</div>
					<button
						type="button"
						class="btn-primary px-8 py-3.5 whitespace-nowrap"
						on:click={trackRepair}
						disabled={isLoading}
					>
						{#if isLoading}
							<Clock class="w-5 h-5 animate-spin" />
						{:else}
							<Search class="w-5 h-5" />
						{/if}
					</button>
				</div>
				
				{#if error}
					<div class="mt-4 flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-xl">
						<AlertCircle class="w-5 h-5 flex-shrink-0" />
						<span>{error}</span>
					</div>
				{/if}
			</div>
			
			<!-- Status Display -->
			{#if repairStatus}
				<div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-slide-up">
					<!-- Header -->
					<div class="bg-gradient-to-r from-accent-blue to-accent-purple text-white p-6">
						<div class="flex items-center justify-between">
							<div>
								<div class="text-sm opacity-80 mb-1">Repair ID</div>
								<div class="text-2xl font-bold">{repairStatus.id}</div>
							</div>
							<div class="text-right">
								<div class="text-sm opacity-80 mb-1">Status</div>
								<span class="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg font-semibold">
									{repairStatus.statusLabel}
								</span>
							</div>
						</div>
					</div>
					
					<!-- Device Info -->
					<div class="p-6 border-b border-gray-100">
						<div class="grid sm:grid-cols-3 gap-6">
							<div>
								<div class="text-sm text-gray-500 mb-1">Device</div>
								<div class="font-semibold text-gray-900">{repairStatus.device}</div>
							</div>
							<div>
								<div class="text-sm text-gray-500 mb-1">Issue</div>
								<div class="font-semibold text-gray-900">{repairStatus.issue}</div>
							</div>
							<div>
								<div class="text-sm text-gray-500 mb-1">Technician</div>
								<div class="font-semibold text-gray-900">{repairStatus.technician}</div>
							</div>
						</div>
					</div>
					
					<!-- Timeline -->
					<div class="p-6">
						<div class="text-sm text-gray-500 mb-6">Repair Progress</div>
						<div class="space-y-4">
							{#each repairStatus.steps as step, i}
								<div class="flex items-start gap-4">
									<div class="flex-shrink-0">
										{#if step.completed}
											<div class="w-8 h-8 rounded-full bg-accent-green text-white flex items-center justify-center">
												<CheckCircle class="w-5 h-5" />
											</div>
										{:else}
											<div class="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center">
												<span class="text-sm font-semibold">{i + 1}</span>
											</div>
										{/if}
									</div>
									<div class="flex-1 pb-4 {i < repairStatus.steps.length - 1 ? 'border-l-2 border-gray-200 ml-4 pl-4' : ''}">
										<div class="font-medium text-gray-900">{step.label}</div>
										{#if step.time}
											<div class="text-sm text-gray-500 mt-1">{step.time}</div>
										{/if}
									</div>
								</div>
							{/each}
						</div>
					</div>
					
					<!-- Footer Info -->
					<div class="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
						<div class="text-sm text-gray-600">
							Dropped off: <span class="font-semibold">{repairStatus.dropoffDate}</span>
						</div>
						<div class="text-sm">
							Estimated completion: <span class="font-semibold text-accent-blue">{repairStatus.estimatedCompletion}</span>
						</div>
					</div>
				</div>
			{/if}
			
			<!-- Empty State -->
			{#if !repairStatus && !error}
				<div class="text-center py-12">
					<Package class="w-16 h-16 text-gray-300 mx-auto mb-4" />
					<h3 class="text-lg font-semibold text-gray-900 mb-2">No repair selected</h3>
					<p class="text-gray-600">Enter your tracking ID above to view status</p>
				</div>
			{/if}
		</div>
	</div>
</div>
