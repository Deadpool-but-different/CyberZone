function ContactsPage() {
  return (
    <main className="container page-content">
      <div className="contacts-grid">
        <div className="our-address">
          <h2>НАШ АДРЕС</h2>
          <p>г. Москва, ул. Примерная, д. 1</p>
          <p>Работаем <span>Ежедневно</span> и <span>Круглосуточно</span></p>
        </div>
        <div className="soc-links">
          <h2>СВЯЗАТЬСЯ С НАМИ</h2>
          <div className="soc-links-tg"><img src="/tg_icon.svg" /><a href="t.me/cyberzone">@CYBERZONE_OFFERBOT</a></div>
          <div className="soc-links-tel"><img src="/tel_icon.svg" /><a href="+7 (123) 456-78-90">+7 (123) 456-78-90</a></div>
          <div className="soc-links-mail"><img src="/mail_icon.svg" /><a href="info@cyberzone.ru">INFO@CYBERZONE.RU</a></div>
        </div>
      </div>
      <h2 style={{ marginTop: '5.5rem' }}>НАПИСАТЬ НАМ</h2>
      <form className="contact-form" onSubmit={e => { e.preventDefault(); alert('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.') }}>
        <input className="input-field" type="text"  placeholder="Ваше имя"           required />
        <input className="input-field" type="email" placeholder="Email"               required />
        <textarea className="input-field" rows={4}  placeholder="Ваше сообщение…"    required />
        <button type="submit" className="btn btn-primary">Отправить</button>
      </form>
    </main>
  )
}

export default ContactsPage
