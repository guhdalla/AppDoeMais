import { ApiUri } from "./ConfigApi";

export const login = async (username, senha) => {
    try {
        const response = await fetch(ApiUri + "/api/auth", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": senha
            })
        })
        if (response.status != 200) {
            alert('Usuário não encontrado')
            return null;
        } 
        const json = await response.text();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const infoOng = async (token) => {
    try {
        const response = await fetch(ApiUri + "/api/auth/user", {
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