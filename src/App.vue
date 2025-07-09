<script setup>
import Navbar from './components/Navbar.vue';
</script>

<template>
  <Navbar />
  <div class="bg-gray-100 min-h-screen">
    <router-view />
  </div>
</template>

<style scoped></style>
