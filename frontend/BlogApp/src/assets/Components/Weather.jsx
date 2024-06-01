import { useEffect, useState } from "react";

const Weather = () => {
    const key='ef60deb704478be8fa4a47fd97c73e7e'
    const [name,setName]=useState("Buea")
    const [country,setCountry]=useState("CM")
    const [data2,setData2]=useState(null)
    const handleClick=(e)=>{
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${key}`)
        .then(res=>res.json())
        .then((data)=>{
            setCountry(data.sys.country)
            setData2(data)
            display(data)
        })
        .catch((err)=>{
            console.log(err)
        })
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${key}`)
        .then(res=>res.json())
        .then((data)=>{
            displayHourlyForecast(data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    const display=(data)=>{
        const temp=document.querySelector('.temp')
        const info=document.querySelector('.weather-info')
        const icon=document.querySelector('.weather-icon')
        const forecast=document.querySelector('.hourly-forecast')
        info.innerHTML=''
        temp.innerHTML=''
        forecast.innerHTML=''
        if(data.cod==='404'){
            info.innerHTML=`<p>${data.message}</p>`
        }else{
            const cityName=data.name
            const temperature=Math.round(data.main.temp-273.15)
            const description=data.weather[0].description
            const iconCode=data.weather[0].icon;
            const iconUrl=`https://openweathermap.org/img/wn/${iconCode}@4x.png`
            const temperatureHtml=`<p>${temperature} &degC</p>`
            const weatherHtml=`<p>${cityName}, ${country}</p>
            <p>${description}</p>
            `
            temp.innerHTML=temperatureHtml
            info.innerHTML=weatherHtml
            icon.src=iconUrl
            icon.alt=description
            // showImage()
        }
    }
    const displayHourlyForecast=(data)=>{
        let hourlyForecastDiv=document.querySelector(".hourly-forecast")
        let next24Hours=data.list.slice(0,8)
        next24Hours.forEach((item)=>{
            let dateTime=new Date(item.dt*1000)
            let hour=dateTime.getHours()
            let temperature=Math.round(item.main.temp-273.15)
            let iconCode=item.weather[0].icon
            let iconUrl=`https://openweathermap.org/img/wn/${iconCode}@4x.png`
            let hourlyItemHtml=`
                <div class="ms-4">
                    <span>${hour}:00</span>
                    <img src="${iconUrl}" class="img-fluid" alt="Hourly Weather Icon">
                    <span>${temperature} &degC</span>
                </div>
            `
            hourlyForecastDiv.innerHTML+=hourlyItemHtml
        })
    }
    const showImage=()=>{
        let weatherIcon=document.querySelector('.weather-icon')
        weatherIcon.style.display='block'

    }
    useEffect(()=>{
        if(data2){
            display(data2)
        }
    },[country])
    return ( 
        <div className="container d-flex justify-content-center align-items-center w-50 mb-4" style={{height:"80vh"}}>
            <div className="border p-5 w-100" style={{borderRadius:"25px",background:"rgb(219, 234, 244,.5)"}}>
                <div className="form-group d-flex">
                    <input type="search" className="form-control me-md-2 shadow p-2 ps-4" name="city" placeholder="Enter city/town" value={name} onChange={(e)=>setName(e.target.value)} style={{borderRadius:"18px"}}/>
                    <button className="btn btn-success search-button" onClick={(e)=>handleClick(e)} style={{borderRadius:"18px"}}>Search</button>
                </div>
                <div className="info">
                    <h3 className="mt-4">
                        {name}
                    </h3>
                    <div className="temp h5">

                    </div>
                    <div className="weather-info h5">

                    </div>
                    <img src="" className="weather-icon" alt="" />
                    <div className="hourly-forecast d-flex">

                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Weather;