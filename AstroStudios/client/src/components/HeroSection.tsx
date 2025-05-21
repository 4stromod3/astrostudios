import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section id="home" className="relative pt-24 pb-12 md:pt-32 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-6 md:space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
              {t('hero.title.we')} <span className="text-gradient">{t('hero.title.unique')}</span> {t('hero.title.gaming')} <span className="text-gradient">{t('hero.title.experiences')}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-lg">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#games">
                <a className="px-8 py-3 bg-secondary hover:bg-secondary/90 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg">
                  {t('hero.cta.games')}
                </a>
              </Link>
              <Link href="#contact">
                <a className="px-8 py-3 bg-white border border-gray-300 hover:border-secondary text-primary hover:text-secondary font-medium rounded-lg transition-colors shadow-sm hover:shadow-md">
                  {t('hero.cta.contact')}
                </a>
              </Link>
            </div>
          </motion.div>
          <motion.div 
            className="relative h-[300px] md:h-[450px] lg:h-[500px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.img 
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800" 
              alt="Abstract gaming visualization with geometric elements" 
              className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ 
                repeat: Infinity, 
                duration: 6,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <p className="text-sm font-mono text-gray-600">{t('hero.latest')}: <span className="font-medium text-secondary">Once 2</span></p>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
}
