<!-- Login.vue -->
<script>
import loginService from "@/service/auth.service";

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

<template>
    <section class="vh-100">
        <div class="container-fluid h-custom">
            <div
                class="row d-flex justify-content-center align-items-center h-100"
            >
                <div class="col-md-9 col-lg-6 col-xl-5">
                    <img
                        src="../image/draw2.webp"
                        class="img-fluid"
                        alt="Sample image"
                    />
                </div>
                <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                    <form @submit.prevent="login">
                        <div
                            class="d-flex flex-row align-items-center justify-content-center"
                        >
                            <p class="lead fw-normal mb-0 me-3 fs-2 fw-bold">
                                Login
                            </p>
                        </div>

                        <!-- Email input -->
                        <div class="form-outline mb-4">
                            <label class="form-label" for="email"
                                >Email address</label
                            >
                            <input
                                type="email"
                                id="email"
                                class="form-control form-control-lg"
                                placeholder="Enter a valid email address"
                                v-model="email"
                                required
                            />
                        </div>

                        <!-- Password input -->
                        <div class="form-outline mb-3">
                            <label class="form-label" for="password"
                                >Password</label
                            >
                            <input
                                type="password"
                                id="password"
                                class="form-control form-control-lg"
                                placeholder="Enter password"
                                v-model="password"
                                required
                            />
                        </div>

                        <div class="text-center text-lg-start mt-4 pt-2">
                            <button
                                type="submit"
                                class="btn btn-primary btn-lg"
                                style="
                                    padding-left: 2.5rem;
                                    padding-right: 2.5rem;
                                "
                            >
                                Login
                            </button>
                            <p class="small fw-bold mt-2 pt-1 mb-0">
                                Don't have an account?
                                <router-link to="/register" class="link-danger"
                                    >Register</router-link
                                >
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.divider:after,
.divider:before {
    content: "";
    flex: 1;
    height: 1px;
    background: #eee;
}
.h-custom {
    height: calc(100% - 73px);
}
@media (max-width: 450px) {
    .h-custom {
        height: 100%;
    }
}
</style>
