import Image from "next/image";

export default async function Weather({ city = 'London', airport = 'White Waltham Airfield' }) {
  const apiKey = 'f0767f78463d9f6c247a1889989cc1f5' || process.env.OPENWEATHER_API_KEY;
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
    {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });

  const data = await response.json();

  if (data.cod === 401) {
    console.error('Failed to fetch the weather data.');
  }

  return (
    <div className="max-w-50 rounded-sm text-white p-5 pt-0 bg-[#1A3051] sm:mt-0 text-center">
      <h4 className="text-sm font-bold font-openSans pt-5 mx-auto">{airport}</h4>
      <Image src={`http://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`} width={100} height={100} alt={`${data.weather[0].alt}`} className='mx-auto' />
      <p className="">Temperature: {data?.main?.temp}°C</p>
      <p className="mt-1">Weather: {data?.weather ? data?.weather[0]?.description : null}</p>
      <p className="mt-1">Humidity: {data?.main?.humidity}%</p>
      {/* <p className="mt-5 bg-green-600 text-white rounded-lg p-1 pl-3">Safe to fly </p> */}
    </div>
  );
}