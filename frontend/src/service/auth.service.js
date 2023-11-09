// login.service.js
import axios from "axios";

const api = axios.create({
    baseURL: "/api/auth",
});

const authService = {
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
    async isAuthenticated() {
        // check if user is authenticated
        try {
            const response = await axios.get("/api/auth/isAuthenticated");
            return response.data.isAuthenticated;
        } catch (error) {
            console.error("Authentication check failed:", error);
            return false;
        }
    },

    async logout() {
        try {
            const response = await api.post("/logout");
            return response.data;
        } catch (error) {
            console.error("logout failed: ", error);
            return false;
        }
    },
};

export default authService;
