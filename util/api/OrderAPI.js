import { ApiUri } from "./ConfigApi";

export const postOrder = async (token, businessId, idProduct) => {
    try {
        const response = await fetch(ApiUri + `/api/order/businessProduct/${businessId}/${idProduct}`, {
            method: 'POST',
            headers: {
                'Authorization': token, 
            },
        })
        
        if (response.status != 200) {
            alert('Erro ao realizar o pedido')
            return;
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const getPedidos = async (token) => {
    try {
        const response = await fetch(ApiUri + `/api/order`, {
            method: 'GET',
            headers: {
                'Authorization': token,
            },
        })
        if (response.status != 200) {
            return;
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const deleteOrder = async (token, id) => {
    try {
        const response = await fetch(ApiUri + `/api/order/abandonOrder/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': token, 
            },
        })
        
        if (response.status != 204) {
            alert('Erro ao abandonar o pedido')
            return;
        }
        return;
    } catch (error) {
        console.error(error);
    }
}