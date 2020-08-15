import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {Feather} from '@expo/vector-icons';

const SearchBar = ({term, onTermChange, onTermSubmit}) => {
    return (
        <View style={styles.backgroundStyle} >
            <Feather name="search" style={styles.iconStyle}/>
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.inputStyle}
                placeholder="Search city name"
                value={term}
                onChangeText={newTerm => onTermChange(newTerm)}
                onEndEditing={()=> onTermSubmit()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundStyle:{
        alignItems:"center",
        flexDirection:"row",
        backgroundColor: '#DEDEDE',
        borderRadius:5,
        height:50,
        margin:10,
    },
    inputStyle:{
        marginLeft:10,
        fontSize:18,
        flex:1
    },
    iconStyle:{
        marginLeft:10,
        fontSize:30
    }
});

export default SearchBar;