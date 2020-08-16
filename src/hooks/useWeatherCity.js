import {useEffect, useState} from 'react';
import openWeather from '../api/openWeather';

const apiKey = '&appid=4b1e7d2cbc6bfd585086d380ffc422d4';
const units = '&units=metric';

export default (lat, lon) => {
    const [results, setResults] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const apiCitySearch = async (cityLat, cityLon) => {
        try{
            const response = await openWeather.get(`/weather?lat=${cityLat}&lon=${cityLon}${units}${apiKey}`);
            //console.log([response.data]);
            setResults(response.data);
            setErrorMsg(null);
        }
        catch(err){
            console.log(err+":"+cityLat+"-"+cityLon);
            setErrorMsg(err);
        }
    };

    useEffect(()=>{
        apiCitySearch(lat, lon);
    },[]);

    return [apiCitySearch, results, errorMsg];
};