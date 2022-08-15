import axios from "axios"

export const loginRequest = (username, password) => {
    return axios.post('/api/login', {
        username: username,
        password: password
    }).then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        console.log(res.data);
    });
};

export const logoutRequest = () => {
    axios.get("/api/logout").then((res) => {
        console.log(res.data);
    })
}