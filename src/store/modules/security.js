/* eslint-disable */
import { securityService } from '../../services/security.service'
import router from "@/router/index";

const state = { user: null, token: null}

const actions = {
    login({ dispatch, commit }, userData) {
        commit('loader/activate', true, { root: true })
        securityService.login(userData)
            .then(
                response => {
                    commit('getSuccessToken', response.access_token)
                    localStorage.setItem('stock_manager_security', JSON.stringify(response.access_token));

                    securityService.getMe()
                        .then(
                            response => {
                                commit('getSuccessUser', response)
                                commit('loader/activate', false, { root: true })
                                router.push('/products')
                                this._vm.flashMessage.setStrategy('multiple');
                                this._vm.flashMessage.info({
                                    title: 'Welcome!',
                                    time: 5000,
                                    message: "Connection successful!"
                                });
                            })
                },
                error => {
                    commit('getFailure')
                    commit('loader/activate', false, { root: true })
                    this._vm.flashMessage.setStrategy('multiple');
                    this._vm.flashMessage.error({
                        title: 'Connection error',
                        message: "Error in username or password. Please try again."
                    });
                }
            )
    },
    logout({ dispatch, commit }) {
        commit('getSuccessLogout')
        localStorage.removeItem('stock_manager_security');
        router.push('/login')
        this._vm.flashMessage.setStrategy('multiple');
        this._vm.flashMessage.info({
            message: 'Disconnected from STOCK MANAGER',
            title: "See you soon!"
        });
    }
}

const mutations = {
    getSuccessToken(state, token) {
        state.token = token
    },
    getSuccessLogout(state) {
        state.user = null
        state.token = null
    },
    getSuccessUser(state, user) {
        state.user = user
    },
    getFailure(state) {
        state.user = null
        state.token = null
    }
}

export const security = {
    namespaced: true,
    state,
    actions,
    mutations
}