import { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
// import Image from 'next/image';
import classNames from 'classnames';
import { ShopConText } from '../conTexts/shopConText';
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
	const { state, disPatch } = useContext(ShopConText);

	const { coOrdinates, shops: nearByShops } = state;

	useEffect(() => {
		(async () => {
			try {
				if (coOrdinates) {
					const response = await shopsAPIGetCall(null, {
						coOrdinates,
						limit: 30
					});
					const shops = await response.json();

					disPatch({
						type: 'SET_SHOPS',
						payLoad: shops
					});
				};
			} catch (error) {
				setError(error.message);
			};
		})();
	}, [coOrdinates]);

	const onButtonClick = () => {
		locate();
	};

	return (
		<main className={classNames(styles.container, styles.main)}>
			<Head>
				<title>Coffee-Connoisseur</title>
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
						<section className={styles.cardLayOut}>
							{nearByShops.map(({ ID, name, imageURL }) => (
								<Card key={ID} name={name} imageURL={imageURL} hRef={`/shop/${ID}`} />
							))}
						</section>
					</>
				)}
				{shops?.length > 0 && (
					<>
						<h2 className={styles.heading2}>London Shops</h2>
						<section className={styles.cardLayOut}>
							{shops.map(({ ID, name, imageURL }) => (
								<Card key={ID} name={name} imageURL={imageURL} hRef={`/shop/${ID}`} />
							))}
						</section>
					</>
				)}
			</div>
		</main>
	);
};

export default Home;