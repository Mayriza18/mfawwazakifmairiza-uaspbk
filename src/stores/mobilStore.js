import { defineStore } from 'pinia'
import axios from 'axios'

export const useMobilStore = defineStore('mobil', {
  state: () => ({
    daftarMobil: [],
    loading: false,
    error: null
  }),

  getters: {
    mobilTersedia(state) {
      return state.daftarMobil.filter(mobil => mobil.disewa === false)
    },
    mobilDisewa(state) {
      return state.daftarMobil.filter(mobil => mobil.disewa === true)
    },
    getMobilById: (state) => (id) => {
      return state.daftarMobil.find(mobil => mobil.id === id)
    }
  },

  actions: {
    async fetchMobil() {
      this.loading = true
      this.error = null
      try {
        const res = await axios.get('http://localhost:3000/mobil')
        this.daftarMobil = res.data
      } catch (err) {
        this.error = 'Gagal memuat data mobil.'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    async updateStatusMobil(id, disewa) {
      try {
        await axios.patch(`http://localhost:3000/mobil/${id}`, { disewa })
        const mobil = this.daftarMobil.find(m => m.id === id)
        if (mobil) mobil.disewa = disewa
      } catch (err) {
        console.error('Gagal mengubah status mobil:', err)
      }
    }
  }
})
