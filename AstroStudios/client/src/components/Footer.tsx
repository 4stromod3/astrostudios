import { Link } from "wouter";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t, i18n } = useTranslation();
  
  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };

  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">
              Astro Studios<span className="text-xs align-top">™</span>
            </h3>
            <p className="text-gray-400 mb-4">{t('footer.tagline')}</p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://bsky.app" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <i className="fas fa-cloud"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-heading font-medium mb-4">{t('footer.navigation')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-gray-400 hover:text-white transition-colors">{t('nav.home')}</a>
                </Link>
              </li>
              <li>
                <Link href="/#about">
                  <a className="text-gray-400 hover:text-white transition-colors">{t('nav.about')}</a>
                </Link>
              </li>
              <li>
                <Link href="/#games">
                  <a className="text-gray-400 hover:text-white transition-colors">{t('nav.games')}</a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className="text-gray-400 hover:text-white transition-colors">{t('nav.blog')}</a>
                </Link>
              </li>
              <li>
                <Link href="/#reviews">
                  <a className="text-gray-400 hover:text-white transition-colors">{t('nav.reviews')}</a>
                </Link>
              </li>
              <li>
                <Link href="/#contact">
                  <a className="text-gray-400 hover:text-white transition-colors">{t('nav.contact')}</a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-heading font-medium mb-4">{t('footer.games')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/games/once-2">
                  <a className="text-gray-400 hover:text-white transition-colors">Once 2</a>
                </Link>
              </li>
              <li>
                <Link href="/games/una-noite-com-eduado">
                  <a className="text-gray-400 hover:text-white transition-colors">Una Noite com Eduado</a>
                </Link>
              </li>
              <li>
                <Link href="/games/tap-tap">
                  <a className="text-gray-400 hover:text-white transition-colors">Tap Tap</a>
                </Link>
              </li>
              <li>
                <Link href="/games/snappix">
                  <a className="text-gray-400 hover:text-white transition-colors">Snappix</a>
                </Link>
              </li>
              <li>
                <Link href="/games/the-button-game">
                  <a className="text-gray-400 hover:text-white transition-colors">The Button Game</a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-heading font-medium mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.terms')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.cookies')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.gdpr')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Astro Studios™. {t('footer.rights')}
          </p>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => changeLanguage('en')} 
              className={`text-xs ${i18n.language === 'en' ? 'text-gray-300' : 'text-gray-500 hover:text-gray-400'} transition-colors`}
            >
              English
            </button>
            <button 
              onClick={() => changeLanguage('es')} 
              className={`text-xs ${i18n.language === 'es' ? 'text-gray-300' : 'text-gray-500 hover:text-gray-400'} transition-colors`}
            >
              Español
            </button>
            <button 
              onClick={() => changeLanguage('pt')} 
              className={`text-xs ${i18n.language === 'pt' ? 'text-gray-300' : 'text-gray-500 hover:text-gray-400'} transition-colors`}
            >
              Português
            </button>
            <button 
              onClick={() => changeLanguage('ru')} 
              className={`text-xs ${i18n.language === 'ru' ? 'text-gray-300' : 'text-gray-500 hover:text-gray-400'} transition-colors`}
            >
              Pусский
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
