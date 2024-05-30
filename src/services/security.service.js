import {handleResponse, getAuthHeader} from '@/helpers/api'
import { config } from "@/helpers/config"

export const securityService = {
    login: (user) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }

        return fetch(`${config.loginUrl}`, requestOptions).then(handleResponse)
    },
    getMe: () => {
        const requestOptions = {
            method: 'GET',
            headers: getAuthHeader()
        }

        return fetch(`${config.baseApiUrl}/me`, requestOptions).then(handleResponse)
    }
}
