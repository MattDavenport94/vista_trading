import React from 'react'
import { FlatList, Text, View } from 'react-native'
import alpacaApi from '../services/alpaca'
import { dashboardStyle } from '../styles/style'
import { Ionicons } from '@expo/vector-icons'
import polygonApi from '../services/polygon'

class HomeScreen extends React.Component{
    
    static navigationOptions = {
        title: 'Portfolio'
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

            <View style={dashboardStyle.account}>
                <Text style={dashboardStyle.heading}>Account</Text>

                <View style={dashboardStyle.accountCell}>

                    <View style={dashboardStyle.leftCell}>
                        <Text style={dashboardStyle.label}>Buying Power</Text>
                        <Text>{this.state.buying_power}</Text>
                        <Text style={dashboardStyle.label}>Long Market Value</Text>
                        <Text>{this.state.long_market_value}</Text>
                    </View>

                    <View style={dashboardStyle.rightCell}>
                        <Text style={dashboardStyle.label}>Portfolio Value</Text>
                        <Text>{this.state.portfolio_value}</Text>
                        <Text style={dashboardStyle.label}>Cash</Text>
                        <Text>{this.state.cash}</Text>
                    </View>
                </View>
            </View>

            <View style={{flex: 2, borderWidth: 1}}>
                <View style={dashboardStyle.title}><Text style={dashboardStyle.heading}>Markets</Text></View>

                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={dashboardStyle.scoreboardItem}><Text style={dashboardStyle.indexSymbol}>DIA</Text>
                    <Ionicons name="md-arrow-dropdown" size={32} color="white"></Ionicons>
                    <Text style={dashboardStyle.indexPrice}>{this.state.DIA}</Text></View>
                    <View style={dashboardStyle.scoreboardItem}><Text style={dashboardStyle.indexSymbol}>SPY</Text>
                    <Ionicons name="md-arrow-dropdown" size={32} color="white"></Ionicons>
                    <Text style={dashboardStyle.indexPrice}>{this.state.SPY}</Text></View>
                    <View style={dashboardStyle.scoreboardItem}><Text style={dashboardStyle.indexSymbol}>QQQ</Text>
                    <Ionicons name="md-arrow-dropdown" size={32} color="white"></Ionicons>
                    <Text style={dashboardStyle.indexPrice}>{this.state.QQQ}</Text></View>
                    <View style={dashboardStyle.scoreboardItem}><Text style={dashboardStyle.indexSymbol}>IWM</Text>
                    <Ionicons name="md-arrow-dropdown" size={32} color="white"></Ionicons>
                    <Text style={dashboardStyle.indexPrice}>{this.state.IWM}</Text></View>
                    <View style={dashboardStyle.scoreboardItem}><Text style={dashboardStyle.indexSymbol}>VXX</Text>
                    <Ionicons name="md-arrow-dropdown" size={32} color="white"></Ionicons>
                    <Text style={dashboardStyle.indexPrice}>{this.state.VXX}</Text></View>
                </View>
            </View>

            <View style={{flex: 5, borderWidth: 1, borderColor: 'green'}}>
                <FlatList
                    data={this.state.positions}
                    renderItem={this.renderRow}
                    keyExtractor={item => item.asset_id}
                />
            </View>
        </View>
    }
}

export default HomeScreen;