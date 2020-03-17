import apisauce from 'apisauce'
import config from './config'

const polygonApi = (base_URL = config.POLYGON_URL) => {

    const api = apisauce.create({
        baseURL: config.POLYGON_URL,
        timeout: 5000
    })

    const params = {
        apiKey: config.ALPACA_API_KEY_ID
    }

    const getQuote = (symbol) => api.get(`https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${symbol}`, params)

    return {
        getQuote
    }

    const getTickerNews = (symbol) => api.get(`https://api.polygon.io/v1/meta/symbols/${symbol}/news`, params)

    return {
        getTickerNews
    }
}

export default polygonApi