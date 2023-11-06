<!-- <template>
    <section class="vh-100" style="background-color: #eee">
        <div class="container h-100">
            <div
                class="row d-flex justify-content-center align-items-center h-100"
            >
                <div class="col-lg-12 col-xl-11">
                    <div class="card text-black" style="border-radius: 25px">
                        <div class="card-body p-md-5">
                            <div class="row justify-content-center">
                                <div
                                    class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1"
                                >
                                    <p
                                        class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4"
                                    >
                                        Sign up
                                    </p>

                                    <form
                                        class="mx-1 mx-md-4"
                                        @submit.prevent="register"
                                    >
                                        <div
                                            class="d-flex flex-row align-items-center mb-4"
                                        >
                                            <i
                                                class="fas fa-user fa-lg me-3 fa-fw"
                                            ></i>
                                            <div
                                                class="form-outline flex-fill mb-0"
                                            >
                                                <input
                                                    type="name"
                                                    id="name"
                                                    class="form-control"
                                                    placeholder="Enter your name"
                                                    v-model="name"
                                                    required
                                                />
                                                <label
                                                    class="form-label"
                                                    for="name"
                                                    >Your Name</label
                                                >
                                            </div>
                                        </div>

                                        <div
                                            class="d-flex flex-row align-items-center mb-4"
                                        >
                                            <i
                                                class="fas fa-envelope fa-lg me-3 fa-fw"
                                            ></i>
                                            <div
                                                class="form-outline flex-fill mb-0"
                                            >
                                                <input
                                                    type="email"
                                                    id="email"
                                                    class="form-control"
                                                    placeholder="Enter a valid email address"
                                                    v-model="email"
                                                    required
                                                />
                                                <label
                                                    class="form-label"
                                                    for="email"
                                                    >Your Email</label
                                                >
                                            </div>
                                        </div>

                                        <div
                                            class="d-flex flex-row align-items-center mb-4"
                                        >
                                            <i
                                                class="fas fa-lock fa-lg me-3 fa-fw"
                                            ></i>
                                            <div
                                                class="form-outline flex-fill mb-0"
                                            >
                                                <input
                                                    type="password"
                                                    id="password"
                                                    class="form-control"
                                                    placeholder="Enter password"
                                                    v-model="password"
                                                    required
                                                />
                                                <label
                                                    class="form-label"
                                                    for="password"
                                                    >Password</label
                                                >
                                            </div>
                                        </div>

                                        <div
                                            class="d-flex flex-row align-items-center mb-4"
                                        >
                                            <i
                                                class="fas fa-key fa-lg me-3 fa-fw"
                                            ></i>
                                            <div
                                                class="form-outline flex-fill mb-0"
                                            >
                                                <input
                                                    type="password"
                                                    id="repeatPass"
                                                    class="form-control"
                                                    v-model="repeatPass"
                                                    required
                                                />
                                                <label
                                                    class="form-label"
                                                    for="repeatPass"
                                                    >Repeat your password</label
                                                >
                                            </div>
                                        </div>

                                        <div
                                            class="d-flex justify-content-center mx-4 mb-3 mb-lg-4"
                                        >
                                            <button
                                                type="submit"
                                                class="btn btn-primary btn-lg"
                                            >
                                                Register
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div
                                    class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2"
                                >
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                        class="img-fluid"
                                        alt="Sample image"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template> -->

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
                    <form @submit.prevent="register">
                        <div
                            class="d-flex flex-row align-items-center justify-content-center"
                        >
                            <p class="lead fw-normal mb-0 me-3 fs-2 fw-bold">
                                Sign up
                            </p>
                        </div>

                        <!-- Email input -->
                        <div class="form-outline mb-4">
                            <label class="form-label" for="name"
                                >Your Name</label
                            >
                            <input
                                type="name"
                                id="name"
                                class="form-control form-control-lg"
                                placeholder="Enter your name"
                                v-model="name"
                                required
                            />
                        </div>

                        <!-- Password input -->
                        <div class="form-outline mb-4">
                            <label class="form-label" for="email"
                                >Your Email</label
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

                        <div class="from-outline mb-4">
                            <label class="form-label" for="password"
                                >Password</label
                            >
                            <input
                                type="password"
                                id="password"
                                class="form-control form-control-lg"
                                placeholder="Enter your password"
                                v-model="password"
                                required
                            />
                        </div>

                        <div class="from-outline mb-4">
                            <label class="form-label" for="password"
                                >Confirm Password</label
                            >
                            <input
                                type="password"
                                id="confirmPass"
                                class="form-control form-control-lg"
                                placeholder="Confirm your password"
                                v-model="confirmPass"
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
                                Sign up
                            </button>
                            <p class="small fw-bold mt-2 pt-1 mb-0">
                                If you alredy have an account ?
                                <router-link to="/login" class="link-danger"
                                    >Login</router-link
                                >
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import registerService from "@/service/register.service";

export default {
    data() {
        return {
            name: "",
            email: "",
            password: "",
            confirmPass: "",
            loading: false,
        };
    },
    methods: {
        async register() {
            try {
                this.loading = true;
                if (this.password !== this.confirmPass) {
                    alert("Password not match");
                    return;
                }
                const response = await registerService.register(
                    this.name,
                    this.email,
                    this.password
                );

                if (!response) return;

                alert("Register successful");
                console.log("Register successful: ", response);

                this.$router.push({ name: "login" });
            } catch (error) {
                console.error(
                    "Register failed: ",
                    error.response ? error.response.data : error.message
                );
            }
        },
    },
};
</script>

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
