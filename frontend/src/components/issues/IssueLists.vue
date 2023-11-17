<template>
    <div class="mt-3 mb-5">
        <InputSearch v-model="searchText" />
    </div>
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
import InputSearch from "../common/InputSearch.vue";
import { ref, computed, watch, defineEmits } from "vue";

const searchText = ref("");

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
