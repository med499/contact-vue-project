<template>
  <button
    class="bg-primary h-10 text-sm font-normal text-white hover:brightness-105"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup></script>
