<template>
  <div class="p-6 max-w-5xl mx-auto  min-h-screen">
    <h1 class="text-3xl font-bold text-gray-800 mb-8">🚗 Pilih Mobil untuk Disewa</h1>

    <!-- List mobil tersedia -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="mobil in mobilStore.mobilTersedia"
        :key="mobil.id"
        class="bg-white p-5 rounded-lg shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-200 cursor-pointer"
        @click="pilihMobil(mobil)"
      >
        <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ mobil.nama }}</h2>
        <p class="text-sm text-gray-500 mb-1">Plat: {{ mobil.plat_nomor }}</p>
        <p class="text-lg text-amber-600 font-bold">Rp{{ mobil.harga_per_hari.toLocaleString() }}/hari</p>
      </div>
    </div>

    <!-- Form transaksi -->
    <div
      v-if="mobilDipilih"
      class="mt-10 bg-white p-8 shadow-lg rounded-lg border border-gray-200 transition-all"
    >
      <h2 class="text-2xl font-bold text-gray-800 mb-6">📝 Form Transaksi</h2>

      <div class="mb-6 text-gray-700 space-y-1">
        <p><span class="font-semibold">Mobil:</span> {{ mobilDipilih.nama }}</p>
        <p><span class="font-semibold">Harga per Hari:</span> Rp{{ mobilDipilih.harga_per_hari.toLocaleString() }}</p>
      </div>

      <form @submit.prevent="buatTransaksi" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nama Penyewa</label>
          <input
            v-model="form.nama_penyewa"
            type="text"
            placeholder="Masukkan nama penyewa"
            class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Durasi (hari)</label>
          <input
            v-model.number="form.durasi_hari"
            type="number"
            min="1"
            class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            required
          />
        </div>

        <div class="text-lg font-semibold text-gray-800">
          Total Harga: <span class="text-amber-600">Rp{{ totalHarga.toLocaleString() }}</span>
        </div>

        <div class="flex gap-4 pt-2">
          <button
            type="submit"
            class="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-md shadow transition-all duration-200"
          >
            💾 Simpan Transaksi
          </button>
          <button
            @click="mobilDipilih = null"
            type="button"
            class="px-5 py-2 text-gray-600 border border-gray-300 rounded-md hover:text-red-500 hover:border-red-400 transition"
          >
            ❌ Batal
          </button>
        </div>
      </form>
    </div>
  </div>
</template>



<script setup>
import { ref, computed } from 'vue'
import { useMobilStore } from '@/stores/mobilStore'
import { useTransaksiStore } from '@/stores/transaksiStore'
import dayjs from 'dayjs'

const mobilStore = useMobilStore()
const transaksiStore = useTransaksiStore()

// Ambil data mobil
mobilStore.fetchMobil()

// State
const mobilDipilih = ref(null)
const form = ref({
  nama_penyewa: '',
  durasi_hari: 1
})

// Hitung total harga
const totalHarga = computed(() =>
  mobilDipilih.value ? mobilDipilih.value.harga_per_hari * form.value.durasi_hari : 0
)

function pilihMobil(mobil) {
  mobilDipilih.value = mobil
  form.value = {
    nama_penyewa: '',
    durasi_hari: 1
  }
}

async function buatTransaksi() {
  const now = dayjs()
  const tanggal_mulai = now.format('YYYY-MM-DD')
  const tanggal_kembali = now.add(form.value.durasi_hari, 'day').format('YYYY-MM-DD')

  const data = {
    nama_penyewa: form.value.nama_penyewa,
    mobil_id: mobilDipilih.value.id,
    tanggal_mulai,
    durasi_hari: form.value.durasi_hari,
    tanggal_kembali,
    tanggal_dikembalikan: null,
    total_harga: totalHarga.value,
    denda_per_hari: 50000,
    denda_total: 0,
    selesai: false
  }

  await transaksiStore.tambahTransaksi(data)
  await mobilStore.updateStatusMobil(mobilDipilih.value.id, true)

  mobilDipilih.value = null
  alert('Transaksi berhasil disimpan!')
}
</script>

<style scoped>
.input {
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 6px;
}
</style>
