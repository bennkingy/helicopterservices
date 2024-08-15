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
		const currentDayIndex = now.getDay(); // 0 (Sunday) - 6 (Saturday)
		const currentTime = now.getHours() * 60 + now.getMinutes(); // Current time in minutes since midnight

		const daySchedule = hours.hours[currentDayIndex];

		if (!daySchedule || daySchedule.time === "Closed") {
			return getNextOpenTime(currentDayIndex);
		}

		const [openingTimeStr, closingTimeStr] = daySchedule.time.split(" - ");
		const [openingHour, openingMinute] = openingTimeStr.split(":").map(Number);
		const [closingHour, closingMinute] = closingTimeStr.split(":").map(Number);
		const openingTime = openingHour * 60 + openingMinute; // Opening time in minutes since midnight
		const closingTime = closingHour * 60 + closingMinute; // Closing time in minutes since midnight

		if (currentTime < openingTime) {
			// It's before the opening time today
			return `Open today ${formatTime(openingTimeStr)}-${formatTime(
				closingTimeStr,
			)}`;
		} else if (currentTime >= openingTime && currentTime <= closingTime) {
			// It's within the open hours today
			return `Open today ${formatTime(openingTimeStr)}-${formatTime(
				closingTimeStr,
			)}`;
		} else {
			// It's after closing time today
			return getNextOpenTime(currentDayIndex);
		}
	}

	function getNextOpenTime(currentDayIndex: number) {
		for (let i = 0; i <= 7; i++) {
			const nextDayIndex = (currentDayIndex + i) % 7;
			const nextDaySchedule = hours.hours[nextDayIndex];

			if (nextDaySchedule.time !== "Closed") {
				const [nextOpeningTime, nextClosingTime] =
					nextDaySchedule.time.split(" - ");
				return `Open ${
					i === 0 ? "tomorrow" : `on ${nextDaySchedule.day}`
				} ${formatTime(nextOpeningTime)}-${formatTime(nextClosingTime)}`;
			}
		}

		return "Sorry we are closed";
	}

	return (
		<p className="font-workSans font-bold text-base sm:text-[11.5px] mt-1 text-brand-dark-blue">
			{isOpen()}
		</p>
	);
}
