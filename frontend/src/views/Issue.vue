<template>
    <div class="main fixed-top">
        <AppHeader :user="userInfo" />
        <div>
            <SideBar />
        </div>
    </div>
</template>

<script setup>
import { useRoute } from "vue-router";

import AppHeader from "@/components/header/AppHeader.vue";
import SideBar from "@/components/navigation/SideBar.vue";
import ProjectForm from "@/components/projects/ProjectForm.vue";
import IssueCard from "@/components/issues/IssueCard.vue";

const $route = useRoute();

import { useUsers } from "@/composables/useUsers";
import { useProjects } from "@/composables/useProjects";
import { ref } from "vue";

const { retrieveUser } = useUsers();
// const { retrieveProjectById } = useProjects();

const projectId = ref($route.params.projectId);

const userInfo = retrieveUser();
// const project = retrieveProjectById(projectId);
</script>

<style>
.main {
    height: 100%;
}

.main-page {
    margin-top: 75px;
}
</style>
