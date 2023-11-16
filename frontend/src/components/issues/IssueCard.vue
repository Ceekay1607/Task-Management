<template>
    <div class="card mb-3">
        <div class="card-body">
            <h5 class="card-title">{{ issue.name }}</h5>
            <p class="card-text">{{ issue.description }}</p>
            <!-- Add more details as needed -->
        </div>
    </div>
</template>

<script setup>
import { defineProps } from "vue";

const { issue } = defineProps({
    issue: { type: Object, required: true },
});
</script>
