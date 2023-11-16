<template>
    <div class="col-md-4">
        <div class="card mb-4">
            <div class="card-header">
                <h2 class="h5">{{ category?.name || "Loading" }}</h2>
            </div>
            <div class="card-body">
                <div v-for="issue in issues" :key="issue.id">
                    <IssueCard :issue="issue" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import IssueCard from "@/components/issues/IssueCard.vue";
import { defineProps } from "vue";

const props = defineProps({
    category: { type: Object, required: true },
    issues: { type: Array, required: true },
});
</script>
