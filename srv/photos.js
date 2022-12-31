import unSplash from '../lib/unsplash';

export async function photosGet() {
	try {
		const photos = await unSplash.search.getPhotos({
			query: 'coffee cup',
			page: 1,
			perPage: 30
		});
		const photoURLs = photos.response.results.map(result => result.urls.small);
	
		return photoURLs;
	} catch (error) {
		console.error(error);
	};
};