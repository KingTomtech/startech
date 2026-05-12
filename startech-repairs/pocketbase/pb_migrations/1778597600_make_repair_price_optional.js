migrate((app) => {
	const collection = app.findCollectionByNameOrId("repairs");
	const price = collection.fields.getByName("price");
	price.required = false;
	app.save(collection);
}, (app) => {
	const collection = app.findCollectionByNameOrId("repairs");
	const price = collection.fields.getByName("price");
	price.required = true;
	app.save(collection);
});
