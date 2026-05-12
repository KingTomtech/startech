import { z } from 'zod';

export const bookingSchema = z.object({
	deviceBrand: z.string().min(1, 'Brand is required'),
	deviceModel: z.string().min(1, 'Model is required'),
	issueType: z.string().min(1, 'Issue type is required'),
	description: z.string().min(10, 'Please provide more details (at least 10 characters)'),
	firstName: z.string().min(1, 'First name is required'),
	lastName: z.string().min(1, 'Last name is required'),
	email: z.string().email('Invalid email address'),
	phone: z.string().min(10, 'Valid phone number is required'),
	pickupOption: z.enum(['walkin', 'pickup', 'delivery']),
	preferredDate: z.string().optional(),
	notes: z.string().optional()
});

export const loginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters')
});

export const registerSchema = z.object({
	name: z.string().min(2, 'Name is required'),
	email: z.string().email('Invalid email address'),
	password: z.string().min(8, 'Password must be at least 8 characters'),
	passwordConfirm: z.string()
}).refine(data => data.password === data.passwordConfirm, {
	message: "Passwords don't match",
	path: ['passwordConfirm']
});

export const trackRepairSchema = z.object({
	bookingId: z.string().min(1, 'Booking ID is required').or(z.string().length(10))
});

export type BookingFormData = z.infer<typeof bookingSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type TrackRepairFormData = z.infer<typeof trackRepairSchema>;
