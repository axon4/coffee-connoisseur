import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';
import styles from '../styles/Card.module.css';

const Card = ({ hRef, name, imageURL }) => (
	<Link href={hRef} className={styles.cardLink}>
		<article className={classNames('glass', styles.container)}>
			<div className={styles.cardHeaderWrapper}>
				<h2 className={styles.cardHeader}>{name}</h2>
				<div className={styles.cardImageWrapper}>
					<Image src={imageURL} alt={name} className={styles.cardImage} width={260} height={160} />
				</div>
			</div>
		</article>
	</Link>
);

export default Card;