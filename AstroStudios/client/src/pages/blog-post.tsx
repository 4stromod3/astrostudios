import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { BlogPost } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

export default function BlogPostPage() {
  const { t } = useTranslation();
  const { slug } = useParams();
  
  const { data: post, isLoading } = useQuery<BlogPost>({
    queryKey: [`/api/blog/${slug}`],
  });

  return (
    <>
      <Helmet>
        <title>{post ? `${post.title} - Astro Studios` : t('seo.blogPost.title')}</title>
        <meta 
          name="description" 
          content={post ? post.summary : t('seo.blogPost.description')} 
        />
        <meta property="og:title" content={post ? `${post.title} - Astro Studios` : t('seo.blogPost.title')} />
        <meta 
          property="og:description" 
          content={post ? post.summary : t('seo.blogPost.description')} 
        />
        <meta property="og:type" content="article" />
      </Helmet>
      
      <main className="pt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <Link href="/blog">
            <a className="inline-flex items-center text-secondary hover:text-accent mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('blogPost.backToBlog')}
            </a>
          </Link>
          
          {isLoading ? (
            <div className="max-w-3xl mx-auto space-y-8">
              <Skeleton className="h-10 w-3/4 mx-auto" />
              <div className="flex items-center justify-center gap-4 mb-8">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="w-full h-[400px] rounded-xl" />
              <div className="space-y-4 mt-8">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ) : post ? (
            <motion.article 
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
                {post.title}
              </h1>
              
              <div className="flex items-center justify-center text-gray-500 mb-8">
                <time dateTime={post.publishedAt.toString()}>
                  {format(new Date(post.publishedAt), "MMMM d, yyyy")}
                </time>
                <span className="mx-2">•</span>
                <span className="text-secondary">{post.category}</span>
              </div>
              
              <img 
                src={post.thumbnailUrl} 
                alt={post.title}
                className="w-full h-auto rounded-xl shadow-lg mb-8 object-cover aspect-video"
              />
              
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              <div className="mt-12 pt-8 border-t border-gray-200">
                <Link href="/blog">
                  <a className="text-secondary hover:text-accent transition-colors font-medium inline-flex items-center">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t('blogPost.readMorePosts')}
                  </a>
                </Link>
              </div>
            </motion.article>
          ) : (
            <div className="text-center py-16">
              <h1 className="text-3xl font-heading font-bold mb-4">{t('blogPost.notFound.title')}</h1>
              <p className="text-lg text-gray-700 mb-8">{t('blogPost.notFound.message')}</p>
              <Link href="/blog">
                <a className="px-8 py-3 bg-secondary hover:bg-secondary/90 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg">
                  {t('blogPost.notFound.backToBlog')}
                </a>
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
