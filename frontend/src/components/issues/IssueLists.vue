<template>
    <div class="row">
        <IssueList
            v-for="category in categories"
            :key="category.id"
            :category="category"
            :issues="issuesByCategory[category.name]"
            @selectedIssue="getIssue($event)"
        />
    </div>
</template>

<script setup>
import IssueList from "@/components/issues/IssueList.vue";

import { ref, computed, watch } from "vue";

const $emit = defineEmits(["selectedIssue"]);

function getIssue(issue) {
    // selectedIssue.value = issue;
    $emit("selectedIssue", issue);
    // console.log("selected: " + JSON.stringify(selectedIssue.value));
}

const props = defineProps({
    categories: { type: Array, required: true },
    issuesByCategory: { type: Object, required: true },
});
</script>
