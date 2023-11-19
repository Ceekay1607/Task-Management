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
                    <form
                        @submit.prevent="register"
                        :validation-schema="registerFormSchema"
                    >
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
<script setup>
import registerService from "@/service/register.service";
import { ref } from "vue";
import { useRouter } from "vue-router";
import * as yup from "yup";

const getCharacterValidationError = (str) => {
    return `Your password must have at least 1 ${str} character`;
};

const registerFormSchema = yup.object().shape({
    name: yup.string().min(10).max(50),
    email: yup.string().email("Email format wrong").max(50),
    password: yup
        .string()
        .required("Please enter a password")
        .min(8, "Password must have at least 8 characters")

        .matches(/[0-9]/, getCharacterValidationError("digit"))
        .matches(/[a-z]/, getCharacterValidationError("lowercase"))
        .matches(/[A-Z]/, getCharacterValidationError("uppercase")),

    confirmPass: yup
        .string()
        .required("Please re-type your password")
        .oneOf([ref("password")], "Passwords does not match"),
});

const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPass = ref("");

function register() {
    try {
        if (password.value !== confirmPass.value) {
            alert("Password not match");
            return;
        }
        const response = registerService.register(
            name.value,
            email.value,
            password.value
        );

        if (!response) return;

        alert("register successful");
        console.log(response);
        router.push({ name: "login" });
    } catch (error) {
        console.error(
            "Register failed: ",
            error.response ? error.response.data : error.message
        );
    }
}
// export default {
//     data() {
//         return {
//             name: "",
//             email: "",
//             password: "",
//             confirmPass: "",
//             loading: false,
//         };
//     },
//     methods: {
//         async register() {
//             try {
//                 this.loading = true;
//                 if (this.password !== this.confirmPass) {
//                     alert("Password not match");
//                     return;
//                 }
//                 const response = await registerService.register(
//                     this.name,
//                     this.email,
//                     this.password
//                 );

//                 if (!response) return;

//                 alert("Register successful");
//                 console.log("Register successful: ", response);

//                 this.$router.push({ name: "login" });
//             } catch (error) {
//                 console.error(
//                     "Register failed: ",
//                     error.response ? error.response.data : error.message
//                 );
//             }
//         },
//     },
// };
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
