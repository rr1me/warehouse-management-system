import axios from "axios"

export const getCargo = () => {
    return axios.get('api/cargo/getAll');
};

export const updateCargo = cargo => {
    return axios.patch('api/cargo/update', cargo);
};

export const deleteCargo = id => {
    return axios.delete('api/cargo/delete/'+id);
};

export const addCargo = cargo => {
    console.log(cargo);
    return axios.post('api/cargo/add', cargo);
};