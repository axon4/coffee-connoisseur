import airTable, { getReCords, parseReCords } from '../../../lib/airTable';

async function shop(request, response) {
	switch (request.method) {
		case 'GET': {
			try {
				const { ID } = request.query;

				if (ID) {
					const reCords = await getReCords(ID);

					if (reCords.length !== 0) {
						response.status(200).json(reCords);
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
					const reCords = await getReCords(ID);

					if (reCords.length !== 0) {
						const reCord = reCords[0];
						const upDatedReCord = await airTable.update([{
							id: reCord.recordID,
							fields: {
								ID: reCord.ID,
								upVotes: parseInt(reCord.upVotes + 1)
							}
						}]);

						if (upDatedReCord) {
							const parsedRecord = parseReCords(upDatedReCord);

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