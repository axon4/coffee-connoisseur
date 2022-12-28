import Head from 'next/head';
// import Image from 'next/image';
import Banner from '../components/Banner';
import Card from '../components/Card';
import { storesGet } from '../services/stores';
import styles from '../styles/Home.module.css';

export async function getStaticProps() {
	const stores = await storesGet();

	return {
		props: { stores }
	};
};

function Home({ stores }) {
	const onButtonClick = () => {
		console.log('CLICK');	
	};
	
	return (
		<div className={styles.container}>
			<Head>
				<meta name='description' content='Generated by CNA' />
				<title>Coffee Connoiseur</title>
				<link rel='icon' type='image/x-icon' href='/favicon.ico' />
			</Head>
			<main className={styles.main}>
				<div className={styles.hero}>
					{/* <Image src='/hero.png' alt='hero' width={700} height={400} /> */}
				</div>
				<Banner buttonText='Locate Shops Near Me' onButtonClick={onButtonClick} />
				{stores.length > 0 && (
					<>
						<h2 className={styles.heading2}>London Stores</h2>
						<section className={styles.cardLayout}>
							{stores.map(({ fsq_id, name, imageURL }) => (
								<Card key={fsq_id} name={name} imageURL={imageURL ||'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'} href={`/store/${fsq_id}`} />
							))}
						</section>
					</>
				)}
			</main>
		</div>
	);
};

export default Home;