<template>
    <div class="dropdown">
        <button
            class="btn"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            width="60px"
        >
            <img :src="img" class="btn-img" />
        </button>
        <ul class="dropdown-menu dropdown-menu-end text-center">
            <li class="">
                <img :src="img" alt="" class="li-img" />
            </li>

            <li>
                <span>Yu Ai</span>
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

<script>
import img from "@/image/yuai.jpg";
import authService from "@/service/auth.service";

export default {
    data() {
        return { img };
    },
    methods: {
        async logout() {
            try {
                const response = await authService.logout();
                console.log(response);
                this.$router.push({ name: "login" });
            } catch (error) {
                console.error(
                    "logout failed: ",
                    error.response ? error.response.data : error.message
                );
            }
        },
    },
};
</script>

<style>
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
</style>
