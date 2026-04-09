import axios from "axios";
/*Criação de comunicação direta com o servidor do backend através do axios*/
const api = axios.create({
    baseURL: "http://localhost:5154",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;