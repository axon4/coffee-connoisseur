function getPathName(path) {
	const basePathName = '/api/shops';
	let pathName = basePathName;

	if (path) {
		pathName += path;
	};

	return pathName;
};

export async function shopsAPIGetCall(path, queryParameters) {
	let pathName = getPathName(path);

	if (queryParameters) {
		const queryArguments = new URLSearchParams(queryParameters);

		pathName += `?${queryArguments}`;
	};

	return await fetch(pathName, {method: 'GET'});
};

export async function shopsAPIPostCall(path, shop) {
	let pathName = getPathName(path);

	return await fetch(pathName, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(shop)
	});
};