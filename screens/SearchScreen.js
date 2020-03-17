import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import stock from '../api/stock';

const SearchScreen = () => {
    const [term, setTerm] = useState('');
    const [results, setResults] = useState([]);

    const stockApi = async () => {
        const response = await stock.get('category?section=general&items=50&token=rshxb16ikutee9nv3bzvle1wodwmness8xl7egv9', {
            params: {
                items: 50,
                token: 'rshxb16ikutee9nv3bzvle1wodwmness8xl7egv9'
            }
        });
        setResults(response.data);
    };
    console.log(stockApi);

    return (
        <View style={{flex: 1, marginTop: 25}}>
            <SearchBar
             term={term} 
             onTermChange={setTerm}
             onTermSubmit={stockApi}
            />
            <Text>Search Screen</Text>
            <Text>We have found {results.length} results</Text>
        </View>
    );
};

const styles = StyleSheet.create({});
    
export default SearchScreen;