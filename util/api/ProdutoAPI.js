import { ApiUri } from "./ConfigApi";

export const getProdutos = async (token) => {
    try {
        const response = await fetch(ApiUri + "/api/product", {
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