import { PortableText } from "next-sanity";
import SanityImage from "./SanityImage";

// @ts-ignore
const Team = (pilotData) => {
	return (
		<>
			{/* @ ts-ignore */}
			{pilotData?.pilotData?.map((pilot) => (
				<div key={pilot.slug.current} className="rounded text-center">
					<div className="w-[190px] mx-auto">
						<SanityImage sanityImage={pilot.mainImage} isCircle />
					</div>
					<p className="text-[22px] font-bold text-brand-dark-blue text-openSans p-0 mt-10 pb-0">
						{pilot.name}
					</p>
					<p className="pt-0 mt-0 mb-2 text-[18px] font-semibold text-brand-dark-blue text-openSans">
						{pilot.role}
					</p>
					<div className="bg-brand-light-blue h-1 w-[40px] mx-auto mt-3 mb-5" />
					<p className="mb-0 text-[14px] font-bold text-brand-dark-blue text-openSans">
						Qualifcations:
					</p>
					<div className="text-brand-dark-blue">
						<PortableText value={pilot?.bio || ""} />
					</div>
				</div>
			))}
		</>
	);
};

export default Team;
