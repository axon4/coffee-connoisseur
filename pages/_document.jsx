import Document, { Html as HTML, Head, Main, NextScript } from 'next/document';

class Document2 extends Document {
	render() {
		return (
			<HTML>
				<Head>
					<meta name='title' content='Coffee Connoisseur' />
					<meta name='description' content='Search for Coffee Shops NearBy' />
					<title>Coffee Connoisseur</title>
					<link rel='icon' type='image/x-icon' href='/favicon.ico' />
					<link rel='preload' as='font' href='/fonts/IBMPlexSans-Regular.ttf' crossOrigin='anonymous' />
					<link rel='preload' as='font' href='/fonts/IBMPlexSans-SemiBold.ttf' crossOrigin='anonymous' />
					<link rel='preload' as='font' href='/fonts/IBMPlexSans-Bold.ttf' crossOrigin='anonymous' />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</HTML>
		);
	};
};

export default Document2;