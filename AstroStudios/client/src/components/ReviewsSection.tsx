import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Review } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function ReviewsSection() {
  const { t } = useTranslation();
  const { data: reviews, isLoading } = useQuery<Review[]>({
    queryKey: ['/api/reviews'],
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
    <section id="reviews" className="py-16 md:py-24 bg-neutral">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">{t('reviews.title')}</h2>
          <p className="text-lg text-gray-700">{t('reviews.subtitle')}</p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
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
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {reviews?.map((review) => (
              <motion.div 
                key={review.id}
                className={review.isIndustry 
                  ? "bg-gradient p-6 rounded-xl shadow-md text-white" 
                  : "bg-white p-6 rounded-xl shadow-md"
                }
                variants={itemVariants}
              >
                {review.isIndustry ? (
                  <>
                    <div className="flex items-center space-x-2 mb-4">
                      <i className="fas fa-quote-left text-2xl opacity-50"></i>
                    </div>
                    <p className="mb-6 text-lg">{review.content}</p>
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="font-medium">{review.reviewerName}</p>
                        <p className="text-sm opacity-75">{review.reviewerTitle}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
