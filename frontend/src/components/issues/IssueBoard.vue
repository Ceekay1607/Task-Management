<template>
    <div class="mt-4 col-xs-12">
        <div class="row board">
            <div class="col-md-7 col-sm-12">
                <div class="mb-2">
                    <InputSearch v-model="searchText" />
                    <button
                        type="button"
                        class="btn d-block mt-5"
                        data-bs-toggle="modal"
                        data-bs-target="#addIssueModal"
                    >
                        <i class="fa-solid fa-plus me-2"></i>New
                    </button>
                </div>
                <IssueLists
                    v-if="categories && issuesByCategory"
                    :categories="categories"
                    :issues-by-category="issuesByCategory"
                    @selectedIssue="getIssue($event)"
                />
            </div>
            <div class="col-md-5" v-if="selectedIssueDetail">
                <IssueDetail :issue="selectedIssueDetail" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCategories } from "@/composables/useCategories";
import { useIssues } from "@/composables/useIssues";
import IssueLists from "@/components/issues/IssueLists.vue";
import IssueDetail from "./IssueDetail.vue";
import InputSearch from "../common/InputSearch.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const projectId = ref(route.params.projectId);

const { retrieveCategories } = useCategories();
const { retrieveIssues } = useIssues();

const { categories } = retrieveCategories();
const { issues } = retrieveIssues(projectId);
const searchText = ref("");

const issuesByCategory = computed(() => {
    if (categories.value && issues.value) {
        return categorizeIssues(issues.value, categories.value);
    } else {
        return {};
    }
});

const categorizeIssues = (issues, categories) => {
    const categorized = {};
    categories.forEach((category) => {
        const categoryName = category.name;
        categorized[categoryName] = issues.filter(
            (issue) => issue.categoryName === categoryName
        );
    });
    return categorized;
};

const selectedIssue = ref(null);

const selectedIssueDetail = computed(() => {
    if (selectedIssue.value === null) return null;
    return selectedIssue.value;
});

function getIssue(issue) {
    selectedIssue.value = issue;
}
</script>

<style scoped>
.btn {
    color: #fff;
    background-color: #00a9ff;
}

.btn:hover {
    background-color: #89cff3;
}

.board {
    overflow-y: auto;

    max-height: 85vh;
}
</style>
