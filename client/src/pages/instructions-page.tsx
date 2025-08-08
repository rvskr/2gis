import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import { useLocation } from "wouter";

// LanguageSwitcher component is now defined in the same file for a self-contained example
interface LanguageSwitcherProps {
  onLanguageChange: (language: 'ru' | 'ua') => void;
  currentLanguage: 'ru' | 'ua';
}

function LanguageSwitcher({ onLanguageChange, currentLanguage }: LanguageSwitcherProps) {
  return (
    <div className="bg-dark-accent rounded-lg p-1 flex">
      <Button
        variant={currentLanguage === 'ru' ? 'default' : 'ghost'}
        size="sm"
        className={`px-3 py-1 text-sm font-medium transition-all duration-200 ${
          currentLanguage === 'ru' 
            ? 'bg-blue-600 text-white hover:bg-blue-700' 
            : 'text-slate-400 hover:text-slate-200 bg-transparent hover:bg-transparent'
        }`}
        onClick={() => onLanguageChange('ru')}
        data-testid="button-lang-ru"
      >
        РУ
      </Button>
      <Button
        variant={currentLanguage === 'ua' ? 'default' : 'ghost'}
        size="sm"
        className={`px-3 py-1 text-sm font-medium transition-all duration-200 ${
          currentLanguage === 'ua' 
            ? 'bg-blue-600 text-white hover:bg-blue-700' 
            : 'text-slate-400 hover:text-slate-200 bg-transparent hover:bg-transparent'
        }`}
        onClick={() => onLanguageChange('ua')}
        data-testid="button-lang-ua"
      >
        УА
      </Button>
    </div>
  );
}

const translations = {
  ru: {
    headerTitle: "Установка 2GIS", // Added this key for the main header title
    pageTitle: "Предварительные инструкции для онлайн установки", // Renamed for clarity
    step1: {
      title: "Скачайте необходимые приложения",
      description: "Перед началом установки вам потребуется скачать 2 программы из Google Play Market:",
      apps: ["TeamViewer QuickSupport", "TeamViewer Universal Add-On"],
      downloadText: "Скачать"
    },
    step2: {
      title: "Активируйте Universal Add-On",
      description: "Для удаленного управления необходимо включить Universal Add-On в настройках телефона:",
      instructions: [
        "Перейдите в 'Настройки' вашего телефона.",
        "В строке поиска введите 'Спец' и выберите 'Специальные возможности'.",
        "Найдите раздел 'Скачанные приложения' или 'Установленные сервисы'.",
        "Выберите 'Universal Add-On' и включите его."
      ],
      settings: ["Разрешения для установки приложений"]
    },
    step3: {
      title: "Свяжитесь с нами",
      description: "После выполнения предварительных шагов напишите нам в Telegram для начала процесса установки."
    },
    startButton: "Начать установку",
    closeButton: "Закрыть"
  },
  ua: {
    headerTitle: "Встановлення 2GIS", // Added this key for the main header title
    pageTitle: "Попередні інструкції для онлайн встановлення", // Renamed for clarity
    step1: {
      title: "Завантажте необхідні додатки",
      description: "Перед початком встановлення вам знадобиться завантажити 2 програми з Google Play Market:",
      apps: ["TeamViewer QuickSupport", "TeamViewer Universal Add-On"],
      downloadText: "Завантажити"
    },
    step2: {
      title: "Активуйте Universal Add-On",
      description: "Для віддаленого керування необхідно увімкнути Universal Add-On в налаштуваннях телефону:",
      instructions: [
        "Перейдіть в 'Налаштування' вашого телефону.",
        "У рядку пошуку введіть 'Спец' та оберіть 'Спеціальні можливості'.",
        "Знайдіть розділ 'Завантажені додатки' або 'Встановлені сервіси'.",
        "Оберіть 'Universal Add-On' та увімкніть його."
      ],
      settings: ["Дозволи для встановлення додатків"]
    },
    step3: {
      title: "Зв'яжіться з нами",
      description: "Після виконання попередніх кроків напишіть нам в Telegram для початку процесу встановлення."
    },
    startButton: "Почати встановлення",
    closeButton: "Закрити"
  }
};

const appLinks = {
    "TeamViewer QuickSupport": "https://play.google.com/store/apps/details?id=com.teamviewer.quicksupport.market",
    "TeamViewer Universal Add-On": "https://play.google.com/store/apps/details?id=com.teamviewer.quicksupport.addon.universal"
};

export default function InstructionsPage() {
  const [location, setLocation] = useLocation();
  const [language, setLanguage] = useState<'ru' | 'ua'>(() => {
    return location.includes('lang=ua') ? 'ua' : 'ru';
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const handleClose = () => {
    setLocation('/');
  };
  
  const handleLanguageChange = (newLanguage: 'ru' | 'ua') => {
    setLanguage(newLanguage);
  };

  const t = translations[language];
  const telegramUrl = import.meta.env.VITE_TELEGRAM_URL || "https://t.me/your_telegram";

  return (
    <section className="py-16 bg-dark-secondary min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-dark-primary border border-slate-700 rounded-xl">
            <CardContent className="p-8">
              {/* New unified header block */}
              <header className="flex items-center justify-between mb-8 pb-4 border-b border-slate-700">
                <h1 className="text-2xl font-bold text-slate-100">
                  {t.headerTitle}
                </h1>
                <div className="flex items-center space-x-2">
                  <LanguageSwitcher currentLanguage={language} onLanguageChange={handleLanguageChange} />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-400 hover:text-slate-200 transition-colors duration-200"
                    onClick={handleClose}
                    data-testid="button-close-instructions"
                  >
                    <X className="w-6 h-6" />
                  </Button>
                </div>
              </header>
              
              <h2 className="text-xl font-semibold text-slate-100 mb-6">
                {t.pageTitle}
              </h2>

              <div className="space-y-6">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-1">1</div>
                    <div>
                      <h4 className="font-medium text-slate-100 mb-2">{t.step1.title}</h4>
                      <p className="text-slate-300 mb-3">{t.step1.description}</p>
                      <div className="flex flex-col space-y-2">
                        {t.step1.apps.map((app, index) => (
                          <div key={index}>
                            <p className="text-slate-200 mb-1">{app}</p>
                            <Button
                              asChild
                              variant="outline"
                              className="w-full bg-transparent border border-blue-500/50 text-blue-300 hover:bg-blue-500/20"
                            >
                              <a href={appLinks[app as keyof typeof appLinks]} target="_blank" rel="noopener noreferrer">
                                {t.step1.downloadText}
                              </a>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-1">2</div>
                    <div>
                      <h4 className="font-medium text-slate-100 mb-2">{t.step2.title}</h4>
                      <p className="text-slate-300 mb-3">{t.step2.description}</p>
                      <ol className="list-decimal list-inside text-slate-300 space-y-1">
                        {t.step2.instructions.map((instruction, index) => (
                          <li key={index}>{instruction}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-1">3</div>
                    <div>
                      <h4 className="font-medium text-slate-100 mb-2">{t.step3.title}</h4>
                      <p className="text-slate-300">{t.step3.description}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  className="inline-flex items-center justify-center px-6 py-3 bg-telegram-blue hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200"
                  onClick={() => window.open(telegramUrl, '_blank')}
                  data-testid="button-start-installation"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 6.728-.896 6.728-.341 1.653-.669 1.653-1.132 1.653-.743 0-1.2-.486-1.2-.486l-3.897-2.965-1.35-.486s.896-.611 1.653-1.132c.486-.343.486-.486 0-.486-.486 0-1.653.486-1.653.486l-2.965 1.132s-.486.343-.486 1.132c0 .669.486 1.132.486 1.132l7.794 2.965s1.132.486 1.653 0c.486-.486.486-1.132.486-1.132l1.132-6.728c.169-1.165-.169-1.653-.669-1.653-.486 0-1.132.343-1.132.343z"/>
                  </svg>
                  {t.startButton}
                </Button>
                <Button
                  variant="outline"
                  className="px-6 py-3 bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white font-medium rounded-lg transition-all duration-200"
                  onClick={handleClose}
                  data-testid="button-close-instructions-bottom"
                >
                  {t.closeButton}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
