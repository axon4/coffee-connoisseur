import { createApi as createAPI } from 'unsplash-js';

export async function photosGet() {
	try {
		const unSplash = createAPI({accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY});

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