import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LanguageSwitcher } from "@/components/language-switcher";
import { PricingCard } from "@/components/pricing-card";
import { ChevronDown, Clock, CheckCircle, Zap } from "lucide-react";
import { useLocation } from "wouter";
import { FaTelegram } from 'react-icons/fa';

// Унифицированный компонент для иконки Telegram
const TelegramIcon = () => (
  <FaTelegram style={{ fontSize: '24px', color: '#fff' }} />
);

const translations = {
  ru: {
    header: {
      title: "Установка 2GIS для Киева, Днепра, Одессы, Харькова "
    },
    hero: {
      title: "Профессиональная установка 2GIS",
      subtitle: "Выберите подходящий способ установки навигационного приложения 2GIS с гарантией качества и поддержкой",
      selectService: "Выбрать услугу",
      contactTelegram: "Написать в Telegram"
    },
    services: {
      title: "Наши услуги установки",
      popularLabel: "Популярный",
      offline: {
        title: "Офлайн установка",
        features: ["Личная встреча", "Полная настройка", "Гарантия работы"],
        selectButton: "Связаться"
      },
      online: {
        title: "Онлайн установка",
        features: ["Удаленная установка", "Пошаговые инструкции", "Быстро и удобно"],
        selectButton: "Связаться",
        instructionsButton: "Предварительные инструкции"
      },
      apk: {
        title: "Установка через APK",
        price: "200 грн",
        features: ["APK файл приложения", "Инструкция установки"],
        selectButton: "Скачать APK"
      }
    },
    contact: {
      title: "Готовы к установке?",
      subtitle: "Свяжитесь с нами через Telegram для получения профессиональной помощи с установкой 2GIS",
      features: {
        fast: {
          title: "Быстрый ответ",
          description: "Отвечаем в течение часа"
        },
        quality: {
          title: "Гарантия качества",
          description: "100% рабочая установка"
        },
        support: {
          title: "Поддержка 24/7",
          description: "Помощь в любое время"
        }
      },
      contactButton: "Написать в Telegram"
    },
    footer: {
      description: "Профессиональные услуги установки навигационного приложения 2GIS в Украине",
      copyright: "Все права защищены"
    }
  },
  ua: {
    header: {
      title: "Встановлення 2GIS для Києва, Дніпра, Одеси, Харкова"
    },
    hero: {
      title: "Професійне встановлення 2GIS",
      subtitle: "Оберіть підходящий спосіб встановлення навігаційного додатку 2GIS з гарантією якості та підтримкою",
      selectService: "Обрати послугу",
      contactTelegram: "Написати в Telegram"
    },
    services: {
      title: "Наші послуги встановлення",
      popularLabel: "Популярний",
      offline: {
        title: "Офлайн встановлення",
        features: ["Особиста зустріч", "Повне налаштування", "Гарантія роботи"],
        selectButton: "Зв'язатися"
      },
      online: {
        title: "Онлайн встановлення",
        features: ["Віддалене встановлення", "Покрокові інструкції", "Швидко та зручно"],
        selectButton: "Зв'язатися",
        instructionsButton: "Попередні інструкції"
      },
      apk: {
        title: "Встановлення через APK",
        price: "200 грн",
        features: ["APK файл додатку", "Інструкція встановлення"],
        selectButton: "Завантажити APK"
      }
    },
    contact: {
      title: "Готові до встановлення?",
      subtitle: "Зв'яжіться з нами через Telegram для отримання професійної допомоги з встановленням 2GIS",
      features: {
        fast: {
          title: "Швидка відповідь",
          description: "Відповідаємо протягом години"
        },
        quality: {
          title: "Гарантія якості",
          description: "100% робоча установка"
        },
        support: {
          title: "Підтримка 24/7",
          description: "Допомога у будь-який час"
        }
      },
      contactButton: "Написати в Telegram"
    },
    footer: {
      description: "Професійні послуги встановлення навігаційного додатку 2GIS в Україні",
      copyright: "Всі права захищені"
    }
  }
};

export function Home() {
  const [language, setLanguage] = useState<'ru' | 'ua'>(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage === 'ru' || savedLanguage === 'ua' ? savedLanguage : 'ru';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);
  
  const [location, setLocation] = useLocation();

  const t = translations[language];
  const telegramUrl = import.meta.env.VITE_TELEGRAM_URL || "https://t.me/r_vskr";
  const apkDownloadUrl = "https://github.com/rvskr/2gis/releases/download/1.0/2GisHelper.apk";

  const handleServiceSelect = (service: string) => {
    console.log(`Selected service: ${service}`);
    window.open(telegramUrl, '_blank');
  };

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShowInstructions = () => {
    setLocation('/online-instructions');
  };

  const servicesData = [
    {
      type: "offline",
      price: 300,
      isPopular: false,
      onSelect: handleServiceSelect,
      translations: t.services.offline,
      popularLabel: t.services.popularLabel
    },
    {
      type: "online",
      price: 250,
      isPopular: true,
      onSelect: handleServiceSelect,
      onShowInstructions: handleShowInstructions,
      translations: {
        ...t.services.online,
        instructionsButton: t.services.online.instructionsButton
      },
      popularLabel: t.services.popularLabel
    }
  ];

  return (
    <div className="min-h-screen bg-dark-primary text-slate-100 antialiased">
      <header className="bg-dark-secondary border-b border-slate-700 fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">GIS</span>
              </div>
              <h1 className="text-xl font-semibold text-slate-100" data-testid="text-header-title">
                {t.header.title}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <LanguageSwitcher 
                currentLanguage={language}
                onLanguageChange={setLanguage}
              />
            </div>
          </nav>
        </div>
      </header>

      <main className="pt-20">
        <section className="py-16 bg-gradient-to-b from-dark-secondary to-dark-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6" data-testid="text-hero-title">
              {t.hero.title}
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8" data-testid="text-hero-subtitle">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                onClick={scrollToServices}
                data-testid="button-select-service"
              >
                <ChevronDown className="w-5 h-5 mr-2" />
                {t.hero.selectService}
              </Button>
              <Button 
                className="inline-flex items-center px-6 py-3 bg-[#0088cc] hover:bg-[#0077b3] text-white font-medium rounded-lg transition-colors duration-200"
                onClick={() => window.open(telegramUrl, '_blank')}
                data-testid="button-contact-telegram"
              >
                <TelegramIcon />
                <span className="ml-2">{t.hero.contactTelegram}</span>
              </Button>
            </div>
          </div>
        </section>

        <section id="services" className="py-16 bg-dark-primary">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center text-slate-100 mb-12" data-testid="text-services-title">
              {t.services.title}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {servicesData.map((service, index) => (
                <PricingCard key={index} {...service} />
              ))}
              
              <Card className="bg-dark-secondary border border-slate-700 rounded-xl flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-8">
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-slate-100 mb-2">
                      {t.services.apk.title}
                    </h4>
                    <p className="text-2xl font-bold text-blue-500 mb-4">
                      {t.services.apk.price}
                    </p>
                    <ul className="text-slate-300 space-y-2 text-left mt-4">
                      {t.services.apk.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <div className="p-8 pt-0">
                  <a
                    href={apkDownloadUrl}
                    download
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    {t.services.apk.selectButton}
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-dark-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-3xl font-bold text-slate-100 mb-6" data-testid="text-contact-title">
                {t.contact.title}
              </h3>
              <p className="text-xl text-slate-400 mb-8" data-testid="text-contact-subtitle">
                {t.contact.subtitle}
              </p>
              
              <Card className="bg-dark-secondary border border-slate-700 rounded-xl mb-8">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-medium text-slate-100 mb-2" data-testid="text-feature-fast-title">
                        {t.contact.features.fast.title}
                      </h4>
                      <p className="text-slate-400 text-sm" data-testid="text-feature-fast-description">
                        {t.contact.features.fast.description}
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-medium text-slate-100 mb-2" data-testid="text-feature-quality-title">
                        {t.contact.features.quality.title}
                      </h4>
                      <p className="text-slate-400 text-sm" data-testid="text-feature-quality-description">
                        {t.contact.features.quality.description}
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-medium text-slate-100 mb-2" data-testid="text-feature-support-title">
                        {t.contact.features.support.title}
                      </h4>
                      <p className="text-slate-400 text-sm" data-testid="text-feature-support-description">
                        {t.contact.features.support.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Button
                className="inline-flex items-center px-8 py-4 bg-[#0088cc] hover:bg-[#0077b3] text-white text-lg font-semibold rounded-lg transition-colors duration-200 shadow-lg"
                onClick={() => window.open(telegramUrl, '_blank')}
                data-testid="button-contact-main"
              >
                <TelegramIcon />
                <span className="ml-3">{t.contact.contactButton}</span>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-dark-secondary border-t border-slate-700 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">GIS</span>
              </div>
              <span className="text-slate-300 font-medium" data-testid="text-footer-title">
                {t.header.title}
              </span>
            </div>
            <p className="text-slate-400 text-sm mb-4" data-testid="text-footer-description">
              {t.footer.description}
            </p>
            <p className="text-slate-500 text-xs" data-testid="text-footer-copyright">
              © 2025 2GIS Installation Services. {t.footer.copyright}.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}