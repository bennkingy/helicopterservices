import { Icons } from "@/components/ui/icons";
import Button from "./Button";
import Heading from "./Heading";
import Link from "next/link";

type props = {
	className?: string;
};

const GetInTouch = ({ className }: props) => {
	return (
		<section
			className={`bg-[url('/images/0.jpg')] bg-no-repeat bg-cover bg-center ${className} text-white lg:bg-fixed parallax`}
		>
			<div className={"bg-opacity-80 bg-brand-dark-blue"}>
				<div className="container py-20">
					<Heading
						title="Get in touch with us"
						tag="Contact"
						iconColor="Blue"
						center
						className="mb-10"
						titleStyles="text-3xl sm:text-4xl text-white balance-text"
					/>
					<div className="max-w-6xl container p-0 mx-auto grid grid-cols-1 sm:grid-cols-2 font-openSans">
						<div className="p-5 pr-5 sm:pr-12">
							<table className={`table-fixed mx-auto sm:ml-auto sm:mx-0`}>
								<thead className="text-center sm:text-left">
									<tr>
										<th scope="col" className="pb-3">
											General enquiries
										</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Monday</td> <td>08:30 - 17:30</td>
									</tr>
									<tr>
										<td>Tuesday</td> <td>08:30 - 17:30</td>
									</tr>
									<tr>
										<td>Wednesday</td> <td>08:30 - 17:30</td>
									</tr>
									<tr>
										<td>Thursday</td> <td>08:30 - 17:30</td>
									</tr>
									<tr>
										<td>Friday</td> <td>08:30 - 17:30</td>
									</tr>
									<tr className="font-bold">
										<td>Saturday</td> <td>Closed</td>
									</tr>
									<tr className="font-bold">
										<td>Sunday</td> <td>Closed</td>
									</tr>
								</tbody>
							</table>
							<div
								className={
									"font-openSans sm:text-right mt-10 flex flex-col items-center md:items-end"
								}
							>
								<div className="flex items-center">
									<Icons.mail
										className="text-brand-light-blue mr-1"
										height={17}
									/>
									<Link
										href="emailto:info@helicopterservices.co.uk"
										className="mb-[2px] font-normal text-sm hover:underline underline-offset-2 flex"
									>
										info@helicopterservices.co.uk
									</Link>
								</div>
								<div className="flex items-center">
									<Icons.phone
										className="text-brand-light-blue mr-1"
										height={17}
									/>
									<Link
										href="tel:+441494513166"
										className="text-lg font-bold mt-0 hover:underline underline-offset-2"
									>
										+44 1494 513 166
									</Link>
								</div>
							</div>
						</div>
						<div className="p-5 pl-5 sm:pl-12 mt-5 sm:mt-0">
							<table className={`table-fixed mx-auto sm:mx-0`}>
								<thead>
									<tr>
										<th scope="col" className="pb-3">
											Charter enquiries
										</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Monday</td> <td>08:30 - 17:30</td>
									</tr>
									<tr>
										<td>Tuesday</td> <td>08:30 - 17:30</td>
									</tr>
									<tr>
										<td>Wednesday</td> <td>08:30 - 17:30</td>
									</tr>
									<tr>
										<td>Thursday</td> <td>08:30 - 17:30</td>
									</tr>
									<tr>
										<td>Friday</td> <td>08:30 - 17:30</td>
									</tr>
									<tr className="font-bold">
										<td>Saturday</td> <td>Closed</td>
									</tr>
									<tr className="font-bold">
										<td>Sunday</td> <td>Closed</td>
									</tr>
								</tbody>
							</table>
							<div
								className={`font-openSans text-center sm:text-left mt-10 flex flex-col items-center md:items-start`}
							>
								<div className="flex items-center">
									<Icons.mail
										className="text-brand-light-blue mr-1"
										height={17}
									/>
									<Link
										href="mailto:ruth.downey@helicopterservices.co.uk"
										className="mb-[2px] font-normal text-sm block hover:underline underline-offset-2"
									>
										ruth.downey@helicopterservices.co.uk
									</Link>
								</div>
								<div className="flex items-center">
									<Icons.phone
										className="text-brand-light-blue mr-1"
										height={17}
									/>
									<Link
										href="tel:+441494513166"
										className="text-lg font-bold mt-0 hover:underline underline-offset-2"
									>
										+44 1494 513 166
									</Link>
								</div>
							</div>
						</div>
					</div>
					<div className="mt-5 max-w-6xl grid center mx-auto">
						<Button href="enquire" className="mx-auto" />
					</div>
				</div>
			</div>
		</section>
	);
};

export default GetInTouch;
