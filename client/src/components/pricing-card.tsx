import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

interface PricingCardProps {
  type: 'offline' | 'online' | 'apk';
  price: number;
  isPopular?: boolean;
  onSelect: (type: string) => void;
  onShowInstructions?: () => void;
  translations: {
    title: string;
    features: string[];
    selectButton: string;
    instructionsButton?: string;
  };
  popularLabel: string; // Добавлен новый пропс для перевода
}

const getCardIcon = (type: string) => {
  switch (type) {
    case 'offline':
      return (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
      );
    case 'online':
      return (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"></path>
        </svg>
      );
    case 'apk':
      return (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
        </svg>
      );
    default:
      return null;
  }
};

const getColors = (type: string) => {
  switch (type) {
    case 'offline':
      return {
        iconBg: 'bg-orange-500',
        priceBg: 'text-orange-400',
        buttonBg: 'bg-orange-500 hover:bg-orange-600'
      };
    case 'online':
      return {
        iconBg: 'bg-blue-500',
        priceBg: 'text-blue-400',
        buttonBg: 'bg-blue-500 hover:bg-blue-600'
      };
    case 'apk':
      return {
        iconBg: 'bg-green-500',
        priceBg: 'text-green-400',
        buttonBg: 'bg-green-500 hover:bg-green-600'
      };
    default:
      return {
        iconBg: 'bg-gray-500',
        priceBg: 'text-gray-400',
        buttonBg: 'bg-gray-500 hover:bg-gray-600'
      };
  }
};

export function PricingCard({ type, price, isPopular, onSelect, onShowInstructions, translations, popularLabel }: PricingCardProps) {
  const colors = getColors(type);
  const icon = getCardIcon(type);

  return (
    <Card className="bg-dark-secondary border border-slate-700 rounded-xl hover:border-blue-500 transition-all duration-300 transform hover:scale-105 relative">
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {popularLabel} {/* Теперь текст берется из пропса */}
          </span>
        </div>
      )}
      
      <CardContent className="p-6">
        <div className={`text-center mb-6 ${isPopular ? 'mt-4' : ''}`}>
          <div className={`w-16 h-16 ${colors.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
            {icon}
          </div>
          <h4 className="text-xl font-semibold text-slate-100 mb-2">{translations.title}</h4>
          <div className={`text-3xl font-bold ${colors.priceBg} mb-4`}>
            {price} <span className="text-lg">грн</span>
          </div>
        </div>
        
        <ul className="space-y-3 mb-6 text-slate-300">
          {translations.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="w-5 h-5 text-green-400 mr-3" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          className={`w-full ${colors.buttonBg} text-white font-medium py-3 rounded-lg transition-colors duration-200 mb-3`}
          onClick={() => onSelect(type)}
          data-testid={`button-select-${type}`}
        >
          {translations.selectButton}
        </Button>
        
        {type === 'online' && onShowInstructions && translations.instructionsButton && (
          <Button 
            variant="outline"
            className="w-full bg-transparent border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white font-medium py-2 rounded-lg transition-all duration-200"
            onClick={onShowInstructions}
            data-testid="button-show-instructions"
          >
            {translations.instructionsButton}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
