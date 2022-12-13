import storesData from '../../data/stores.json';

export function getStaticPaths() {
	return {
		paths: [
			{params: {ID: '0'}},
			{params: {ID: '1'}}
		],
		fallback: false
	};
};

export async function getStaticProps({ params }) {
	const store = storesData.find(({ ID }) => ID.toString() === params.ID);
		
	return {
		props: {...store}
	};
};

const Store = (props) => {	
	return (
		<p>{JSON.stringify(props)}</p>
	);
};

export default Store;