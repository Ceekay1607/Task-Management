<template>
    <form @submit.prevent="onCreateProject">
        <div class="form-outline mb-3">
            <label class="form-label" for="name">Name</label>
            <input
                type="text"
                id="name"
                class="form-control"
                v-model="name"
                required
            />
        </div>

        <div class="form-outline mb-3">
            <label class="form-label" for="description">Description</label>
            <input
                type="text"
                id="description"
                class="form-control"
                v-model="description"
                required
            />
        </div>

        <div class="form-outline mb-3">
            <label class="form-label" for="email">Members Emails</label>
            <input
                type="text"
                id="email"
                class="form-control"
                v-model="email"
                required
            />
        </div>

        <div class="d-flex align-items-center justify-content-center">
            <button type="submit" class="btn btn-primary">Add</button>
        </div>
    </form>
</template>

<script setup>
import { useProjects } from "@/composables/useProjects";
import { ref } from "vue";

const { createProject } = useProjects();

const name = ref("");
const description = ref("");
const email = ref("");
const loading = ref(false);

function convertToEmailArray(input) {
    if (input.includes(",")) {
        // If the input contains a comma, assume it's a list of emails separated by commas
        return input.split(",").map((email) => email.trim());
    } else {
        // If there's no comma, treat it as a single email
        return [input.trim()];
    }
}

function onCreateProject() {
    try {
        loading.value = true;
        const newProject = {
            name: name.value,
            description: description.value,
            memberEmails: convertToEmailArray(email.value),
        };
        const response = createProject(newProject);
        window.location.reload();
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
}
</script>

<style>
.btn {
    width: 100px;
}
</style>
