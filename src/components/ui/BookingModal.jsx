import { useState, useEffect } from 'react'
import { formatPrice } from '../../utils/formatters'

/**
 * Модальное окно оформления заказа.
 * @param {{ total: number, onConfirm: (fields: object) => void, onClose: () => void }} props
 */
function BookingModal({ total, onConfirm, onClose }) {
  const [fields, setFields] = useState({
    name:    'Иван Петров',
    phone:   '+7 (999) 123-45-67',
    hours: 1,
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const change = (e) => {
    setFields(f => ({ ...f, [e.target.name]: e.target.value }))
    setErrors(er => ({ ...er, [e.target.name]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!fields.name.trim())    e.name    = 'Введите имя'
    if (!fields.phone.trim())   e.phone   = 'Введите телефон'
    if (!fields.hours || fields.hours < 1)
      e.hours = 'Укажите количество часов'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }
    onConfirm(fields)
  }

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-window modal-checkout" onClick={e => e.stopPropagation()}>

        <button className="modal-close" onClick={onClose} aria-label="Закрыть">✕</button>
        <h2 className="modal-title">Бронирование</h2>

        <div className="checkout-total-preview">
          Сумма заказа: <strong>{formatPrice(total)}</strong>
        </div>

        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label">Имя получателя *</label>
            <input
              className={`input-field${errors.name ? ' input-error' : ''}`}
              name="name" placeholder="Иван Петров"
              value={fields.name} onChange={change}
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Телефон *</label>
            <input
              className={`input-field${errors.phone ? ' input-error' : ''}`}
              name="phone" placeholder="+7 (999) 123-45-67"
              value={fields.phone} onChange={change}
            />
            {errors.phone && <span className="form-error">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Количество часов *</label>
            <input
              type="number"
              min="1"
              name="hours"
              value={fields.hours}
              onChange={change}
              className={`input-field${errors.hours ? ' input-error' : ''}`}
            />
            {errors.address && <span className="form-error">{errors.hours}</span>}
          </div>

          <div className="checkout-form-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>Отмена</button>
            <button type="submit" className="btn btn-primary btn-lg">Забронировать</button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default BookingModal
