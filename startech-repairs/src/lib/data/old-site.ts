export type PriceItem = { name: string; prices: Record<string, string> };
export type PriceCategory = { title: string; brand: string; items: PriceItem[] };

export const oldSitePriceCategories: PriceCategory[] = [
	{
		"title": "iPhone LCD Screen Replacement",
		"brand": "iPhone",
		"items": [
			{
				"name": "iPhone 17 Pro Max",
				"prices": {
					"LCD Screen": "$200"
				}
			},
			{
				"name": "iPhone 17 Pro",
				"prices": {
					"LCD Screen": "$200"
				}
			},
			{
				"name": "iPhone 17",
				"prices": {
					"LCD Screen": "$200"
				}
			},
			{
				"name": "iPhone 16 Pro Max",
				"prices": {
					"LCD Screen": "$170"
				}
			},
			{
				"name": "iPhone 16 Pro",
				"prices": {
					"LCD Screen": "$160"
				}
			},
			{
				"name": "iPhone 16/16 Plus",
				"prices": {
					"LCD Screen": "$150"
				}
			},
			{
				"name": "iPhone 16E",
				"prices": {
					"LCD Screen": "$120"
				}
			},
			{
				"name": "iPhone 15 Pro Max",
				"prices": {
					"LCD Screen": "$140"
				}
			},
			{
				"name": "iPhone 15 Pro",
				"prices": {
					"LCD Screen": "$120"
				}
			},
			{
				"name": "iPhone 15/15 Plus",
				"prices": {
					"LCD Screen": "$120"
				}
			},
			{
				"name": "iPhone 14 Pro Max",
				"prices": {
					"LCD Screen": "$140"
				}
			},
			{
				"name": "iPhone 14 Pro",
				"prices": {
					"LCD Screen": "$120"
				}
			},
			{
				"name": "iPhone 14/14 Plus",
				"prices": {
					"LCD Screen": "$120"
				}
			},
			{
				"name": "iPhone 13 Pro Max",
				"prices": {
					"LCD Screen": "$120"
				}
			},
			{
				"name": "iPhone 13 Pro",
				"prices": {
					"LCD Screen": "$115"
				}
			},
			{
				"name": "iPhone 13 Mini",
				"prices": {
					"LCD Screen": "$140"
				}
			},
			{
				"name": "iPhone 13",
				"prices": {
					"LCD Screen": "$110"
				}
			},
			{
				"name": "iPhone 12 Pro Max",
				"prices": {
					"LCD Screen": "$115"
				}
			},
			{
				"name": "iPhone 12/12 Pro",
				"prices": {
					"LCD Screen": "$100"
				}
			},
			{
				"name": "iPhone 12 Mini",
				"prices": {
					"LCD Screen": "$130"
				}
			},
			{
				"name": "iPhone 11 Pro Max",
				"prices": {
					"LCD Screen": "$100"
				}
			},
			{
				"name": "iPhone 11/11 Pro",
				"prices": {
					"LCD Screen": "$95"
				}
			},
			{
				"name": "iPhone X/XR/XS/Max",
				"prices": {
					"LCD Screen": "$75"
				}
			},
			{
				"name": "iPhone 8 Plus",
				"prices": {
					"LCD Screen": "$70"
				}
			},
			{
				"name": "iPhone 8/SE2",
				"prices": {
					"LCD Screen": "$70"
				}
			}
		]
	},
	{
		"title": "iPhone Back Glass Replacement",
		"brand": "iPhone",
		"items": [
			{
				"name": "iPhone 17-17 Pro Max",
				"prices": {
					"Back Glass": "$140"
				}
			},
			{
				"name": "iPhone 16-16 Pro Max",
				"prices": {
					"Back Glass": "$120"
				}
			},
			{
				"name": "iPhone 15-15 Pro Max",
				"prices": {
					"Back Glass": "$110"
				}
			},
			{
				"name": "iPhone 14-14 Pro Max",
				"prices": {
					"Back Glass": "$100"
				}
			},
			{
				"name": "iPhone 13-13 Pro Max",
				"prices": {
					"Back Glass": "$95"
				}
			},
			{
				"name": "iPhone 12-12 Pro Max",
				"prices": {
					"Back Glass": "$85"
				}
			},
			{
				"name": "iPhone 11-11 Pro Max",
				"prices": {
					"Back Glass": "$70"
				}
			},
			{
				"name": "iPhone X/XR/XS/Max",
				"prices": {
					"Back Glass": "$60"
				}
			}
		]
	},
	{
		"title": "iPhone Battery Replacement",
		"brand": "iPhone",
		"items": [
			{
				"name": "iPhone 14-15 Pro Max",
				"prices": {
					"Battery": "$110"
				}
			},
			{
				"name": "iPhone 12-13 Pro Max",
				"prices": {
					"Battery": "$95"
				}
			},
			{
				"name": "iPhone 11/11 Pro/11 Pro Max",
				"prices": {
					"Battery": "$85"
				}
			},
			{
				"name": "iPhone X/XR/XS/XS Max",
				"prices": {
					"Battery": "$75"
				}
			},
			{
				"name": "iPhone 7/7P/8/8P/SE",
				"prices": {
					"Battery": "$60"
				}
			},
			{
				"name": "iPhone 6/6P/6S/6SP",
				"prices": {
					"Battery": "$50"
				}
			}
		]
	},
	{
		"title": "iPad Screen Replacement",
		"brand": "iPad",
		"items": [
			{
				"name": "iPad Mini 6",
				"prices": {
					"Screen": "$490"
				}
			},
			{
				"name": "iPad Pro 12.9\" (5th/6th Gen)",
				"prices": {
					"Screen": "$390"
				}
			},
			{
				"name": "iPad Pro 12.9\" (3rd/4th Gen)",
				"prices": {
					"Screen": "$390"
				}
			},
			{
				"name": "iPad Pro 12.9\" (2nd Gen)",
				"prices": {
					"Screen": "$545"
				}
			},
			{
				"name": "iPad Pro 12.9\" (1st Gen)",
				"prices": {
					"Screen": "$350"
				}
			},
			{
				"name": "iPad Pro 11\" (2021/2022)",
				"prices": {
					"Screen": "$395"
				}
			},
			{
				"name": "iPad Pro 11\" (2018/2020)",
				"prices": {
					"Screen": "$395"
				}
			},
			{
				"name": "iPad Pro 10.5\"",
				"prices": {
					"Screen": "$240"
				}
			},
			{
				"name": "iPad Pro 9.7\"",
				"prices": {
					"Screen": "$230"
				}
			},
			{
				"name": "iPad Air 4/5",
				"prices": {
					"Screen": "$360"
				}
			},
			{
				"name": "iPad Air 3",
				"prices": {
					"Screen": "$225"
				}
			},
			{
				"name": "iPad Air 2",
				"prices": {
					"Screen": "$230"
				}
			},
			{
				"name": "iPad 10",
				"prices": {
					"Screen": "$140"
				}
			},
			{
				"name": "iPad 9 (2021) 10.2\"",
				"prices": {
					"Screen": "$135"
				}
			},
			{
				"name": "iPad 7 (2019)/8 (2020)",
				"prices": {
					"Screen": "$135"
				}
			},
			{
				"name": "iPad 6 (2018)",
				"prices": {
					"Screen": "$125"
				}
			},
			{
				"name": "iPad Air/iPad 5 (2017)",
				"prices": {
					"Screen": "$125"
				}
			},
			{
				"name": "iPad Mini 4/5",
				"prices": {
					"Screen": "$205"
				}
			},
			{
				"name": "iPad Mini 1/2/3",
				"prices": {
					"Screen": "$140"
				}
			}
		]
	},
	{
		"title": "MacBook Screen Replacement",
		"brand": "MacBook",
		"items": [
			{
				"name": "MacBook Air 13\" (A2681)",
				"prices": {
					"Screen": "$460"
				}
			},
			{
				"name": "MacBook Air 13\" (A2338)",
				"prices": {
					"Screen": "$430"
				}
			},
			{
				"name": "MacBook Air 13\" (A2337)",
				"prices": {
					"Screen": "$470"
				}
			},
			{
				"name": "MacBook Air 13\" (A1932/A2179)",
				"prices": {
					"Screen": "$400"
				}
			},
			{
				"name": "MacBook Pro 13\" (A1989/A2159/A2251/A2289)",
				"prices": {
					"Screen": "$400"
				}
			},
			{
				"name": "MacBook Pro 13\" (A1706/A1708)",
				"prices": {
					"Screen": "$400"
				}
			},
			{
				"name": "MacBook Air 13\" (A1466)",
				"prices": {
					"Screen": "$350"
				}
			}
		]
	},
	{
		"title": "Samsung Screen Replacement (Genuine Service Pack)",
		"brand": "Samsung",
		"items": [
			{
				"name": "S24 Ultra",
				"prices": {
					"Screen": "$440"
				}
			},
			{
				"name": "S24 Plus",
				"prices": {
					"Screen": "$345"
				}
			},
			{
				"name": "S24",
				"prices": {
					"Screen": "$300"
				}
			},
			{
				"name": "S23 Ultra",
				"prices": {
					"Screen": "$440"
				}
			},
			{
				"name": "S23 Plus",
				"prices": {
					"Screen": "$295"
				}
			},
			{
				"name": "S23",
				"prices": {
					"Screen": "$295"
				}
			},
			{
				"name": "S23 FE",
				"prices": {
					"Screen": "$255"
				}
			},
			{
				"name": "S22 Ultra",
				"prices": {
					"Screen": "$410"
				}
			},
			{
				"name": "S22 Plus",
				"prices": {
					"Screen": "$275"
				}
			},
			{
				"name": "S22",
				"prices": {
					"Screen": "$295"
				}
			},
			{
				"name": "S21 Ultra",
				"prices": {
					"Screen": "$360"
				}
			},
			{
				"name": "S21 Plus",
				"prices": {
					"Screen": "$280"
				}
			},
			{
				"name": "S21",
				"prices": {
					"Screen": "$280"
				}
			},
			{
				"name": "S21 FE",
				"prices": {
					"Screen": "$245"
				}
			},
			{
				"name": "S20 Ultra",
				"prices": {
					"Screen": "$340"
				}
			},
			{
				"name": "S20 Plus",
				"prices": {
					"Screen": "$330"
				}
			},
			{
				"name": "S20",
				"prices": {
					"Screen": "$330"
				}
			},
			{
				"name": "S20 FE",
				"prices": {
					"Screen": "$245"
				}
			},
			{
				"name": "Note20 Ultra",
				"prices": {
					"Screen": "$350"
				}
			},
			{
				"name": "Note20",
				"prices": {
					"Screen": "$310"
				}
			}
		]
	},
	{
		"title": "Other Services",
		"brand": "Service",
		"items": [
			{
				"name": "Charging Port",
				"prices": {
					"Replacement": "From $55"
				}
			},
			{
				"name": "Back Camera",
				"prices": {
					"Replacement": "From $80"
				}
			},
			{
				"name": "Front Camera",
				"prices": {
					"Replacement": "From $55"
				}
			},
			{
				"name": "Water Damage",
				"prices": {
					"Repairs": "From $160"
				}
			},
			{
				"name": "Signal Repairs",
				"prices": {
					"Service": "From $160"
				}
			},
			{
				"name": "Power/Silent/Volume",
				"prices": {
					"Button Replacement": "From $75"
				}
			},
			{
				"name": "Motherboard",
				"prices": {
					"Repairs": "From $300"
				}
			},
			{
				"name": "Custom Laser Engraving",
				"prices": {
					"Service": "From $25"
				}
			}
		]
	}
];

export const oldSiteServices = [
	{ title: 'iPhone Repairs', repairs: ['Screen Replacement', 'Battery Replacement', 'Charging Port Repair', 'Back Glass Replacement', 'Camera Repair'] },
	{ title: 'Samsung Galaxy Repairs', repairs: ['Screen Replacement', 'Battery Replacement', 'Charging Port Repair', 'Back Glass Replacement', 'Water Damage Repair'] },
	{ title: 'iPad Repairs', repairs: ['Screen Replacement', 'Battery Replacement', 'Charging Port Repair', 'Home Button Repair', 'Camera Repair'] },
	{ title: 'Gaming Console Repairs', repairs: ['HDMI Port Repair', 'Overheating / Fan Repair', 'Disc Drive Repair', 'Power Supply Replacement', 'Deep Cleaning Service'] },
	{ title: 'Computer Repairs', repairs: ['Screen Replacement', 'Battery Replacement', 'Keyboard Replacement', 'SSD/HDD Upgrades', 'Data Recovery'] },
	{ title: 'Diagnostic Services', repairs: ['Free Device Assessment', 'Detailed Problem Report', 'Transparent Pricing', 'No Fix No Fee Policy', 'Expert Recommendations'] }
];

export const oldSiteBusinessInfo = {
	name: 'Star Tech Phone Repairs',
	phone: '+61 420 994 662',
	email: 'info@startechphonerepairs.com.au',
	address: '33 Crimson Bvd, Forrestfield WA 6058',
	messenger: 'https://m.me/startechphonerepairs',
	hours: ['Monday: Closed', 'Tue-Fri: 7am-7pm', 'Saturday: 7am-5pm', 'Sunday: Closed'],
	reviewRating: '4.9/5.0',
	warranty: '12-month warranty on parts and repairs where applicable; 90-day warranty messaging appears elsewhere on the old site.'
};
