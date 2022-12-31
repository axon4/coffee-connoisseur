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
				const records = await airTable
					.select({filterByFormula: 'ID="1"'})
					.firstPage();

				if (records.length !== 0) {
					const parsedRecords = records.map(record => ({...record.fields}));

					response.status(200).json(parsedRecords);
				} else {
					const records = await airTable.create([{
						fields: {
							ID: "1",
							name: 'Coffee Shop',
							address: 'Coffee Shop Road',
							neighbourhood: 'Coffee Grove',
							upVotes: 8,
							imageURL: 'coffee.shop'
						}
					}]);

					const parsedRecords = records.map(record => ({...record.fields}));

					response.status(200).json(parsedRecords);
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