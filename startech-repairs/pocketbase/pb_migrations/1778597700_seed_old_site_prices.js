migrate((app) => {
	const devices = [
	{
		"brand": "iPhone",
		"model": "iPhone 17 Pro Max"
	},
	{
		"brand": "iPhone",
		"model": "iPhone 17 Pro"
	},
	{
		"brand": "iPhone",
		"model": "iPhone 17"
	},
	{
		"brand": "iPhone",
		"model": "iPhone 16 Pro Max"
	},
	{
		"brand": "iPhone",
		"model": "iPhone 16 Pro"
	},
	{
		"brand": "iPhone",
		"model": "iPhone 16/16 Plus"
	},
	{
		"brand": "iPhone",
		"model": "iPhone 16E"
	},
	{
		"brand": "iPhone",
		"model": "iPhone 15 Pro Max"
	},
	{
		"brand": "iPhone",
		"model": "iPhone 15 Pro"
	},
	{
		"brand": "iPhone",
		"model": "iPhone 15/15 Plus"
	},
	{
		"brand": "iPhone",
		"model": "iPhone 14 Pro Max"
	},
	{
		"brand": "iPhone",
		"model": "iPhone 14 Pro"
	},
	{
		"brand": "iPhone",
		"model": "iPhone 14/14 Plus"
	},
	{
		"brand": "iPhone",
		"model": "iPhone 13 Pro Max"
	},
	{
		"brand": "iPhone",
		"model": "iPhone 13 Pro"
	},
	{
		"brand": "iPhone",
		"model": "iPhone 13 Mini"
	},
	{
		"brand": "iPhone",
		"model": "iPhone 13"
	},
	{
		"brand": "iPhone",
		"model": "iPhone 12 Pro Max"
	},
	{
		"brand": "iPhone",
		"model": "iPhone 12/12 Pro"
	},
	{
		"brand": "iPhone",
		"model": "iPhone 12 Mini"
	},
	{
		"brand": "iPhone",
		"model": "iPhone 11 Pro Max"
	},
	{
		"brand": "iPhone",
		"model": "iPhone 11/11 Pro"
	},
	{
		"brand": "iPhone",
		"model": "iPhone X/XR/XS/Max"
	},
	{
		"brand": "iPhone",
		"model": "iPhone 8 Plus"
	},
	{
		"brand": "iPhone",
		"model": "iPhone 8/SE2"
	},
	{
		"brand": "iPhone",
		"model": "iPhone 17-17 Pro Max"
	},
	{
		"brand": "iPhone",
		"model": "iPhone 16-16 Pro Max"
	},
	{
		"brand": "iPhone",
		"model": "iPhone 15-15 Pro Max"
	},
	{
		"brand": "iPhone",
		"model": "iPhone 14-14 Pro Max"
	},
	{
		"brand": "iPhone",
		"model": "iPhone 13-13 Pro Max"
	},
	{
		"brand": "iPhone",
		"model": "iPhone 12-12 Pro Max"
	},
	{
		"brand": "iPhone",
		"model": "iPhone 11-11 Pro Max"
	},
	{
		"brand": "iPhone",
		"model": "iPhone 14-15 Pro Max"
	},
	{
		"brand": "iPhone",
		"model": "iPhone 12-13 Pro Max"
	},
	{
		"brand": "iPhone",
		"model": "iPhone 11/11 Pro/11 Pro Max"
	},
	{
		"brand": "iPhone",
		"model": "iPhone X/XR/XS/XS Max"
	},
	{
		"brand": "iPhone",
		"model": "iPhone 7/7P/8/8P/SE"
	},
	{
		"brand": "iPhone",
		"model": "iPhone 6/6P/6S/6SP"
	},
	{
		"brand": "iPad",
		"model": "iPad Mini 6"
	},
	{
		"brand": "iPad",
		"model": "iPad Pro 12.9\" (5th/6th Gen)"
	},
	{
		"brand": "iPad",
		"model": "iPad Pro 12.9\" (3rd/4th Gen)"
	},
	{
		"brand": "iPad",
		"model": "iPad Pro 12.9\" (2nd Gen)"
	},
	{
		"brand": "iPad",
		"model": "iPad Pro 12.9\" (1st Gen)"
	},
	{
		"brand": "iPad",
		"model": "iPad Pro 11\" (2021/2022)"
	},
	{
		"brand": "iPad",
		"model": "iPad Pro 11\" (2018/2020)"
	},
	{
		"brand": "iPad",
		"model": "iPad Pro 10.5\""
	},
	{
		"brand": "iPad",
		"model": "iPad Pro 9.7\""
	},
	{
		"brand": "iPad",
		"model": "iPad Air 4/5"
	},
	{
		"brand": "iPad",
		"model": "iPad Air 3"
	},
	{
		"brand": "iPad",
		"model": "iPad Air 2"
	},
	{
		"brand": "iPad",
		"model": "iPad 10"
	},
	{
		"brand": "iPad",
		"model": "iPad 9 (2021) 10.2\""
	},
	{
		"brand": "iPad",
		"model": "iPad 7 (2019)/8 (2020)"
	},
	{
		"brand": "iPad",
		"model": "iPad 6 (2018)"
	},
	{
		"brand": "iPad",
		"model": "iPad Air/iPad 5 (2017)"
	},
	{
		"brand": "iPad",
		"model": "iPad Mini 4/5"
	},
	{
		"brand": "iPad",
		"model": "iPad Mini 1/2/3"
	},
	{
		"brand": "MacBook",
		"model": "MacBook Air 13\" (A2681)"
	},
	{
		"brand": "MacBook",
		"model": "MacBook Air 13\" (A2338)"
	},
	{
		"brand": "MacBook",
		"model": "MacBook Air 13\" (A2337)"
	},
	{
		"brand": "MacBook",
		"model": "MacBook Air 13\" (A1932/A2179)"
	},
	{
		"brand": "MacBook",
		"model": "MacBook Pro 13\" (A1989/A2159/A2251/A2289)"
	},
	{
		"brand": "MacBook",
		"model": "MacBook Pro 13\" (A1706/A1708)"
	},
	{
		"brand": "MacBook",
		"model": "MacBook Air 13\" (A1466)"
	},
	{
		"brand": "Samsung",
		"model": "S24 Ultra"
	},
	{
		"brand": "Samsung",
		"model": "S24 Plus"
	},
	{
		"brand": "Samsung",
		"model": "S24"
	},
	{
		"brand": "Samsung",
		"model": "S23 Ultra"
	},
	{
		"brand": "Samsung",
		"model": "S23 Plus"
	},
	{
		"brand": "Samsung",
		"model": "S23"
	},
	{
		"brand": "Samsung",
		"model": "S23 FE"
	},
	{
		"brand": "Samsung",
		"model": "S22 Ultra"
	},
	{
		"brand": "Samsung",
		"model": "S22 Plus"
	},
	{
		"brand": "Samsung",
		"model": "S22"
	},
	{
		"brand": "Samsung",
		"model": "S21 Ultra"
	},
	{
		"brand": "Samsung",
		"model": "S21 Plus"
	},
	{
		"brand": "Samsung",
		"model": "S21"
	},
	{
		"brand": "Samsung",
		"model": "S21 FE"
	},
	{
		"brand": "Samsung",
		"model": "S20 Ultra"
	},
	{
		"brand": "Samsung",
		"model": "S20 Plus"
	},
	{
		"brand": "Samsung",
		"model": "S20"
	},
	{
		"brand": "Samsung",
		"model": "S20 FE"
	},
	{
		"brand": "Samsung",
		"model": "Note20 Ultra"
	},
	{
		"brand": "Samsung",
		"model": "Note20"
	}
];
	const inventory = [
	{
		"sku": "old-iphone-lcd-screen-replacement-iphone-17-pro-max-lcd-screen",
		"name": "iPhone 17 Pro Max - LCD Screen",
		"supplier": "Old website: iPhone LCD Screen Replacement",
		"sell_price": 200,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-lcd-screen-replacement-iphone-17-pro-lcd-screen",
		"name": "iPhone 17 Pro - LCD Screen",
		"supplier": "Old website: iPhone LCD Screen Replacement",
		"sell_price": 200,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-lcd-screen-replacement-iphone-17-lcd-screen",
		"name": "iPhone 17 - LCD Screen",
		"supplier": "Old website: iPhone LCD Screen Replacement",
		"sell_price": 200,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-lcd-screen-replacement-iphone-16-pro-max-lcd-screen",
		"name": "iPhone 16 Pro Max - LCD Screen",
		"supplier": "Old website: iPhone LCD Screen Replacement",
		"sell_price": 170,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-lcd-screen-replacement-iphone-16-pro-lcd-screen",
		"name": "iPhone 16 Pro - LCD Screen",
		"supplier": "Old website: iPhone LCD Screen Replacement",
		"sell_price": 160,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-lcd-screen-replacement-iphone-16-16-plus-lcd-screen",
		"name": "iPhone 16/16 Plus - LCD Screen",
		"supplier": "Old website: iPhone LCD Screen Replacement",
		"sell_price": 150,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-lcd-screen-replacement-iphone-16e-lcd-screen",
		"name": "iPhone 16E - LCD Screen",
		"supplier": "Old website: iPhone LCD Screen Replacement",
		"sell_price": 120,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-lcd-screen-replacement-iphone-15-pro-max-lcd-screen",
		"name": "iPhone 15 Pro Max - LCD Screen",
		"supplier": "Old website: iPhone LCD Screen Replacement",
		"sell_price": 140,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-lcd-screen-replacement-iphone-15-pro-lcd-screen",
		"name": "iPhone 15 Pro - LCD Screen",
		"supplier": "Old website: iPhone LCD Screen Replacement",
		"sell_price": 120,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-lcd-screen-replacement-iphone-15-15-plus-lcd-screen",
		"name": "iPhone 15/15 Plus - LCD Screen",
		"supplier": "Old website: iPhone LCD Screen Replacement",
		"sell_price": 120,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-lcd-screen-replacement-iphone-14-pro-max-lcd-screen",
		"name": "iPhone 14 Pro Max - LCD Screen",
		"supplier": "Old website: iPhone LCD Screen Replacement",
		"sell_price": 140,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-lcd-screen-replacement-iphone-14-pro-lcd-screen",
		"name": "iPhone 14 Pro - LCD Screen",
		"supplier": "Old website: iPhone LCD Screen Replacement",
		"sell_price": 120,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-lcd-screen-replacement-iphone-14-14-plus-lcd-screen",
		"name": "iPhone 14/14 Plus - LCD Screen",
		"supplier": "Old website: iPhone LCD Screen Replacement",
		"sell_price": 120,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-lcd-screen-replacement-iphone-13-pro-max-lcd-screen",
		"name": "iPhone 13 Pro Max - LCD Screen",
		"supplier": "Old website: iPhone LCD Screen Replacement",
		"sell_price": 120,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-lcd-screen-replacement-iphone-13-pro-lcd-screen",
		"name": "iPhone 13 Pro - LCD Screen",
		"supplier": "Old website: iPhone LCD Screen Replacement",
		"sell_price": 115,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-lcd-screen-replacement-iphone-13-mini-lcd-screen",
		"name": "iPhone 13 Mini - LCD Screen",
		"supplier": "Old website: iPhone LCD Screen Replacement",
		"sell_price": 140,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-lcd-screen-replacement-iphone-13-lcd-screen",
		"name": "iPhone 13 - LCD Screen",
		"supplier": "Old website: iPhone LCD Screen Replacement",
		"sell_price": 110,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-lcd-screen-replacement-iphone-12-pro-max-lcd-screen",
		"name": "iPhone 12 Pro Max - LCD Screen",
		"supplier": "Old website: iPhone LCD Screen Replacement",
		"sell_price": 115,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-lcd-screen-replacement-iphone-12-12-pro-lcd-screen",
		"name": "iPhone 12/12 Pro - LCD Screen",
		"supplier": "Old website: iPhone LCD Screen Replacement",
		"sell_price": 100,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-lcd-screen-replacement-iphone-12-mini-lcd-screen",
		"name": "iPhone 12 Mini - LCD Screen",
		"supplier": "Old website: iPhone LCD Screen Replacement",
		"sell_price": 130,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-lcd-screen-replacement-iphone-11-pro-max-lcd-screen",
		"name": "iPhone 11 Pro Max - LCD Screen",
		"supplier": "Old website: iPhone LCD Screen Replacement",
		"sell_price": 100,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-lcd-screen-replacement-iphone-11-11-pro-lcd-screen",
		"name": "iPhone 11/11 Pro - LCD Screen",
		"supplier": "Old website: iPhone LCD Screen Replacement",
		"sell_price": 95,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-lcd-screen-replacement-iphone-x-xr-xs-max-lcd-screen",
		"name": "iPhone X/XR/XS/Max - LCD Screen",
		"supplier": "Old website: iPhone LCD Screen Replacement",
		"sell_price": 75,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-lcd-screen-replacement-iphone-8-plus-lcd-screen",
		"name": "iPhone 8 Plus - LCD Screen",
		"supplier": "Old website: iPhone LCD Screen Replacement",
		"sell_price": 70,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-lcd-screen-replacement-iphone-8-se2-lcd-screen",
		"name": "iPhone 8/SE2 - LCD Screen",
		"supplier": "Old website: iPhone LCD Screen Replacement",
		"sell_price": 70,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-back-glass-replacement-iphone-17-17-pro-max-back-glass",
		"name": "iPhone 17-17 Pro Max - Back Glass",
		"supplier": "Old website: iPhone Back Glass Replacement",
		"sell_price": 140,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-back-glass-replacement-iphone-16-16-pro-max-back-glass",
		"name": "iPhone 16-16 Pro Max - Back Glass",
		"supplier": "Old website: iPhone Back Glass Replacement",
		"sell_price": 120,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-back-glass-replacement-iphone-15-15-pro-max-back-glass",
		"name": "iPhone 15-15 Pro Max - Back Glass",
		"supplier": "Old website: iPhone Back Glass Replacement",
		"sell_price": 110,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-back-glass-replacement-iphone-14-14-pro-max-back-glass",
		"name": "iPhone 14-14 Pro Max - Back Glass",
		"supplier": "Old website: iPhone Back Glass Replacement",
		"sell_price": 100,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-back-glass-replacement-iphone-13-13-pro-max-back-glass",
		"name": "iPhone 13-13 Pro Max - Back Glass",
		"supplier": "Old website: iPhone Back Glass Replacement",
		"sell_price": 95,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-back-glass-replacement-iphone-12-12-pro-max-back-glass",
		"name": "iPhone 12-12 Pro Max - Back Glass",
		"supplier": "Old website: iPhone Back Glass Replacement",
		"sell_price": 85,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-back-glass-replacement-iphone-11-11-pro-max-back-glass",
		"name": "iPhone 11-11 Pro Max - Back Glass",
		"supplier": "Old website: iPhone Back Glass Replacement",
		"sell_price": 70,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-back-glass-replacement-iphone-x-xr-xs-max-back-glass",
		"name": "iPhone X/XR/XS/Max - Back Glass",
		"supplier": "Old website: iPhone Back Glass Replacement",
		"sell_price": 60,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-battery-replacement-iphone-14-15-pro-max-battery",
		"name": "iPhone 14-15 Pro Max - Battery",
		"supplier": "Old website: iPhone Battery Replacement",
		"sell_price": 110,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-battery-replacement-iphone-12-13-pro-max-battery",
		"name": "iPhone 12-13 Pro Max - Battery",
		"supplier": "Old website: iPhone Battery Replacement",
		"sell_price": 95,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-battery-replacement-iphone-11-11-pro-11-pro-max-battery",
		"name": "iPhone 11/11 Pro/11 Pro Max - Battery",
		"supplier": "Old website: iPhone Battery Replacement",
		"sell_price": 85,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-battery-replacement-iphone-x-xr-xs-xs-max-battery",
		"name": "iPhone X/XR/XS/XS Max - Battery",
		"supplier": "Old website: iPhone Battery Replacement",
		"sell_price": 75,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-battery-replacement-iphone-7-7p-8-8p-se-battery",
		"name": "iPhone 7/7P/8/8P/SE - Battery",
		"supplier": "Old website: iPhone Battery Replacement",
		"sell_price": 60,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-iphone-battery-replacement-iphone-6-6p-6s-6sp-battery",
		"name": "iPhone 6/6P/6S/6SP - Battery",
		"supplier": "Old website: iPhone Battery Replacement",
		"sell_price": 50,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-ipad-screen-replacement-ipad-mini-6-screen",
		"name": "iPad Mini 6 - Screen",
		"supplier": "Old website: iPad Screen Replacement",
		"sell_price": 490,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-ipad-screen-replacement-ipad-pro-12-9-5th-6th-gen-screen",
		"name": "iPad Pro 12.9\" (5th/6th Gen) - Screen",
		"supplier": "Old website: iPad Screen Replacement",
		"sell_price": 390,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-ipad-screen-replacement-ipad-pro-12-9-3rd-4th-gen-screen",
		"name": "iPad Pro 12.9\" (3rd/4th Gen) - Screen",
		"supplier": "Old website: iPad Screen Replacement",
		"sell_price": 390,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-ipad-screen-replacement-ipad-pro-12-9-2nd-gen-screen",
		"name": "iPad Pro 12.9\" (2nd Gen) - Screen",
		"supplier": "Old website: iPad Screen Replacement",
		"sell_price": 545,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-ipad-screen-replacement-ipad-pro-12-9-1st-gen-screen",
		"name": "iPad Pro 12.9\" (1st Gen) - Screen",
		"supplier": "Old website: iPad Screen Replacement",
		"sell_price": 350,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-ipad-screen-replacement-ipad-pro-11-2021-2022-screen",
		"name": "iPad Pro 11\" (2021/2022) - Screen",
		"supplier": "Old website: iPad Screen Replacement",
		"sell_price": 395,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-ipad-screen-replacement-ipad-pro-11-2018-2020-screen",
		"name": "iPad Pro 11\" (2018/2020) - Screen",
		"supplier": "Old website: iPad Screen Replacement",
		"sell_price": 395,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-ipad-screen-replacement-ipad-pro-10-5-screen",
		"name": "iPad Pro 10.5\" - Screen",
		"supplier": "Old website: iPad Screen Replacement",
		"sell_price": 240,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-ipad-screen-replacement-ipad-pro-9-7-screen",
		"name": "iPad Pro 9.7\" - Screen",
		"supplier": "Old website: iPad Screen Replacement",
		"sell_price": 230,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-ipad-screen-replacement-ipad-air-4-5-screen",
		"name": "iPad Air 4/5 - Screen",
		"supplier": "Old website: iPad Screen Replacement",
		"sell_price": 360,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-ipad-screen-replacement-ipad-air-3-screen",
		"name": "iPad Air 3 - Screen",
		"supplier": "Old website: iPad Screen Replacement",
		"sell_price": 225,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-ipad-screen-replacement-ipad-air-2-screen",
		"name": "iPad Air 2 - Screen",
		"supplier": "Old website: iPad Screen Replacement",
		"sell_price": 230,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-ipad-screen-replacement-ipad-10-screen",
		"name": "iPad 10 - Screen",
		"supplier": "Old website: iPad Screen Replacement",
		"sell_price": 140,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-ipad-screen-replacement-ipad-9-2021-10-2-screen",
		"name": "iPad 9 (2021) 10.2\" - Screen",
		"supplier": "Old website: iPad Screen Replacement",
		"sell_price": 135,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-ipad-screen-replacement-ipad-7-2019-8-2020-screen",
		"name": "iPad 7 (2019)/8 (2020) - Screen",
		"supplier": "Old website: iPad Screen Replacement",
		"sell_price": 135,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-ipad-screen-replacement-ipad-6-2018-screen",
		"name": "iPad 6 (2018) - Screen",
		"supplier": "Old website: iPad Screen Replacement",
		"sell_price": 125,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-ipad-screen-replacement-ipad-air-ipad-5-2017-screen",
		"name": "iPad Air/iPad 5 (2017) - Screen",
		"supplier": "Old website: iPad Screen Replacement",
		"sell_price": 125,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-ipad-screen-replacement-ipad-mini-4-5-screen",
		"name": "iPad Mini 4/5 - Screen",
		"supplier": "Old website: iPad Screen Replacement",
		"sell_price": 205,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-ipad-screen-replacement-ipad-mini-1-2-3-screen",
		"name": "iPad Mini 1/2/3 - Screen",
		"supplier": "Old website: iPad Screen Replacement",
		"sell_price": 140,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-macbook-screen-replacement-macbook-air-13-a2681-screen",
		"name": "MacBook Air 13\" (A2681) - Screen",
		"supplier": "Old website: MacBook Screen Replacement",
		"sell_price": 460,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-macbook-screen-replacement-macbook-air-13-a2338-screen",
		"name": "MacBook Air 13\" (A2338) - Screen",
		"supplier": "Old website: MacBook Screen Replacement",
		"sell_price": 430,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-macbook-screen-replacement-macbook-air-13-a2337-screen",
		"name": "MacBook Air 13\" (A2337) - Screen",
		"supplier": "Old website: MacBook Screen Replacement",
		"sell_price": 470,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-macbook-screen-replacement-macbook-air-13-a1932-a2179-screen",
		"name": "MacBook Air 13\" (A1932/A2179) - Screen",
		"supplier": "Old website: MacBook Screen Replacement",
		"sell_price": 400,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-macbook-screen-replacement-macbook-pro-13-a1989-a2159-a2251-a2289-screen",
		"name": "MacBook Pro 13\" (A1989/A2159/A2251/A2289) - Screen",
		"supplier": "Old website: MacBook Screen Replacement",
		"sell_price": 400,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-macbook-screen-replacement-macbook-pro-13-a1706-a1708-screen",
		"name": "MacBook Pro 13\" (A1706/A1708) - Screen",
		"supplier": "Old website: MacBook Screen Replacement",
		"sell_price": 400,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-macbook-screen-replacement-macbook-air-13-a1466-screen",
		"name": "MacBook Air 13\" (A1466) - Screen",
		"supplier": "Old website: MacBook Screen Replacement",
		"sell_price": 350,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-samsung-screen-replacement-genuine-service-pack-s24-ultra-screen",
		"name": "S24 Ultra - Screen",
		"supplier": "Old website: Samsung Screen Replacement (Genuine Service Pack)",
		"sell_price": 440,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-samsung-screen-replacement-genuine-service-pack-s24-plus-screen",
		"name": "S24 Plus - Screen",
		"supplier": "Old website: Samsung Screen Replacement (Genuine Service Pack)",
		"sell_price": 345,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-samsung-screen-replacement-genuine-service-pack-s24-screen",
		"name": "S24 - Screen",
		"supplier": "Old website: Samsung Screen Replacement (Genuine Service Pack)",
		"sell_price": 300,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-samsung-screen-replacement-genuine-service-pack-s23-ultra-screen",
		"name": "S23 Ultra - Screen",
		"supplier": "Old website: Samsung Screen Replacement (Genuine Service Pack)",
		"sell_price": 440,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-samsung-screen-replacement-genuine-service-pack-s23-plus-screen",
		"name": "S23 Plus - Screen",
		"supplier": "Old website: Samsung Screen Replacement (Genuine Service Pack)",
		"sell_price": 295,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-samsung-screen-replacement-genuine-service-pack-s23-screen",
		"name": "S23 - Screen",
		"supplier": "Old website: Samsung Screen Replacement (Genuine Service Pack)",
		"sell_price": 295,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-samsung-screen-replacement-genuine-service-pack-s23-fe-screen",
		"name": "S23 FE - Screen",
		"supplier": "Old website: Samsung Screen Replacement (Genuine Service Pack)",
		"sell_price": 255,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-samsung-screen-replacement-genuine-service-pack-s22-ultra-screen",
		"name": "S22 Ultra - Screen",
		"supplier": "Old website: Samsung Screen Replacement (Genuine Service Pack)",
		"sell_price": 410,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-samsung-screen-replacement-genuine-service-pack-s22-plus-screen",
		"name": "S22 Plus - Screen",
		"supplier": "Old website: Samsung Screen Replacement (Genuine Service Pack)",
		"sell_price": 275,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-samsung-screen-replacement-genuine-service-pack-s22-screen",
		"name": "S22 - Screen",
		"supplier": "Old website: Samsung Screen Replacement (Genuine Service Pack)",
		"sell_price": 295,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-samsung-screen-replacement-genuine-service-pack-s21-ultra-screen",
		"name": "S21 Ultra - Screen",
		"supplier": "Old website: Samsung Screen Replacement (Genuine Service Pack)",
		"sell_price": 360,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-samsung-screen-replacement-genuine-service-pack-s21-plus-screen",
		"name": "S21 Plus - Screen",
		"supplier": "Old website: Samsung Screen Replacement (Genuine Service Pack)",
		"sell_price": 280,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-samsung-screen-replacement-genuine-service-pack-s21-screen",
		"name": "S21 - Screen",
		"supplier": "Old website: Samsung Screen Replacement (Genuine Service Pack)",
		"sell_price": 280,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-samsung-screen-replacement-genuine-service-pack-s21-fe-screen",
		"name": "S21 FE - Screen",
		"supplier": "Old website: Samsung Screen Replacement (Genuine Service Pack)",
		"sell_price": 245,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-samsung-screen-replacement-genuine-service-pack-s20-ultra-screen",
		"name": "S20 Ultra - Screen",
		"supplier": "Old website: Samsung Screen Replacement (Genuine Service Pack)",
		"sell_price": 340,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-samsung-screen-replacement-genuine-service-pack-s20-plus-screen",
		"name": "S20 Plus - Screen",
		"supplier": "Old website: Samsung Screen Replacement (Genuine Service Pack)",
		"sell_price": 330,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-samsung-screen-replacement-genuine-service-pack-s20-screen",
		"name": "S20 - Screen",
		"supplier": "Old website: Samsung Screen Replacement (Genuine Service Pack)",
		"sell_price": 330,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-samsung-screen-replacement-genuine-service-pack-s20-fe-screen",
		"name": "S20 FE - Screen",
		"supplier": "Old website: Samsung Screen Replacement (Genuine Service Pack)",
		"sell_price": 245,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-samsung-screen-replacement-genuine-service-pack-note20-ultra-screen",
		"name": "Note20 Ultra - Screen",
		"supplier": "Old website: Samsung Screen Replacement (Genuine Service Pack)",
		"sell_price": 350,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-samsung-screen-replacement-genuine-service-pack-note20-screen",
		"name": "Note20 - Screen",
		"supplier": "Old website: Samsung Screen Replacement (Genuine Service Pack)",
		"sell_price": 310,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-other-services-charging-port-replacement",
		"name": "Charging Port - Replacement",
		"supplier": "Old website: Other Services",
		"sell_price": 55,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-other-services-back-camera-replacement",
		"name": "Back Camera - Replacement",
		"supplier": "Old website: Other Services",
		"sell_price": 80,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-other-services-front-camera-replacement",
		"name": "Front Camera - Replacement",
		"supplier": "Old website: Other Services",
		"sell_price": 55,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-other-services-water-damage-repairs",
		"name": "Water Damage - Repairs",
		"supplier": "Old website: Other Services",
		"sell_price": 160,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-other-services-signal-repairs-service",
		"name": "Signal Repairs - Service",
		"supplier": "Old website: Other Services",
		"sell_price": 160,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-other-services-power-silent-volume-button-replacement",
		"name": "Power/Silent/Volume - Button Replacement",
		"supplier": "Old website: Other Services",
		"sell_price": 75,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-other-services-motherboard-repairs",
		"name": "Motherboard - Repairs",
		"supplier": "Old website: Other Services",
		"sell_price": 300,
		"quantity": 1,
		"low_stock_threshold": 0
	},
	{
		"sku": "old-other-services-custom-laser-engraving-service",
		"name": "Custom Laser Engraving - Service",
		"supplier": "Old website: Other Services",
		"sell_price": 25,
		"quantity": 1,
		"low_stock_threshold": 0
	}
];

	const deviceCollection = app.findCollectionByNameOrId('devices');
	for (const item of devices) {
		try {
			app.findFirstRecordByFilter('devices', 'brand = {:brand} && model = {:model}', { brand: item.brand, model: item.model });
			continue;
		} catch (e) {}
		const record = new Record(deviceCollection);
		record.set('brand', item.brand);
		record.set('model', item.model);
		record.set('repairable', true);
		app.save(record);
	}

	const inventoryCollection = app.findCollectionByNameOrId('inventory_parts');
	for (const item of inventory) {
		try {
			app.findFirstRecordByFilter('inventory_parts', 'sku = {:sku}', { sku: item.sku });
			continue;
		} catch (e) {}
		const record = new Record(inventoryCollection);
		record.set('name', item.name);
		record.set('sku', item.sku);
		record.set('quantity', item.quantity);
		record.set('sell_price', item.sell_price);
		record.set('supplier', item.supplier);
		record.set('low_stock_threshold', item.low_stock_threshold);
		record.set('archived', false);
		app.save(record);
	}
}, (app) => {
	const inventory = [
	"old-iphone-lcd-screen-replacement-iphone-17-pro-max-lcd-screen",
	"old-iphone-lcd-screen-replacement-iphone-17-pro-lcd-screen",
	"old-iphone-lcd-screen-replacement-iphone-17-lcd-screen",
	"old-iphone-lcd-screen-replacement-iphone-16-pro-max-lcd-screen",
	"old-iphone-lcd-screen-replacement-iphone-16-pro-lcd-screen",
	"old-iphone-lcd-screen-replacement-iphone-16-16-plus-lcd-screen",
	"old-iphone-lcd-screen-replacement-iphone-16e-lcd-screen",
	"old-iphone-lcd-screen-replacement-iphone-15-pro-max-lcd-screen",
	"old-iphone-lcd-screen-replacement-iphone-15-pro-lcd-screen",
	"old-iphone-lcd-screen-replacement-iphone-15-15-plus-lcd-screen",
	"old-iphone-lcd-screen-replacement-iphone-14-pro-max-lcd-screen",
	"old-iphone-lcd-screen-replacement-iphone-14-pro-lcd-screen",
	"old-iphone-lcd-screen-replacement-iphone-14-14-plus-lcd-screen",
	"old-iphone-lcd-screen-replacement-iphone-13-pro-max-lcd-screen",
	"old-iphone-lcd-screen-replacement-iphone-13-pro-lcd-screen",
	"old-iphone-lcd-screen-replacement-iphone-13-mini-lcd-screen",
	"old-iphone-lcd-screen-replacement-iphone-13-lcd-screen",
	"old-iphone-lcd-screen-replacement-iphone-12-pro-max-lcd-screen",
	"old-iphone-lcd-screen-replacement-iphone-12-12-pro-lcd-screen",
	"old-iphone-lcd-screen-replacement-iphone-12-mini-lcd-screen",
	"old-iphone-lcd-screen-replacement-iphone-11-pro-max-lcd-screen",
	"old-iphone-lcd-screen-replacement-iphone-11-11-pro-lcd-screen",
	"old-iphone-lcd-screen-replacement-iphone-x-xr-xs-max-lcd-screen",
	"old-iphone-lcd-screen-replacement-iphone-8-plus-lcd-screen",
	"old-iphone-lcd-screen-replacement-iphone-8-se2-lcd-screen",
	"old-iphone-back-glass-replacement-iphone-17-17-pro-max-back-glass",
	"old-iphone-back-glass-replacement-iphone-16-16-pro-max-back-glass",
	"old-iphone-back-glass-replacement-iphone-15-15-pro-max-back-glass",
	"old-iphone-back-glass-replacement-iphone-14-14-pro-max-back-glass",
	"old-iphone-back-glass-replacement-iphone-13-13-pro-max-back-glass",
	"old-iphone-back-glass-replacement-iphone-12-12-pro-max-back-glass",
	"old-iphone-back-glass-replacement-iphone-11-11-pro-max-back-glass",
	"old-iphone-back-glass-replacement-iphone-x-xr-xs-max-back-glass",
	"old-iphone-battery-replacement-iphone-14-15-pro-max-battery",
	"old-iphone-battery-replacement-iphone-12-13-pro-max-battery",
	"old-iphone-battery-replacement-iphone-11-11-pro-11-pro-max-battery",
	"old-iphone-battery-replacement-iphone-x-xr-xs-xs-max-battery",
	"old-iphone-battery-replacement-iphone-7-7p-8-8p-se-battery",
	"old-iphone-battery-replacement-iphone-6-6p-6s-6sp-battery",
	"old-ipad-screen-replacement-ipad-mini-6-screen",
	"old-ipad-screen-replacement-ipad-pro-12-9-5th-6th-gen-screen",
	"old-ipad-screen-replacement-ipad-pro-12-9-3rd-4th-gen-screen",
	"old-ipad-screen-replacement-ipad-pro-12-9-2nd-gen-screen",
	"old-ipad-screen-replacement-ipad-pro-12-9-1st-gen-screen",
	"old-ipad-screen-replacement-ipad-pro-11-2021-2022-screen",
	"old-ipad-screen-replacement-ipad-pro-11-2018-2020-screen",
	"old-ipad-screen-replacement-ipad-pro-10-5-screen",
	"old-ipad-screen-replacement-ipad-pro-9-7-screen",
	"old-ipad-screen-replacement-ipad-air-4-5-screen",
	"old-ipad-screen-replacement-ipad-air-3-screen",
	"old-ipad-screen-replacement-ipad-air-2-screen",
	"old-ipad-screen-replacement-ipad-10-screen",
	"old-ipad-screen-replacement-ipad-9-2021-10-2-screen",
	"old-ipad-screen-replacement-ipad-7-2019-8-2020-screen",
	"old-ipad-screen-replacement-ipad-6-2018-screen",
	"old-ipad-screen-replacement-ipad-air-ipad-5-2017-screen",
	"old-ipad-screen-replacement-ipad-mini-4-5-screen",
	"old-ipad-screen-replacement-ipad-mini-1-2-3-screen",
	"old-macbook-screen-replacement-macbook-air-13-a2681-screen",
	"old-macbook-screen-replacement-macbook-air-13-a2338-screen",
	"old-macbook-screen-replacement-macbook-air-13-a2337-screen",
	"old-macbook-screen-replacement-macbook-air-13-a1932-a2179-screen",
	"old-macbook-screen-replacement-macbook-pro-13-a1989-a2159-a2251-a2289-screen",
	"old-macbook-screen-replacement-macbook-pro-13-a1706-a1708-screen",
	"old-macbook-screen-replacement-macbook-air-13-a1466-screen",
	"old-samsung-screen-replacement-genuine-service-pack-s24-ultra-screen",
	"old-samsung-screen-replacement-genuine-service-pack-s24-plus-screen",
	"old-samsung-screen-replacement-genuine-service-pack-s24-screen",
	"old-samsung-screen-replacement-genuine-service-pack-s23-ultra-screen",
	"old-samsung-screen-replacement-genuine-service-pack-s23-plus-screen",
	"old-samsung-screen-replacement-genuine-service-pack-s23-screen",
	"old-samsung-screen-replacement-genuine-service-pack-s23-fe-screen",
	"old-samsung-screen-replacement-genuine-service-pack-s22-ultra-screen",
	"old-samsung-screen-replacement-genuine-service-pack-s22-plus-screen",
	"old-samsung-screen-replacement-genuine-service-pack-s22-screen",
	"old-samsung-screen-replacement-genuine-service-pack-s21-ultra-screen",
	"old-samsung-screen-replacement-genuine-service-pack-s21-plus-screen",
	"old-samsung-screen-replacement-genuine-service-pack-s21-screen",
	"old-samsung-screen-replacement-genuine-service-pack-s21-fe-screen",
	"old-samsung-screen-replacement-genuine-service-pack-s20-ultra-screen",
	"old-samsung-screen-replacement-genuine-service-pack-s20-plus-screen",
	"old-samsung-screen-replacement-genuine-service-pack-s20-screen",
	"old-samsung-screen-replacement-genuine-service-pack-s20-fe-screen",
	"old-samsung-screen-replacement-genuine-service-pack-note20-ultra-screen",
	"old-samsung-screen-replacement-genuine-service-pack-note20-screen",
	"old-other-services-charging-port-replacement",
	"old-other-services-back-camera-replacement",
	"old-other-services-front-camera-replacement",
	"old-other-services-water-damage-repairs",
	"old-other-services-signal-repairs-service",
	"old-other-services-power-silent-volume-button-replacement",
	"old-other-services-motherboard-repairs",
	"old-other-services-custom-laser-engraving-service"
];
	for (const sku of inventory) {
		try {
			const record = app.findFirstRecordByFilter('inventory_parts', 'sku = {:sku}', { sku });
			app.delete(record);
		} catch (e) {}
	}
});
