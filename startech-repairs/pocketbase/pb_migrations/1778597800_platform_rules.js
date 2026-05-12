migrate((app) => {
	const repairs = app.findCollectionByNameOrId("repairs");
	repairs.listRule = "";
	repairs.viewRule = "";
	app.save(repairs);

	const technicians = app.findCollectionByNameOrId("technicians");
	technicians.createRule = "";
	app.save(technicians);

	const inventory = app.findCollectionByNameOrId("inventory_parts");
	inventory.createRule = "@request.auth.role = 'admin' || @request.auth.role = 'technician'";
	inventory.updateRule = "@request.auth.role = 'admin' || @request.auth.role = 'technician'";
	app.save(inventory);
}, (app) => {
	const repairs = app.findCollectionByNameOrId("repairs");
	repairs.listRule = "@request.auth.id != '' && (customer = @request.auth.id || @request.auth.role = 'admin' || @request.auth.role = 'technician')";
	repairs.viewRule = "@request.auth.id != '' && (customer = @request.auth.id || @request.auth.role = 'admin' || @request.auth.role = 'technician')";
	app.save(repairs);

	const technicians = app.findCollectionByNameOrId("technicians");
	technicians.createRule = "@request.auth.role = 'admin'";
	app.save(technicians);

	const inventory = app.findCollectionByNameOrId("inventory_parts");
	inventory.createRule = "@request.auth.role = 'admin'";
	inventory.updateRule = "@request.auth.role = 'admin'";
	app.save(inventory);
});
