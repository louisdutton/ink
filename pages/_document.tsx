import Document, { Html, Head, Main, NextScript } from "next/document";

class Doc extends Document {
	// static async getInitialProps(ctx: any) {
	// 	const initialProps = await Document.getInitialProps(ctx);
	// 	return { ...initialProps };
	// }

	render() {
		return (
			<Html>
				<Head>
					<link
						href="https://fonts.googleapis.com/css2?family=Architects+Daughter&family=Roboto+Slab&family=Skranji:wght@700&family=Poppins:wght@300;400;500;700;900&display=swap"
						rel="stylesheet"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default Doc;
