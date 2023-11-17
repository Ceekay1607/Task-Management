<template>
    <div>
        <div class="p-1">
            <strong>Tên:</strong>
            {{ issue.name }}
        </div>
        <div class="p-1">
            <strong>Mô tả:</strong>
            {{ issue.description }}
        </div>
        <div class="p-1">
            <strong>Người báo cáo:</strong>
            {{ issue.reporterName }}
        </div>
        <div class="p-1">
            <strong>Người thực hiện:</strong>
            {{ issue.assigneeName }}
        </div>
        <div class="p-1">
            <strong>Ưu tiên:</strong>
            {{ issue.priorityName }}
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    issue: { type: Object, required: true },
});
</script>

<style scoped></style>
