
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex space-x-2">
      <Button
        variant={language === 'en' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setLanguage('en')}
      >
        EN
      </Button>
      <Button
        variant={language === 'sw' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setLanguage('sw')}
      >
        SW
      </Button>
    </div>
  );
};
