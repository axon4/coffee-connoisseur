import Airtable from 'airtable';

const AirTable = new Airtable({apiKey: process.env.AIRTABLE_API_KEY});
const base = AirTable.base(process.env.AIRTABLE_BASE_ID);
const airTable = base('shops');

export default airTable;