import axios from "axios"

export const getCargo = () => {
    return axios.get('api/cargo/getAll').catch(v=>{throw v});
};

export const updateCargo = cargo => {
    return axios.patch('api/cargo/update', cargo).catch(v=>{throw v});
};

export const deleteCargo = id => {
    return axios.delete('api/cargo/delete/'+id).catch(v=>{throw v});
};

export const addCargo = cargo => {
    console.log(cargo);
    return axios.post('api/cargo/add', cargo).catch(v=>{throw v});
};