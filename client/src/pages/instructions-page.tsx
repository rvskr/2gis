import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Download, Settings, MessageCircle, CheckCircle } from "lucide-react";
import { useLocation } from "wouter";
import { FaTelegram } from 'react-icons/fa';
import { LanguageSwitcher } from "@/components/language-switcher";

const translations = {
  ru: {
    headerTitle: "Установка 2GIS",
    pageTitle: "Подготовка к удаленной установке",
    subtitle: "Выполните эти простые шаги для успешной установки",
    step1: {
      title: "Скачайте приложения",
      description: "Установите два необходимых приложения из Google Play Market",
      apps: ["TeamViewer QuickSupport", "TeamViewer Universal Add-On"],
      downloadText: "Скачать из Play Market"
    },
    step2: {
      title: "Активируйте Universal Add-On",
      description: "Включите специальные возможности для удаленного управления",
      instructions: [
        "Откройте 'Настройки' телефона",
        "Найдите в поиске 'Спец. возможности'",
        "Выберите 'Установленные(скачанные) приложения'",
        "Активируйте 'Universal Add-On'"
      ]
    },
    step3: {
      title: "Свяжитесь с нами",
      description: "Мы поможем завершить установку через удаленное подключение"
    },
    startButton: "Связаться в Telegram",
    closeButton: "Закрыть",
    ready: "Готово",
    stepsCompleted: "шагов выполнено"
  },
  ua: {
    headerTitle: "Встановлення 2GIS",
    pageTitle: "Підготовка до віддаленого встановлення",
    subtitle: "Виконайте ці прості кроки для успішного встановлення",
    step1: {
      title: "Завантажте додатки",
      description: "Встановіть два необхідні додатки з Google Play Market",
      apps: ["TeamViewer QuickSupport", "TeamViewer Universal Add-On"],
      downloadText: "Завантажити з Play Market"
    },
    step2: {
      title: "Активуйте Universal Add-On",
      description: "Увімкніть спеціальні можливості для віддаленого керування",
      instructions: [
        "Відкрийте 'Налаштування' телефону",
        "Знайдіть у пошуку 'Спец. можливості'",
        "Оберіть 'Встановлені(завантажені) програми'",
        "Активуйте 'Universal Add-On'"
      ]
    },
    step3: {
      title: "Зв'яжіться з нами",
      description: "Ми допоможемо завершити встановлення через віддалене підключення"
    },
    startButton: "Зв'язатися в Telegram",
    closeButton: "Закрити",
    ready: "Готово",
    stepsCompleted: "кроків виконано"
  }
};

const appLinks = {
  "TeamViewer QuickSupport": "https://play.google.com/store/apps/details?id=com.teamviewer.quicksupport.market",
  "TeamViewer Universal Add-On": "https://play.google.com/store/apps/details?id=com.teamviewer.quicksupport.addon.universal"
};

// Унифицированный компонент для иконки Telegram
const TelegramIcon = () => (
    <FaTelegram style={{ fontSize: '24px', color: '#fff' }} />
);

export default function InstructionsPage() {
  const [location, setLocation] = useLocation();
  const [language, setLanguage] = useState<'ru' | 'ua'>(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage === 'ru' || savedLanguage === 'ua' ? savedLanguage : 'ru';
  });
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

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

  const toggleStepComplete = (stepIndex: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepIndex) 
        ? prev.filter(s => s !== stepIndex)
        : [...prev, stepIndex]
    );
  };

  const t = translations[language];
  const telegramUrl = "https://t.me/r_vskr";

  const steps = [
    {
      id: 1,
      icon: Download,
      iconColor: 'blue',
      title: t.step1.title,
      description: t.step1.description,
      content: (
        <div className="space-y-4">
          {t.step1.apps.map((app, index) => (
            <div key={index} className="bg-slate-700/30 rounded-xl px-4 py-3 border border-slate-600/30">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-white mb-1">{app}</h4>
                  <p className="text-sm text-slate-400">Google Play Market</p>
                </div>
                <a
                  href={appLinks[app as keyof typeof appLinks]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Download className="w-4 h-4" />
                  {t.step1.downloadText}
                </a>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 2,
      icon: Settings,
      iconColor: 'orange',
      title: t.step2.title,
      description: t.step2.description,
      content: (
        <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/30">
          <ul className="list-none space-y-4 text-left">
            {t.step2.instructions.map((instruction, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-500/20 border border-orange-500/40 rounded-full flex items-center justify-center text-orange-400 text-sm font-semibold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-slate-300 text-base">{instruction}</p>
              </li>
            ))}
          </ul>
        </div>
      )
    },
    {
      id: 3,
      icon: MessageCircle,
      iconColor: 'green',
      title: t.step3.title,
      description: t.step3.description,
      content: null
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 font-sans text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl p-4 sm:p-6 lg:p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                {t.headerTitle}
              </h1>
              <p className="text-slate-400 mt-1 text-lg">{t.pageTitle}</p>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher currentLanguage={language} onLanguageChange={handleLanguageChange} />
              <button
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-full transition-all duration-200"
                onClick={handleClose}
                data-testid="button-close-instructions"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mb-10">
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {steps.map((step) => (
            <div key={step.id} className="group">
              <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 p-4 sm:p-6 lg:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative flex-shrink-0">
                    <div className={`w-12 h-12 bg-gradient-to-br from-${step.iconColor}-500 to-${step.iconColor}-600 rounded-full flex items-center justify-center shadow-lg`}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    {completedSteps.includes(step.id) && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 flex items-center justify-between gap-3">
                    <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
                    <button
                      onClick={() => toggleStepComplete(step.id)}
                      className="text-sm px-3 py-1 rounded-full bg-slate-700/50 text-slate-300 hover:bg-green-500/20 hover:text-green-400 transition-all duration-200"
                    >
                      {completedSteps.includes(step.id) ? t.ready : '✓'}
                    </button>
                  </div>
                </div>
                
                <div>
                  <p className="text-slate-300 text-lg mb-6">{step.description}</p>
                  {step.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
          <button
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 overflow-hidden"
            onClick={() => window.open(telegramUrl, '_blank')}
            data-testid="button-start-installation"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <TelegramIcon />
            <span className="relative z-10">{t.startButton}</span>
          </button>
          
          <button
            className="w-full sm:w-auto px-6 py-3 text-slate-300 hover:text-white border border-slate-600 hover:border-slate-500 rounded-xl transition-all duration-200 font-medium"
            onClick={handleClose}
            data-testid="button-close-instructions-bottom"
          >
            {t.closeButton}
          </button>
        </div>

        {completedSteps.length > 0 && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/40 rounded-full text-green-400">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">
                {completedSteps.length}/3 {t.stepsCompleted}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}