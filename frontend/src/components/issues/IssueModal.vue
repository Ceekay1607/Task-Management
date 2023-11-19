<template>
    <form @submit.prevent="onCreateIssue">
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
            <label class="form-label" for="assignee">Assignee </label>
            <select
                class="form-select mb-3"
                id="assignee"
                v-model="assignee"
                aria-label=".form-select-lg assignee"
            >
                <option v-for="assignee in members">
                    {{ assignee.memberEmail }}
                </option>
            </select>
        </div>

        <div class="form-outline mb-3">
            <label class="form-label" for="category">Category</label>
            <select
                class="form-select mb-3"
                id="category"
                v-model="category"
                aria-label=".form-select-lg category"
            >
                <option v-for="category in categories">
                    {{ category.name }}
                </option>
            </select>
        </div>

        <div class="form-outline mb-3">
            <label class="form-label" for="priority">Priority</label>
            <select
                class="form-select mb-3"
                id="priority"
                v-model="priority"
                aria-label=".form-select-lg priority"
            >
                <option v-for="priority in priorities">
                    {{ priority.name }}
                </option>
            </select>
        </div>

        <div class="d-flex align-items-center justify-content-center">
            <button type="submit" class="btn btn-primary">Add</button>
        </div>
    </form>
</template>

<script setup>
import { useUsers } from "@/composables/useUsers";
import { useProjects } from "@/composables/useProjects";
import { useIssues } from "@/composables/useIssues";
import { useCategories } from "@/composables/useCategories";
import { usePriorities } from "@/composables/usePriorities";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const projectId = computed(() => route.params.projectId);

const { retrieveProjectById } = useProjects();
const { retrieveCategories } = useCategories();
const { retrievePriorities } = usePriorities();
const { retrieveUser } = useUsers();
const { createIssue } = useIssues();

const { user } = retrieveUser();
const infoUser = ref({ ...user.value });
const reporterEmail = infoUser.value.email;

const { project } = retrieveProjectById(projectId);
const infoProject = ref({ ...project.value });

const members = infoProject.value.members;
const { categories } = retrieveCategories();
const { priorities } = retrievePriorities();

const name = ref("");
const description = ref("");
const assignee = ref("");
const category = ref("");
const priority = ref("");

const $emit = defineEmits(["submit:addIssue"]);

function onCreateIssue() {
    try {
        const issue = {
            projectId: projectId.value,
            name: name.value,
            description: description.value,
            reporterEmail: reporterEmail,
            assigneeEmail: assignee.value,
            category: category.value,
            priority: priority.value,
        };
        // const response = createIssue(issue);
        createIssue(issue, { onSuccess: () => $emit("submit:addIssue", true) });

        // console.log(response);
        window.location.reload();
        // return response;
    } catch (error) {
        console.log(error);
    }
}
</script>
