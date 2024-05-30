/* eslint-disable */
import router from "@/router/index";
import { productsService } from "@/services/products.service";

const state = { all: {}, product: null, pagination: {}}

const actions = {
    getOne({ dispatch, commit }, id) {
        commit('loader/activate', true, { root: true })
        productsService.getOne(id)
            .then(
                product => {
                    commit('getSuccessOne', product)
                    commit('loader/activate', false, { root: true })
                },
                error => {
                    commit('getFailureOne')
                    this._vm.flashMessage.setStrategy('multiple');
                    this._vm.flashMessage.error({
                        message: error,
                        title: "An error has occurred"
                    });
                    commit('loader/activate', false, { root: true })
                }
            )
    },
    getAll({ dispatch, commit }, page) {
        commit('loader/activate', true, { root: true })
        productsService.getAll(page)
            .then(
                products => {
                    commit('getSuccessAll', products)
                    commit('loader/activate', false, { root: true })
                },
                error => {
                    commit('getFailureAll')
                    this._vm.flashMessage.setStrategy('multiple');
                    this._vm.flashMessage.error({
                        message: error,
                        title: "An error has occurred"
                    });
                    commit('loader/activate', false, { root: true })
                }
            )
    },
    update({ dispatch, commit }, data) {
        commit('loader/activate', true, { root: true })
        productsService.update(data)
            .then(
                data => {
                    router.go()
                    this._vm.flashMessage.success({
                        message: "Product updated.",
                        title: "Your product has been successfully updated."
                    });
                    commit('loader/activate', false, { root: true })
                },
                error => {
                    commit('getFailureOne')
                    this._vm.flashMessage.setStrategy('multiple');
                    this._vm.flashMessage.error({
                        message: error,
                        title: "An error has occurred"
                    });
                    commit('loader/activate', false, { root: true })
                }
            )
    },
    create({ dispatch, commit }, data) {
        commit('loader/activate', true, { root: true })
        productsService.create(data)
            .then(
                data => {
                    router.push('/product/' + data.id);

                    this._vm.flashMessage.success({
                        message: "Product created.",
                        title: "Your product has been successfully created."
                    });
                    commit('loader/activate', false, { root: true })
                },
                error => {
                    commit('getFailureOne')
                    this._vm.flashMessage.setStrategy('multiple');
                    this._vm.flashMessage.error({
                        message: error,
                        title: "An error has occurred"
                    });
                    commit('loader/activate', false, { root: true })
                }
            )
    },
    remove({ dispatch, commit }, id) {
        commit('loader/activate', true, { root: true })
        productsService.remove(id)
            .then(
                data => {
                    router.go()
                    this._vm.flashMessage.success({
                        message: "Product removed.",
                        title: "Your product has been successfully removed."
                    });
                    commit('loader/activate', false, { root: true })
                },
                error => {
                    commit('getFailureOne')
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
    getFailureAll(state) {
        state.all = {}
    },
    getSuccessAll(state, data) {
        state.all = data.items
        state.pagination = {
            total: data.total
        }
    },
    getFailureOne(state) {
        state.product = null
    },
    getSuccessOne(state, product) {
        state.product = product.data
    },
}

export const products = {
    namespaced: true,
    state,
    actions,
    mutations
}
