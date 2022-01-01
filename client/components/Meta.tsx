import Head from 'next/head';

// Data
const baseURL = 'https://draw.ink/';
const baseTitle = 'draw.ink';
const twitterHandle = undefined;
const baseImage = '/og_image.jpg';

/** General metadata included in every page. */
export function CoreMeta() {
	return (
		<Head>
			<meta name="viewport" content="width=device-width,initial-scale=1" />
			<meta property="og:site_name" content={baseTitle} />
			<meta name="twitter:site" content={twitterHandle} />
			<meta name="twitter:creator" content={twitterHandle} />
			<link rel="icon" href="/favicon.ico" />
		</Head>
	);
}

type Props = {
	title?: string;
	slug?: string;
	description: string;
	type?: 'website' | 'article';
	image?: string;
};

/** Page-specific metadata. */
export function Meta({
	title,
	slug = baseURL,
	description,
	type = 'website',
	image = baseImage
}: Props) {
	const fullTitle = title ? `${title} - ${baseTitle}` : baseTitle;
	const fullURL = slug ? baseURL + slug + '/' : baseURL;

	return (
		<Head>
			<title>{fullTitle}</title>
			<meta name="viewport" content="width=device-width,initial-scale=1" />
			<meta property="og:title" content={title} />
			<meta property="og:type" content={type} />
			<meta property="og:image" content="/og_image.jpg" />
			<meta property="og:url" content={fullURL} />
			<meta name="twitter:card" content={description} />
			<link rel="canonical" href={fullURL} />
			<link rel="icon" href="/favicon.ico" />
		</Head>
	);
}
