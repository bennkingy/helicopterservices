import type { WeeklyHours, Weekday } from "@/lib/opening-hours";
import { getOpeningHours } from "@/lib/opening-hours-sanity";
import { cn } from "@/lib/utils";

type Props = {
	className?: string;
	heading?: string; // e.g. "General enquiries", shown above the days
	// Shows "By Appt." on small screens, where the column is narrow.
	shortOnSmallScreens?: boolean;
};

// Weekly opening hours from Sanity (Settings > Opening hours), the same hours
// the header "Open today" text uses, so the two can't disagree.
export default async function OpeningHoursTable({ className, heading, shortOnSmallScreens }: Props) {
	const hours = await getOpeningHours();
	return (
		<table className={cn("table-fixed font-openSans", className)}>
			{heading && (
				<thead className="text-center sm:text-left">
					<tr>
						<th scope="col" colSpan={2} className="pb-3">
							{heading}
						</th>
					</tr>
				</thead>
			)}
			<tbody>
				{(Object.entries(hours) as [Weekday, WeeklyHours[Weekday]][]).map(
					([day, dayHours]) => (
						<tr key={day} className={dayHours?.byAppointment ? "font-bold" : undefined}>
							<td className="pr-4">{day}</td>
							<td>
								{!dayHours ? (
									"Closed"
								) : dayHours.byAppointment ? (
									shortOnSmallScreens ? (
										<>
											<span className="block lg:hidden">By Appt.</span>
											<span className="hidden lg:block">By Appointment</span>
										</>
									) : (
										"By Appointment"
									)
								) : (
									`${dayHours.open} - ${dayHours.close}`
								)}
							</td>
						</tr>
					),
				)}
			</tbody>
		</table>
	);
}
