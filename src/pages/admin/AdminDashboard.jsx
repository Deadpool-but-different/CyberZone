import useStore from '../../store/useStore'

function AdminDashboard() {
  const products = useStore(s => s.products)
  const orders   = useStore(s => s.orders)
  const stats    = useStore(s => s.stats)

  let totalOrdered = 0, totalPurchased = 0, totalStock = 0, lowStock = 0, outOfStock = 0, totalInFavorites = 0

  orders.forEach(o => {
    const status = o.status || 'Новый'
    o.items.forEach(item => {
      if (status === 'Новый' || status === 'В обработке') totalOrdered += item.quantity
      else if (['Подтверждён', 'Отправлен', 'Доставлен'].includes(status)) totalPurchased += item.quantity
    })
  })

  Object.values(stats).forEach(s => {
    totalInFavorites += s.inFavorites || 0
  })

  products.forEach(p => {
    totalStock += p.stock || 0
    if (p.stock === 0)       outOfStock++
    else if (p.stock < 10)   lowStock++
  })

  const cards = [
    { icon: '𓆩✧𓆪', label: 'Всего мест',      value: products.length },
    { icon: '𓆩♡𓆪', label: 'Избранные',         value: totalInFavorites },
    { icon: '𓆩✩𓆪', label: 'Активные',     value: totalOrdered     },
    { icon: '𓆩✭𓆪', label: 'Выполнено',           value: totalPurchased    },
    { icon: '𓆩☾𓆪', label: 'Остаток',   value: totalStock       },
    { icon: '𓆩X𓆪', label: 'Заняты',       value: outOfStock       },
  ]

  return (
    <div>
      <h2 className="stat-title">ОБЩАЯ СТАТИСТИКА</h2>
      <div className="stats-grid">
        {cards.map(c => (
          <div key={c.label} className="stat-card">
            <span className="stat-icon">{c.icon}</span>
            <span className="stat-value">{c.value}</span>
            <span className="stat-label">{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard
