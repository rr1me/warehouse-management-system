import axios from "axios";

export const getTransits = () => {
    return axios.get('api/transits/getAll').catch(v=>{throw v;});
};

export const updateTransits = transit => {
    return axios.post('api/transits/update').catch(v=>{throw v;});
};

export const addTransits = transit => {
    return axios.post('api/transits/add').catch(v=>{throw v;});
};