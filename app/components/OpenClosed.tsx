// async function getTimeData() {
// 	let data: any;

// 	try {
// 		const response = await fetch(`${process?.env?.CURRENT_URL}/api/navigation`);
// 		data = await response.json();
// 	} catch (error) {
// 		console.error("Failed to fetch navigation data:", error);
// 	}

// 	return data;
// }
import React from "react";

interface OpenClosedProps {
	showPeriod?: boolean;
}

export default function OpenClosed({ showPeriod = true }: OpenClosedProps) {
	const hours = {
		hours: [
			{ day: "Monday", time: "08:30 - 17:30" },
			{ day: "Tuesday", time: "08:30 - 17:30" },
			{ day: "Wednesday", time: "08:30 - 17:30" },
			{ day: "Thursday", time: "08:30 - 17:30" },
			{ day: "Friday", time: "08:30 - 17:30" },
			{ day: "Saturday", time: "Closed" },
			{ day: "Sunday", time: "Closed" },
		],
	};

	function formatTime(time: string): string {
		const [hour, minute] = time.split(":").map(Number);
		const period = hour >= 12 ? "pm" : "am";
		const formattedHour = hour % 12 || 12; // Convert 0 to 12 for midnight
		const formattedMinute = minute === 0 ? "" : `:${minute}`;
		return `${formattedHour}${formattedMinute}${showPeriod ? period : ""}`;
	}

	function isOpen() {
		const now = new Date();
		const currentDay = now.toLocaleDateString("en-GB", { weekday: "long" });
		const currentTime = `${now.getHours()}:${String(now.getMinutes()).padStart(
			2,
			"0",
		)}`;

		const daySchedule = hours.hours.find((d) => d.day === currentDay);

		if (!daySchedule || daySchedule.time === "Closed") {
			return getNextOpenTime();
		}

		const [openingTime, closingTime] = daySchedule.time.split(" - ");

		if (currentTime >= openingTime && currentTime <= closingTime) {
			return `We are open today ${formatTime(openingTime)}-${formatTime(
				closingTime,
			)}`;
		}
		return getNextOpenTime();
	}

	function getNextOpenTime() {
		const now = new Date();
		let currentDayIndex = now.getDay();

		for (let i = 1; i <= 7; i++) {
			const nextDayIndex = (currentDayIndex + i) % 7;
			const nextDaySchedule = hours.hours[nextDayIndex];

			if (nextDaySchedule.time !== "Closed") {
				const [nextOpeningTime, nextClosingTime] =
					nextDaySchedule.time.split(" - ");
				return `Open tomorrow ${formatTime(nextOpeningTime)}-${formatTime(
					nextClosingTime,
				)}`;
			}
		}

		return "Sorry we are closed for the foreseeable future";
	}

	return (
		<p className="font-workSans font-bold text-[11.5px] mt-1 text-brand-dark-blue">
			{isOpen()}
		</p>
	);
}
