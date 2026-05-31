import { CATEGORY_NAMES } from '../../assets/products'

const ALL_CATS = [
  { key: 'pushkinskaya_12',    label: CATEGORY_NAMES.pushkinskaya_12 },
  { key: 'lomonosovo_47',      label: CATEGORY_NAMES.lomonosovo_47   },
  { key: 'gagarina_40',        label: CATEGORY_NAMES.gagarina_40     },
  { key: 'arbatskaya_3',       label: CATEGORY_NAMES.arbatskaya_3    },
]

/**
 * Боковая панель фильтрации каталога
 * @param {{ active: string, onSelect: (cat: string) => void }} props
 */
function Sidebar({ active, onSelect }) {
  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">Адрес клуба</h3>
      <ul className="category-list">
        {ALL_CATS.map(({ key, label }) => (
          <li key={key}>
            <button
              className={`category-btn${active === key ? ' active' : ''}`}
              onClick={() => onSelect(key)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
