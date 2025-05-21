import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import GamesSection from "@/components/GamesSection";
import BlogSection from "@/components/BlogSection";
import ReviewsSection from "@/components/ReviewsSection";
import ContactSection from "@/components/ContactSection";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('seo.home.title')}</title>
        <meta name="description" content={t('seo.home.description')} />
        <meta property="og:title" content={t('seo.home.title')} />
        <meta property="og:description" content={t('seo.home.description')} />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <main>
        <HeroSection />
        <AboutSection />
        <GamesSection />
        <BlogSection />
        <ReviewsSection />
        <ContactSection />
      </main>
    </>
  );
}
