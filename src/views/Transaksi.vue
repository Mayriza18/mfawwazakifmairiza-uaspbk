<template>
  <div class="p-6 max-w-5xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Pilih Mobil untuk Disewa</h1>

    <!-- List mobil tersedia -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="mobil in mobilStore.mobilTersedia"
        :key="mobil.id"
        class="bg-white p-4 shadow rounded cursor-pointer hover:shadow-lg transition"
        @click="pilihMobil(mobil)"
      >
        <h2 class="text-lg font-semibold mb-1">{{ mobil.nama }}</h2>
        <p class="text-gray-600 text-sm mb-1">Plat: {{ mobil.plat_nomor }}</p>
        <p class="text-gray-700 font-medium">Rp{{ mobil.harga_per_hari.toLocaleString() }}/hari</p>
      </div>
    </div>

    <!-- Form transaksi (muncul setelah memilih mobil) -->
    <div v-if="mobilDipilih" class="mt-10 bg-white p-6 shadow-md rounded">
      <h2 class="text-xl font-bold mb-4">Form Transaksi</h2>

      <p class="mb-4">
        <span class="font-semibold">Mobil:</span> {{ mobilDipilih.nama }}<br />
        <span class="font-semibold">Harga per Hari:</span> Rp{{ mobilDipilih.harga_per_hari.toLocaleString() }}
      </p>

      <form @submit.prevent="buatTransaksi" class="space-y-4">
        <div>
          <label class="block font-medium mb-1">Nama Penyewa</label>
          <input v-model="form.nama_penyewa" type="text" class="w-full input" required />
        </div>

        <div>
          <label class="block font-medium mb-1">Durasi (hari)</label>
          <input v-model.number="form.durasi_hari" type="number" min="1" class="w-full input" required />
        </div>

        <div class="text-gray-800 text-lg font-semibold">
          Total Harga: Rp{{ totalHarga.toLocaleString() }}
        </div>

        <div class="flex gap-4">
          <button type="submit" class="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition">
            Simpan Transaksi
          </button>
          <button @click="mobilDipilih = null" type="button" class="text-gray-500 hover:text-red-500">
            Batal
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
