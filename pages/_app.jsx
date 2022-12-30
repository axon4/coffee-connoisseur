import ShopProvider from '../contexts/shopContext';
import '../styles/globals.css';

function Application({ Component, pageProps }) {
	return (
		<ShopProvider>
			<Component {...pageProps} />
		</ShopProvider>
	);
};

export default Application;