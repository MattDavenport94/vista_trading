import { StyleSheet } from 'react-native';

export const dashboardStyle = StyleSheet.create({
    account: {
        margin: 15,
        flex: 3,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        textDecorationLine: 'underline',
        marginTop: 25
    },
    label: {
        paddingTop: 10,
        fontSize: 16,
        fontWeight: 'bold'
    },
    accountCell: {
        flex: 1,
        flexDirection: 'row'
    },
    leftCell: {
        flex: 1
    },
    rightCell: {
        flex: 1
    },
    position: {
        flex: 1,
        flexDirection: 'row',
        margin: 5,
        borderWidth: 1,
        borderColor: '#808080',
        padding: 5,
        borderRadius: 5
    },
    positionsLeftCell: {
        flex: 4,
    },
    positionsRightCell: {
        flex: 1
    },
    symbol: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red'
    },
    subheading: {
        color: '#808080'
    },
    indexSymbol: {
        flexDirection: 'row'
    },
    indexPrice: {
        flexDirection: 'row',
        textAlign: 'right'
    },
    scoreboardItem: {
        flex: 1,
        borderWidth: 1,
        //alignItems: 'center',
        fontWeight: 'bold',
        backgroundColor: 'green',
        margin: 5,
        borderRadius: 5
    },
    title: {
        fontSize: 30,
    },
    titlesub: {
        fontSize: 20, 
        fontWeight: 'bold'
    },
    market: {
        flex: 2,
    },
    number: {
        textAlign: 'right',
        fontSize: 15,
        fontWeight: 'bold',
        borderWidth: 1
    },
    title2: {
        textAlign: 'center',
        textDecorationLine: 'underline',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 25
    },
    title3: {
        textDecorationLine: 'underline'
    }
})