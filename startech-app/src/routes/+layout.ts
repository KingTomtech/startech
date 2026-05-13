import './app.css';

export const load = async ({ setHeaders }) => {
	setHeaders({
		'cache-control': 'public, max-age=300'
	});
};
