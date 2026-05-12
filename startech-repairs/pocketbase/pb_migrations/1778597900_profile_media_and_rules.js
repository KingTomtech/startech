migrate((app) => {
	const customers = app.findCollectionByNameOrId("customers");
	customers.fields.add(new FileField({
		name: "avatar",
		maxSelect: 1,
		maxSize: 5242880,
		mimeTypes: ["image/jpeg", "image/png", "image/webp"]
	}));
	app.save(customers);

	const technicians = app.findCollectionByNameOrId("technicians");
	technicians.updateRule = "@request.auth.id = id || @request.auth.role = 'admin'";
	technicians.fields.add(new TextField({
		name: "phone",
	}));
	technicians.fields.add(new FileField({
		name: "avatar",
		maxSelect: 1,
		maxSize: 5242880,
		mimeTypes: ["image/jpeg", "image/png", "image/webp"]
	}));
	app.save(technicians);
}, (app) => {
	const customers = app.findCollectionByNameOrId("customers");
	customers.fields.removeByName("avatar");
	app.save(customers);

	const technicians = app.findCollectionByNameOrId("technicians");
	technicians.updateRule = "@request.auth.role = 'admin'";
	technicians.fields.removeByName("phone");
	technicians.fields.removeByName("avatar");
	app.save(technicians);
});
