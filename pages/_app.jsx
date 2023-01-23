import ShopProvider from '../conTexts/shopConText';
import '../styles/globals.css';

function Application({ Component, pageProps }) {
	return (
		<ShopProvider>
			<Component {...pageProps} />
		</ShopProvider>
	);
};

export default Application;