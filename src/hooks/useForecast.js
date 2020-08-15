import {useEffect, useState} from 'react';
import openWeather from '../api/openWeather';

const apiKey = '&appid=31901fc60d7d8c5c05cffec64a969c4b';
const units = '&units=metric';

export default (lat,lon) => {
    const [results, setResults] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const apiForecastSearch = async (cityLat, cityLon) => {
        try{
            
            const response = await openWeather.get(`/onecall?lat=${cityLat}&lon=${cityLon}&exclude=current,minutely,hourly${units}${apiKey}`);
            setResults(response.data.daily);
            setErrorMsg(null);
        }
        catch(err){
            console.log(err);
            setErrorMsg("Api error");
        }
    };

    useEffect(()=>{
        apiForecastSearch(lat, lon);
    },[]);

    return [apiForecastSearch, results, errorMsg];
};