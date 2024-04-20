export default async function Weather({ city = 'London' }) {
  const apiKey = 'f0767f78463d9f6c247a1889989cc1f5' || process.env.OPENWEATHER_API_KEY;
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
  const data = await response.json();

  if (data.cod === 401) {
    console.error('Failed to fetch the weather data.');
  }

  return (
    <div className="bg-white max-w-40 rounded-sm text-black">
      <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt={`${data.weather[0].alt}`} />
      <h1>Weather in {city}</h1>
      <p>Temperature: {data?.main?.temp}°C</p>
      <p>Weather: {data?.weather ? data?.weather[0]?.description : null}</p>
      <p>Humidity: {data?.main?.humidity}%</p>
    </div>
  );
}