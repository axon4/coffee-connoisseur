import Airtable from 'airtable';

const AirTable = new Airtable({apiKey: process.env.AIRTABLE_API_KEY});
const base = AirTable.base(process.env.AIRTABLE_BASE_ID);
const airTable = base('shops');

export function parseRecords(records) {
	return records.map(record => ({
		...record.fields,
		recordID: record.id
	}));
};

export async function getRecords(ID) {
	const records = await airTable
		.select({filterByFormula: `ID="${ID}"`})
		.firstPage();
	const parsedRecords = parseRecords(records);

	return parsedRecords;
};

export default airTable;