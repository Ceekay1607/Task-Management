<template>
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
                        class="modal-title fs-2 fw-bold"
                        id="addProjectModalLabel"
                    >
                        Project Information
                    </h1>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <form @submit.stop.prevent="onCreateProject">
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
                            <label class="form-label" for="description"
                                >Description</label
                            >
                            <input
                                type="text"
                                id="description"
                                class="form-control"
                                v-model="description"
                                required
                            />
                        </div>

                        <div class="form-outline mb-3">
                            <label class="form-label" for="email"
                                >Members Emails
                                <i>(separated by comma ",")</i></label
                            >
                            <input
                                type="text"
                                id="email"
                                class="form-control"
                                v-model="email"
                            />
                        </div>

                        <div
                            class="d-flex align-items-center justify-content-center"
                        >
                            <button
                                type="submit"
                                class="btn btn-primary"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useProjects } from "@/composables/useProjects";
import { ref } from "vue";

const $emit = defineEmits(["submit:add"]);

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
        const response = createProject(newProject, {
            onSuccess: () => {
                $emit("submit:add", true);
            },
        });
        // window.location.reload();
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
