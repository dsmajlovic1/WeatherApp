import React, { useState } from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import SearchBar from '../components/SearchBar';
import useWeatherSearch from '../hooks/useWeatherSearch';
import QuickView from '../components/QuickView';

const HomeScreen = ({navigation})=>{
    const [term, setTerm] = useState('');
    const [apiSearch, results, errorMsg] = useWeatherSearch();

    console.log(results);
    return (
        <View>
            <SearchBar
                term={term}
                onTermChange={setTerm}
                onTermSubmit={()=>apiSearch(term)}
            />
            <TouchableOpacity onPress={()=> navigation.navigate("Details", {id: results.id, lat:results.coord.lat, lon:results.coord.lon})} >
                <QuickView data={results} />
            </TouchableOpacity>            
        </View>
    );
};

const styles = StyleSheet.create({});

export default withNavigation(HomeScreen);