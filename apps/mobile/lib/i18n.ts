import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

// Import locale files from shared package
import ukCommon from '@edmi/shared/locales/uk/common.json';
import ukProducts from '@edmi/shared/locales/uk/products.json';
import ukCheckout from '@edmi/shared/locales/uk/checkout.json';
import ukBot from '@edmi/shared/locales/uk/bot.json';
import ukConfigurator from '@edmi/shared/locales/uk/configurator.json';

import enCommon from '@edmi/shared/locales/en/common.json';
import enProducts from '@edmi/shared/locales/en/products.json';
import enCheckout from '@edmi/shared/locales/en/checkout.json';
import enBot from '@edmi/shared/locales/en/bot.json';
import enConfigurator from '@edmi/shared/locales/en/configurator.json';

const resources = {
  uk: {
    common: ukCommon,
    products: ukProducts,
    checkout: ukCheckout,
    bot: ukBot,
    configurator: ukConfigurator,
  },
  en: {
    common: enCommon,
    products: enProducts,
    checkout: enCheckout,
    bot: enBot,
    configurator: enConfigurator,
  },
};

const deviceLanguage = Localization.getLocales()[0]?.languageCode ?? 'uk';
const supportedLanguages = ['uk', 'en'];
const defaultLanguage = supportedLanguages.includes(deviceLanguage) ? deviceLanguage : 'uk';

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLanguage,
  fallbackLng: 'uk',
  defaultNS: 'common',
  ns: ['common', 'products', 'checkout', 'bot', 'configurator'],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
