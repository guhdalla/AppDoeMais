import { ApiUri } from "./ConfigApi"

export const createOng = async (username, cnpj, nome, password, endereco) => {
    try {
        const response = await fetch(ApiUri + "/api/ong", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "address": endereco,
                "cnpj": cnpj,
                "name": nome,
                "user": {
                  "password": password,
                  "username": username
                }
            })
        })
        
        if (response.status == 200) {
            return true;
        }
        alert('Houve um erro no cadastro!')
        return false;

    } catch (error) {
        console.error(error);
    }
}