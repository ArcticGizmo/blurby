<template>
  <div class="multi-select-option" :value="value">
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  value: undefined,
});
</script>

<style scoped>
.multi-select-option {
  min-height: 3rem;
  line-height: 3rem;
  width: 100%;
}
</style>
