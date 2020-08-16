import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import SearchBar from '../components/SearchBar';
import useWeatherSearch from '../hooks/useWeatherSearch';
import useWeatherCity from '../hooks/useWeatherCity';
import QuickView from '../components/QuickView';


const HomeScreen = ({navigation})=>{
    const [setLocalWeather, localWeather, localError] = useWeatherCity(null, null);
    const [term, setTerm] = useState('');
    const [apiSearch, results, errorMsg] = useWeatherSearch();
    

    useEffect(()=> {
        navigator.geolocation.getCurrentPosition((position) => {
            setLocalWeather(position.coords.latitude, position.coords.longitude);
            console.log(position);});
    },[]);

    console.log(localWeather);
    

    console.log(results);
    return (
        <View>
            <SearchBar
                term={term}
                onTermChange={setTerm}
                onTermSubmit={()=>apiSearch(term)}
            />
            <Text style={styles.subtitle}>Local</Text>
            <TouchableOpacity onPress={()=> navigation.navigate("Details", {id: localWeather.id, lat:localWeather.coord.lat, lon:localWeather.coord.lon})} >
                <QuickView data={localWeather} />
            </TouchableOpacity>  
            <Text style={styles.subtitle}>Search</Text>
            <TouchableOpacity onPress={()=> navigation.navigate("Details", {id: results.id, lat:results.coord.lat, lon:results.coord.lon})} >
                <QuickView data={results} />
            </TouchableOpacity>            
        </View>
    );
};

const styles = StyleSheet.create({
    subtitle:{
        marginLeft:10,
        fontSize:20,
        fontWeight:"bold"
    }
});

export default withNavigation(HomeScreen);