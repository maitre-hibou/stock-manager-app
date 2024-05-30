import { handleResponse, getAuthHeader, paginatedHandleResponse } from '@/helpers/api'
import { config } from "@/helpers/config"

export const productsService = {
    getOne: (id) => {
        const requestOptions = {
            method: 'GET'
        }

        return fetch(`${config.baseApiUrl}/product/` + id, requestOptions).then(handleResponse)
    },
    getAll: (page) => {
        const requestOptions = {
            method: 'GET'
        }

        return fetch(`${config.baseApiUrl}/product?page=` + page, requestOptions).then(paginatedHandleResponse)
    },
    create: (data) => {
        const requestOptions = {
            method: 'POST',
            headers: getAuthHeader(),
            body: JSON.stringify(data)
        }

        return fetch(`${config.baseApiUrl}/product` , requestOptions).then(handleResponse)
    },
    update: (data) => {
        const requestOptions = {
            method: 'PUT',
            headers: getAuthHeader(),
            body: JSON.stringify(data)
        }

        return fetch(`${config.baseApiUrl}/product/` + data.id , requestOptions).then(handleResponse)
    },
    remove: (id) => {
        const requestOptions = {
            method: 'DELETE',
            headers: getAuthHeader()
        }

        return fetch(`${config.baseApiUrl}/product/` + id , requestOptions).then(handleResponse)
    }
}
