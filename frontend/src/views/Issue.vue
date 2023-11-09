<template>
    <AppHeader :user="userInfo" />
    <div>
        <div class="row flex-nowrap">
            <SideBar />
            <div class="col py-3">Issue ne</div>
        </div>
    </div>
</template>

<script setup>
import AppHeader from "@/components/AppHeader.vue";
import SideBar from "@/components/SideBar.vue";

import { useUsers } from "@/composables/useUsers";

const { retrieveUser } = useUsers();
const userInfo = retrieveUser();
</script>
