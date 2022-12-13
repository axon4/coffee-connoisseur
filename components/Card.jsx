import Link from 'next/link';
import classNames from 'classnames';
import Image from 'next/image';
import styles from '../styles/Card.module.css';

const Card = ({ href, name, imageURL }) => {
	return (
		<Link href={href} className={styles.cardLink}>
			<article className={classNames('glass', styles.container)}>
				<div className={styles.cardHeaderWrapper}>
					<h2 className={styles.cardHeader}>{name}</h2>
					<div className={styles.cardImageWrapper}>
						<Image className={styles.cardImage} src={imageURL} width={260} height={160} />
					</div>
				</div>
			</article>
		</Link>
	);
};

export default Card;