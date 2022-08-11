import axios from "axios"

export const getDrivers = () => {
    return axios.get('api/drivers/getall').catch(v=>{return v});
}

export const updateDriver = driver => {
    return axios.patch('api/drivers/update', driver).catch(v=>{return v});
}

export const deleteDriver = id => {
    return axios.delete('api/drivers/delete/'+id).catch(v=>{return v});
}

export const addDriver = driver => {
    return axios.post('api/drivers/add', driver).catch(v=>{return v});
}