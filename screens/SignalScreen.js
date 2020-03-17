import React from 'react'
import { FlatList, Text, View } from 'react-native'
import alpacaApi from '../services/alpaca'
import { dashboardStyle } from '../styles/style.js'
import { Ionicons } from '@expo/vector-icons'
import polygonApi from '../services/polygon'
import { SafeAreaView } from 'react-navigation';
import Spacer from '../components/Spacer';

class SignalScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            positions: []
        }
    }

    componentDidMount() {
        const api = alpacaApi()

        api.getPositions().then((response) => {
            if(response.ok) {
                this.setState({
                    positions: response.data
                })
            }
        })
    }
    
    renderRow = ({item}) => {
        return (
            <View key={item.asset_id} style={dashboardStyle.position}>
                <View style={dashboardStyle.positionsLeftCell}>
                    <Text style={dashboardStyle.symbol}>{item.symbol}</Text>
                    <Text style={dashboardStyle.subheading}>{item.qty} @ {item.avg_entry_price}</Text>
                </View>
                <View style={dashboardStyle.positionsRightCell}>
                    <Text style={dashboardStyle.price}>{item.current_price}</Text>
                    <Text style={dashboardStyle.subheading}>
                        {(item.change_today * 100).toFixed(2)}
                        </Text>
                </View>
            </View>
        )
    }

    render() {
        return <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{flex: 1, marginTop: 25}}>
                <Text style={dashboardStyle.title2}>Vista's Stock Positions</Text>
                <Spacer />
                <FlatList
                    data={this.state.positions}
                    renderItem={this.renderRow}
                    keyExtractor={item => item.asset_id}
                />
            </View>     
        </View>
    }
}

SignalScreen.navigationOptions = {
    headerShown: true
};
export default SignalScreen;
