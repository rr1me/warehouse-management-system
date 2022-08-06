import axios from "axios"

export const getDrivers = () => {
    return axios.get('api/drivers/getall');
}

export const updateDriver = driver => {
    return axios.patch('api/drivers/update', driver);
}

export const deleteDriver = id => {
    return axios.delete('api/drivers/delete/'+id);
}

export const addDriver = driver => {
    return axios.post('api/drivers/add', driver);
}