import Image from "next/image";
interface WeatherData {
	coord: {
		lon: number;
		lat: number;
	};
	weather: {
		id: number;
		main: string;
		description: string;
		icon: string;
	}[];
	base: string;
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		humidity: number;
	};
	visibility: number;
	wind: {
		speed: number;
		deg: number;
	};
	clouds: {
		all: number;
	};
	dt: number;
	sys: {
		type: number;
		id: number;
		country: string;
		sunrise: number;
		sunset: number;
	};
	timezone: number;
	id: number;
	name: string;
	cod: number;
}

export default async function Weather({
	lat = 51.50114,
	lon = -0.76371,
	airport = "White Waltham Airfield",
}) {
	const apiKey =
		"f0767f78463d9f6c247a1889989cc1f5" || process.env.OPENWEATHER_API_KEY;
	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
		{
			next: { revalidate: 10 },
		},
	);

	const data: WeatherData = await response.json();

	if (data.cod === 401) {
		console.error("Failed to fetch the weather data.");
	}

	return (
		<div className="max-w-50 rounded-sm text-white p-7 bg-[#1A3051] sm:mt-0 text-center">
			<h4 className="text-sm font-bold font-openSans mx-auto">{airport}</h4>
			<Image
				src={`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`}
				width={100}
				height={100}
				alt={""}
				className="mx-auto"
			/>
			<p className="">
				<span className="font-medium mr-1">Temperature</span> {data?.main?.temp}
				°C
			</p>
			<p className="mt-1">
				<span className="font-medium mr-1">Pressure</span>{" "}
				{data?.main?.pressure}hPa
			</p>
			<p className="mt-1">
				<span className="font-medium mr-1">Wind speed</span> {data?.wind?.speed}
				%
			</p>
			<p className="mt-1">
				<span className="font-medium mr-1">Wind degree</span> {data?.wind?.deg}°
			</p>
			<p className="mt-1">
				<span className="font-medium mr-1">Visibility</span> {data?.visibility}m
			</p>
			<p className="mt-1">
				<span className="font-medium mr-1">Humidity</span>{" "}
				{data?.main?.humidity}%
			</p>
			{/* <p className="mt-5 bg-green-600 text-white rounded-lg p-1 pl-3">Safe to fly </p> */}
		</div>
	);
}
