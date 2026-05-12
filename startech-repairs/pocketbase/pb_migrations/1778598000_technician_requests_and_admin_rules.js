migrate((app) => {
	let requests;
	try {
		requests = app.findCollectionByNameOrId("technician_requests");
	} catch (e) {
		requests = new Collection({
			name: "technician_requests",
			type: "base",
			listRule: "@request.auth.role = 'admin'",
			viewRule: "@request.auth.role = 'admin'",
			createRule: "",
			updateRule: "@request.auth.role = 'admin'",
			deleteRule: "@request.auth.role = 'admin'",
			fields: [
				{ name: "name", type: "text", required: true },
				{ name: "email", type: "email", required: true },
				{ name: "phone", type: "text" },
				{ name: "experience", type: "editor" },
				{ name: "status", type: "select", required: true, values: ["Pending", "Approved", "Rejected"], default: "Pending" },
				{ name: "notes", type: "editor" }
			],
			indexes: ["CREATE INDEX idx_technician_requests_status ON technician_requests (status)"]
		});
	}
	app.save(requests);

	const technicians = app.findCollectionByNameOrId("technicians");
	technicians.createRule = "@request.auth.role = 'admin'";
	technicians.listRule = "@request.auth.role = 'admin' || @request.auth.role = 'technician'";
	technicians.viewRule = "@request.auth.id = id || @request.auth.role = 'admin' || @request.auth.role = 'technician'";
	app.save(technicians);

	const customers = app.findCollectionByNameOrId("customers");
	customers.listRule = "@request.auth.id = id || @request.auth.role = 'admin' || @request.auth.role = 'technician'";
	customers.viewRule = "@request.auth.id = id || @request.auth.role = 'admin' || @request.auth.role = 'technician'";
	app.save(customers);

	const notifications = app.findCollectionByNameOrId("notifications");
	notifications.listRule = "@request.auth.id != '' && (customer = @request.auth.id || @request.auth.role = 'admin' || @request.auth.role = 'technician')";
	notifications.viewRule = notifications.listRule;
	app.save(notifications);
}, (app) => {
	try {
		const requests = app.findCollectionByNameOrId("technician_requests");
		app.delete(requests);
	} catch (e) {}

	const technicians = app.findCollectionByNameOrId("technicians");
	technicians.createRule = "";
	technicians.listRule = "@request.auth.role = 'admin'";
	technicians.viewRule = "@request.auth.id != ''";
	app.save(technicians);

	const customers = app.findCollectionByNameOrId("customers");
	customers.listRule = "@request.auth.id = id || @request.auth.role = 'admin'";
	customers.viewRule = "@request.auth.id = id || @request.auth.role = 'admin'";
	app.save(customers);

	const notifications = app.findCollectionByNameOrId("notifications");
	notifications.listRule = "@request.auth.id != '' && customer = @request.auth.id";
	notifications.viewRule = notifications.listRule;
	app.save(notifications);
});
