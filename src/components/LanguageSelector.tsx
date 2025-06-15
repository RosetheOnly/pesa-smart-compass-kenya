
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  console.log('LanguageSelector render - current language:', language);

  const handleLanguageChange = (lang: 'en' | 'sw') => {
    console.log('Button clicked for language:', lang);
    setLanguage(lang);
  };

  return (
    <div className="flex space-x-2">
      <Button
        variant={language === 'en' ? 'default' : 'outline'}
        size="sm"
        onClick={() => handleLanguageChange('en')}
      >
        EN
      </Button>
      <Button
        variant={language === 'sw' ? 'default' : 'outline'}
        size="sm"
        onClick={() => handleLanguageChange('sw')}
      >
        SW
      </Button>
    </div>
  );
};
