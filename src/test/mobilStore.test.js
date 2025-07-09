// tests/stores/mobilStore.spec.js
import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useMobilStore } from '@/stores/mobilStore'
import axios from 'axios'

// Mock axios
vi.mock('axios')

describe('mobilStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('fetchMobil() harus mengambil data dan mengisi daftarMobil', async () => {
    const mockData = [
      { id: 1, nama: 'Avanza', disewa: false },
      { id: 2, nama: 'Xenia', disewa: true }
    ]

    axios.get.mockResolvedValue({ data: mockData })

    const store = useMobilStore()
    await store.fetchMobil()

    expect(store.daftarMobil).toEqual(mockData)
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('mobilTersedia() harus memfilter mobil yang belum disewa', () => {
    const store = useMobilStore()
    store.daftarMobil = [
      { id: 1, nama: 'Avanza', disewa: false },
      { id: 2, nama: 'Xenia', disewa: true }
    ]

    const tersedia = store.mobilTersedia
    expect(tersedia).toHaveLength(1)
    expect(tersedia[0].nama).toBe('Avanza')
  })

  it('mobilDisewa() harus memfilter mobil yang sedang disewa', () => {
    const store = useMobilStore()
    store.daftarMobil = [
      { id: 1, nama: 'Avanza', disewa: false },
      { id: 2, nama: 'Xenia', disewa: true }
    ]

    const disewa = store.mobilDisewa
    expect(disewa).toHaveLength(1)
    expect(disewa[0].nama).toBe('Xenia')
  })

  it('getMobilById() harus mengembalikan mobil sesuai ID', () => {
    const store = useMobilStore()
    store.daftarMobil = [
      { id: 1, nama: 'Avanza', disewa: false },
      { id: 2, nama: 'Xenia', disewa: true }
    ]

    const mobil = store.getMobilById(2)
    expect(mobil.nama).toBe('Xenia')
  })

  it('updateStatusMobil() harus memperbarui status mobil', async () => {
    const store = useMobilStore()
    store.daftarMobil = [
      { id: 1, nama: 'Avanza', disewa: false }
    ]

    axios.patch.mockResolvedValue({}) // mock patch

    await store.updateStatusMobil(1, true)

    expect(axios.patch).toHaveBeenCalledWith('http://localhost:3000/mobil/1', { disewa: true })
    expect(store.daftarMobil[0].disewa).toBe(true)
  })
})
