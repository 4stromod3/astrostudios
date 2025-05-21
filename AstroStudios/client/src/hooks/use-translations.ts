import { useTranslation } from "react-i18next";

export function useTranslations() {
  const { t, i18n } = useTranslation();
  
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };
  
  return {
    t,
    i18n,
    currentLanguage: i18n.language,
    changeLanguage,
    languages: [
      { code: "en", name: "English" },
      { code: "es", name: "Español" },
      { code: "pt", name: "Português" },
      { code: "ru", name: "Pусский" },
    ]
  };
}
