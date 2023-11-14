<template>board</template>

<script setup>
import { useIssues } from "@/composables/useIssues";
import { useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();
const projectId = ref(route.params.projectId);

const { retrieveIssues } = useIssues();
const { issues } = retrieveIssues(projectId);
console.log(issues);
</script>
