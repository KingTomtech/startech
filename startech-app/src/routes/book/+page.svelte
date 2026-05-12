<script lang="ts">
	import { Search, ChevronDown } from 'lucide-svelte';
	
	const devices = [
		{ category: 'iPhone', models: ['iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15', 'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14', 'iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13', 'iPhone 12 Pro Max', 'iPhone 12 Pro', 'iPhone 12', 'iPhone 11 Pro Max', 'iPhone 11 Pro', 'iPhone 11', 'iPhone XS Max', 'iPhone XS', 'iPhone XR', 'iPhone X', 'iPhone 8 Plus', 'iPhone 8', 'iPhone 7 Plus', 'iPhone 7', 'Other iPhone'] },
		{ category: 'Samsung', models: ['Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24', 'Galaxy S23 Ultra', 'Galaxy S23+', 'Galaxy S23', 'Galaxy S22 Ultra', 'Galaxy S22+', 'Galaxy S22', 'Galaxy S21 Ultra', 'Galaxy S21+', 'Galaxy S21', 'Galaxy Z Fold 5', 'Galaxy Z Flip 5', 'Galaxy A54', 'Galaxy A34', 'Other Samsung'] },
		{ category: 'iPad', models: ['iPad Pro 12.9"', 'iPad Pro 11"', 'iPad Air', 'iPad mini', 'iPad 10th Gen', 'iPad 9th Gen', 'Other iPad'] },
		{ category: 'Other', models: ['Google Pixel', 'OnePlus', 'Xiaomi', 'Huawei', 'Sony', 'LG', 'Other Brand'] }
	];
	
	const issues = [
		{ id: 'screen', label: 'Cracked Screen', icon: '📱', popular: true },
		{ id: 'battery', label: 'Battery Replacement', icon: '🔋', popular: true },
		{ id: 'charging', label: 'Charging Port', icon: '⚡', popular: true },
		{ id: 'camera', label: 'Camera Repair', icon: '📷', popular: false },
		{ id: 'speaker', label: 'Speaker/Mic', icon: '🔊', popular: false },
		{ id: 'button', label: 'Button Repair', icon: '🔘', popular: false },
		{ id: 'water', label: 'Water Damage', icon: '💧', popular: false },
		{ id: 'other', label: 'Other Issue', icon: '🔧', popular: false }
	];
	
	let selectedCategory = '';
	let selectedModel = '';
	let selectedIssue = '';
	let showCategoryDropdown = false;
	let showModelDropdown = false;
	
	function selectCategory(category: string) {
		selectedCategory = category;
		selectedModel = '';
		showCategoryDropdown = false;
		showModelDropdown = true;
	}
	
	function selectModel(model: string) {
		selectedModel = model;
		showModelDropdown = false;
	}
	
	function selectIssue(issue: string) {
		selectedIssue = issue;
	}
	
	function handleSubmit() {
		if (selectedCategory && selectedModel && selectedIssue) {
			console.log('Booking:', { category: selectedCategory, model: selectedModel, issue: selectedIssue });
		}
	}
</script>

<svelte:head>
	<title>Book Repair | StarTech Repairs</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 py-12">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="max-w-3xl mx-auto">
			<div class="text-center mb-12">
				<h1 class="text-4xl font-bold text-gray-900 mb-4">Book Your Repair</h1>
				<p class="text-lg text-gray-600">Select your device and issue to get started</p>
			</div>
			
			<div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
				<div class="mb-8">
					<label class="block text-sm font-semibold text-gray-700 mb-3">Step 1: Choose Device Type</label>
					<div class="relative">
						<button 
							type="button"
							class="w-full flex items-center justify-between px-4 py-3.5 bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 rounded-xl transition-all text-left"
							on:click={() => { showCategoryDropdown = !showCategoryDropdown; showModelDropdown = false; }}
						>
							<span class="{selectedCategory ? 'text-gray-900' : 'text-gray-500'}">
								{selectedCategory || 'Select device type'}
							</span>
							<ChevronDown class="w-5 h-5 text-gray-400" />
						</button>
						
						{#if showCategoryDropdown}
							<div class="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden animate-scale-in">
								{#each devices as device}
									<button
										type="button"
										class="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
										on:click={() => selectCategory(device.category)}
									>
										<span class="font-medium text-gray-900">{device.category}</span>
									</button>
								{/each}
							</div>
						{/if}
					</div>
				</div>
				
				{#if selectedCategory}
					<div class="mb-8 animate-slide-up">
						<label class="block text-sm font-semibold text-gray-700 mb-3">Step 2: Choose Model</label>
						<div class="relative">
							<button 
								type="button"
								class="w-full flex items-center justify-between px-4 py-3.5 bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 rounded-xl transition-all text-left"
								on:click={() => showModelDropdown = !showModelDropdown}
							>
								<span class="{selectedModel ? 'text-gray-900' : 'text-gray-500'}">
									{selectedModel || 'Select your model'}
								</span>
								<ChevronDown class="w-5 h-5 text-gray-400" />
							</button>
							
							{#if showModelDropdown}
								<div class="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden animate-scale-in max-h-64 overflow-y-auto">
									{#each devices.find(d => d.category === selectedCategory)?.models as model}
										<button
											type="button"
											class="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
											on:click={() => selectModel(model)}
										>
											<span class="text-gray-900">{model}</span>
										</button>
									{/each}
								</div>
							{/if}
						</div>
					</div>
				{/if}
				
				{#if selectedModel}
					<div class="mb-8 animate-slide-up">
						<label class="block text-sm font-semibold text-gray-700 mb-3">Step 3: What needs repair?</label>
						<div class="grid sm:grid-cols-2 gap-3">
							{#each issues as issue}
								<button
									type="button"
									class="flex items-center gap-3 p-4 border-2 rounded-xl transition-all text-left {selectedIssue === issue.id ? 'border-accent-blue bg-blue-50' : 'border-gray-200 hover:border-gray-300'}"
									on:click={() => selectIssue(issue.id)}
								>
									<span class="text-2xl">{issue.icon}</span>
									<div class="flex-1">
										<div class="font-medium text-gray-900">{issue.label}</div>
										{#if issue.popular}
											<div class="text-xs text-accent-blue font-medium mt-0.5">Most Common</div>
										{/if}
									</div>
								</button>
							{/each}
						</div>
					</div>
				{/if}
				
				{#if selectedIssue}
					<div class="animate-slide-up">
						<button 
							type="button"
							class="btn-primary w-full py-4 text-lg"
							on:click={handleSubmit}
						>
							Continue to Next Step
						</button>
					</div>
				{/if}
			</div>
			
			<div class="mt-8 flex items-center justify-center gap-2">
				<div class="w-3 h-3 rounded-full {selectedCategory ? 'bg-accent-blue' : 'bg-gray-300'}"></div>
				<div class="w-3 h-3 rounded-full {selectedModel ? 'bg-accent-blue' : 'bg-gray-300'}"></div>
				<div class="w-3 h-3 rounded-full {selectedIssue ? 'bg-accent-blue' : 'bg-gray-300'}"></div>
			</div>
		</div>
	</div>
</div>
