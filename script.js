document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

const translations = {
  es: {
    home: 'Inicio',
    about: 'El Estudio',
    games: 'Nuestros Juegos',
    blog: 'Noticias',
    reviews: 'Reseñas',
    contact: 'Contacto',
    welcome: 'Bienvenidos a Astro Studios™',
    intro: 'Un pequeño equipo indie creando experiencias inolvidables',
    aboutText: 'Somos dos desarrolladores apasionados creando mundos únicos...',
    // etc.
  },
  en: {
    home: 'Home',
    about: 'The Studio',
    games: 'Our Games',
    blog: 'News',
    reviews: 'Reviews',
    contact: 'Contact',
    welcome: 'Welcome to Astro Studios™',
    intro: 'A small indie team creating unforgettable experiences',
    aboutText: 'We are two passionate developers creating unique worlds...',
    // etc.
  },
  pt: {
    home: 'Início',
    about: 'O Estúdio',
    games: 'Nossos Jogos',
    blog: 'Notícias',
    reviews: 'Avaliações',
    contact: 'Contato',
    welcome: 'Bem-vindo à Astro Studios™',
    intro: 'Uma pequena equipe indie criando experiências únicas',
    aboutText: 'Somos dois desenvolvedores apaixonados criando mundos únicos...',
  },
  ru: {
    home: 'Главная',
    about: 'О студии',
    games: 'Наши игры',
    blog: 'Новости',
    reviews: 'Отзывы',
    contact: 'Контакт',
    welcome: 'Добро пожаловать в Astro Studios™',
    intro: 'Небольшая инди-команда, создающая незабываемые впечатления',
    aboutText: 'Мы — два разработчика, создающих уникальные миры...',
  }
};

document.getElementById('language').addEventListener('change', e => {
  const lang = e.target.value;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
});
