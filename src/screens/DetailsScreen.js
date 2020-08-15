import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import useWeatherCity from "../hooks/useWeatherCity";
import {Feather} from "@expo/vector-icons";
import useForecast from "../hooks/useForecast";
import Moment from 'moment';

const getIcon = (weather) => {
    switch(weather){
        case 'Clear':
            return "sun";
        case 'Rain':
            return "cloud-rain";
        case 'Clouds':
            return "cloud";
        case 'Drizzle':
            return "cloud-drizzle";
        case 'Atmosphere':
            return "align-center";
        case 'Thunderstorm':
            return "cloud-lightning";
        case 'Snow':
            return "cloud-snow";
        default:
            return "sun";

    }
};

const DetailsScreen = ({navigation}) => {
    const [apiCitySearch, results, errorMsg] = useWeatherCity(navigation.getParam("id"));
    const [apiForecastSearch, forecastRslt, forecastErr] = useForecast(navigation.getParam("lat"), navigation.getParam("lon"));

    console.log("details screen");
    //console.log(id);
    //console.log(results);

    if(!results){
        return null;
    }
    //console.log(forecastRslt);
    const iconName = getIcon(results.weather[0].main);
    return (
        <>
            <View style={styles.currentContainer}>
                <Text style={styles.title}>{results.name}</Text>
                <View style={styles.mainInfo}>
                    <Feather name={iconName} style={styles.iconStyle}/>
                    <View style={styles.mainSub}>
                        <Text style={styles.temperature}>{Math.round(results.main.temp)}°C</Text>
                        <Text>{results.weather[0].description}</Text>
                        <Text>Feels like: {Math.round(results.main.feels_like)}°C</Text>
                    </View>
                    
                </View>
                <View style={{flexDirection:"row"}}>
                    <View style={{flex:1}}>
                    <Text>Humidity: {results.main.humidity}</Text>
                    <Text>Pressure: {results.main.pressure}</Text>
                    <Text>Wind speed: {results.wind.speed}km/h</Text>
                    </View>
                    <View style={{flex:1}}>
                    <Text>Max temp: {Math.round(results.main.temp_max)}°C</Text>
                <Text>Min temp: {Math.round(results.main.temp_min)}°C</Text>
                    </View>
                </View>
                
            </View>
            
            <View style={styles.forecastContainer}>
                <Text style={styles.forecastTitle}>Forecast</Text>
                
                <FlatList
                    style={{borderWidth:0}}
                    
                    horizontal={false}
                    numColumns={3}
                    data={forecastRslt}
                    keyExtractor={(item)=> item.dt}
                    renderItem={({item}) => {
                        var itemDate = new Date(item.dt);
                        var moment = require('moment');
                        console.log(item.dt);
                        console.log(itemDate);
                        return (
                            <View style={styles.dailyForecast}>
                                <Text>{Moment(new Date(item.dt)).format('d MMM')}</Text>
                                <Feather name={getIcon(item.weather[0].main)} style={{fontSize:50}}/>
                                <Text>Min: {Math.round(item.temp.min)}°C</Text>
                                <Text>Max: {Math.round(item.temp.max)}°C</Text>
                            </View>
                        );
                    }}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    currentContainer:{
        marginVertical:5,
        marginHorizontal:10
    },
    title:{
        fontSize:30,
        fontWeight:"bold",
        
    },
    mainInfo:{
        margin:10,
        flexDirection:"row",
    },
    mainSub:{
        flex:2
    },
    temperature:{
        fontSize:70
    },
    iconStyle:{
        alignSelf:"center",
        fontSize:100,
        marginHorizontal:15,
        flex:1
    },
    forecastContainer:{
        marginVertical:5,
        marginHorizontal:10
    },
    forecastTitle:{
        fontSize:20,
        fontWeight:"bold",
    },
    dailyForecast:{
        flex:0.5,
        margin:5,
        backgroundColor: '#DFDFDF',
        borderRadius:5,
        padding:10
    }
});

export default DetailsScreen;