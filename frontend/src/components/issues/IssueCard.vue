<template>
    <div class="card mb-3" @click="handleClick">
        <div class="card-body text-center">
            <h5 class="card-title">{{ issue.name }}</h5>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
    issue: { type: Object, required: true },
});

const emits = defineEmits();

const handleClick = () => {
    emits("issue-clicked", props.issue);
};
</script>

<style scoped>
.card:hover {
    cursor: pointer;
    background-color: rgb(191, 223, 245);
}
</style>
