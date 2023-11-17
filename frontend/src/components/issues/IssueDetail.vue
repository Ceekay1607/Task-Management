<template>
    <div>
        <form>
            <div class="row mb-3">
                <div class="col-md-12">
                    <div class="d-flex justify-content-between first-row">
                        <div class="d-flex">
                            <label class="me-2">#</label>
                            <span>{{ issue.number }}</span>
                        </div>
                        <a href="#" @click="closeIssue"
                            ><i class="fas fa-times"></i
                        ></a>
                    </div>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-md-7">
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
                </div>
                <div class="col-md-5">
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
                        <label class="form-label">Assignee:</label>
                        <span>{{ issue.assigneeName }}</span>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Reporter:</label>
                        <span>{{ issue.reporterName }}</span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 d-flex justify-content-center">
                    <button
                        type="button"
                        class="btn btn-primary"
                        @click="updateIssue"
                    >
                        Accept
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCategories } from "@/composables/useCategories";
import { usePriorities } from "@/composables/usePriorities";

const props = defineProps({
    issue: { type: Object, required: true },
});

const { retrieveCategories } = useCategories();
const { categories } = retrieveCategories();

const { retrievePriorities } = usePriorities();
const { priorities } = retrievePriorities();
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
