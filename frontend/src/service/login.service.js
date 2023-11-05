// login.service.js
import axios from "axios";

const api = axios.create({
    baseURL: "/api/auth",
});

const loginService = {
    async login(email, password) {
        try {
            const response = await api.post("/login", {
                username: email,
                password: password,
            });

            return response.data;
        } catch (error) {
            console.error(
                "Login failed:",
                error.response ? error.response.data : error.message
            );
            throw error;
        }
    },
};

export default loginService;
