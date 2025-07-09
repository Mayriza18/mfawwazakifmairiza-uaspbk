<template>
  <nav class="bg-amber-500 text-white shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Logo / Judul -->
        <div class="flex-shrink-0 text-lg font-bold">
          RentalMobil
        </div>

        <!-- Menu -->
        <div class="flex space-x-6 font-medium">
          <router-link
            to="/"
            class="hover:text-yellow-100 transition"
            :class="{ 'underline underline-offset-4': isActive('/') }"
          >
            Transaksi
          </router-link>

          <router-link
            to="/info"
            class="hover:text-yellow-100 transition"
            :class="{ 'underline underline-offset-4': isActive('/info') }"
          >
            Info Transaksi
          </router-link>

          <router-link
            to="/laporan"
            class="hover:text-yellow-100 transition"
            :class="{ 'underline underline-offset-4': isActive('/laporan') }"
          >
            Laporan
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

function isActive(path) {
  return route.path === path
}
</script>

<style scoped>
/* Tidak diperlukan styling manual, semua pakai Tailwind */
</style>
