import { useEffect } from 'react'
import { CATEGORY_NAMES } from '../../assets/products'
import { formatPrice } from '../../utils/formatters'
import useFavorites from '../../hooks/useFavorites'

/**
 * Модальное окно с подробной информацией о товаре.
 * @param {{ product: object, onClose: () => void }} props
 */
function ProductModal({ product, onClose }) {
  const { isFavorite, handleToggle } = useFavorites()

  const fav        = isFavorite(product.id)
  const outOfStock = product.stock === 0
  const lowStock   = product.stock > 0 && product.stock < 10

  // Закрытие по Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    // Запрет прокрутки страницы при открытом модальнике
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-window" onClick={e => e.stopPropagation()}>

        <button className="modal-close" onClick={onClose} aria-label="Закрыть">✕</button>

        <div className="modal-product">
          {/* Изображение / эмодзи */}
          <div className="modal-product-image">
            {product.imageUrl
              ? <img
                src={`${import.meta.env.BASE_URL}${product.imageUrl.replace('/', '')}`}
                alt={product.name}
                className="product-img"
              />
              : <span className="modal-product-emoji">{product.image}</span>
            }
          </div>

          {/* Информация */}
          <div className="modal-product-info">
            <span className="modal-product-category">
              {CATEGORY_NAMES[product.category] || product.category}
            </span>
            <h2 className="modal-product-name">{product.name}</h2>
            <div className="modal-product-price">{formatPrice(product.price)}</div>

            <div className="modal-product-meta">
              <span className={`modal-stock${lowStock ? ' low-stock' : ''}`}>
                {outOfStock ? '❌ Нет в наличии' : `Свободных мест: ${product.stock} шт.`}
              </span>
            </div>

            {product.description && (
              <p className="modal-product-desc">{product.description}</p>
            )}

            <div className="modal-product-actions">
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
        </div>

      </div>
    </div>
  )
}

export default ProductModal
