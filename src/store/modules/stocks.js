/* eslint-disable */
import { stocksService } from '../../services/stocks.service'

const state = { all: {}, pagination: {}}

const actions = {
    getAll({ dispatch, commit }, page) {
        commit('loader/activate', true, { root: true })
        stocksService.getAll(page)
            .then(
                stocksResponse => {
                    commit('getSuccessStocks',stocksResponse)
                    commit('loader/activate', false, { root: true })
                },
                error => {
                    commit('getFailure')
                    this._vm.flashMessage.setStrategy('multiple');
                    this._vm.flashMessage.error({
                        message: error,
                        title: "An error has occurred"
                    });
                    commit('loader/activate', false, { root: true })
                }
            )
    },
}

const mutations = {
    getSuccessStocks(state, data) {
        state.all = data.items
        state.pagination = {
            total: data.total
        }
    },
    getFailure(state) {
        state.items = {}
        state.pagination = {}
    }
}

export const stocks = {
    namespaced: true,
    state,
    actions,
    mutations
}