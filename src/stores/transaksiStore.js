import { defineStore } from 'pinia'
import axios from 'axios'

export const useTransaksiStore = defineStore('transaksi', {
  state: () => ({
    daftarTransaksi: [],
    loading: false,
    error: null
  }),

  getters: {
    transaksiAktif(state) {
      return state.daftarTransaksi.filter(t => !t.selesai)
    },
    transaksiSelesai(state) {
      return state.daftarTransaksi.filter(t => t.selesai)
    },
    getTransaksiById: (state) => (id) => {
      return state.daftarTransaksi.find(t => t.id === id)
    }
  },

  actions: {
    async fetchTransaksi() {
      this.loading = true
      this.error = null
      try {
        const res = await axios.get('http://localhost:3000/transaksi')
        this.daftarTransaksi = res.data
      } catch (err) {
        this.error = 'Gagal memuat transaksi.'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    async tambahTransaksi(data) {
      try {
        const res = await axios.post('http://localhost:3000/transaksi', data)
        this.daftarTransaksi.push(res.data)
      } catch (err) {
        this.error = 'Gagal menambahkan transaksi.'
        console.error(err)
      }
    },

    async tandaiSelesai(id, tanggalDikembalikan, denda) {
      try {
        const transaksi = this.getTransaksiById(id)
        if (!transaksi) return

        const update = {
          selesai: true,
          tanggal_dikembalikan: tanggalDikembalikan,
          denda_total: denda
        }

        await axios.patch(`http://localhost:3000/transaksi/${id}`, update)

        // update di state
        transaksi.selesai = true
        transaksi.tanggal_dikembalikan = tanggalDikembalikan
        transaksi.denda_total = denda
      } catch (err) {
        console.error('Gagal menandai selesai:', err)
      }
    }
  }
})
