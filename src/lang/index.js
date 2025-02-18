import { createI18n } from "vue-i18n";
import messages_en from "./messages_en.json"
import messages_es from "./messages_es.json"

const messages ={
    en: messages_en,
    es: messages_es
}

export default createI18n({
    locale: window.navigator.language.substring(0, 2) || import.meta.env.VITE_DEFAULT_LOCALE,
    fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
    legacy: false,
    globalInjection: true,
    silentTranslationWarn: true,
    messages
})