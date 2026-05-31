import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function AboutPage() {
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    infinite: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <main className="container page-content">
      <div className="about-text-block-top">
        <h2>МОЩНОСТЬ, ЗА КОТОРОЙ БУДУЩЕЕ.</h2>
        <p className="about-text">
          CyberZone — это компьютерный клуб, созданный для настоящих 
          ценителей производительности и комфорта. Мы знаем о железе 
          всё и предоставляем его в ваше полное распоряжение.
        </p>
      </div>
      <h1>НАШИ ПК</h1>
      <Slider {...settings}>
        {/* Слайд 1 - VIP PC */}
        <div className="pc-slide">
          <h3 className="pc-label">VIP PC</h3>
          <div className="pc-specs">
            <div className="pc-spec">
              <h3>ПРОЦЕССОР</h3>
              <p>Ryzen 7 7800<br />x3D</p>
            </div>
            <div className="pc-spec">
              <h3>ОПЕРАТИВНАЯ ПАМЯТЬ</h3>
              <p>32Gb 6200Hz</p>
            </div>
            <div className="pc-spec">
              <h3>ВИДЕОКАРТА</h3>
              <p>RTX 4080<br />Super 16gb</p>
            </div>
            <div className="pc-spec">
              <h3>МОНИТОР</h3>
              <p>FastIPS(27`QHD 300Hz)</p>
            </div>
          </div>
          <div className="pc-extras">
            <div className="pc-extra">
              <img src="/mouse.svg" alt="Мышь" />
              <div className="pc-extra-text">
                <h4>МЫШЬ</h4>
                <p>Logitech G pro<br />superlight</p>
              </div>
            </div>
            <div className="pc-extra">
              <img src="/headphones.svg" alt="Наушники" />
              <div className="pc-extra-text">
                <h4>НАУШНИКИ</h4>
                <p>Hyper X cloud<br />wireless III</p>
              </div>
            </div>
            <div className="pc-extra">
              <img src="/keyboard.svg" alt="Клавиатура" />
              <div className="pc-extra-text">
                <h4>КЛАВИАТУРА</h4>
                <p>Dark Project Zeno<br />Black</p>
              </div>
            </div>
          </div>
        </div>

        {/* Слайд 2 - BOOTCAMP */}
        <div className="pc-slide">
          <h3 className="pc-label">BOOTCAMP</h3>
          <div className="pc-specs">
            <div className="pc-spec">
              <h3>ПРОЦЕССОР</h3>
              <p>Ryzen 5 7600<br />x3D</p>
            </div>
            <div className="pc-spec">
              <h3>ОПЕРАТИВНАЯ ПАМЯТЬ</h3>
              <p>32Gb 6200Hz</p>
            </div>
            <div className="pc-spec">
              <h3>ВИДЕОКАРТА</h3>
              <p>RTX 4070<br />Super 12gb</p>
            </div>
            <div className="pc-spec">
              <h3>МОНИТОР</h3>
              <p>FastIPS(27`QHD 240Hz)</p>
            </div>
          </div>
          <div className="pc-extras">
            <div className="pc-extra">
              <img src="/mouse.svg" alt="Мышь" />
              <div className="pc-extra-text">
                <h4>МЫШЬ</h4>
                <p>Logitech G pro<br />superlight</p>
              </div>
            </div>
            <div className="pc-extra">
              <img src="/headphones.svg" alt="Наушники" />
              <div className="pc-extra-text">
                <h4>НАУШНИКИ</h4>
                <p>Hyper X cloud<br />wireless III</p>
              </div>
            </div>
            <div className="pc-extra">
              <img src="/keyboard.svg" alt="Клавиатура" />
              <div className="pc-extra-text">
                <h4>КЛАВИАТУРА</h4>
                <p>Dark Project<br />KD 78</p>
              </div>
            </div>
          </div>
        </div>

        {/* Слайд 3 - COMFORT */}
        <div className="pc-slide">
          <h3 className="pc-label">COMFORT</h3>
          <div className="pc-specs">
            <div className="pc-spec">
              <h3>ПРОЦЕССОР</h3>
              <p>RYZEN 5 7500f</p>
            </div>
            <div className="pc-spec">
              <h3>ОПЕРАТИВНАЯ ПАМЯТЬ</h3>
              <p>32Gb 6200Hz</p>
            </div>
            <div className="pc-spec">
              <h3>ВИДЕОКАРТА</h3>
              <p>RTX 4060<br />Ti 16gb</p>
            </div>
            <div className="pc-spec">
              <h3>МОНИТОР</h3>
              <p>FastIPS(27`FHD 240Hz)</p>
            </div>
          </div>
          <div className="pc-extras">
            <div className="pc-extra">
              <img src="/mouse.svg" alt="Мышь" />
              <div className="pc-extra-text">
                <h4>МЫШЬ</h4>
                <p>Logitech G pro<br />wireless</p>
              </div>
            </div>
            <div className="pc-extra">
              <img src="/headphones.svg" alt="Наушники" />
              <div className="pc-extra-text">
                <h4>НАУШНИКИ</h4>
                <p>Dark Project HS5<br />wireless</p>
              </div>
            </div>
            <div className="pc-extra">
              <img src="/keyboard.svg" alt="Клавиатура" />
              <div className="pc-extra-text">
                <h4>КЛАВИАТУРА</h4>
                <p>Dark Project<br />Arena</p>
              </div>
            </div>
          </div>
        </div>
      </Slider>
      <div className="about-text-block-bottom">
        <p className="about-text">
          У нас есть всё: от уютного уголка для прохождения сюжетных 
          шедевров до мощных ПК для королевских битв и ММО-рейдов.
        </p>
        <p className="about-text">
          Мы работаем для вас 24/7 по адресу: ул. Примерная, д. 1.
        </p>
        <p className="about-text">
          Подписывайся на наши социальные сети, чтобы не пропустить 
          все самые интересные события в CyberZone.
        </p>
      </div>
      <div className="soc-block">
        <div className="soc-icon">
          <img src="/vk_icon.svg" />
          <a href="vk.com/cyberzone">VK.COM/CYBERZONE</a>
        </div>
        <div className="soc-icon">
          <img src="/tg_icon.svg" />
          <a href="t.me/cyberzone">T.ME/CYBERZONE</a>
        </div>
      </div>
    </main>
  )
}

function CustomPrevArrow(props) {
  const { onClick } = props;
  return (
    <button 
      className="arrow_left" 
      onClick={onClick}
      aria-label="Previous slide"
    />
  );
}

function CustomNextArrow(props) {
  const { onClick } = props;
  return (
    <button 
      className="arrow_right" 
      onClick={onClick}
      aria-label="Next slide"
    />
  );
}

export default AboutPage
