<template>
    <div class="main fixed-top">
        <AppHeader :user="user" />
        <div class="container-fluid">
            <div class="row">
                <SideBar />
                <div class="col-md-10 main-page">
                    <router-view />
                </div>
            </div>
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

/* Ensure that the modal backdrop covers the whole page */
.modal-backdrop {
    position: fixed;
    z-index: 1050;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #000; /* or your desired color */
}
</style>
