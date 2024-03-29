import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import pt from './languages/pt.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'pt',
  resources: {
    pt: pt,
  },
  react: {
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
