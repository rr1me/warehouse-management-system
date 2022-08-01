import axios from "axios"

export const getDrivers = () => {
    return axios.get('api/drivers/getall');
}

export const updateDriver = driver => {
    return axios.patch('api/drivers/update', prepare(driver));
}

export const deleteDriver = id => {
    return axios.delete('api/drivers/delete/'+id);
}

export const addDriver = driver => {
    return axios.post('api/drivers/add', prepare(driver));
}

const prepare = driver => {
    delete driver.editing;
    delete driver.changed;
    return driver;
}