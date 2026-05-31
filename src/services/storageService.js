import { PRODUCTS } from '../assets/products'

// ─── helpers ─────────────────────────────────────────────────
const parse = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}

function initStats() {
  const stats = {}
  PRODUCTS.forEach(p => {
    stats[p.id] = { inFavorites: 0, ordered: 0, purchased: 0 }
  })
  return stats
}

// ─── getters ─────────────────────────────────────────────────
export const getFavorites   = () => parse('favorites',    [])
export const getOrderHistory= () => parse('orderHistory', [])
export const getProductStats= () => parse('productStats', initStats())
export const getProducts    = () => parse('products',     PRODUCTS)

// ─── setters ─────────────────────────────────────────────────
export const saveFavorites    = v => localStorage.setItem('favorites',    JSON.stringify(v))
export const saveOrderHistory = v => localStorage.setItem('orderHistory', JSON.stringify(v))
export const saveProductStats = v => localStorage.setItem('productStats', JSON.stringify(v))
export const saveProducts     = v => localStorage.setItem('products',     JSON.stringify(v))

// ─── business logic ──────────────────────────────────────────
export function toggleFavorite(productId) {
  const favorites = getFavorites()
  const stats = getProductStats()
  const idx = favorites.indexOf(productId)
  if (idx > -1) {
    favorites.splice(idx, 1)
    stats[productId].inFavorites = Math.max(0, (stats[productId].inFavorites || 0) - 1)
  } else {
    favorites.push(productId)
    stats[productId].inFavorites = (stats[productId].inFavorites || 0) + 1
  }
  saveFavorites(favorites)
  saveProductStats(stats)
  return favorites
}

export function placeOrder(productId, customer = {}) {
  const prods = getProducts()
  const stats = getProductStats()

  const product = prods.find(p => p.id === productId)

  if (!product) return null

  const hours = Number(customer.hours || 1)

  const order = {
    id: Date.now(),
    date: new Date().toLocaleString('ru-RU'),
    status: 'Новый',
    customer,
    items: [
      {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: hours,
        sum: product.price * hours,
      }
    ],
    total: product.price * hours,
  }

  stats[product.id].ordered =
    (stats[product.id].ordered || 0) + hours

  const updatedProds = prods.map(p =>
    p.id === product.id
      ? { ...p, stock: Math.max(0, p.stock - hours) }
      : p
  )

  const history = getOrderHistory()

  history.unshift(order)

  saveOrderHistory(history)
  saveProducts(updatedProds)
  saveProductStats(stats)

  return order
}

export function updateOrderStatus(orderId, status) {
  const history = getOrderHistory()
  const stats = getProductStats()
  const order = history.find(o => o.id === orderId)
  if (!order) return history

  const prev = order.status
  order.status = status

  // При подтверждении/доставке — фиксируем как "купленное"
  const finalStatuses = ['Подтверждён', 'Отправлен', 'Доставлен']
  if (finalStatuses.includes(status) && !finalStatuses.includes(prev)) {
    order.items.forEach(item => {
      stats[item.id].purchased = (stats[item.id].purchased || 0) + item.quantity
    })
    saveProductStats(stats)
  }
  saveOrderHistory(history)
  return history
}

export function updateProductStock(productId, newStock) {
  const prods = getProducts()
  const updated = prods.map(p => p.id === productId ? { ...p, stock: newStock } : p)
  saveProducts(updated)
  return updated
}

export function updateProductImage(productId, imageUrl) {
  const prods = getProducts()
  const updated = prods.map(p => p.id === productId ? { ...p, imageUrl } : p)
  saveProducts(updated)
  return updated
}
