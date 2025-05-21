import { useState } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { LanguageSelector, MobileLanguageSelector } from "@/components/ui/language-selector";
import { cn } from "@/lib/utils";

interface NavbarProps {
  scrolled: boolean;
}

export default function Navbar({ scrolled }: NavbarProps) {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm border-b border-gray-100 transition-all duration-300",
      scrolled && "shadow-sm"
    )}>
      <div className="container mx-auto px-4 md:px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center">
              <span className="text-xl md:text-2xl font-heading font-bold tracking-tight">
                Astro Studios<span className="text-xs align-top">™</span>
              </span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/">
              <a className="text-primary hover:text-secondary transition-colors font-medium">
                {t('nav.home')}
              </a>
            </Link>
            <Link href="/#about">
              <a className="text-primary hover:text-secondary transition-colors font-medium">
                {t('nav.about')}
              </a>
            </Link>
            <Link href="/#games">
              <a className="text-primary hover:text-secondary transition-colors font-medium">
                {t('nav.games')}
              </a>
            </Link>
            <Link href="/blog">
              <a className="text-primary hover:text-secondary transition-colors font-medium">
                {t('nav.blog')}
              </a>
            </Link>
            <Link href="/#reviews">
              <a className="text-primary hover:text-secondary transition-colors font-medium">
                {t('nav.reviews')}
              </a>
            </Link>
            <Link href="/#contact">
              <a className="text-primary hover:text-secondary transition-colors font-medium">
                {t('nav.contact')}
              </a>
            </Link>
            <LanguageSelector />
          </div>

          {/* Mobile Navigation Toggle */}
          <button 
            className="md:hidden text-primary focus:outline-none" 
            onClick={toggleMobileMenu}
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-gray-100`}>
        <div className="container mx-auto px-4 py-3 space-y-4">
          <Link href="/">
            <a 
              className="block text-primary hover:text-secondary transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.home')}
            </a>
          </Link>
          <Link href="/#about">
            <a 
              className="block text-primary hover:text-secondary transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.about')}
            </a>
          </Link>
          <Link href="/#games">
            <a 
              className="block text-primary hover:text-secondary transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.games')}
            </a>
          </Link>
          <Link href="/blog">
            <a 
              className="block text-primary hover:text-secondary transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.blog')}
            </a>
          </Link>
          <Link href="/#reviews">
            <a 
              className="block text-primary hover:text-secondary transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.reviews')}
            </a>
          </Link>
          <Link href="/#contact">
            <a 
              className="block text-primary hover:text-secondary transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.contact')}
            </a>
          </Link>
          <MobileLanguageSelector />
        </div>
      </div>
    </nav>
  );
}
