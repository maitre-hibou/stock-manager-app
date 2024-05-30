import {handleResponse, paginatedHandleResponse} from '@/helpers/api'
import { config } from "@/helpers/config"
import {getAuthHeader} from '@/helpers/api'

export const stocksService = {
    getAll: (page) => {
        const requestOptions = {
            method: 'GET',
            headers: getAuthHeader()
        }

        return fetch(`${config.baseApiUrl}/stock_movement?page=` + page, requestOptions).then(paginatedHandleResponse)
    },
    getAllForOneProduct: (id, page) => {
        const requestOptions = {
            method: 'GET',
            headers: getAuthHeader()
        }

        return fetch(`${config.baseApiUrl}/product/${id}/stock_movements?page=${page}`, requestOptions).then(paginatedHandleResponse)
    },
    create: (data, id) => {
        const requestOptions = {
            method: 'POST',
            headers: getAuthHeader(),
            body: JSON.stringify(data)
        }

        return fetch(`${config.baseApiUrl}/product/${id}/stock_movements`, requestOptions).then(handleResponse)
    }
}
