migrate((app) => {
	const repairs = app.findCollectionByNameOrId("repairs");
	const authenticatedAccess = "@request.auth.id != '' && (customer = @request.auth.id || @request.auth.role = 'admin' || @request.auth.role = 'technician')";
	const trackingAccess = "(@request.query.filter != '' && @request.query.filter ~ 'booking_id')";
	repairs.listRule = `${authenticatedAccess} || ${trackingAccess}`;
	repairs.viewRule = authenticatedAccess;
	app.save(repairs);
}, (app) => {
	const repairs = app.findCollectionByNameOrId("repairs");
	repairs.listRule = "";
	repairs.viewRule = "";
	app.save(repairs);
});
