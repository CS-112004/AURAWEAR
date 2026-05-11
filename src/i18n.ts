import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          nav: {
            men: 'Men',
            women: 'Women',
            new: 'New Arrivals',
            story: 'Our Story',
          },
          home: {
            hero: 'Elevate Your Aura',
            cta: 'Shop Now',
          }
        }
      },
      fr: {
        translation: {
          nav: {
            men: 'Hommes',
            women: 'Femmes',
            new: 'Nouveautés',
            story: 'Notre Histoire',
          },
          home: {
            hero: 'Élevez Votre Aura',
            cta: 'Achetez Maintenant',
          }
        }
      }
    }
  });

export default i18n;
