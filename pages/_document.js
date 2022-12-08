import Document, { Html as HTML, Head, Main, NextScript } from 'next/document';

class Document2 extends Document {
    render() {
        return (
            <HTML>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </HTML>
        );
    };
};

export default Document2;