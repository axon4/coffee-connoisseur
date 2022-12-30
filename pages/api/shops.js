// Next API Route Support: https://nextjs.org/docs/api-routes/introduction

import { shopsGet } from '../../services/shops';

async function shops(request, response) {
	try {
		const { coordinates, limit } = request.query;
		const shops = await shopsGet(limit, coordinates);

		response.status(200).json(shops);
	} catch (error) {
		response.status(500).send(`Internal Server Error (500): ${error}`);
	};
};

export default shops;