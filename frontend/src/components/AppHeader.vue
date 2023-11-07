<template>
    <nav class="navbar bg-body-tertiary w-auto">
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
                <UserProfile />
            </div>
        </div>
    </nav>
</template>

<script setup>
import UserProfile from "@/components/UserProfile.vue";
</script>

<style>
.btn:focus {
    box-shadow: none;
}
</style>
