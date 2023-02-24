import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/lista_pokemones',
    name: 'Pokeapi',
    component: () => import('../views/Pokeapi.vue')
  },
  {
    path: '/pokemon_menor',
    name: 'PokemonMenorPeso',
    component: () => import('../views/PokemonMenorPeso.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
