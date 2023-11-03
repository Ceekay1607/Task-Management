<script setup>
import { useUsers } from "../composables/useUsers";

const { retrieveUsers } = useUsers();
const users = retrieveUsers();
</script>

<template>
    <h1>Hi, this is Login page</h1>
</template>
