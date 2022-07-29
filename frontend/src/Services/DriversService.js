import axios from "axios"

export const getDrivers = () => {
    return axios.get('api/drivers/getall');
}

// export const updateDriver = (driver) => {
//     console.log(driver);
// }