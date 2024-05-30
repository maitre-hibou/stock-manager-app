import Vue from 'vue'
import VueRouter from 'vue-router'
import ProductsView from "@/views/ProductsView"
import StocksView from "@/views/StocksView"
import UpdateProductView from "@/views/UpdateProductView"
import CreateProductView from "@/views/CreateProductView"
import LoginView from "@/views/LoginView"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home-products',
    redirect: '/products'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/product/new',
    name: 'Product Creation',
    component: CreateProductView
  },
  {
    path: '/product/:id',
    name: 'Product Update',
    component: UpdateProductView
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsView
  },
  {
    path: '/stocks',
    name: 'stocks',
    component: StocksView
  },
]

const router = new VueRouter({
  routes
})

/* eslint-disable */
router.beforeEach((to, from, next) => {
  let loggedIn = JSON.parse(localStorage.getItem('stock_manager_security'))

  if (to.name !== 'Login' && !loggedIn) {
    next({ name: 'Login' })
  }

  next()
})

export default router
