<template>
  <div class="p-6 max-w-6xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Info Transaksi Berlangsung</h1>

    <div v-if="transaksiAktif.length === 0" class="text-gray-500">
      Tidak ada transaksi aktif saat ini.
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="trx in transaksiAktif"
        :key="trx.id"
        class="bg-white shadow p-4 rounded"
      >
        <h2 class="text-lg font-bold mb-1">{{ getMobil(trx.mobil_id)?.nama }}</h2>
        <p class="text-sm text-gray-600 mb-2">Plat: {{ getMobil(trx.mobil_id)?.plat_nomor }}</p>

        <ul class="text-sm text-gray-800 mb-4">
          <li><strong>Penyewa:</strong> {{ trx.nama_penyewa }}</li>
          <li><strong>Tgl Sewa:</strong> {{ trx.tanggal_mulai }}</li>
          <li><strong>Durasi:</strong> {{ trx.durasi_hari }} hari</li>
          <li><strong>Tgl Kembali:</strong> {{ trx.tanggal_kembali }}</li>
          <li><strong>Total:</strong> Rp{{ trx.total_harga.toLocaleString() }}</li>
        </ul>

        <!-- Jika belum dikembalikan -->
        <button
          @click="selesaikanTransaksi(trx)"
          class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Selesaikan
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTransaksiStore } from '@/stores/transaksiStore'
import { useMobilStore } from '@/stores/mobilStore'
import { computed, onMounted } from 'vue'
import dayjs from 'dayjs'

const transaksiStore = useTransaksiStore()
const mobilStore = useMobilStore()

onMounted(() => {
  transaksiStore.fetchTransaksi()
  mobilStore.fetchMobil()
})

const transaksiAktif = computed(() => transaksiStore.transaksiAktif)

function getMobil(id) {
  return mobilStore.getMobilById(id)
}

async function selesaikanTransaksi(trx) {
  const today = dayjs()
  const tanggal_kembali = dayjs(trx.tanggal_kembali)
  const terlambat = today.diff(tanggal_kembali, 'day')

  const denda = terlambat > 0 ? terlambat * trx.denda_per_hari : 0

  await transaksiStore.tandaiSelesai(trx.id, today.format('YYYY-MM-DD'), denda)
  await mobilStore.updateStatusMobil(trx.mobil_id, false)

  alert(`Transaksi selesai. ${denda > 0 ? 'Denda: Rp' + denda.toLocaleString() : 'Tidak ada denda.'}`)
}
</script>
