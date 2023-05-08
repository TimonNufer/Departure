import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationDe from './translationDe.json';

const resources = {
  de: {
    translation: translationDe,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'de',
    lng: 'de',
  });
export default i18n;
