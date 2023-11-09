<template>
    <AppHeader />
    <div class="page">
        <div class="row mt-5">
            <h1>MY PROJECTS</h1>
        </div>
        <div class="row">
            <ProjectCard
                v-for="project in projects"
                :key="project.id"
                :project="project"
            />
        </div>
    </div>
</template>

<script setup>
import AppHeader from "@/components/AppHeader.vue";
import ProjectCard from "@/components/ProjectCard.vue";
import { useProjects } from "@/composables/useProjects";

const { retrieveProjectsQuery } = useProjects();
const { projects } = retrieveProjectsQuery();
</script>

<style scoped>
.page {
    min-width: 400px;
    margin: auto;
}

.row {
    margin-bottom: 20px;
}
</style>
