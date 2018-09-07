import i18n from 'i18next';
//import Backend from 'i18next-xhr-backend';
//import LanguageDetector from 'i18next-browser-languagedetector';
import {reactI18nextModule} from 'react-i18next';

import common_en from "./en.json";
import common_et from "./et.json";

const debug = true; // TODO turn off for live

i18n
//.use(Backend)
//.use(LanguageDetector)
    .use(reactI18nextModule)
    .init({
        lng: 'en',
        fallbackLng: 'en',

        // have a common namespace used around the full app
        ns: ['translations'],
        defaultNS: 'translations',

        debug: debug,

        react: {
            wait: true, // false
            // withRef: false,
            // bindI18n: 'languageChanged loaded',
            // bindStore: 'added removed',
            // nsMode: 'default'
        },

        interpolation: {
            // React already does escaping
            escapeValue: false,
        },

        resources: {
            en: {
                // 'translations' is our custom namespace
                translations: common_en
            },
            et: {
                translations: common_et
            },
        },
    });
export default i18n