<script setup lang="ts">
const emit = defineEmits(["onToggleLineLayer"]);
</script>

<template>
  <div class="wmg-container">
    <section class="wmg-card">
      <h1>Configuration Panel</h1>
      <p @click="emit('onToggleLineLayer')">Line layer</p>
      <p>Circle layer</p>
      <p>Polygon layer</p>
      <p>Custom Marker</p>
      <p>Default Marker</p>
      <p>Raster Tile</p>
    </section>
  </div>
</template>

<style scoped>
.wmg-container {
  position: absolute;
  top: calc(10vh - 16px);
  left: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
}

.wmg-card {
  border-radius: 8px;
  width: 240px;
  height: 80vh;
  padding: 16px;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(4px);
  box-shadow: 0 0 50px -25px black;
}
</style>