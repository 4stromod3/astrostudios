import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Game } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function GamesSection() {
  const { t } = useTranslation();
  const { data: games, isLoading } = useQuery<Game[]>({
    queryKey: ['/api/games'],
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="games" className="py-16 md:py-24 bg-neutral">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">{t('games.title')}</h2>
          <p className="text-lg text-gray-700">{t('games.subtitle')}</p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg">
                <Skeleton className="w-full h-48" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Skeleton className="h-6 w-16 rounded-full" />
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </div>
                    <Skeleton className="h-6 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {games?.map((game) => (
              <motion.div 
                key={game.id}
                className="group bg-white rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-xl"
                variants={itemVariants}
              >
                <div className="overflow-hidden">
                  <img 
                    src={game.thumbnailUrl} 
                    alt={`${game.title} game screenshot`} 
                    className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold mb-2">{game.title}</h3>
                  <p className="text-gray-700 mb-4">{game.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {game.genres.map((genre, idx) => {
                        const colors = [
                          "bg-blue-100 text-blue-800",
                          "bg-purple-100 text-purple-800",
                          "bg-green-100 text-green-800",
                          "bg-yellow-100 text-yellow-800",
                          "bg-red-100 text-red-800",
                          "bg-indigo-100 text-indigo-800",
                          "bg-pink-100 text-pink-800",
                          "bg-orange-100 text-orange-800",
                          "bg-gray-100 text-gray-800",
                        ];
                        const colorClass = colors[idx % colors.length];
                        
                        return (
                          <span 
                            key={idx} 
                            className={`px-3 py-1 ${colorClass} text-xs rounded-full`}
                          >
                            {genre}
                          </span>
                        );
                      })}
                    </div>
                    <Link href={`/games/${game.slug}`}>
                      <a className="text-secondary hover:text-accent transition-colors font-medium flex items-center">
                        {t('games.learnMore')} <i className="fas fa-arrow-right ml-1"></i>
                      </a>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
