import React from "react";
import Link from "next/link";

const isExternalLink = (url) => {
	const internalDomains = [
		"^/",
		"^https://localhost",
		"^https?://(www\\.)?helicopterservices\\.co\\.uk",
		"^https?://(www\\.)?helicopterservices\\.vercel\\.app",
	];

	const pattern = new RegExp(internalDomains.join("|"));

	return !pattern.test(url);
};

const CMSLink = ({ href, children, ...props }) => {
	if (href && isExternalLink(href)) {
		return (
			<a href={href} target="_blank" rel="noopener noreferrer" {...props}>
				{children}
			</a>
		);
	}

	return (
		<Link href={href} {...props}>
			{children}
		</Link>
	);
};

export default CMSLink;
