"use client";

import React from "react";
import dayjs from "dayjs";

interface OpenClosedProps {
	showPeriod?: boolean;
}

export default function OpenClosed({ showPeriod = true }: OpenClosedProps) {
	const hours = [
		{ day: "Monday", time: "08:30 - 17:00" },
		{ day: "Tuesday", time: "08:30 - 17:00" },
		{ day: "Wednesday", time: "08:30 - 17:00" },
		{ day: "Thursday", time: "08:30 - 17:00" },
		{ day: "Friday", time: "08:30 - 17:00" },
		{ day: "Saturday", time: "by appointment" },
		{ day: "Sunday", time: "by appointment" },
	];

	function formatTime(time: string): string {
		const [hour, minute] = time.split(":").map(Number);
		const period = hour >= 12 ? "pm" : "am";
		const formattedHour = hour % 12 || 12;
		const formattedMinute = minute === 0 ? ":00" : `:${minute}`;
		return `${formattedHour}${formattedMinute}${showPeriod ? period : ""}`;
	}

	function isOpen() {
		const now = dayjs();
		const currentDay = now.format("dddd");
		const currentTime = now.hour() * 60 + now.minute(); // Current time in minutes since midnight

		const daySchedule = hours.find((d) => d.day === currentDay);

		if (!daySchedule || daySchedule.time === "Closed") {
			return getNextOpenTime(now);
		}

		if (daySchedule.time === "by appointment") {
			return "By appointment only today";
		}

		const [openingTimeStr, closingTimeStr] = daySchedule.time.split(" - ");
		const openingTime = convertToMinutes(openingTimeStr);
		const closingTime = convertToMinutes(closingTimeStr);

		if (currentTime < openingTime) {
			return `Open today ${formatTime(openingTimeStr)} - ${formatTime(
				closingTimeStr,
			)}`;
		}
		if (currentTime >= openingTime && currentTime <= closingTime) {
			return `Open today ${formatTime(openingTimeStr)} - ${formatTime(
				closingTimeStr,
			)}`;
		}
		return getNextOpenTime(now);
	}

	function convertToMinutes(time: string): number {
		const [hour, minute] = time.split(":").map(Number);
		return hour * 60 + minute;
	}

	function getNextOpenTime(now: dayjs.Dayjs) {
		for (let i = 1; i <= 7; i++) {
			const nextDay = now.add(i, "day");
			const nextDayName = nextDay.format("dddd");
			const nextDaySchedule = hours.find((d) => d.day === nextDayName);

			if (!nextDaySchedule || nextDaySchedule.time === "Closed") {
				continue;
			}

			if (nextDaySchedule.time === "by appointment") {
				return `Open ${
					i === 1 ? "tomorrow" : `on ${nextDayName}`
				} by appointment`;
			}

			const [nextOpeningTime, nextClosingTime] =
				nextDaySchedule.time.split(" - ");
			return `Open ${i === 1 ? "tomorrow" : `on ${nextDayName}`} ${formatTime(
				nextOpeningTime,
			)} - ${formatTime(nextClosingTime)}`;
		}

		return "Sorry we are closed";
	}

	return (
		<p className="font-workSans font-bold text-base sm:text-[11.5px] mt-1 text-brand-dark-blue">
			{isOpen()}
		</p>
	);
}
