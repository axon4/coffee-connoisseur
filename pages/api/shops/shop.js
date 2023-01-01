import { getRecords } from '../../../lib/airtable';

async function shop(request, response) {
	switch (request.method) {
		case 'GET': {
			const { ID } = request.query;

			try {
				if (ID) {
					const records = await getRecords(ID);

					if (records.length !== 0) {
						response.status(200).json(records);
					} else {
						response.status(404).send('404 Not Found');
					};
				} else {
					response.status(422).send('422 UnProcessable Entity: Missing \'ID\'');
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

export default shop;