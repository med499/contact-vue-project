<template>
  <input
    class="text-dark focus:border-primary flex h-10 items-center rounded-sm border border-gray-500 p-2 text-sm font-normal focus:border focus:outline-none"
    :value="modelValue"
    v-bind="$attrs"
    @input.stop="$emit('update:modelValue', $event.target.value)"
  />
</template>
<script setup>
defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>
