/* eslint-disable */
import { stocksService } from '../../services/stocks.service'
import router from "@/router/index";

const state = { all: {}, pagination: {}}

const actions = {
    getAllForOneProduct({ dispatch, commit }, data) {
        commit('loader/activate', true, { root: true })

        stocksService.getAllForOneProduct(data.id, data.page)
            .then(
                response => {
                    commit('getSuccessResponse', response)

                    commit('loader/activate', false, { root: true })
                },
                error => {
                    commit('getFailure')

                    this._vm.flashMessage.setStrategy('multiple');
                    this._vm.flashMessage.error({
                        message: error,
                        title: "An error occurred"
                    });

                    commit('loader/activate', false, { root: true })
                }
            )
    },
    create({ dispatch, commit }, data) {
        commit('loader/activate', true, { root: true })
        stocksService.create(data.stock, data.id)
            .then(
                data => {
                    router.go()
                    this._vm.flashMessage.success({
                        message: "Movement recorded.",
                        title: "Stock movement well recorded"
                    });
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
    getSuccessResponse(state, data) {
        state.all = data.items
        state.pagination = {
            total: data.total
        }
    },
    getFailure(state) {
        state.all = {}
        state.pagination = {}
    }
}

export const productStocks = {
    namespaced: true,
    state,
    actions,
    mutations
}
