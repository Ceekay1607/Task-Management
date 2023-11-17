<template>
    <div class="dropdown">
        <button
            class="btn"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            width="60px"
        >
            <img
                v-if="user && user.image"
                :src="user.image"
                class="btn-img border"
            />
        </button>
        <ul class="dropdown-menu dropdown-menu-end text-center">
            <li class="">
                <img
                    v-if="user && user.image"
                    :src="user.image"
                    alt=""
                    class="li-img"
                />
            </li>

            <li>
                <span>{{ user?.name || "Loading..." }}</span>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
                <button class="btn btn-danger" type="submit" @click="logout">
                    Logout
                </button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import authService from "@/service/auth.service";

const { user } = defineProps({
    user: { type: Object, require: true },
});

const $router = useRouter();

async function logout() {
    try {
        const response = await authService.logout();
        console.log("message", user);
        $router.push({ name: "login" });
    } catch (error) {
        console.error(
            "logout failed: ",
            error.response ? error.response.data : error.message
        );
    }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
template {
    font-family: "Poppins", sans-serif;
}
.btn-img {
    width: 45px;
    height: 45px;
    object-fit: cover;
    border-radius: 50%;
    border: solid #ccc 2px;
}

.li-img {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 1000%;
}

.btn:focus,
.btn {
    border: none;
}
.btn-img:hover {
    border: solid rgb(40, 35, 35) 9c9;
}

#user-avatar:hover {
    border: solid rgb(40, 35, 35) 9c9;
}
</style>
