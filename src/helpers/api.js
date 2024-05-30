export function paginatedHandleResponse(response) {
    return response.text().then(text => {
        const textResponse = JSON.parse(text)

        return {
            total: Number(textResponse.meta.last_page),
            items: textResponse.data
        }
    })
}

export function handleResponse(response) {
    return response.text().then(text => {
        const textResponse = text && JSON.parse(text)

        if (!response.ok) {
            const error = (textResponse && textResponse.message) || response.statusText

            return Promise.reject(error)
        }

        return textResponse
    })
}

export function getAuthHeader() {
    let token = JSON.parse(localStorage.getItem('stock_manager_security'));

    if (token) {
        return {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        };
    } else {
        return {}
    }
}
