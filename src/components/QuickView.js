import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Feather} from '@expo/vector-icons';

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

const QuickView = ({data}) => {
    console.log('quick view');
    console.log(data);
    if(!data){
        return null;
    }

    const iconName = getIcon(data.weather[0].main);

    return (
        <View style={styles.container}>
            <Text style={styles.temperature}>{Math.round(data.main.temp)}°C</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{data.name}</Text>
                <Text>Feels like: {data.main.feels_like}</Text>
                <Text>Humidity: {data.main.humidity}</Text>
            </View>
            <Feather name={iconName} style={styles.iconStyle}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        margin:10,
        flexDirection:"row",
        alignItems: "center",
        backgroundColor: '#DEDEDE',
        borderRadius:5
    },
    infoContainer:{
        flex:1
    },
    name:{
        fontSize:20
    },
    temperature:{
        alignSelf:"center",
        fontSize:60,
        marginHorizontal:15
    },
    iconStyle:{
        fontSize:60,
        alignSelf:"center",
        marginHorizontal:15
    }
});

export default QuickView;