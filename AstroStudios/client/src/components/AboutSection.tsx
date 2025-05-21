import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function AboutSection() {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-heading font-bold mb-4"
            variants={itemVariants}
          >
            {t('about.title')}
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-700"
            variants={itemVariants}
          >
            {t('about.subtitle')}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg text-gray-700">
              {t('about.paragraph1')}
            </p>
            <p className="text-lg text-gray-700">
              {t('about.paragraph2')}
            </p>
            <p className="text-lg text-gray-700">
              {t('about.paragraph3')}
            </p>
          </motion.div>
          <motion.div 
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1581472723648-909f4851d4ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=500" 
              alt="Minimalist game development workspace" 
              className="w-full h-auto rounded-lg shadow-md object-cover aspect-[4/5]"
            />
            <img 
              src="https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=500" 
              alt="Game design elements on screen" 
              className="w-full h-auto rounded-lg shadow-md object-cover aspect-[4/5] mt-8"
            />
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div 
            className="bg-neutral p-6 rounded-xl text-center"
            variants={itemVariants}
          >
            <p className="text-4xl font-heading font-bold text-secondary mb-2">5</p>
            <p className="text-gray-700">{t('about.stats.games')}</p>
          </motion.div>
          <motion.div 
            className="bg-neutral p-6 rounded-xl text-center"
            variants={itemVariants}
          >
            <p className="text-4xl font-heading font-bold text-secondary mb-2">2</p>
            <p className="text-gray-700">{t('about.stats.team')}</p>
          </motion.div>
          <motion.div 
            className="bg-neutral p-6 rounded-xl text-center"
            variants={itemVariants}
          >
            <p className="text-4xl font-heading font-bold text-secondary mb-2">4</p>
            <p className="text-gray-700">{t('about.stats.languages')}</p>
          </motion.div>
          <motion.div 
            className="bg-neutral p-6 rounded-xl text-center"
            variants={itemVariants}
          >
            <p className="text-4xl font-heading font-bold text-secondary mb-2">∞</p>
            <p className="text-gray-700">{t('about.stats.creativity')}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
