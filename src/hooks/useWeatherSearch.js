import {useEffect, useState} from 'react';
import openWeather from '../api/openWeather';

const apiKey = '&appid=4b1e7d2cbc6bfd585086d380ffc422d4';
const units = '&units=metric';

export default () => {
    const [results, setResults] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const citySearch = async (searchTerm) => {
        try{
            const response = await openWeather.get(`/weather?q=${searchTerm}${units}${apiKey}`);
            //console.log([response.data]);
            setResults(response.data);
            setErrorMsg(null);
        }
        catch(err){
            setErrorMsg("Api error");
        }
    };

    useEffect(()=>{
        citySearch('Sarajevo');
    },[]);

    return [citySearch, results, errorMsg];
};