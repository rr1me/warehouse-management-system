import axios from "axios"

export const getCargoes = () => {
    return axios.get('api/main/cargoes');
}