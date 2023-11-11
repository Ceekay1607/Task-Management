<template>
    <AppHeader :user="userInfo" />
    <div>
        <div class="page">
            <header class="d-flex flex-wrap">
                <h1>MY PROJECTS</h1>
                <button type="submit" class="btn btn-primary">New</button>
            </header>

            <div
                data-bs-spy="scroll"
                data-bs-target=".page"
                data-bs-offset="0"
                class="row project"
                tabindex="0"
            >
                <ProjectCard
                    v-for="project in projects"
                    :key="project.id"
                    :project="project"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import AppHeader from "@/components/AppHeader.vue";
import ProjectCard from "@/components/ProjectCard.vue";
import AddProjectForm from "@/components/AddProjectForm.vue";

import { useProjects } from "@/composables/useProjects";
import { useUsers } from "@/composables/useUsers";

const { retrieveUser } = useUsers();
const userInfo = retrieveUser();

const { retrieveProjectsQuery } = useProjects();
const { projects } = retrieveProjectsQuery();
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

.page {
    min-width: 400px;
    padding: 0 2rem 0 2rem;
    margin-top: 90px;
    position: fixed;
    font-family: "Poppins", sans-serif;
}

header {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
}

.btn {
    margin-left: 20px;
    width: 80px;
    height: 40px;
    font-size: 1.2rem;
}
#project {
    overflow-y: scroll;
}
</style>
