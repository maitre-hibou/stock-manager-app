import Vue from 'vue'
import Vuex from 'vuex'

import { loader } from './modules/loader'
import { stocks } from './modules/stocks'
import { products } from './modules/products'
import { security } from './modules/security'
import { productStocks } from './modules/product_stocks'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        stocks: stocks,
        products: products,
        productStocks: productStocks,
        security,
        loader
    }
})
