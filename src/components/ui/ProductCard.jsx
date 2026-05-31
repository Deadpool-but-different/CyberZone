import { useState } from 'react'
import { CATEGORY_NAMES } from '../../assets/products'
import { formatPrice } from '../../utils/formatters'
import useFavorites from '../../hooks/useFavorites'
import BookingModal from './BookingModal'
import ProductModal from './ProductModal'
import useStore from '../../store/useStore'

/**
 * Карточка товара
 * @param {{ product: import('../../types').Product }} props
 */
function ProductCard({ product, showCategory = false }) {
  const { isFavorite, handleToggle } = useFavorites()
  const [showModal, setShowModal]    = useState(false)
  const [showBooking, setShowBooking] = useState(false)

  const fav        = isFavorite(product.id)
  const outOfStock = product.stock === 0
  const lowStock   = product.stock > 0 && product.stock < 10
  const placeOrder = useStore(s => s.placeOrder)

  return (
    <>
    {showModal && <ProductModal product={product} onClose={() => setShowModal(false)} />}
    {showBooking && ( <BookingModal total={product.price} onClose={() => setShowBooking(false)} onConfirm={(fields) => {
      console.log(fields)
      placeOrder(product.id, fields)
      setShowBooking(false)
    }} /> )}
    <div className={`product-card${outOfStock ? ' out-of-stock' : ''}`}>
      <button
        className="product-image-btn"
        onClick={() => setShowModal(true)}
        title="Подробнее"
        aria-label={`Подробнее: ${product.name}`}
      >
        <div className="product-image">
          {product.imageUrl
            ? <img
              src={`${import.meta.env.BASE_URL}${product.imageUrl.replace('/', '')}`}
              alt={product.name}
              className="product-img"
            />
            : <span className="product-emoji">{product.image}</span>
          }
        </div>
        <span className="product-image-hint">Подробнее</span>
      </button>
      <h3 className="product-name">{product.name}</h3>
      {showCategory && (
        <div className="product-category">
          {CATEGORY_NAMES[product.category]}
        </div>
      )}
      <div className="product-price">{formatPrice(product.price)}</div>
      <div className={`product-stock${lowStock ? ' low-stock' : ''}`}>
        {outOfStock ? '❌ Нет в наличии' : `Свободных мест: ${product.stock} шт.`}
      </div>
      <div className="product-actions">
        <button
          className="btn-book"
          onClick={() => setShowBooking(true)}
        >
          Забронировать
        </button>
        <button
          className={`btn btn-icon btn-favorite${fav ? ' active' : ''}`}
          onClick={() => handleToggle(product.id)}
          title={fav ? 'Удалить из избранного' : 'Добавить в избранное'}
        >
          <img
            src={fav ? '/heart_full.svg' : '/heart_outline.svg'}
            alt="Избранное"
            className="favorite-icon"
          />
        </button>
      </div>
    </div>
    </>
  )
}

export default ProductCard
