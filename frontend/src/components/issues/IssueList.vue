<template>
    <div class="col-md-4">
        <div class="card mb-4 custom-card">
            <div
                class="card-header d-flex justify-content-between align-items-center"
            >
                <h2 class="h5">{{ category?.name || "Loading" }}</h2>
                <a class="btn btn-link">
                    <i class="fas fa-plus"></i>
                </a>
            </div>
            <div class="card-body custom-card-body list-container">
                <div v-for="issue in issues" :key="issue.id" class="issue-card">
                    <IssueCard
                        :issue="issue"
                        @click="$emit('selectedIssue', issue)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import IssueCard from "@/components/issues/IssueCard.vue";

const props = defineProps({
    category: { type: Object, required: true },
    issues: { type: Array, required: true },
});

const $emit = defineEmits(["selectedIssue"]);
</script>

<style scoped>
.card-header a i {
    font-size: 1.5rem;
    color: rgb(121, 120, 120);
    border-radius: 2px;
}

.card-header a:hover {
    background-color: #dad9d9;
}

.custom-card {
    border-radius: 10px;
    background-color: #ececec;
    border: none;
}

.list-container {
    max-height: 400px;
    overflow-y: auto;
}

.issue-card {
    margin-bottom: 15px;
    box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    cursor: pointer;
}
</style>
