import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { BlogPost } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogPage() {
  const { t } = useTranslation();
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
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
    <>
      <Helmet>
        <title>{t('seo.blog.title')}</title>
        <meta name="description" content={t('seo.blog.description')} />
        <meta property="og:title" content={t('seo.blog.title')} />
        <meta property="og:description" content={t('seo.blog.description')} />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <main className="pt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">{t('blog.pageTitle')}</h1>
            <p className="text-lg text-gray-700">{t('blog.pageSubtitle')}</p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-neutral rounded-xl overflow-hidden shadow-md">
                  <Skeleton className="w-full h-48" />
                  <div className="p-6 space-y-4">
                    <div className="flex items-center mb-3">
                      <Skeleton className="h-4 w-20" />
                      <span className="mx-2 text-gray-300">•</span>
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {posts?.map((post) => (
                <motion.article 
                  key={post.id}
                  className="bg-neutral rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
                  variants={itemVariants}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <a className="block">
                      <img 
                        src={post.thumbnailUrl} 
                        alt={post.title} 
                        className="w-full h-48 object-cover"
                      />
                    </a>
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="text-xs text-gray-500">
                        {format(new Date(post.publishedAt), "MMMM d, yyyy")}
                      </span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-xs text-secondary">{post.category}</span>
                    </div>
                    <h2 className="text-xl font-heading font-bold mb-2">
                      <Link href={`/blog/${post.slug}`}>
                        <a className="hover:text-secondary transition-colors">{post.title}</a>
                      </Link>
                    </h2>
                    <p className="text-gray-700 mb-4">{post.summary}</p>
                    <Link href={`/blog/${post.slug}`}>
                      <a className="text-secondary hover:text-accent transition-colors font-medium inline-flex items-center">
                        {t('blog.readMore')} <i className="fas fa-arrow-right ml-1 text-xs"></i>
                      </a>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
          
          {posts?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-700">{t('blog.noPosts')}</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
