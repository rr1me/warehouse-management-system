import axios from "axios"

export const getCargo = () => {
    return axios.get('api/cargo/getAll');
}