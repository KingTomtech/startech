<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import { addNotification } from '$lib/stores';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Textarea from '$lib/components/ui/Textarea.svelte';
	import Select from '$lib/components/ui/Select.svelte';
	import { bookingSchema, type BookingFormData } from '$lib/validators';
	import { generateBookingId } from '$lib/utils';

	// Form state
	let step = 1;
	let loading = false;
	let bookingId = '';

	// Form data
	let formData: BookingFormData = {
		deviceBrand: '',
		deviceModel: '',
		issueType: '',
		description: '',
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		pickupOption: 'walkin',
		preferredDate: '',
		notes: ''
	};

	// Validation errors
	let errors: Record<string, string> = {};

	// Options
	const issueMap: Record<string, string> = {
		'screen-replacement': 'Screen Replacement',
		'battery-replacement': 'Battery Replacement',
		'charging-port': 'Charging Port',
		'camera-repair': 'Camera',
		'speaker-repair': 'Speaker',
		'water-damage': 'Water Damage',
		'software-issue': 'Software Issue',
		other: 'Other'
	};

	const pickupMap: Record<BookingFormData['pickupOption'], string> = {
		walkin: 'Walk-in',
		pickup: 'Pickup',
		delivery: 'Delivery'
	};

	const brands = [
		{ value: 'apple', label: 'Apple' },
		{ value: 'samsung', label: 'Samsung' },
		{ value: 'google', label: 'Google' },
		{ value: 'oneplus', label: 'OnePlus' },
		{ value: 'xiaomi', label: 'Xiaomi' },
		{ value: 'oppo', label: 'OPPO' },
		{ value: 'huawei', label: 'Huawei' },
		{ value: 'other', label: 'Other' }
	];

	const appleModels = [
		{ value: 'iphone-15-pro-max', label: 'iPhone 15 Pro Max' },
		{ value: 'iphone-15-pro', label: 'iPhone 15 Pro' },
		{ value: 'iphone-15-plus', label: 'iPhone 15 Plus' },
		{ value: 'iphone-15', label: 'iPhone 15' },
		{ value: 'iphone-14-pro-max', label: 'iPhone 14 Pro Max' },
		{ value: 'iphone-14-pro', label: 'iPhone 14 Pro' },
		{ value: 'iphone-14-plus', label: 'iPhone 14 Plus' },
		{ value: 'iphone-14', label: 'iPhone 14' },
		{ value: 'iphone-13-pro-max', label: 'iPhone 13 Pro Max' },
		{ value: 'iphone-13-pro', label: 'iPhone 13 Pro' },
		{ value: 'iphone-13', label: 'iPhone 13' },
		{ value: 'iphone-12-pro-max', label: 'iPhone 12 Pro Max' },
		{ value: 'iphone-12-pro', label: 'iPhone 12 Pro' },
		{ value: 'iphone-12', label: 'iPhone 12' },
		{ value: 'iphone-11-pro-max', label: 'iPhone 11 Pro Max' },
		{ value: 'iphone-11-pro', label: 'iPhone 11 Pro' },
		{ value: 'iphone-11', label: 'iPhone 11' },
		{ value: 'iphone-xr', label: 'iPhone XR' },
		{ value: 'iphone-xs-max', label: 'iPhone XS Max' },
		{ value: 'iphone-xs', label: 'iPhone XS' },
		{ value: 'iphone-x', label: 'iPhone X' },
		{ value: 'iphone-8-plus', label: 'iPhone 8 Plus' },
		{ value: 'iphone-8', label: 'iPhone 8' },
		{ value: 'ipad-pro', label: 'iPad Pro' },
		{ value: 'ipad-air', label: 'iPad Air' },
		{ value: 'ipad-mini', label: 'iPad Mini' },
		{ value: 'ipad-standard', label: 'iPad (Standard)' }
	];

	const samsungModels = [
		{ value: 'galaxy-s24-ultra', label: 'Galaxy S24 Ultra' },
		{ value: 'galaxy-s24-plus', label: 'Galaxy S24+' },
		{ value: 'galaxy-s24', label: 'Galaxy S24' },
		{ value: 'galaxy-s23-ultra', label: 'Galaxy S23 Ultra' },
		{ value: 'galaxy-s23-plus', label: 'Galaxy S23+' },
		{ value: 'galaxy-s23', label: 'Galaxy S23' },
		{ value: 'galaxy-s22-ultra', label: 'Galaxy S22 Ultra' },
		{ value: 'galaxy-s22-plus', label: 'Galaxy S22+' },
		{ value: 'galaxy-s22', label: 'Galaxy S22' },
		{ value: 'galaxy-z-fold-5', label: 'Galaxy Z Fold 5' },
		{ value: 'galaxy-z-flip-5', label: 'Galaxy Z Flip 5' },
		{ value: 'galaxy-a54', label: 'Galaxy A54' },
		{ value: 'galaxy-a34', label: 'Galaxy A34' }
	];

	const otherModels = [
		{ value: 'pixel-8-pro', label: 'Pixel 8 Pro' },
		{ value: 'pixel-8', label: 'Pixel 8' },
		{ value: 'pixel-7-pro', label: 'Pixel 7 Pro' },
		{ value: 'pixel-7', label: 'Pixel 7' },
		{ value: 'oneplus-11', label: 'OnePlus 11' },
		{ value: 'oneplus-10-pro', label: 'OnePlus 10 Pro' },
		{ value: 'xiaomi-13-pro', label: 'Xiaomi 13 Pro' },
		{ value: 'xiaomi-13', label: 'Xiaomi 13' },
		{ value: 'oppo-find-x6', label: 'OPPO Find X6' },
		{ value: 'huawei-p60-pro', label: 'Huawei P60 Pro' }
	];

	const issues = [
		{ value: 'screen-replacement', label: 'Screen Replacement' },
		{ value: 'battery-replacement', label: 'Battery Replacement' },
		{ value: 'charging-port', label: 'Charging Port Issue' },
		{ value: 'camera-repair', label: 'Camera Repair' },
		{ value: 'speaker-repair', label: 'Speaker/Microphone' },
		{ value: 'water-damage', label: 'Water Damage' },
		{ value: 'button-repair', label: 'Button Repair' },
		{ value: 'glass-back', label: 'Back Glass Replacement' },
		{ value: 'faceid-issue', label: 'Face ID/Touch ID' },
		{ value: 'software-issue', label: 'Software Issue' },
		{ value: 'other', label: 'Other' }
	];

	const pickupOptions = [
		{ value: 'walkin', label: 'Walk-In / Drop Off' },
		{ value: 'pickup', label: 'Schedule Pickup' },
		{ value: 'delivery', label: 'Delivery Available' }
	];

	function getModels() {
		if (formData.deviceBrand === 'apple') return appleModels;
		if (formData.deviceBrand === 'samsung') return samsungModels;
		return otherModels;
	}

	function validateStep(currentStep: number): boolean {
		errors = {};
		let isValid = true;

		if (currentStep === 1) {
			if (!formData.deviceBrand) {
				errors.deviceBrand = 'Please select a brand';
				isValid = false;
			}
			if (!formData.deviceModel) {
				errors.deviceModel = 'Please select a model';
				isValid = false;
			}
		}

		if (currentStep === 2) {
			if (!formData.issueType) {
				errors.issueType = 'Please select an issue';
				isValid = false;
			}
			if (!formData.description || formData.description.length < 10) {
				errors.description = 'Please provide more details (at least 10 characters)';
				isValid = false;
			}
		}

		if (currentStep === 3) {
			if (!formData.firstName) {
				errors.firstName = 'First name is required';
				isValid = false;
			}
			if (!formData.lastName) {
				errors.lastName = 'Last name is required';
				isValid = false;
			}
			if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
				errors.email = 'Valid email is required';
				isValid = false;
			}
			if (!formData.phone || formData.phone.length < 10) {
				errors.phone = 'Valid phone number is required';
				isValid = false;
			}
		}

		if (!isValid) {
			addNotification('error', 'Please fix the errors above');
		}

		return isValid;
	}

	function nextStep() {
		if (validateStep(step)) {
			step++;
		}
	}

	function prevStep() {
		step--;
	}

	async function submitBooking() {
		if (!validateStep(3)) return;

		loading = true;

		try {
			bookingId = generateBookingId();
			const customer = await ensureCustomerAccount();
			const deviceLabel = `${getOptionLabel(brands, formData.deviceBrand)} ${getOptionLabel(getModels(), formData.deviceModel)}`.trim();
			const issueLabel = issueMap[formData.issueType] || 'Other';

			const bookingData = {
				customer: customer.id,
				device: deviceLabel,
				issue: issueLabel,
				preferred_date: formData.preferredDate || null,
				pickup_option: pickupMap[formData.pickupOption],
				status: 'Pending',
				notes: formData.notes || '',
			};

			await pb.collection('bookings').create(bookingData);
			await pb.collection('repairs').create({
				customer: customer.id,
				issue_type: issueLabel,
				description: formData.description,
				status: 'Received',
				warranty_months: 3,
				booking_id: bookingId,
				notes: [
					`Device: ${deviceLabel}`,
					`Pickup option: ${pickupMap[formData.pickupOption]}`,
					formData.preferredDate ? `Preferred date: ${formData.preferredDate}` : '',
					formData.notes ? `Customer notes: ${formData.notes}` : ''
				].filter(Boolean).join('\n')
			});

			addNotification('success', 'Booking submitted successfully!');
			step = 4;
		} catch (err: any) {
			console.error('Booking error:', err);
			addNotification('error', err.message || 'Failed to submit booking');
		} finally {
			loading = false;
		}
	}

	async function ensureCustomerAccount() {
		const email = formData.email.trim().toLowerCase();
		const storageKey = `startech-customer-password:${email}`;
		let password = localStorage.getItem(storageKey) || createTemporaryPassword();

		try {
			const record = await pb.collection('customers').create({
				email,
				emailVisibility: true,
				password,
				passwordConfirm: password,
				name: `${formData.firstName} ${formData.lastName}`.trim(),
				phone: formData.phone,
				role: 'customer'
			});
			localStorage.setItem(storageKey, password);
			await pb.collection('customers').authWithPassword(email, password);
			return record;
		} catch (err: any) {
			if (err?.status !== 400 || !localStorage.getItem(storageKey)) {
				throw new Error(err?.status === 400 ? 'An account already exists for this email. Please use a different email for now.' : err.message);
			}

			const auth = await pb.collection('customers').authWithPassword(email, password);
			return auth.record;
		}
	}

	function createTemporaryPassword() {
		const bytes = crypto.getRandomValues(new Uint8Array(12));
		return `St-${Array.from(bytes, (byte) => byte.toString(36)).join('')}`;
	}

	function getOptionLabel(options: Array<{ value: string; label: string }>, value: string) {
		return options.find((option) => option.value === value)?.label || value;
	}

	function handleBrandChange() {
		formData.deviceModel = '';
		errors.deviceBrand = '';
		errors.deviceModel = '';
	}
</script>

<svelte:head>
	<title>Book a Repair | Star Tech Phone Repairs</title>
	<meta name="description" content="Book your phone repair online in minutes. Fast, reliable service with free diagnostics." />
</svelte:head>

<div class="min-h-screen bg-light py-12">
	<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="text-center mb-12">
			<h1 class="text-4xl md:text-5xl font-bold text-primary mb-4">
				Book Your Repair
			</h1>
			<p class="text-xl text-muted">
				Complete the form below to book your device repair
			</p>
		</div>

		<!-- Progress Steps -->
		<div class="mb-8">
			<div class="flex items-center justify-center">
				{#each ['Device', 'Issue', 'Details', 'Confirm'] as label, i}
					<div class="flex items-center">
						<div class="flex items-center justify-center w-10 h-10 rounded-full {
							step > i + 1 ? 'bg-success text-white' :
							step === i + 1 ? 'bg-accent text-white' :
							'bg-border text-muted'
						} font-semibold">
							{#if step > i + 1}
								<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
								</svg>
							{:else}
								{i + 1}
							{/if}
						</div>
						{#if i < 3}
							<div class="w-16 md:w-24 h-1 mx-2 {step > i + 1 ? 'bg-success' : 'bg-border'}"></div>
						{/if}
					</div>
				{/each}
			</div>
			<div class="flex justify-center mt-2 text-sm text-muted">
				{#each ['Device', 'Issue', 'Details', 'Confirm'] as label, i}
					<span class="w-20 text-center {step === i + 1 ? 'font-semibold text-accent' : ''}">
						{label}
					</span>
					{#if i < 3}
						<span class="w-16 md:w-24"></span>
					{/if}
				{/each}
			</div>
		</div>

		<!-- Form Card -->
		<div class="bg-white rounded-2xl shadow-sm border border-border p-8">
			<form on:submit|preventDefault={submitBooking}>
				<!-- Step 1: Device Selection -->
				{#if step === 1}
					<div class="space-y-6">
						<h2 class="text-2xl font-bold text-primary mb-6">Select Your Device</h2>
						
						<Select
							label="Device Brand"
							options={brands}
							bind:value={formData.deviceBrand}
							error={errors.deviceBrand}
							placeholder="Choose a brand"
							onChange={handleBrandChange}
						/>
						
						<Select
							label="Device Model"
							options={getModels()}
							bind:value={formData.deviceModel}
							error={errors.deviceModel}
							placeholder="Choose your model"
							disabled={!formData.deviceBrand}
						/>
					</div>
				{/if}

				<!-- Step 2: Issue Details -->
				{#if step === 2}
					<div class="space-y-6">
						<h2 class="text-2xl font-bold text-primary mb-6">Tell Us About the Issue</h2>
						
						<Select
							label="What's the problem?"
							options={issues}
							bind:value={formData.issueType}
							error={errors.issueType}
							placeholder="Select the issue"
						/>
						
						<Textarea
							label="Describe the issue in detail"
							placeholder="When did the problem start? Any specific symptoms?"
							bind:value={formData.description}
							error={errors.description}
							rows={4}
						/>
					</div>
				{/if}

				<!-- Step 3: Contact Information -->
				{#if step === 3}
					<div class="space-y-6">
						<h2 class="text-2xl font-bold text-primary mb-6">Your Information</h2>
						
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Input
								label="First Name"
								type="text"
								placeholder="John"
								bind:value={formData.firstName}
								error={errors.firstName}
							/>
							<Input
								label="Last Name"
								type="text"
								placeholder="Doe"
								bind:value={formData.lastName}
								error={errors.lastName}
							/>
						</div>
						
						<Input
							label="Email Address"
							type="email"
							placeholder="john@example.com"
							bind:value={formData.email}
							error={errors.email}
						/>
						
						<Input
							label="Phone Number"
							type="tel"
							placeholder="04XX XXX XXX"
							bind:value={formData.phone}
							error={errors.phone}
						/>
						
						<Select
							label="How would you like to proceed?"
							options={pickupOptions}
							bind:value={formData.pickupOption}
							placeholder="Select an option"
						/>
						
						<Input
							label="Preferred Date (Optional)"
							type="date"
							bind:value={formData.preferredDate}
						/>
						
						<Textarea
							label="Additional Notes (Optional)"
							placeholder="Any other information we should know?"
							bind:value={formData.notes}
							rows={3}
						/>
					</div>
				{/if}

				<!-- Step 4: Confirmation -->
				{#if step === 4}
					<div class="text-center space-y-6">
						<div class="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto">
							<svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
							</svg>
						</div>
						<div>
							<h2 class="text-2xl font-bold text-primary mb-2">Booking Confirmed!</h2>
							<p class="text-muted mb-4">
								Your repair has been booked successfully. We've sent a confirmation to your email.
							</p>
							<div class="bg-light rounded-lg p-4 inline-block">
								<p class="text-sm text-muted mb-1">Your Booking ID</p>
								<p class="text-2xl font-mono font-bold text-accent">{bookingId}</p>
							</div>
						</div>
						<div class="pt-4">
							<a 
								href="/track-repair" 
								class="inline-flex items-center gap-2 text-accent hover:underline font-medium"
							>
								Track your repair status
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
								</svg>
							</a>
						</div>
					</div>
				{/if}

				<!-- Navigation Buttons -->
				{#if step < 4}
					<div class="flex gap-4 mt-8 pt-6 border-t border-border">
						{#if step > 1}
							<Button 
								type="button" 
								variant="outline" 
								size="lg"
								onClick={prevStep}
							>
								Previous
							</Button>
						{/if}
						<div class="flex-1"></div>
						{#if step < 3}
							<Button 
								type="button" 
								variant="primary" 
								size="lg"
								onClick={nextStep}
							>
								Next
							</Button>
						{:else}
							<Button 
								type="submit" 
								variant="primary" 
								size="lg"
								{loading}
							>
								{#if loading}
									Submitting...
								{:else}
									Complete Booking
								{/if}
							</Button>
						{/if}
					</div>
				{/if}
			</form>
		</div>

		<!-- Trust Badges -->
		{#if step < 4}
			<div class="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm text-muted">
				<div>
					<svg class="w-6 h-6 mx-auto mb-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
					</svg>
					<p>90-Day Warranty</p>
				</div>
				<div>
					<svg class="w-6 h-6 mx-auto mb-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<p>Fast Turnaround</p>
				</div>
				<div>
					<svg class="w-6 h-6 mx-auto mb-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
					</svg>
					<p>Free Diagnostics</p>
				</div>
				<div>
					<svg class="w-6 h-6 mx-auto mb-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<p>No Fix No Fee</p>
				</div>
			</div>
		{/if}
	</div>
</div>
