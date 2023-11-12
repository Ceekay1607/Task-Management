<template>
    <div class="main fixed-top">
        <AppHeader :user="user" />
        <div>
            <SideBar />
        </div>
    </div>
</template>

<script setup>
import AppHeader from "@/components/header/AppHeader.vue";
import SideBar from "@/components/navigation/SideBar.vue";

import { useUsers } from "@/composables/useUsers";

const { retrieveUser } = useUsers();

const { user } = retrieveUser();
</script>

<style>
div {
    font-family: "Poppins", sans-serif;
}
.main {
    height: 100%;
}

.main-page {
    margin-top: 75px;
}
</style>
