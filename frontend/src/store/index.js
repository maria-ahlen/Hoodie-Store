import Vue from 'vue'
import Vuex from 'vuex'
import ax from 'axios'
import router from './../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiUrl: 'http://localhost:8000',
    products: Array,
    cart: [],
    confirmed: Object,
    ui: {
      showCart: false
    }
  },
  mutations: {
    toggleCart() {

    },
    updateProducts(state, products) {
      state.products = products
    },
    addToCart(state, product) {
      state.cart.push(product)
    },
    orderConfirmed(state, confirm) {
      state.confirmed = confirm.data
    },
    emptyCart(state) {
      state.cart = []
      router.push('/confirmation')
    }
  },
  actions: {
    async fetchProducts(ctx) {
      try {
        let resp = await fetch(`${ctx.state.apiUrl}/products`)
        let data = await resp.json()
        ctx.commit('updateProducts', data)
      } catch (err) {
        console.log(err)
      }
    },
    async sendOrder(ctx) {
      let data = await ax.post(`${ctx.state.apiUrl}/orders`, {
        items: ctx.state.cart
      })
      
      ctx.commit('orderConfirmed', data)
      ctx.commit('emptyCart')
    }
  },
  getters: {
    products: state => {
      return state.products
    }
  }
})
