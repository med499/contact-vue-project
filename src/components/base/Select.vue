<template>
  <div class="h-10">
    <select
      class="text-dark focus:border-primary flex h-full items-center rounded-sm border border-gray-500 bg-white p-2 text-sm font-normal focus:border focus:outline-none"
      v-bind="$attrs"
    >
      <slot />
    </select>
  </div>
</template>

<script setup></script>
