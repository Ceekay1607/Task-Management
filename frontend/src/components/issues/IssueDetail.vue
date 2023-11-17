<template>
    <form @submit.prevent="onUpdateIssue">
        <div class="col-md-10">
            <div class="mb-3">
                <span id="issueName" class="issue-input issue-name"
                    >Name: {{ issue.name }}</span
                >
            </div>
            <div class="mb-3">
                <span id="issueDescription" class="issue-input"
                    >Description: {{ issue.description }}</span
                >
            </div>
            <div class="mb-3">
                <label class="form-label">Status</label>
                <select class="form-control" v-model="issue.categoryName">
                    <option
                        v-for="category in categories"
                        :key="category.id"
                        :value="category.name"
                    >
                        {{ category.name }}
                    </option>
                </select>
            </div>
            <div class="mb-3">
                <label class="form-label">Priority</label>
                <select class="form-control" v-model="issue.priorityName">
                    <option
                        v-for="priority in priorities"
                        :key="priority.id"
                        :value="priority.name"
                    >
                        {{ priority.name }}
                    </option>
                </select>
            </div>

            <div class="mb-3">
                <label class="form-label">Assignee</label>
                <select class="form-control" v-model="issue.assigneeEmail">
                    <option
                        v-for="assignee in members"
                        :key="assignee.id"
                        :value="assignee.memberEmail"
                    >
                        {{ assignee.memberEmail }}
                    </option>
                </select>
            </div>

            <div class="mb-3">
                <label class="form-label">Reporter:</label>
                <span>{{ issue.reporterEmail }}</span>
            </div>
        </div>

        <div>
            <button type="submit" class="btn btn-primary">
                Update <i class="fa-regular fa-pen-to-square"></i>
            </button>
        </div>
    </form>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useProjects } from "@/composables/useProjects";
import { useIssues } from "@/composables/useIssues";
import { useCategories } from "@/composables/useCategories";
import { usePriorities } from "@/composables/usePriorities";
import { useRoute } from "vue-router";

const route = useRoute();
const projectId = computed(() => route.params.projectId);

const props = defineProps({
    issue: { type: Object, required: true },
});

const { updateIssue } = useIssues();

const { retrieveProjectById } = useProjects();
const { project } = retrieveProjectById(projectId);
const infoProject = ref({ ...project.value });
const members = infoProject.value.members;

const { retrieveCategories } = useCategories();
const { categories } = retrieveCategories();

const { retrievePriorities } = usePriorities();
const { priorities } = retrievePriorities();

function onUpdateIssue() {
    try {
        const update = {
            projectId: projectId.value,
            number: props.issue.number,
            name: props.issue.name,
            description: props.issue.description,
            reporterEmail: props.issue.reporterEmail,
            assigneeEmail: props.issue.assigneeEmail,
            category: props.issue.categoryName,
            priority: props.issue.priorityName,
        };

        const response = updateIssue(update);
        console.log(update);
        console.log(response);
        window.location.reload();
        return response;
    } catch (error) {
        console.log(error);
    }
}
</script>

<style scoped>
.first-row {
    font-size: 3em;
    font-weight: bold;
}

.first-row a i:hover {
    color: red;
}

.issue-name {
    font-size: 24px;
    font-weight: bold;
}
</style>
