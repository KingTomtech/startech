<script lang="ts">
	import { onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import { pb } from '$lib/pocketbase';
	import { addNotification } from '$lib/stores';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import { trackRepairSchema } from '$lib/validators';

	let bookingId = '';
	let error = '';
	let loading = false;
	let repairData: any = null;
	let unsubscribe: (() => void) | undefined;

	$: if ($page.url.searchParams.get('booking') && !bookingId) {
		bookingId = $page.url.searchParams.get('booking') || '';
	}

	const statusColors: Record<string, string> = {
		Received: 'bg-gray-100 text-gray-800',
		Diagnosing: 'bg-blue-100 text-blue-800',
		'Awaiting Parts': 'bg-yellow-100 text-yellow-800',
		Repairing: 'bg-purple-100 text-purple-800',
		'Quality Testing': 'bg-indigo-100 text-indigo-800',
		'Ready For Pickup': 'bg-green-100 text-green-800',
		Completed: 'bg-success text-white',
		'Awaiting Customer Response': 'bg-orange-100 text-orange-800',
		Cancelled: 'bg-danger text-white',
		Unrepairable: 'bg-red-100 text-red-800',
		received: 'bg-gray-100 text-gray-800',
		diagnosing: 'bg-blue-100 text-blue-800',
		awaiting_parts: 'bg-yellow-100 text-yellow-800',
		repairing: 'bg-purple-100 text-purple-800',
		quality_testing: 'bg-indigo-100 text-indigo-800',
		ready_for_pickup: 'bg-green-100 text-green-800',
		completed: 'bg-success text-white',
		awaiting_customer_response: 'bg-orange-100 text-orange-800',
		cancelled: 'bg-danger text-white',
		unrepairable: 'bg-red-100 text-red-800'
	};

	const statusLabels: Record<string, string> = {
		Received: 'Received',
		Diagnosing: 'Diagnosing',
		'Awaiting Parts': 'Awaiting Parts',
		Repairing: 'In Repair',
		'Quality Testing': 'Quality Testing',
		'Ready For Pickup': 'Ready for Pickup',
		Completed: 'Completed',
		'Awaiting Customer Response': 'Awaiting Your Response',
		Cancelled: 'Cancelled',
		Unrepairable: 'Unrepairable',
		received: 'Received',
		diagnosing: 'Diagnosing',
		awaiting_parts: 'Awaiting Parts',
		repairing: 'In Repair',
		quality_testing: 'Quality Testing',
		ready_for_pickup: 'Ready for Pickup',
		completed: 'Completed',
		awaiting_customer_response: 'Awaiting Your Response',
		cancelled: 'Cancelled',
		unrepairable: 'Unrepairable'
	};

	async function trackRepair() {
		error = '';
		repairData = null;

		const validation = trackRepairSchema.safeParse({ bookingId });
		if (!validation.success) {
			error = validation.error.errors[0].message;
			return;
		}

		loading = true;

		try {
			if (unsubscribe) {
				unsubscribe();
				unsubscribe = undefined;
			}

			const normalizedBookingId = bookingId.trim().toUpperCase();
			const filter = pb.filter('booking_id = {:bookingId}', { bookingId: normalizedBookingId });
			let records = await pb.collection('repairs').getList(1, 1, { filter });

			if (records.items.length > 0) {
				repairData = records.items[0];

				unsubscribe = await pb.collection(repairData.collectionName).subscribe(repairData.id, (e) => {
					repairData = e.record;
				}).catch(() => undefined);
			} else {
				error = 'No repair found with that booking ID';
				addNotification('error', 'Repair not found. Please check your booking ID.');
			}
		} catch (err: any) {
			error = err.message || 'Failed to track repair';
			addNotification('error', error);
		} finally {
			loading = false;
		}
	}

	function formatStatus(status: string): string {
		return statusLabels[status] || status;
	}

	function getStatusColor(status: string): string {
		return statusColors[status] || 'bg-gray-100 text-gray-800';
	}

	function extractNoteValue(notes: string | undefined, label: string): string {
		if (!notes) return '';
		const line = notes.split('\n').find((item) => item.startsWith(`${label}:`));
		return line?.replace(`${label}:`, '').trim() || '';
	}

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
	});
</script>

<svelte:head>
	<title>Track Your Repair | Star Tech Phone Repairs</title>
	<meta name="description" content="Track the status of your phone repair in real-time" />
</svelte:head>

<div class="min-h-screen bg-light py-12">
	<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="text-center mb-12">
			<h1 class="text-4xl md:text-5xl font-bold text-primary mb-4">
				Track Your Repair
			</h1>
			<p class="text-xl text-muted">
				Enter your booking ID to see real-time repair status
			</p>
		</div>

		<!-- Tracking Form -->
		<div class="bg-white rounded-2xl shadow-sm border border-border p-8 mb-8">
			<form on:submit|preventDefault={trackRepair} class="space-y-6">
				<Input
					label="Booking ID"
					placeholder="e.g., ST-ABC123"
					bind:value={bookingId}
					error={error}
					type="text"
				/>
				<Button 
					type="submit" 
					variant="primary" 
					size="lg" 
					className="w-full"
					{loading}
				>
					{#if loading}
						Tracking...
					{:else}
						Track Repair
					{/if}
				</Button>
			</form>
		</div>

		<!-- Repair Status -->
		{#if repairData}
			<div class="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
				<!-- Status Header -->
				<div class="bg-primary text-white p-6">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-sm opacity-80 mb-1">Booking ID</p>
							<p class="text-2xl font-bold">{repairData.booking_id}</p>
						</div>
						<span class="px-4 py-2 rounded-full text-sm font-semibold {getStatusColor(repairData.status)}">
							{formatStatus(repairData.status)}
						</span>
					</div>
				</div>

				<!-- Device Info -->
				<div class="p-6 border-b border-border">
					<h3 class="font-semibold text-primary mb-4">Device Information</h3>
					<div class="grid grid-cols-2 gap-4">
						<div>
							<p class="text-sm text-muted">Device</p>
							<p class="font-medium">{extractNoteValue(repairData.notes, 'Device') || repairData.expand?.device?.model || 'N/A'}</p>
						</div>
						<div>
							<p class="text-sm text-muted">Issue</p>
							<p class="font-medium">{repairData.issue_type || 'N/A'}</p>
						</div>
						<div>
							<p class="text-sm text-muted">Booked On</p>
							<p class="font-medium">{new Date(repairData.created).toLocaleDateString('en-AU')}</p>
						</div>
					</div>
				</div>

				<!-- Timeline -->
				<div class="p-6">
					<h3 class="font-semibold text-primary mb-6">Repair Progress</h3>
					<div class="relative">
						<div class="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
						<div class="space-y-6">
							{#each ['Received', 'Diagnosing', 'Repairing', 'Quality Testing', 'Ready For Pickup', 'Completed'] as status}
								<div class="relative flex items-start gap-4">
									<div class="relative z-10 w-8 h-8 rounded-full flex items-center justify-center {
										['Received', 'Diagnosing', 'Repairing', 'Quality Testing', 'Ready For Pickup', 'Completed'].indexOf(repairData.status) >= 
										['Received', 'Diagnosing', 'Repairing', 'Quality Testing', 'Ready For Pickup', 'Completed'].indexOf(status)
											? 'bg-accent text-white'
											: 'bg-border text-muted'
									}">
										{#if ['Received', 'Diagnosing', 'Repairing', 'Quality Testing', 'Ready For Pickup', 'Completed'].indexOf(repairData.status) >= 
											['Received', 'Diagnosing', 'Repairing', 'Quality Testing', 'Ready For Pickup', 'Completed'].indexOf(status)}
											<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
												<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
											</svg>
										{/if}
									</div>
									<div class="flex-1 pt-1">
										<p class="font-medium text-primary">{formatStatus(status)}</p>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>

				<!-- Notes -->
				{#if repairData.notes}
					<div class="p-6 bg-light border-t border-border">
						<h3 class="font-semibold text-primary mb-2">Technician Notes</h3>
						<p class="text-muted">{repairData.notes}</p>
					</div>
				{/if}

				<!-- Contact CTA -->
				<div class="p-6 bg-light border-t border-border">
					<p class="text-sm text-muted text-center">
						Have questions about your repair? 
						<a href="tel:+61894567890" class="text-accent hover:underline font-medium">
							Call us at +618 9456 7890
						</a>
					</p>
				</div>
			</div>
		{/if}

		<!-- Help Text -->
		{#if !repairData && !error}
			<div class="text-center text-muted">
				<p class="mb-4">Your booking ID was provided when you booked your repair.</p>
				<p class="text-sm">It looks like: <span class="font-mono bg-light px-2 py-1 rounded">ST-ABC123</span></p>
			</div>
		{/if}
	</div>
</div>
