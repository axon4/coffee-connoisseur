// Next API Route Support: https://nextjs.org/docs/api-routes/introduction

import airTable, { parseRecords } from '../../../lib/airtable';
import { shopsGet } from '../../../srv/shops';

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
				const newShop = request.body;

				if (newShop.ID) {
					const records = await airTable
						.select({filterByFormula: `ID="${newShop.ID}"`})
						.firstPage();

					if (records.length !== 0) {
						const parsedRecords = parseRecords(records);

						response.status(200).json(parsedRecords);
					} else {
						if (newShop.name) {
							const records = await airTable.create([{
								fields: {
									...newShop,
									date: new Date(),
									upVotes: 0
								}
							}]);

							const parsedRecords = parseRecords(records);

							response.status(201).json(parsedRecords);
						} else {
							response.status(422).send('422 UnProcessable Entity: Missing \'name\'');
						};
					};
				} else {
					response.status(422).send('422 UnProcessable Entity: Missing \'ID\'');
				}
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