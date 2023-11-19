<template>
    <section class="vh-100">
        <div class="container-fluid h-custom">
            <div
                class="row d-flex justify-content-center align-items-center h-100"
            >
                <div class="col-md-9 col-lg-6 col-xl-5">
                    <img
                        src="@\assets\image\loginPage.webp"
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
                            <div style="display: inline">
                                <button
                                    type="submit"
                                    class="btn btn-primary btn-lg"
                                >
                                    Login
                                </button>
                                <p
                                    class="small fw-bold link-danger"
                                    style="display: inline; margin-left: 20px"
                                >
                                    {{ message }}
                                </p>
                            </div>

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

<script setup>
import authService from "@/service/auth.service";
import { ref } from "vue";
import { useRouter } from "vue-router";

const route = useRouter();

const email = ref("");
const password = ref("");
const message = ref("");

async function login() {
    try {
        const response = await authService.login(email.value, password.value);
        message.value = "";
        route.push({ name: "project" });
    } catch (error) {
        message.value = "Wrong username or password";
        console.error(
            "Login failed:",
            error.response ? error.response.data : error.message
        );
    }
}
</script>

<style scoped>
section {
    font-family: "Poppins", sans-serif;
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
