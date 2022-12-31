// Next API Route Support: https://nextjs.org/docs/api-routes/introduction

import airTable from '../../lib/airtable';
import { shopsGet } from '../../srv/shops';

async function shops(request, response) {
	switch (request.method) {
		case 'GET': {
			try {
				const { coordinates, limit } = request.query;
				const shops = await shopsGet(limit, coordinates);
		
				response.status(200).json(shops);
			} catch (error) {
				response.status(500).send(`500 Internal Server Error: ${error}`);
			};
		};

			break;

		case 'POST': {
			try {
				const shopRecords = await airTable
					.select({filterByFormula: 'ID="0"'})
					.firstPage();

				if (shopRecords.length !== 0) {
					const records = shopRecords.map(record => ({...record.fields}));

					response.status(200).json(records);
				} else {
					// create record
				};
			} catch (error) {
				response.status(500).send(`500 Internal Server Error: ${error}`);
			};
		};

			break;
		
		default:
			break;	
	};
};

export default shops;