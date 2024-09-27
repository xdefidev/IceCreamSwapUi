import { EN } from './config/languages'

export const LS_KEY = 'pancakeswap_language'

export const fetchLocale = async (locale: string) => {
  try {
    return await import(`../../../locales/${locale}.json`)
  } catch {
    console.error(`API: Failed to fetch locale ${locale}`)
    return null
  }
}

export const getLanguageCodeFromLS = () => {
  try {
    const codeFromStorage = localStorage.getItem(LS_KEY)

    return codeFromStorage || EN.locale
  } catch {
    return EN.locale
  }
}
