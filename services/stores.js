export async function storesGet() {
    const queryParameters = new URLSearchParams({
        query: 'coffee',
        near: 'London',
        limit: 7
    });
	const storesURL = new URL(`?${queryParameters}`, 'https://api.foursquare.com/v3/places/search');
    
    try {
		const response = await fetch(storesURL, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				Authorization: process.env.FOURSQUARE_API_KEY
			}
		});
		const data = await response.json();

		return data.results;
	} catch (error) {
		console.error(error);
	};
};