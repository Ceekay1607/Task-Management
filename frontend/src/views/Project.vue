<template>
    <AppHeader :user="userInfo" />
    Hi, Project!
</template>

<script setup>
import AppHeader from "@/components/AppHeader.vue";
import usersService from "@/service/users.service";
import { useUsers } from "@/composables/useUsers";

const { retrieveUser } = useUsers();
const userInfo = retrieveUser();
</script>
