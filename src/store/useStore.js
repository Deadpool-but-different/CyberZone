import { create } from 'zustand'
import {
  getFavorites, getOrderHistory, getProducts, getProductStats,
  saveFavorites,
  toggleFavorite as svcToggleFav,
  placeOrder     as svcPlaceOrder,
  updateOrderStatus as svcUpdateOrderStatus,
  updateProductStock as svcUpdateProductStock,
  updateProductImage as svcUpdateProductImage,
} from '../services/storageService'

/** Zustand-стор — единый источник состояния для всего приложения */
const useStore = create((set, get) => ({
  // ── начальное состояние ───────────────────────────────────
  products:  getProducts(),
  favorites: getFavorites(),
  orders:    getOrderHistory(),
  stats:     getProductStats(),
  user:      JSON.parse(localStorage.getItem('auth_user') || 'null'),

  // ── Авторизация ───────────────────────────────────────────
  login(email, password) {
    const users = JSON.parse(localStorage.getItem('auth_users') || '[]')
    const found = users.find(u => u.email === email && u.password === password)
    if (!found) return '\u041d\u0435\u0432\u0435\u0440\u043d\u044b\u0439 email \u0438\u043b\u0438 \u043f\u0430\u0440\u043e\u043b\u044c'
    localStorage.setItem('auth_user', JSON.stringify(found))
    set({ user: found })
    return null
  },

  logout() {
    localStorage.removeItem('auth_user')
    set({ user: null })
  },

  register(name, email, password) {
    const users = JSON.parse(localStorage.getItem('auth_users') || '[]')
    if (users.find(u => u.email === email))
      return '\u042d\u0442\u043e\u0442 email \u0443\u0436\u0435 \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u043d'
    const newUser = { id: Date.now(), name, email, password }
    users.push(newUser)
    localStorage.setItem('auth_users', JSON.stringify(users))
    localStorage.setItem('auth_user', JSON.stringify(newUser))
    set({ user: newUser })
    return null
  },

  // ── Избранное ─────────────────────────────────────────────
  toggleFavorite(productId) {
    const favorites = svcToggleFav(productId)
    set({ favorites, stats: getProductStats() })
  },

  // ── Заказы ────────────────────────────────────────────────
  placeOrder(productId, fields) {
    const order = svcPlaceOrder(productId, fields)

    if (order) {
      set({
        orders: getOrderHistory(),
        products: getProducts(),
        stats: getProductStats(),
      })
    }

    return order
  },

  updateOrderStatus(orderId, status) {
    const orders = svcUpdateOrderStatus(orderId, status)
    set({ orders, stats: getProductStats() })
  },

  // ── Товары (Админ) ────────────────────────────────────────
  updateProductStock(productId, newStock) {
    const products = svcUpdateProductStock(productId, newStock)
    set({ products })
  },

  updateProductImage(productId, imageUrl) {
    const products = svcUpdateProductImage(productId, imageUrl)
    set({ products })
  },
}))

export default useStore
