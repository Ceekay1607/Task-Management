<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img
                    src="../image/yuai.jpg"
                    alt="Logo"
                    width="40"
                    height="40"
                    class="d-inline-block"
                />
                <span style="margin-left: 10px">Panda project</span>
            </a>

            <div>
                <UserProfile :user="userInfo" />
            </div>
        </div>
    </nav>
</template>

<script setup>
import UserProfile from "@/components/UserProfile.vue";
const props = defineProps({
    user: { type: Object, require: true },
});

const userInfo = props.user;
</script>

<style>
.btn:focus {
    box-shadow: none;
}
nav {
    margin-top: 10px;
}
</style>
