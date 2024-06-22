import NavbarHeader from "./NavBarHeader";
import AccrediationsText from "./AccrediationsText";

async function getNavigationData() {
	let data: any;

	try {
		const response = await fetch("http://localhost:3000/api/navigation");
		data = await response.json();
	} catch (error) {
		console.error("Failed to fetch navigation data:", error);
	}

	return data;
}

export default async function Navbar() {
	const data = await getNavigationData();

	return (
		<>
			<AccrediationsText />
			<NavbarHeader menuData={data} />
		</>
	);
}
