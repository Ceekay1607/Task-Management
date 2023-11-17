<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-md-7">
                <div class="mb-5">
                    <InputSearch v-model="searchText" />
                    <button
                        type="button"
                        class="btn btn-primary d-block my-2"
                        data-bs-toggle="modal"
                        data-bs-target="#addIssueModal"
                    >
                        New
                    </button>
                </div>
                <IssueLists
                    v-if="categories && issuesByCategory"
                    :categories="categories"
                    :issues-by-category="issuesByCategory"
                    @selectedIssue="getIssue($event)"
                />
            </div>
            <div class="col-md-5">
                <div v-if="selectedIssueDetail">
                    <IssueDetail :issue="selectedIssueDetail" />
                </div>
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
