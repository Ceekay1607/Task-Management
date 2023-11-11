<template>
    <div class="navbar fixed-top navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img
                    :src="projectLogo"
                    alt="Logo"
                    width="50"
                    height="50"
                    class="d-inline-block"
                />
                <span style="margin-left: 10px">Panda project</span>
            </a>

            <div>
                <UserProfile :user="userInfo" />
            </div>
        </div>
    </div>
</template>

<script setup>
import UserProfile from "@/components/header/UserProfile.vue";
import projectLogo from "@/assets/image/Logo.png";
const props = defineProps({
    user: { type: Object, require: false },
});

const userInfo = props.user;
</script>

<style>
.navbar {
    box-shadow: 0 5px 5px -5px gray;
}
</style>
