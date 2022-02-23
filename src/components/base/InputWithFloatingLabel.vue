<template>
  <div class="relative">
    <Input
      type="text"
      v-bind="$attrs"
      class="peer w-full placeholder-transparent"
      :placeholder="label"
      :id="id"
    ></Input>
    <label
      :for="id"
      class="text-dark peer-focus:text-dark absolute left-2 -top-2 bg-white px-1 text-xs transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-900 peer-focus:-top-2 peer-focus:text-xs"
    >
      {{ label }}
    </label>
  </div>
</template>

<script setup>
import { ref } from "@vue/runtime-core";
import { generateRandomInt } from "../../utils/index";
defineProps({
  label: {
    type: String,
    default: "",
  },
});

const id = ref(`input_with_flaoting_label_${generateRandomInt()}`);
</script>
