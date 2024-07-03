import NavbarHeader from "./NavBarHeader";
import AccrediationsText from "./AccrediationsText";

async function getNavigationData() {
	let data: any;

	try {
		const response = await fetch(`${process?.env?.CURRENT_URL}/api/navigation`);
		data = await response.json();
	} catch (error) {
		console.error("Failed to fetch navigation data:", error);
	}

	return data;
}

export default async function Navbar() {
	const data = await getNavigationData();

	console.log(data);

	return (
		<>
			<AccrediationsText />
			{/* <NavbarHeader menuData={data} /> */}
		</>
	);
}
