<template>
    <div>
        <form @submit.prevent="onUpdateIssue">
            <div class="row mb-3">
                <div class="col-md-12">
                    <div class="d-flex justify-content-between first-row">
                        <div class="d-flex">
                            <label class="me-2"
                                ><i
                                    class="fa-solid fa-square-check me-1"
                                    style="color: #39a7ff"
                                ></i
                            ></label>
                            <span>{{ issue.number }}</span>
                        </div>
                        <a href="#" @click="closeIssue"
                            ><i class="fas fa-times"></i
                        ></a>
                    </div>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-md-5">
                    <div class="mb-3">
                        <input
                            type="text"
                            class="form-control issue-input issue-name"
                            id="issueName"
                            v-model="issue.name"
                        />
                    </div>
                    <div class="mb-3">
                        <textarea
                            class="form-control issue-input"
                            id="issueDescription"
                            v-model="issue.description"
                        ></textarea>
                    </div>
                    <div class="mb-3">
                        <span>Reporter: {{ issue.reporterName }}</span>
                    </div>
                </div>
                <div class="col-md-7">
                    <div class="mb-3">
                        <label class="form-label">Status</label>
                        <select
                            class="form-control"
                            v-model="issue.categoryName"
                        >
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
                        <select
                            class="form-control"
                            v-model="issue.priorityName"
                        >
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
                        <select
                            class="form-control"
                            v-model="issue.assigneeEmail"
                        >
                            <option
                                v-for="assignee in members"
                                :key="assignee.id"
                                :value="assignee.memberEmail"
                            >
                                {{ assignee.memberEmail }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <button type="submit" class="btn btn-primary">
                            Update <i class="fa-regular fa-pen-to-square"></i>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
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
.issue-input {
    border: none;
    border-radius: 0;
    &:hover {
        background-color: #f8f9fa;
    }
}

.issue-input:hover {
    cursor: pointer;
}

.issue-input:focus {
    outline: none;
}

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
