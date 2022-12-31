export async function shopsAPIGetCall(queryParameters) {
	const queryArguments = new URLSearchParams(queryParameters);

	return await fetch(`/api/shops?${queryArguments}`, {method: 'GET'});
};

export async function shopsAPIPostCall({ upVotes, ...rest }) {
	return await fetch('/api/shops', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			...rest,
			upVotes: 0
		})
	});
};