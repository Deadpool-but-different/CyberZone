import { useState } from 'react'
import useStore from '../store/useStore'
import { formatPrice, orderStatusColor } from '../utils/formatters'
import { CATEGORY_NAMES } from '../assets/products'

function ProfilePage() {
  const orders   = useStore(s => s.orders)
  const products = useStore(s => s.products)
  const favorites= useStore(s => s.favorites)

  const [openOrder, setOpenOrder] = useState(null)

  const favProducts  = products.filter(p => favorites.includes(p.id))
  const totalSpent   = orders.reduce((s, o) => s + (o.total || 0), 0)

  return (
    <main className="container page-content">

      {/* Hero banner */}
      <div className="profile-hero">
        <div className="profile-avatar"><img src="/avatar.svg" /></div>
        <div className="profile-hero-info">
          <h1 className="profile-name">ЛИЧНЫЙ КАБИНЕТ</h1>
          <p className="profile-meta">Добро пожаловать в CyberZone</p>
        </div>
        <div className="profile-hero-badge">
          <span className="profile-role-badge">Игрок</span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="profile-stats">
        <div className="pstat-card pstat-purple">
          <span className="pstat-icon">𓆩⚝𓆪</span>
          <span className="pstat-value">{orders.length}</span>
          <span className="pstat-label">Действеющие аренды</span>
        </div>
        <div className="pstat-card pstat-pink">
          <span className="pstat-icon">𓆩♡𓆪</span>
          <span className="pstat-value">{favProducts.length}</span>
          <span className="pstat-label">Избранные зоны</span>
        </div>
        <div className="pstat-card pstat-blue">
          <span className="pstat-icon">𓆩<span className="dollar"> $ </span>𓆪</span>
          <span className="pstat-value">{orders.length ? formatPrice(totalSpent) : '\u2014'}</span>
          <span className="pstat-label">Потрачено</span>
        </div>
      </div>

      {/* Orders */}
      <section className="profile-section">
        <div className="section-header">
          <p className="section-title">История аренд</p>
          <span className="section-count">{orders.length}</span>
        </div>

        {orders.length === 0 ? (
          <div className="profile-empty">
            <p>Вы еще не арендовывали игровую зону. Самое время это сделать!</p>
          </div>
        ) : (
          <div className="order-cards">
            {orders.map(o => (
              <div key={o.id} className={`order-card${openOrder === o.id ? ' order-card--open' : ''}`}>
                <button
                  className="order-card-header"
                  onClick={() => setOpenOrder(openOrder === o.id ? null : o.id)}
                >
                  <div className="order-card-id">#{String(o.id).slice(-6)}</div>
                  <div className="order-card-date">{o.date}</div>
                  <span
                    className="status-badge"
                    style={{ background: orderStatusColor(o.status) }}
                  >{o.status}</span>
                  <div className="order-card-total">{formatPrice(o.total)}</div>
                </button>

                {openOrder === o.id && (
                  <div className="order-card-body">
                    <table className="order-items-table">
                      <thead>
                        <tr><th>зона</th><th>цена</th><th>кол-во часов</th><th>сумма</th></tr>
                      </thead>
                      <tbody>
                        {o.items.map(item => (
                          <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{formatPrice(item.price)}</td>
                            <td>{item.quantity}</td>
                            <td className="order-item-sum">{formatPrice(item.sum)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan={3} className="order-foot-label">итого</td>
                          <td className="order-foot-total">{formatPrice(o.total)}</td>
                        </tr>
                      </tfoot>
                    </table>
                    {o.customer?.name && (
                      <div className="order-customer">
                        <span><img src="/avatar.svg" /> {o.customer.name}</span>
                        <span>{o.customer.phone}</span>
                        <span>{o.customer.address}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Favourites */}
      <section className="profile-section">
        <div className="section-header">
          <p className="section-title">Избранные зоны</p>
          <span className="section-count">{favProducts.length}</span>
        </div>
        {favProducts.length === 0 ? (
          <div className="profile-empty">
            <p>Добавьте товары в избранное и они появятся здесь.</p>
          </div>
        ) : (
          <div className="fav-grid">
            {favProducts.map(p => (
              <div key={p.id} className="fav-card">
                <div className="fav-card-img"><img src={p.imageUrl} /></div>
                <div className="fav-card-info">
                  <div className="fav-card-name">{p.name}</div>
                  <div className="fav-card-category">
                    {CATEGORY_NAMES[p.category]}
                  </div>
                  <div className="fav-card-price">{formatPrice(p.price)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default ProfilePage