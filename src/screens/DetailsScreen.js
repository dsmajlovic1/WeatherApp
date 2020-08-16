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
    const [apiCitySearch, results, errorMsg] = useWeatherCity(navigation.getParam("lat"), navigation.getParam("lon"));
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
                    
                    <View style={styles.mainSub}>
                    <Feather name={iconName} style={styles.iconStyle}/>
                        <Text style={styles.temperature}>{Math.round(results.main.temp)}°C</Text>                        
                    </View>
                        <Text>Feels like: {Math.round(results.main.feels_like)}°C</Text>
                        <Text>{results.weather[0].description}</Text>
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
                contentContainerStyle={styles.contentContainer}
                    horizontal={false}
                    numColumns={4}
                    data={forecastRslt}
                    keyExtractor={(item)=> String(item.dt)}
                    renderItem={({item}) => {
                        var itemDate = new Date(item.dt);
                        var moment = require('moment');
                        console.log(item.dt);
                        console.log(itemDate);
                        return (
                            <View style={styles.dailyForecast}>
                                <Text>{Moment(new Date(item.dt)).format('d MMM')}</Text>
                                <Feather name={getIcon(item.weather[0].main)} style={styles.forecastIcon}/>
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
        fontSize:35,
        fontWeight:"bold",
        
    },
    mainInfo:{
        alignItems:"center",
        marginVertical:5,
        borderWidth:1,
        borderRadius:10,
        borderColor: 'gray',
        backgroundColor: '#E0E0E0',
        padding:10
    },
    mainSub:{
        alignSelf:"center",
        flexDirection:"row"
    },
    temperature:{
        fontSize:90,
        marginHorizontal:10
    },
    iconStyle:{
        alignSelf:"center",
        fontSize:100,
        marginHorizontal:10,
        flex:1
    },
    forecastContainer:{
        marginHorizontal:5,
        flex:1
    },
    forecastTitle:{
        fontSize:25,
        fontWeight:"bold",
        marginLeft:5
    },
    forecastIcon:{
        fontSize:65
    },
    contentContainer:{
        alignContent:"stretch",
        flexDirection:"column"
    },
    dailyForecast:{
        flex:1,
        margin:5,
        backgroundColor: '#E0E0E0',
        borderRadius:5,
        padding:10
    }
});

export default DetailsScreen;