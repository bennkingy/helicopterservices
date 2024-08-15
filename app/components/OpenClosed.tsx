import React from "react";

interface OpenClosedProps {
	showPeriod?: boolean;
}

export default function OpenClosed({ showPeriod = true }: OpenClosedProps) {
	const hours = [
		{ day: "Monday", time: "08:30 - 17:30" },
		{ day: "Tuesday", time: "08:30 - 17:30" },
		{ day: "Wednesday", time: "08:30 - 17:30" },
		{ day: "Thursday", time: "08:30 - 17:30" },
		{ day: "Friday", time: "08:30 - 17:30" },
		{ day: "Saturday", time: "Closed" },
		{ day: "Sunday", time: "Closed" },
	];

	function formatTime(time: string): string {
		const [hour, minute] = time.split(":").map(Number);
		const period = hour >= 12 ? "pm" : "am";
		const formattedHour = hour % 12 || 12; // Convert 0 to 12 for midnight
		const formattedMinute = minute === 0 ? "" : `:${minute}`;
		return `${formattedHour}${formattedMinute}${showPeriod ? period : ""}`;
	}

	function fakeTime() {
		const now = new Date();

		// Create a new Date object set to tomorrow
		const tomorrow = new Date(now);
		tomorrow.setDate(now.getDate() + 1);

		// Set the time to 12:00 AM
		tomorrow.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0

		return tomorrow;
	}

	function isOpen() {
		// const now = fakeTime();
		const now = new Date();
		const currentDay = now.toLocaleDateString("en-GB", { weekday: "long" });
		const currentTime = now.getHours() * 60 + now.getMinutes(); // Current time in minutes since midnight

		const daySchedule = hours.find((d) => d.day === currentDay);

		if (!daySchedule || daySchedule.time === "Closed") {
			return getNextOpenTime();
		}

		const [openingTimeStr, closingTimeStr] = daySchedule.time.split(" - ");
		const openingTime = convertToMinutes(openingTimeStr);
		const closingTime = convertToMinutes(closingTimeStr);

		if (currentTime < openingTime) {
			return `Open today ${formatTime(openingTimeStr)}-${formatTime(
				closingTimeStr,
			)}`;
		}
		if (currentTime >= openingTime && currentTime <= closingTime) {
			return `Open today ${formatTime(openingTimeStr)}-${formatTime(
				closingTimeStr,
			)}`;
		}
		return getNextOpenTime();
	}

	function convertToMinutes(time: string): number {
		const [hour, minute] = time.split(":").map(Number);
		return hour * 60 + minute;
	}

	function getNextOpenTime() {
		const now = new Date();
		let currentDayIndex = now.getDay();

		for (let i = 1; i <= 7; i++) {
			const nextDayIndex = (currentDayIndex + i) % 7;
			const nextDaySchedule = hours[nextDayIndex];

			if (nextDaySchedule.time !== "Closed") {
				const [nextOpeningTime, nextClosingTime] =
					nextDaySchedule.time.split(" - ");
				return `Open ${
					i === 1 ? "tomorrow" : `on ${nextDaySchedule.day}`
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
