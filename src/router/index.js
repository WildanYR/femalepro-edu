import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AdminWrapper from '../wrappers/AdminWrapper.vue'
import TipsAdmin from '../views/admin/Tips.vue'
import PenyakitAdmin from '../views/admin/Penyakit.vue'
import PenyakitAdminForm from '../views/admin/FormPenyakit.vue'
import CariKeluhan from '../views/CariKeluhan.vue'
import Penyakit from '../views/Penyakit.vue'
import DetailPenyakit from '../views/DetailPenyakit.vue'

const authGuard = (to, from, next) => {
  const token = localStorage.getItem('token')
  if(!token){
    if(to.path != '/admin/login') next('/admin/login')
    else next()
  } else {
    if(to.path == '/admin/login') next('/admin/tips')
    else next()
  }
}

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/penyakit/cari',
    component: CariKeluhan
  },
  {
    path: '/penyakit',
    component: Penyakit
  },
  {
    path: '/penyakit/detail',
    component: DetailPenyakit
  },
  {
    path: '/admin',
    redirect: '/admin/tips'
  },
  {
    path: '/admin',
    component: AdminWrapper,
    children: [
      {
        path: 'tips',
        component: TipsAdmin
      },
      {
        path: 'penyakit',
        component: PenyakitAdmin
      }
    ]
  },
  {
    path: '/admin/penyakit/form',
    component: PenyakitAdminForm,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
