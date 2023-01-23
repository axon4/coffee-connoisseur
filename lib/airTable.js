import NewAirTable from 'airtable';

const AirTable = new NewAirTable({apiKey: process.env.AIRTABLE_API_KEY});
const base = AirTable.base(process.env.AIRTABLE_BASE_ID);
const airTable = base('shops');

export const airTable2 = base('geoLocations');

export function parseReCords(reCords) {
	return reCords.map(reCord => ({
		...reCord.fields,
		reCordID: reCord.id
	}));
};

export async function getReCords(ID) {
	const reCords = await airTable
		.select({filterByFormula: `ID="${ID}"`})
		.firstPage();
	const parsedReCords = parseReCords(reCords);

	return parsedReCords;
};

export default airTable;