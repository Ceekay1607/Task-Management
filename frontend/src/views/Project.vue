<template>
    <AppHeader :user="userInfo" />
    <div class="page">
        <header class="d-flex flex-wrap">
            <h1>MY PROJECTS</h1>
        </header>
        <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addProjectModal"
        >
            New
        </button>
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
    <div
        class="modal fade"
        id="addProjectModal"
        tabindex="-1"
        aria-labelledby="addProjectModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1
                        class="modal-title fs-5 fs-2 fw-bold"
                        id="addProjectModalLabel"
                    >
                        Project Details
                    </h1>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <ProjectAddForm />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import AppHeader from "@/components/header/AppHeader.vue";
import ProjectCard from "@/components/projects/ProjectCard.vue";
import ProjectAddForm from "@/components/projects/ProjectAddForm.vue";

import { useProjects } from "@/composables/useProjects";
import { useUsers } from "@/composables/useUsers";
import { ref } from "vue";

const { retrieveUser } = useUsers();
const userInfo = retrieveUser();
const isShow = ref(false);

const showForm = () => {
    isShow.value = true;
};

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
    display: flex;
    align-items: center;
}

.btn {
    width: 80px;
    height: 40px;

    margin-bottom: 20px;
}
#project {
    overflow-y: scroll;
}
</style>
