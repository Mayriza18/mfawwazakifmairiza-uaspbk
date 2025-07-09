<template>
  <div class="p-6 max-w-6xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Laporan Transaksi Selesai</h1>

    <!-- 📊 Ringkasan -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-white p-4 shadow rounded text-center">
        <h2 class="text-sm text-gray-500">Total Selesai</h2>
        <p class="text-xl font-bold">{{ transaksiSelesai.length }}</p>
      </div>
      <div class="bg-white p-4 shadow rounded text-center">
        <h2 class="text-sm text-gray-500">Belum Dikembalikan</h2>
        <p class="text-xl font-bold">{{ transaksiAktif.length }}</p>
      </div>
      <div class="bg-white p-4 shadow rounded text-center">
        <h2 class="text-sm text-gray-500">Total Pendapatan</h2>
        <p class="text-xl font-bold">Rp{{ totalPendapatan.toLocaleString() }}</p>
      </div>
      <div class="bg-white p-4 shadow rounded text-center">
        <h2 class="text-sm text-gray-500">Mobil Tersedia</h2>
        <p class="text-xl font-bold">{{ mobilTersedia.length }}</p>
      </div>
    </div>

    <!-- 📄 Tabel Laporan -->
    <div v-if="transaksiSelesai.length === 0" class="text-gray-500">
      Belum ada transaksi yang selesai.
    </div>
    <div v-else class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200 rounded shadow text-sm">
        <thead class="bg-amber-500 text-white">
          <tr>
            <th class="px-4 py-2 text-left">Mobil</th>
            <th class="px-4 py-2 text-left">Penyewa</th>
            <th class="px-4 py-2 text-left">Mulai</th>
            <th class="px-4 py-2 text-left">Kembali</th>
            <th class="px-4 py-2 text-left">Dikembalikan</th>
            <th class="px-4 py-2 text-right">Harga</th>
            <th class="px-4 py-2 text-right">Denda</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="trx in transaksiSelesai"
            :key="trx.id"
            class="border-t hover:bg-gray-50"
          >
            <td class="px-4 py-2">{{ getMobil(trx.mobil_id)?.nama }}</td>
            <td class="px-4 py-2">{{ trx.nama_penyewa }}</td>
            <td class="px-4 py-2">{{ trx.tanggal_mulai }}</td>
            <td class="px-4 py-2">{{ trx.tanggal_kembali }}</td>
            <td class="px-4 py-2">{{ trx.tanggal_dikembalikan }}</td>
            <td class="px-4 py-2 text-right">Rp{{ trx.total_harga.toLocaleString() }}</td>
            <td class="px-4 py-2 text-right">Rp{{ trx.denda_total.toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useTransaksiStore } from '@/stores/transaksiStore'
import { useMobilStore } from '@/stores/mobilStore'
import { computed, onMounted } from 'vue'

const transaksiStore = useTransaksiStore()
const mobilStore = useMobilStore()

onMounted(() => {
  transaksiStore.fetchTransaksi()
  mobilStore.fetchMobil()
})

const transaksiSelesai = computed(() => transaksiStore.transaksiSelesai)
const transaksiAktif = computed(() => transaksiStore.transaksiAktif)
const mobilTersedia = computed(() => mobilStore.mobilTersedia)

// Hitung pendapatan total dari transaksi selesai
const totalPendapatan = computed(() =>
  transaksiSelesai.value.reduce(
    (total, trx) => total + trx.total_harga + trx.denda_total,
    0
  )
)

function getMobil(id) {
  return mobilStore.getMobilById(id)
}
</script>
