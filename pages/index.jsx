import { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
// import Image from 'next/image';
import classNames from 'classnames';
import { ShopContext } from '../contexts/shopContext';
import Banner from '../components/Banner';
import Card from '../components/Card';
import { useLocation } from '../hooks/useLocation';
import { shopsGet } from '../srv/shops';
import { shopsAPIGetCall } from '../srv/APICalls/shops';
import styles from '../styles/Home.module.css';

export async function getStaticProps() {
	const shops = await shopsGet();

	return {
		props: { shops }
	};
};

function Home({ shops }) {
	const { locate, loading, error: geoLocationError } = useLocation();
	const [ error, setError ] = useState('');
	const { state, dispatch } = useContext(ShopContext);

	const { coordinates, shops: nearByShops } = state;
	
	useEffect(() => {
		(async () => {
			try {
				if (coordinates) {
					const response = await shopsAPIGetCall(null, {
						coordinates,
						limit: 30
					});
					const shops = await response.json();
	
					dispatch({
						type: 'SET_SHOPS',
						payload: shops
					});
				};
			} catch (error) {
				setError(error.message);
			};
		})();
	}, [coordinates]);

	const onButtonClick = () => {
		locate();
	};
	
	return (
		<main className={classNames(styles.container, styles.main)}>
			<Head>
				<title>Coffee Connoisseur</title>
			</Head>
			<div className={styles.hero}>
				{/* <Image src='/hero.png' alt='hero' width={700} height={400} /> */}
			</div>
			<Banner buttonText={loading ? 'Locating...' : 'Locate Shops Near Me'} onButtonClick={onButtonClick} />
			{geoLocationError && <pre>Error: {geoLocationError}</pre>}
			{error && <pre>Error: {error}</pre>}
			<div className={styles.sectionWrapper}>
				{nearByShops?.length > 0 && (
					<>
						<h2 className={styles.heading2}>Shops NearBy</h2>
						<section className={styles.cardLayout}>
							{nearByShops.map(({ ID, name, imageURL }) => (
								<Card key={ID} name={name} imageURL={imageURL} href={`/shop/${ID}`} />
							))}
						</section>
					</>
				)}
				{shops?.length > 0 && (
					<>
						<h2 className={styles.heading2}>London Shops</h2>
						<section className={styles.cardLayout}>
							{shops.map(({ ID, name, imageURL }) => (
								<Card key={ID} name={name} imageURL={imageURL} href={`/shop/${ID}`} />
							))}
						</section>
					</>
				)}
			</div>
		</main>
	);
};

export default Home;