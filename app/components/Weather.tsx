import Image from "next/image";

export default async function Weather({ city = 'London' }) {
  const apiKey = 'f0767f78463d9f6c247a1889989cc1f5' || process.env.OPENWEATHER_API_KEY;
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
    {headers: {
    'Cache-Control': 'no-cache'
    }});
    
  const data = await response.json();

  if (data.cod === 401) {
    console.error('Failed to fetch the weather data.');
  }

  return (
    <div className="max-w-40 rounded-sm text-white p-5 bg-brand-light-blue mb-10 sm:mt-0">
      <h4 className="font-bold">Airport 1</h4>
      <Image src={`http://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`} width={100} height={100} alt={`${data.weather[0].alt}`} />
      <p className="font-bold">Temperature:<br />{data?.main?.temp}°C</p>
      <p className="font-bold mt-3">Weather:<br />{data?.weather ? data?.weather[0]?.description : null}</p>
      <p className="font-bold mt-3">Humidity:<br />{data?.main?.humidity}%</p>
      <p className="font-bold mt-3 bg-green-600 text-white rounded-lg p-3">Safe to fly</p>
    </div>
  );
}