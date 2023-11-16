<template>
    <div class="container mt-4">
        <IssueLists
            v-if="categories && issuesByCategory"
            :categories="categories"
            :issues-by-category="issuesByCategory"
        />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCategories } from "@/composables/useCategories";
import { useIssues } from "@/composables/useIssues";
import IssueLists from "@/components/issues/IssueLists.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const projectId = ref(route.params.projectId);

const { retrieveCategories } = useCategories();
const { retrieveIssues } = useIssues();

const { categories } = retrieveCategories();
const { issues } = retrieveIssues(projectId);

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

onMounted(() => {
    // Log data after it has been fetched
    console.log("categories:", categories.value);
    console.log("issues:", issues.value);
    console.log("issuesByCategory:", issuesByCategory.value);
});
</script>
