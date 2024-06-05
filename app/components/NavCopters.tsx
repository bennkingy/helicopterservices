const NavCopters = async () => {
	let data;

	try {
		const response = await fetch("/api/helicopter-data");
		data = await response.json();
	} catch (error) {
		console.error("Failed to fetch fleet data:", error);
	}

	return (
		<div className="max-w-[219px] rounded-sm text-white p-7 bg-[#1A3051] sm:mt-0 text-center">
			<p>Copters</p>
		</div>
	);
};

export default NavCopters;
