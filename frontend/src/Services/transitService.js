import axios from "axios";

export const getTransits = () => {
    return axios.get('api/transit/getAll').catch(v=>{throw v;});
};

export const updateTransits = transit => {
    return axios.post('api/transit/update').catch(v=>{throw v;});
};

export const addTransits = transit => {
    return axios.post('api/transit/add').catch(v=>{throw v;});
};