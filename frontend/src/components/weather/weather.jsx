import React, { useState } from 'react'
import axios from 'axios'

const Weather = () => {
    const [data,setData]=useState({})
    const [location,setLocation]=useState('')

    const searchLocation = async (e) => {
      e.preventDefault();
      try {
          console.log(`Searching for weather in location: ${location}`);
          const res = await axios.get(`http://localhost:5000/weather?location=${location}`);
          console.log('Weather data received:', JSON.stringify(res.data, null, 2));
          setData(res.data);
      } catch (err) {
          console.error("Error fetching the weather data: ", err.response ? err.response.data : err.message);
      }
      setLocation('');
  };

  const kelvinToCelsius = (temp) => (temp - 273.15).toFixed(2);
  const kelvinToFahrenheit = (temp) => ((temp - 273.15) * 9/5 + 32).toFixed(2);

  return (
    <div>
        <div className="container">
            <h1 className='p-4 text-5xl font-bold'>Weatherry</h1>
            <form onSubmit={searchLocation}>
                <div className='flex flex-col items-center'>
                    <input
                        type='text'
                        placeholder='Enter location'
                        value={location}
                        onChange={event => setLocation(event.target.value)}
                        className='p-3 rounded-lg border-2 border-black mt-5 w-9/12'/>
                    <button
                        type='submit'
                        className='p-3 mt-5 rounded-lg border-2 border-black w-6/12'>
                        Search
                    </button>
                </div>
            </form>
            {Object.keys(data).length > 0 ? (
                    <div>
                        <div className="location">
                            <h1 className='p-4 pt-7 text-4xl font-bold'>{data.name}</h1>
                            <div className='flex flex-row justify-evenly'>
                                {data.coord ? <h1 className='p-4 text-2xl font-bold'>Latitude: {data.coord.lat}</h1> : null}
                                {data.coord ? <h1 className='p-4 text-2xl font-bold'>Longitude: {data.coord.lon}</h1> : null}
                            </div>
                        </div>
                        <div className='flex flex-row justify-evenly'>
                            {data.main ? <h1 className='p-4 text-2xl font-bold'>Temperature: {kelvinToCelsius(data.main.temp)}°C</h1> : null}
                            {data.main ? <h1 className='p-4 text-2xl font-bold'>{kelvinToFahrenheit(data.main.temp)}°F</h1> : null}
                            {data.main ? <h1 className='p-4 text-2xl font-bold'>{data.main.temp} K</h1> : null}
                        </div>
                        {data.weather ? <h1 className='p-4 text-2xl font-bold'>Weather conditions: {data.weather[0].main}</h1> : null}
                        {data.main ? <h1 className='p-4 text-2xl font-bold'>Feels like: {kelvinToCelsius(data.main.feels_like)}°C</h1> : null}
                        {data.main ? <h1 className='p-4 text-2xl font-bold'>Maximum temperature: {kelvinToCelsius(data.main.temp_max)}°C</h1> : null}
                        {data.main ? <h1 className='p-4 text-2xl font-bold'>Minimum temperature: {kelvinToCelsius(data.main.temp_min)}°C</h1> : null}
                    </div>
                ) : (
                    <div>
                        <h2 className='p-4 text-2xl font-bold'>No weather data available</h2>
                    </div>
                )}
        </div>
    </div>
    )
}

export default Weather
