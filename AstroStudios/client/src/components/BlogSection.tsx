import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { BlogPost } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogSectionProps {
  limit?: number;
}

export default function BlogSection({ limit = 3 }: BlogSectionProps) {
  const { t } = useTranslation();
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
  });

  const displayPosts = posts ? posts.slice(0, limit) : [];

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
    <section id="blog" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-end mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">{t('blog.title')}</h2>
            <p className="text-lg text-gray-700">{t('blog.subtitle')}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/blog">
              <a className="hidden md:inline-block px-6 py-2 border border-gray-300 hover:border-secondary text-primary hover:text-secondary font-medium rounded-lg transition-colors">
                {t('blog.viewAll')}
              </a>
            </Link>
          </motion.div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: limit }).map((_, index) => (
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {displayPosts.map((post) => (
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
                  <h3 className="text-xl font-heading font-bold mb-2">
                    <Link href={`/blog/${post.slug}`}>
                      <a className="hover:text-secondary transition-colors">{post.title}</a>
                    </Link>
                  </h3>
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

        <div className="text-center mt-8 md:hidden">
          <Link href="/blog">
            <a className="inline-block px-6 py-2 border border-gray-300 hover:border-secondary text-primary hover:text-secondary font-medium rounded-lg transition-colors">
              {t('blog.viewAll')}
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}
