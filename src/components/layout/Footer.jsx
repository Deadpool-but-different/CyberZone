import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer_text">
          <img src="/logo_footer.svg" />
          <p><span>Компьютерный клуб<br />в Москве</span></p>
        </div>
        <nav className="footer-nav">
          <Link to="/admin">Админ панель</Link>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
