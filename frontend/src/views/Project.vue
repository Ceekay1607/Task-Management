<template>
    <AppHeader :user="user" />
    <div class="page container-fluid">
        <header class="d-flex flex-wrap ms-2" id="header">
            <h1>MY PROJECTS</h1>
        </header>
        <button
            type="button"
            class="btn btn-primary d-block ms-2"
            data-bs-toggle="modal"
            data-bs-target="#addProjectModal"
        >
            <i class="fa-solid fa-plus"></i> New
        </button>
        <div class="row scroll pt-3 ps-2" v-if="projects">
            <ProjectCard
                v-for="project in projects"
                :key="project.projectId"
                :project="project"
                :user="user"
                @submit:delete="reload"
            />
            <!-- <h1 v-for="project in projects" :key="project.projectId">
                {{ project }}
            </h1> -->
        </div>
    </div>

    <ProjectAddForm @submit:add="reload" />
</template>

<script setup>
import AppHeader from "@/components/header/AppHeader.vue";
import ProjectCard from "@/components/projects/ProjectCard.vue";
import ProjectAddForm from "@/components/projects/ProjectAddForm.vue";

import { useProjects } from "@/composables/useProjects";
import { useUsers } from "@/composables/useUsers";

const { retrieveUser } = useUsers();
const { user } = retrieveUser();

const { retrieveProjectsQuery } = useProjects();
const { projects, refetch } = retrieveProjectsQuery();

async function reload(isReload) {
    if (isReload) {
        await refetch();
    }
}
// console.log(projects.value);
</script>

<style scoped>
div {
    font-family: "Poppins", sans-serif;
}

.page {
    min-width: 400px;
    padding: 0 2rem 0 2rem;
    margin-top: 90px;
    position: fixed;
    font-family: "Poppins", sans-serif;
}

header {
    display: flex;
    align-items: center;
}

.btn {
    width: 120px;
    height: 40px;
    margin-bottom: 20px;
}

.scroll {
    max-height: 70vh;
    position: relative;
    overflow-y: auto;
}
</style>
