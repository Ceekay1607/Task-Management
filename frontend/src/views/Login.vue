<!-- Login.vue -->
<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">Login</div>
                    <div class="card-body">
                        <form @submit.prevent="login" v-if="!loading">
                            <div class="mb-3">
                                <label for="email" class="form-label"
                                    >Email address</label
                                >
                                <input
                                    type="email"
                                    class="form-control"
                                    id="email"
                                    v-model="email"
                                    required
                                />
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label"
                                    >Password</label
                                >
                                <input
                                    type="password"
                                    class="form-control"
                                    id="password"
                                    v-model="password"
                                    required
                                />
                            </div>
                            <button type="submit" class="btn btn-primary">
                                Login
                            </button>
                        </form>
                        <div v-else>Logging in...</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import loginService from "@/service/login.service";

export default {
    data() {
        return {
            email: "",
            password: "",
            loading: false,
        };
    },
    methods: {
        async login() {
            try {
                this.loading = true;
                const response = await loginService.login(
                    this.email,
                    this.password
                );
                console.log("Login successful:", response);

                // Redirect to the project page
                this.$router.push({ name: "project" });
            } catch (error) {
                // Handle errors, display messages, etc.
                console.error(
                    "Login failed:",
                    error.response ? error.response.data : error.message
                );
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>

<style scoped></style>
