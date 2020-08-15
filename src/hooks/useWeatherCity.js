import {useEffect, useState} from 'react';
import openWeather from '../api/openWeather';

const apiKey = '&appid=4b1e7d2cbc6bfd585086d380ffc422d4';
const units = '&units=metric';

export default (id) => {
    const [results, setResults] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const apiCitySearch = async (cityId) => {
        try{
            const response = await openWeather.get(`/weather?id=${cityId}${units}${apiKey}`);
            //console.log([response.data]);
            setResults(response.data);
            setErrorMsg(null);
        }
        catch(err){
            setErrorMsg("Api error");
        }
    };

    useEffect(()=>{
        apiCitySearch(id);
    },[]);

    return [apiCitySearch, results, errorMsg];
};