import * as React from "react";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "pt", name: "Português" },
  { code: "ru", name: "Pусский" },
];

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-1">
          <span>{currentLanguage.code.toUpperCase()}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={language.code === currentLanguage.code ? "bg-muted" : ""}
          >
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function MobileLanguageSelector() {
  const { i18n } = useTranslation();
  
  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };

  return (
    <div className="py-2">
      <span className="font-medium mb-2 block">Language</span>
      <div className="flex space-x-4">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`text-sm ${
              language.code === i18n.language 
                ? "text-secondary font-medium" 
                : "text-gray-500 hover:text-secondary"
            }`}
          >
            {language.code.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
