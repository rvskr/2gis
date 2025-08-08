import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

interface InstructionsSectionProps {
  isVisible: boolean;
  onClose: () => void;
  language: 'ru' | 'ua';
}

const translations = {
  ru: {
    title: "Предварительные инструкции для онлайн установки",
    step1: {
      title: "Скачайте необходимые приложения",
      description: "Перед началом установки вам потребуется скачать 2 программы из Google Play Market:",
      apps: ["TeamViewer QuickSupport", "AnyDesk"]
    },
    step2: {
      title: "Включите специальные возможности", 
      description: "Для удаленного доступа необходимо активировать следующие настройки:",
      settings: ["Специальные возможности (Accessibility)", "Разрешения для установки приложений"]
    },
    step3: {
      title: "Свяжитесь с нами",
      description: "После выполнения предварительных шагов напишите нам в Telegram для начала процесса установки."
    },
    startButton: "Начать установку",
    closeButton: "Закрыть"
  },
  ua: {
    title: "Попередні інструкції для онлайн встановлення",
    step1: {
      title: "Завантажте необхідні додатки",
      description: "Перед початком встановлення вам знадобиться завантажити 2 програми з Google Play Market:",
      apps: ["TeamViewer QuickSupport", "AnyDesk"]
    },
    step2: {
      title: "Увімкніть спеціальні можливості",
      description: "Для віддаленого доступу необхідно активувати наступні налаштування:",
      settings: ["Спеціальні можливості (Accessibility)", "Дозволи для встановлення додатків"]
    },
    step3: {
      title: "Зв'яжіться з нами",
      description: "Після виконання попередніх кроків напишіть нам в Telegram для початку процесу встановлення."
    },
    startButton: "Почати встановлення",
    closeButton: "Закрити"
  }
};

export function InstructionsSection({ isVisible, onClose, language }: InstructionsSectionProps) {
  const t = translations[language];
  const telegramUrl = import.meta.env.VITE_TELEGRAM_URL || "https://t.me/your_telegram";

  if (!isVisible) return null;

  return (
    <section className="py-16 bg-dark-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-dark-primary border border-slate-700 rounded-xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-slate-100">
                  {t.title}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-slate-200 transition-colors duration-200"
                  onClick={onClose}
                  data-testid="button-close-instructions"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
              
              <div className="space-y-6">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-1">1</div>
                    <div>
                      <h4 className="font-medium text-slate-100 mb-2">{t.step1.title}</h4>
                      <p className="text-slate-300 mb-3">{t.step1.description}</p>
                      <ul className="list-disc list-inside text-slate-400 space-y-1">
                        {t.step1.apps.map((app, index) => (
                          <li key={index}>{app}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-1">2</div>
                    <div>
                      <h4 className="font-medium text-slate-100 mb-2">{t.step2.title}</h4>
                      <p className="text-slate-300 mb-3">{t.step2.description}</p>
                      <ul className="list-disc list-inside text-slate-400 space-y-1">
                        {t.step2.settings.map((setting, index) => (
                          <li key={index}>{setting}</li>
                        ))}
                      </ul>
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
                  onClick={onClose}
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
