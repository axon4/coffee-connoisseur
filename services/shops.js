import { photosGet } from './photos';

export async function shopsGet(limit = 6, coordinates = null) {
	let locationArgument;

	if (coordinates) {
		locationArgument = {ll: coordinates};
	} else {
		locationArgument = {near: 'London'};
	};

    const queryParameters = new URLSearchParams({
        query: 'coffee',
        limit,
		...locationArgument
    });
	const shopsURL = new URL(`?${queryParameters}`, 'https://api.foursquare.com/v3/places/search');
    
    try {
		const response = await fetch(shopsURL, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY
			}
		});
		const data = await response.json();

		const photos = await photosGet();

		const parsedShops = data.results.map(({ fsq_id, name, location }, index) => ({
			ID: fsq_id,
			name,
			address: location.address,
			neighbourhood: location?.neighborhood?.length > 0 ? location.neighborhood[0] : 'UnKnown NeighbourHood',
			imageURL: photos?.length > 0 ? photos[index] : 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
		}));

		return parsedShops;
	} catch (error) {
		console.error(error);
	};
};