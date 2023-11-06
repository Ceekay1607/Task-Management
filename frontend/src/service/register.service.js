import axios from "axios";

const api = axios.create({
    baseURL: "/api",
});

const registerService = {
    async register(name, email, password) {
        try {
            const response = await api.post("/user", {
                name,
                email,
                password,
            });

            return response.data;
        } catch (error) {
            console.error(
                "Cannot register: ",
                error.response ? error.response.data : error.message
            );
        }
    },
};

export default registerService;
