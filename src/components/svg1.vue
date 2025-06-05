<!-- src/components/SvgIcon.vue -->
<template>
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    class="icon"
  >
    <polygon
      class="cls-1"
      points="20.59 7.23 14.86 7.23 14.86 1.5 12 2.46 9.14 1.5 9.14 7.23 3.41 7.23 4.36 10.09 3.41 12.96 9.14 12.96 9.14 22.5 12 21.55 14.86 22.5 14.86 12.96 20.59 12.96 19.64 10.09 20.59 7.23"
      :stroke="hovered ? '#000000' : '#fafafa'"
    />
  </svg>
</template>

<script setup>

const props = defineProps({
  hovered: Boolean
})
</script>

<style scoped>
.cls-1 {
  fill: none;
  stroke-miterlimit: 10;
  stroke-width: 1.91px;
  transition: stroke 0.3s ease;
}
</style>
