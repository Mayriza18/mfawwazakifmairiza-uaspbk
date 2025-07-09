import { createRouter, createWebHistory } from "vue-router";
import Transaksi from "@/views/Transaksi.vue";
import Laporan from "@/views/Laporan.vue";
import InfoTransaksi from "@/views/InfoTransaksi.vue";

const routes = [
    {path: '/', name: 'transaksi', component: Transaksi},
    {path: '/laporan', name:'laporan', component: Laporan},
    {path: '/info', name:'info', component: InfoTransaksi}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;