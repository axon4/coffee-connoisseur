import { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import classNames from 'classnames';
import { ShopContext } from '../../contexts/shopContext';
import { useWrappedSWR } from '../../hooks/useWrappedSWR';
import { shopsGet } from '../../srv/shops';
import { shopsAPIPatchCall, shopsAPIPostCall } from '../../srv/APICalls/shops';
import styles from '../../styles/shop.module.css';

export async function getStaticPaths() {
	const shops = await shopsGet();
	const paths = shops.map(({ ID }) => ({
		params: {ID: ID.toString()}
	}));
	
	return {
		paths,
		fallback: true
	};
};

export async function getStaticProps({ params }) {
	const shops = await shopsGet(); 
	const shop = shops.find(({ ID }) => ID.toString() === params.ID) ?? {};
		
	return {
		props: {...shop}
	};
};

const Shop = initialProps => {
	const [ shop, setShop ] = useState(initialProps);
	const [ upVotes, setUpVotes ] = useState(0);
	const router = useRouter();
	
	if (router.isFallback) {
		return <h1>Loading...</h1>
	};

	const { state: { shops } } = useContext(ShopContext);

	const shopID = router.query.ID;

	useEffect(() => {
		if ((Object.keys(initialProps).length === 0) && (shops.length > 0)) {
			const shop = shops.find(({ ID }) => ID.toString() === shopID);

			setShop(shop);
			shopsAPIPostCall(null, shop);
		} else {
			shopsAPIPostCall(null, initialProps);
		}
	}, [shopID, initialProps]);

	const { data, error } = useWrappedSWR(`/api/shops/shop?ID=${shopID}`);

	useEffect(() => {
		if (data?.length > 0) {
			const shop = data[0];

			setShop(shop);
			setUpVotes(shop.upVotes);
		};
	}, [data]);
	
	const onUpVoteButtonClick = async () => {
		try {
			const response = shopsAPIPatchCall('/shop', shopID);
			const shop = await response.json();
			
			if (shop?.length > 0) {
				setUpVotes(previousUpVotes => previousUpVotes + 1);
			};
		} catch (error) {
			console.error('Error UpVoting Shop:', error);
		};
	};

	if (error && !data) {
		return <pre>Error Getting Shop: {error.message} {data}</pre>
	};

	const { name, address, neighbourhood, imageURL } = shop;
	
	return (
		<>
			<Head>
				<title>{name} | Coffee Connoisseur</title>
			</Head>
			<main className={classNames(styles.layout, styles.container)}>
				<section className={styles.col1}>
					<div className={styles.backToHomeLink}>
						<Link href='/'>← Home</Link>
					</div>
					<div className={styles.nameWrapper}>
						<h1 className={styles.name}>{name}</h1>
					</div>
					<Image src={imageURL} alt={name} className={styles.shopImg} width={600} height={360} />
				</section>
				<section className={classNames('glass', styles.col2)}>
					<div className={styles.iconWrapper}>
						<Image src='/icons/places.svg' alt='places icon' width={24} height={24} />
						<p className={styles.text}>{address}</p>
					</div>
					<div className={styles.iconWrapper}>
						<Image src='/icons/locationArrow.svg' alt='location arrow icon' width={24} height={24} />
						<p className={styles.text}>{neighbourhood}</p>
					</div>
					<div className={styles.iconWrapper}>
						<Image src='/icons/star.svg' alt='star icon' width={24} height={24} />
						<p className={styles.text}>{upVotes}</p>
					</div>
					<button className={styles.upvoteButton} onClick={onUpVoteButtonClick}>UpVote</button>
				</section>
			</main>
		</>
	);
};

export default Shop;