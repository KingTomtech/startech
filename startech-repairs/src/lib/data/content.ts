export type ServiceDetail = {
	slug: string;
	title: string;
	summary: string;
	description: string;
	commonRepairs: string[];
	idealFor: string[];
	process: string[];
};

export type BlogPost = {
	slug: string;
	title: string;
	category: string;
	summary: string;
	published: string;
	readTime: string;
	sections: Array<{ heading: string; body: string }>;
};

export const serviceDetails: ServiceDetail[] = [
	{
		slug: 'screen-replacement',
		title: 'Screen Replacement',
		summary: 'Display, glass, touch, LCD and OLED repairs for phones and tablets.',
		description:
			'Star Tech diagnoses display faults before replacing parts, checks touch response, brightness, sensors and frame condition, then confirms the device is ready before handover.',
		commonRepairs: ['Cracked glass', 'No display', 'Touch not responding', 'Green lines or ink marks', 'Lifted or damaged frame'],
		idealFor: ['iPhone', 'Samsung Galaxy', 'Google Pixel', 'iPad', 'OPPO, Huawei and Xiaomi'],
		process: ['Free assessment', 'Clear quote', 'Quality part fitment', 'Final display and sensor testing']
	},
	{
		slug: 'battery-replacement',
		title: 'Battery Replacement',
		summary: 'Battery health checks and safe replacements for phones, tablets and laptops.',
		description:
			'Battery issues can look like charging, board or software faults. The team tests power behaviour first, then replaces the battery only when it is the right fix.',
		commonRepairs: ['Poor battery life', 'Swollen battery', 'Unexpected shutdowns', 'Slow charging', 'Battery health warnings'],
		idealFor: ['iPhone', 'Samsung', 'iPad', 'MacBook', 'Android phones'],
		process: ['Battery diagnostics', 'Safe removal', 'Replacement and calibration', 'Charge cycle test']
	},
	{
		slug: 'charging-repairs',
		title: 'Charging Repairs',
		summary: 'Charging port, cable, connector and power fault diagnostics.',
		description:
			'Charging faults are checked from the cable and port through to the battery and board. Simple cleaning is handled before recommending replacement work.',
		commonRepairs: ['Loose charging cable', 'Device will not charge', 'USB-C or Lightning port damage', 'Slow charging', 'Power cycling'],
		idealFor: ['Phones', 'Tablets', 'Nintendo Switch', 'Laptops', 'USB-C devices'],
		process: ['Cable and adapter test', 'Port inspection', 'Cleaning or part replacement', 'Charging stability check']
	},
	{
		slug: 'water-damage',
		title: 'Water Damage',
		summary: 'Liquid damage inspection, corrosion cleaning and recovery advice.',
		description:
			'Liquid damage needs fast attention. Star Tech checks corrosion, disconnects affected power paths where possible, and gives a realistic recovery path before deeper repair.',
		commonRepairs: ['No power after liquid exposure', 'Screen flicker', 'Charging faults', 'Audio or camera failure', 'Data recovery assessment'],
		idealFor: ['Phones', 'Tablets', 'Laptops', 'Wearables', 'Game consoles'],
		process: ['Initial safety check', 'Internal inspection', 'Corrosion cleaning', 'Recovery and quote options']
	},
	{
		slug: 'camera-sensors',
		title: 'Camera & Sensor Repairs',
		summary: 'Front camera, rear camera, Face ID, Touch ID and proximity sensor checks.',
		description:
			'Camera and sensor faults are tested carefully because they can involve modules, flex cables, glass, software or board-level damage.',
		commonRepairs: ['Blurry camera', 'Broken camera glass', 'Face ID faults', 'Touch ID faults', 'Proximity sensor issues'],
		idealFor: ['iPhone', 'Samsung Galaxy', 'Google Pixel', 'iPad', 'Android phones'],
		process: ['Module test', 'Lens and glass inspection', 'Replacement where needed', 'Photo, video and sensor testing']
	},
	{
		slug: 'audio-repairs',
		title: 'Audio Repairs',
		summary: 'Speaker, microphone, earpiece and call quality repairs.',
		description:
			'Audio problems can come from blocked mesh, damaged modules, flex cables or board faults. Star Tech tests calls, recordings and media playback before quoting.',
		commonRepairs: ['No sound', 'Low call volume', 'Microphone not working', 'Distorted speaker', 'Bluetooth and speaker routing issues'],
		idealFor: ['Phones', 'Tablets', 'Laptops', 'Game consoles', 'Wearables'],
		process: ['Audio path test', 'Cleaning and inspection', 'Part replacement if needed', 'Call and recording confirmation']
	}
];

export const blogPosts: BlogPost[] = [
	{
		slug: 'iphone-will-not-charge',
		title: 'What to do when your iPhone will not charge',
		category: 'iPhone',
		summary: 'Quick checks for cable, port, battery and software issues before replacing parts.',
		published: '2026-01-18',
		readTime: '4 min read',
		sections: [
			{ heading: 'Start with the simple checks', body: 'Try a known-good cable and adapter, inspect the charging port for lint, and restart the phone before booking a repair.' },
			{ heading: 'Watch for battery symptoms', body: 'If the phone only works on charge, shuts down early, or shows a battery health warning, the battery may be the root cause.' },
			{ heading: 'When to bring it in', body: 'If the cable feels loose, the phone heats up, or charging starts and stops, a technician should inspect the port and power circuit.' }
		]
	},
	{
		slug: 'spot-water-damage-early',
		title: 'How to spot water damage early',
		category: 'Repair Guide',
		summary: 'What to do after liquid exposure and the signs that corrosion may already be active.',
		published: '2026-01-12',
		readTime: '3 min read',
		sections: [
			{ heading: 'Power down first', body: 'Turn the device off and avoid charging it. Power through liquid-damaged components can make a repair much harder.' },
			{ heading: 'Look for early warning signs', body: 'Flickering displays, muffled speakers, camera fog and unreliable charging can all point to liquid inside the device.' },
			{ heading: 'Get it inspected', body: 'A fast internal inspection gives the best chance of cleaning corrosion before it spreads to board-level components.' }
		]
	},
	{
		slug: 'repair-or-replace-phone',
		title: 'Repair or replace your phone?',
		category: 'Buying Advice',
		summary: 'Compare repair price, device age, battery health, storage needs and resale value.',
		published: '2026-01-04',
		readTime: '5 min read',
		sections: [
			{ heading: 'Check the total repair picture', body: 'A screen or battery replacement often makes sense when the rest of the phone is healthy and still meets your needs.' },
			{ heading: 'Think about lifespan', body: 'Storage, software support and battery health matter as much as the visible fault when deciding whether to repair.' },
			{ heading: 'Ask for a quote first', body: 'A clear quote lets you compare repair cost against replacement cost without guessing.' }
		]
	}
];

export const findService = (slug: string) => serviceDetails.find((service) => service.slug === slug);
export const findBlogPost = (slug: string) => blogPosts.find((post) => post.slug === slug);
