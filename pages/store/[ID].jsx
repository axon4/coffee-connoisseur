import Head from 'next/head';
import { useRouter } from 'next/router';
import storesData from '../../data/stores.json';

export function getStaticPaths() {
	const paths = storesData.map(({ ID }) => ({
		params: {ID: ID.toString()}
	}));
	
	return {
		paths,
		fallback: true
	};
};

export async function getStaticProps({ params }) {
	const store = storesData.find(({ ID }) => ID.toString() === params.ID);
		
	return {
		props: {...store}
	};
};

const Store = ({ name }) => {
	const router = useRouter();
	
	if (router.isFallback) {
		return <h1>Loading...</h1>
	};
	
	return (
		<>
		<Head>
			<title>{name}</title>
		</Head>
			<p>{name}</p>
		</>
	);
};

export default Store;