import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LanguageSwitcher } from "@/components/language-switcher";
import { PricingCard } from "@/components/pricing-card";
import { InstructionsSection } from "@/components/instructions-section";
import { ChevronDown, Clock, CheckCircle, Zap } from "lucide-react";

const translations = {
  ru: {
    header: {
      title: "Установка 2GIS"
    },
    hero: {
      title: "Профессиональная установка 2GIS",
      subtitle: "Выберите подходящий способ установки навигационного приложения 2GIS с гарантией качества и поддержкой",
      selectService: "Выбрать услугу",
      contactTelegram: "Написать в Telegram"
    },
    services: {
      title: "Наши услуги установки",
      offline: {
        title: "Офлайн установка",
        features: ["Личная встреча", "Полная настройка", "Гарантия работы"],
        selectButton: "Выбрать услугу"
      },
      online: {
        title: "Онлайн установка", 
        features: ["Удаленная установка", "Пошаговые инструкции", "Быстро и удобно"],
        selectButton: "Выбрать услугу",
        instructionsButton: "Предварительные инструкции"
      },
      apk: {
        title: "Установка через APK",
        features: ["APK файл приложения", "Инструкция установки", "Самостоятельная установка"],
        selectButton: "Выбрать услугу"
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
      title: "Встановлення 2GIS"
    },
    hero: {
      title: "Професійне встановлення 2GIS",
      subtitle: "Оберіть підходящий спосіб встановлення навігаційного додатку 2GIS з гарантією якості та підтримкою",
      selectService: "Обрати послугу",
      contactTelegram: "Написати в Telegram"
    },
    services: {
      title: "Наші послуги встановлення",
      offline: {
        title: "Офлайн встановлення",
        features: ["Особиста зустріч", "Повне налаштування", "Гарантія роботи"],
        selectButton: "Обрати послугу"
      },
      online: {
        title: "Онлайн встановлення",
        features: ["Віддалене встановлення", "Покрокові інструкції", "Швидко та зручно"],
        selectButton: "Обрати послугу",
        instructionsButton: "Попередні інструкції"
      },
      apk: {
        title: "Встановлення через APK",
        features: ["APK файл додатку", "Інструкція встановлення", "Самостійне встановлення"],
        selectButton: "Обрати послугу"
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

export default function Home() {
  const [language, setLanguage] = useState<'ru' | 'ua'>('ru');
  const [showInstructions, setShowInstructions] = useState(false);
  const t = translations[language];
  const telegramUrl = import.meta.env.VITE_TELEGRAM_URL || "https://t.me/your_telegram";

  const handleServiceSelect = (service: string) => {
    console.log(`Selected service: ${service}`);
    window.open(telegramUrl, '_blank');
  };

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-dark-primary text-slate-100 antialiased">
      {/* Header */}
      <header className="bg-dark-secondary border-b border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">2G</span>
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

      <main>
        {/* Hero Section */}
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
                className="inline-flex items-center px-6 py-3 bg-telegram-blue hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200"
                onClick={() => window.open(telegramUrl, '_blank')}
                data-testid="button-contact-telegram"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 6.728-.896 6.728-.341 1.653-.669 1.653-1.132 1.653-.743 0-1.2-.486-1.2-.486l-3.897-2.965-1.35-.486s.896-.611 1.653-1.132c.486-.343.486-.486 0-.486-.486 0-1.653.486-1.653.486l-2.965 1.132s-.486.343-.486 1.132c0 .669.486 1.132.486 1.132l7.794 2.965s1.132.486 1.653 0c.486-.486.486-1.132.486-1.132l1.132-6.728c.169-1.165-.169-1.653-.669-1.653-.486 0-1.132.343-1.132.343z"/>
                </svg>
                {t.hero.contactTelegram}
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 bg-dark-primary">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center text-slate-100 mb-12" data-testid="text-services-title">
              {t.services.title}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <PricingCard
                type="offline"
                price={300}
                onSelect={handleServiceSelect}
                translations={t.services.offline}
              />
              
              <PricingCard
                type="online"
                price={250}
                isPopular={true}
                onSelect={handleServiceSelect}
                onShowInstructions={() => setShowInstructions(true)}
                translations={{
                  ...t.services.online,
                  instructionsButton: t.services.online.instructionsButton
                }}
              />
              
              <PricingCard
                type="apk"
                price={200}
                onSelect={handleServiceSelect}
                translations={t.services.apk}
              />
            </div>
          </div>
        </section>

        {/* Instructions Section */}
        <InstructionsSection
          isVisible={showInstructions}
          onClose={() => setShowInstructions(false)}
          language={language}
        />

        {/* Contact Section */}
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
                className="inline-flex items-center px-8 py-4 bg-telegram-blue hover:bg-blue-600 text-white text-lg font-semibold rounded-lg transition-colors duration-200 shadow-lg"
                onClick={() => window.open(telegramUrl, '_blank')}
                data-testid="button-contact-main"
              >
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 6.728-.896 6.728-.341 1.653-.669 1.653-1.132 1.653-.743 0-1.2-.486-1.2-.486l-3.897-2.965-1.35-.486s.896-.611 1.653-1.132c.486-.343.486-.486 0-.486-.486 0-1.653.486-1.653.486l-2.965 1.132s-.486.343-.486 1.132c0 .669.486 1.132.486 1.132l7.794 2.965s1.132.486 1.653 0c.486-.486.486-1.132.486-1.132l1.132-6.728c.169-1.165-.169-1.653-.669-1.653-.486 0-1.132.343-1.132.343z"/>
                </svg>
                {t.contact.contactButton}
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-dark-secondary border-t border-slate-700 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">2G</span>
              </div>
              <span className="text-slate-300 font-medium" data-testid="text-footer-title">
                {t.header.title}
              </span>
            </div>
            <p className="text-slate-400 text-sm mb-4" data-testid="text-footer-description">
              {t.footer.description}
            </p>
            <p className="text-slate-500 text-xs" data-testid="text-footer-copyright">
              © 2024 2GIS Installation Services. {t.footer.copyright}.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
