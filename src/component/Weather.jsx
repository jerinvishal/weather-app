import React, { useEffect, useRef, useState } from 'react'; 
import'./Weather.css';
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'


function Weather() {

  const inputref=useRef();

  const allIcons={
    "01d":clear_icon,
    "01n":clear_icon,
    "02d":cloud_icon,
    "02n":cloud_icon,
    "03d":cloud_icon,
    "03n":cloud_icon,
    "04d":drizzle_icon,
    "04n":drizzle_icon,
    "09d":rain_icon,
    "09n":rain_icon,
    "10d":rain_icon,
    "10n":rain_icon,
    "13d":rain_icon,
    "13n":rain_icon,
  }

  const [weatherdata,setWeataherdata]=useState(false);

  const search=async(city)=>{

    if(city===""){
      alert("Enter the name of the city");
      return;
    }
    try{
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response=await fetch(URL);
      const data=await response.json();

if(!response.ok){
  alert(data.message);
  return;
}

      console.log(data)
      const icon=allIcons[data.weather[0].icon]  || clear_icon;
      setWeataherdata({
        humdity:data.main.humidity,
        windSpeed:data.wind.speed,
        temp:Math.floor(data.main.temp),
        location:data.name,
        icon:icon,
      })
    }
    catch(error){
      setWeataherdata(false)
      console.error("Error in Fetching Data")
    }
  }

  useEffect(()=>{
      search("nagercoil")
  },[])
  
  return (
    <div className='weather'>

        <div className="searachbar">
            <input ref={inputref} type="text" placeholder='search'/>
            <img src={search_icon} alt="Serach icon" onClick={()=>search(inputref.current.value)}/>
        </div>
        {weatherdata ? <>
          <img src={weatherdata.icon} alt="" className='weatahericon' />
        <p className='temp'>{weatherdata.temp}°C</p>
        <p className='location'>{weatherdata.location}</p>

        <div className='weatherdata'>
          <div className='col'>
            <img src={humidity_icon} alt=""  />
          </div>
          <div>
            <p>{weatherdata.humdity}%</p>
            <span>Humidity</span>
          </div>
          <div className='col'>
            <img src={wind_icon} alt=""  />
          </div>
          <div>
            <p>{weatherdata.windSpeed} km/hr</p>
            <span>Wind Speed</span>
          </div>
        </div>
        </>:<></>}
 
    </div>
  )
}

export default Weather