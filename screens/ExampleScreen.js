import React from 'react';
import { FlatList, Text, View, ScrollView } from 'react-native';
import alpacaApi from '../services/alpaca';
import { dashboardStyle } from '../styles/style';
import { Ionicons } from '@expo/vector-icons';
import polygonApi from '../services/polygon';
import Spacer from '../components/Spacer';

class ExampleScreen extends React.Component{
        
    static navigationOptions = {
        title: 'Markets'
    }

    constructor(props) {
        super(props)

        this.state = {
            buying_power: 0,
            cash: 0,
            long_market_value: 0,
            portfolio_value: 0,
            positions: []
        }
    }
    
    componentDidMount() {
        const api = alpacaApi()

        api.getAccount().then((response) => {
            if (response.ok) {
                this.setState({
                    buying_power: response.data.buying_power,
                    long_market_value: response.data.long_market_value,
                    portfolio_value: response.data.portfolio_value,
                    cash: response.data.cash
                })
            }
        })

        api.getPositions().then((response) => {
            if(response.ok) {
                this.setState({
                    positions: response.data
                })
            }
        })

        const symbols = ['DIA', 'SPY', 'QQQ', 'IWM', 'VXX']

        const polygon = polygonApi()

        symbols.map((symbol) => {
            polygon.getQuote(symbol).then((response) => {
                console.log('got response from polygon api')
                console.log(response)
                
                let state = this.state
                state[symbol] = response.data.ticker.lastTrade.p

                this.setState(state)
            })
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
                        <Ionicons name="md-arrow-dropdown" size={32} color="red"></Ionicons>
                        {(item.change_today * 100).toFixed(2)}
                        </Text>
                </View>
            </View>
        )
    }
    render() {
        return <View style={{flex: 1, flexDirection: 'column'}}>

            <View style={{flex: 5, borderWidth: 1, borderColor: 'green', marginTop: 15}}>
                <ScrollView horizontal={true}>
                    <Text style={dashboardStyle.symbol}>DIA{"\n"}{"\n"}{this.state.DIA}</Text>
                    <Spacer/>
                    <Text style={dashboardStyle.symbol}>SPY{"\n"}{"\n"}{this.state.SPY}</Text>
                    <Spacer/>
                    <Text style={dashboardStyle.symbol}>QQQ{"\n"}{"\n"}{this.state.QQQ}</Text>
                    <Spacer/>
                    <Text style={dashboardStyle.symbol}>VXX{"\n"}{"\n"}{this.state.VXX}</Text>
                    <Spacer/>
                    <Text style={dashboardStyle.symbol}>IWM{"\n"}{"\n"}{this.state.IWM}</Text>
                    <Spacer/>
                </ScrollView>
            </View>
        </View>
    }
}

export default ExampleScreen;