// Next API Route Support: https://nextjs.org/docs/api-routes/introduction

import airTable, { airTable2, getRecords, parseRecords } from '../../../lib/airtable';
import { shopsGet } from '../../../srv/shops';

async function shops(request, response) {
	switch (request.method) {
		case 'GET': {
			try {
				const { coordinates, limit } = request.query;
				const shops = await shopsGet(limit, coordinates);

				const [ latitude, longitude ] = coordinates.split(',');

				await airTable2.create([{
					fields: {
						date: new Date(),
						'co-ordinates': coordinates,
						'Google Maps': `maps.google.com/maps?z=12&t=m&q=loc:${latitude}+${longitude}`
					}
				}]);
		
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
					const records = await getRecords(newShop.ID);

					if (records.length !== 0) {
						response.status(200).json(records);
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