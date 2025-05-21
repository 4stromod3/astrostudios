import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Game, Review } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function GameDetailPage() {
  const { t } = useTranslation();
  const { slug } = useParams();
  
  const { data: game, isLoading: isLoadingGame } = useQuery<Game>({
    queryKey: [`/api/games/${slug}`],
  });
  
  const { data: gameReviews, isLoading: isLoadingReviews } = useQuery<Review[]>({
    queryKey: ['/api/reviews/game/', game?.id],
    enabled: !!game?.id,
  });

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1 mb-4 text-yellow-400">
        {Array.from({ length: 5 }).map((_, i) => {
          if (i < Math.floor(rating)) {
            return <i key={i} className="fas fa-star"></i>;
          } else if (i === Math.floor(rating) && rating % 1 !== 0) {
            return <i key={i} className="fas fa-star-half-alt"></i>;
          } else {
            return <i key={i} className="far fa-star"></i>;
          }
        })}
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>{game ? `${game.title} - Astro Studios` : t('seo.game.title')}</title>
        <meta 
          name="description" 
          content={game ? game.description : t('seo.game.description')} 
        />
        <meta property="og:title" content={game ? `${game.title} - Astro Studios` : t('seo.game.title')} />
        <meta 
          property="og:description" 
          content={game ? game.description : t('seo.game.description')} 
        />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <main className="pt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <Link href="/#games">
            <a className="inline-flex items-center text-secondary hover:text-accent mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('game.backToGames')}
            </a>
          </Link>
          
          {isLoadingGame ? (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-8">
                <Skeleton className="w-full md:w-1/2 h-[400px] rounded-xl" />
                <div className="w-full md:w-1/2 space-y-4">
                  <Skeleton className="h-10 w-3/4" />
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Skeleton className="h-8 w-20 rounded-full" />
                    <Skeleton className="h-8 w-20 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          ) : game ? (
            <motion.div 
              className="space-y-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2">
                  <img 
                    src={game.thumbnailUrl} 
                    alt={game.title}
                    className="w-full h-auto rounded-xl shadow-lg object-cover aspect-video"
                  />
                </div>
                <div className="w-full md:w-1/2 space-y-4">
                  <h1 className="text-3xl md:text-4xl font-heading font-bold">{game.title}</h1>
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
                      ];
                      const colorClass = colors[idx % colors.length];
                      
                      return (
                        <span 
                          key={idx} 
                          className={`px-3 py-1 ${colorClass} text-sm rounded-full`}
                        >
                          {genre}
                        </span>
                      );
                    })}
                  </div>
                  <p className="text-lg text-gray-700">{game.description}</p>
                  
                  <div className="pt-4">
                    <Button className="bg-secondary hover:bg-secondary/90 text-white">
                      {t('game.playNow')}
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-heading font-bold">{t('game.reviews')}</h2>
                
                {isLoadingReviews ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Array.from({ length: 2 }).map((_, index) => (
                      <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                        <Skeleton className="h-4 w-24 mb-4" />
                        <Skeleton className="h-16 w-full mb-6" />
                        <div className="flex items-center">
                          <Skeleton className="w-10 h-10 rounded-full" />
                          <div className="ml-3">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-3 w-32 mt-1" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : gameReviews && gameReviews.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {gameReviews.map((review) => (
                      <div key={review.id} className="bg-white p-6 rounded-xl shadow-md">
                        {renderStars(review.rating)}
                        <p className="text-gray-700 mb-6 italic">{review.content}</p>
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-gray-500 font-medium">
                              {review.reviewerName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-3">
                            <p className="font-medium">{review.reviewerName}</p>
                            <p className="text-sm text-gray-500">{review.reviewerTitle}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-700">{t('game.noReviews')}</p>
                )}
              </div>
              
              <div className="text-center pt-8">
                <Link href="/#games">
                  <a className="px-8 py-3 bg-white border border-gray-300 hover:border-secondary text-primary hover:text-secondary font-medium rounded-lg transition-colors shadow-sm hover:shadow-md inline-block">
                    {t('game.exploreOtherGames')}
                  </a>
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <h1 className="text-3xl font-heading font-bold mb-4">{t('game.notFound.title')}</h1>
              <p className="text-lg text-gray-700 mb-8">{t('game.notFound.message')}</p>
              <Link href="/#games">
                <a className="px-8 py-3 bg-secondary hover:bg-secondary/90 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg">
                  {t('game.notFound.backToGames')}
                </a>
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
