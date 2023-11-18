<template>
    <div class="card mb-3" @click="handleClick">
        <div class="card-body">
            <div>
                <h5 class="card-title" style="text-align: left">
                    {{ issue.name }}
                </h5>
            </div>
            <div class="d-flex justify-content-between mt-4">
                <span class="issue-id">
                    <i
                        class="fa-solid fa-square-check me-1"
                        style="color: #39a7ff"
                    ></i>
                    {{ issue.number }}
                </span>
                <i
                    class="fa-solid fa-flag"
                    :style="{ color: getPriorityColor(issue.priorityName) }"
                ></i>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    issue: { type: Object, required: true },
});

const emits = defineEmits();

const handleClick = () => {
    emits("issue-clicked", props.issue);
};

const getPriorityColor = (priorityName) => {
    switch (priorityName) {
        case "High":
            return "#FF0060";
        case "Medium":
            return "#F6FA70";
        case "Low":
            return "#00DFA2";
        default:
            return "black";
    }
};
</script>

<style scoped>
.card:hover {
    cursor: pointer;
    background-color: rgb(191, 223, 245);
    border-color: rgb(191, 223, 245);
}

.issue-id {
    font-size: 14px;
}
</style>
