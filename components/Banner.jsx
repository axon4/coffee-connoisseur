import styles from '../styles/Banner.module.css';

const Banner = ({ buttonText, onButtonClick }) => {
	return (
		<header className={styles.container}>
			<hgroup>
				<h1 className={styles.title}>
					<span className={styles.title1}>Coffee</span>
					&nbsp;
					<span className={styles.title2}>Connoisseur</span>
				</h1>
				<p className={styles.subTitle}>Discover Local Coffee Shops</p>
			</hgroup>
			<div className={styles.buttonWrapper}>
				<button className={styles.button} onClick={onButtonClick}>{buttonText}</button>
			</div>
		</header>
	);
};

export default Banner;