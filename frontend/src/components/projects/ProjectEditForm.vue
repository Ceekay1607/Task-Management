<template>
    <section class="container">
        <div class="col-sm-8 col-md-8 col-lg-6 col-xl-4">
            <form @submit.prevent="onUpdateProject">
                <div class="d-flex flex-row">
                    <p class="lead fw-normal me-3 fs-3 fw-bold">
                        Project Details
                    </p>
                </div>

                <div class="form-outline mb-4">
                    <label class="form-label fs-5" for="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        class="form-control form-control-lg"
                        v-model="editProject.name"
                        required
                    />
                </div>

                <div class="form-outline mb-4">
                    <label class="form-label fs-5" for="description"
                        >Description</label
                    >
                    <input
                        type="text"
                        id="description"
                        class="form-control form-control-lg"
                        v-model="editProject.description"
                        required
                    />
                </div>

                <div class="form-outline mb-4">
                    <label class="form-label fs-5" for="members"
                        >Add members</label
                    >
                    <input
                        type="text"
                        id="members"
                        class="form-control form-control-lg"
                        v-model="email"
                    />
                </div>

                <button type="submit" class="btn btn-primary">
                    Update <i class="fa-regular fa-pen-to-square"></i>
                </button>
            </form>
        </div>
    </section>
</template>

<script setup>
import { useProjects } from "@/composables/useProjects";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const projectId = computed(() => route.params.projectId);

const { retrieveProjectById, updateProject } = useProjects();

const { project } = retrieveProjectById(projectId);

const editProject = ref({ ...project.value });
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

function onUpdateProject() {
    try {
        loading.value = true;
        const updated = {
            id: projectId.value,
            name: editProject.value.name,
            description: editProject.value.description,
            memberEmails: convertToEmailArray(email.value),
        };
        const response = updateProject(updated);
        console.log(updated);
        window.location.reload();
        return response;
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
}
</script>
