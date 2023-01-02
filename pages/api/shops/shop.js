import airTable, { getRecords, parseRecords } from '../../../lib/airtable';

async function shop(request, response) {
	switch (request.method) {		
		case 'GET': {
			try {
				const { ID } = request.query;

				if (ID) {
					const records = await getRecords(ID);

					if (records.length !== 0) {
						response.status(200).json(records);
					} else {
						response.status(404).json({message: '404 Not Found'});
					};
				} else {
					response.status(422).send('422 UnProcessable Entity: Missing \'ID\'');
				};
			} catch (error) {
				response.status(500).send(`500 Internal Server Error: ${error}`);
			};
		};

			break;

		case 'PATCH': {
			try {
				const { ID } = request.body;

				if (ID) {
					const records = await getRecords(ID);

					if (records.length !== 0) {
						const record = records[0];
						const updatedRecord = await airTable.update([{
							id: record.recordID,
							fields: {
								ID: record.ID,
								upVotes: parseInt(record.upVotes + 1)
							}
						}]);

						if (updatedRecord) {
							const parsedRecord = parseRecords(updatedRecord);

							response.status(200).json(parsedRecord);
						};
					} else {
						response.status(404).json({message: '404 Not Found'});
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