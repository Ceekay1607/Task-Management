<template>
    <div class="input-group">
        <input
            type="text"
            class="form-control px-3"
            placeholder="Input text to search"
            :value="modelValue"
            @input="(e) => $emit('update:modelValue', e.target.value)"
            @keyup.enter="$emit('submit')"
        />

        <button class="btn" type="button" @click="$emit('submit')">
            <i class="fas fa-search"></i>
        </button>
    </div>
</template>

<script setup>
defineProps({
    modelValue: { type: String, default: "" },
});

const $emit = defineEmits(["submit", "update:modelValue"]);
</script>
