
import AsyncStorage from '@react-native-async-storage/async-storage';
import fr from './fr.json';
import nl from './nl.json';
import en from './en.json';

const translations = { fr, nl, en };

export type Locale = 'fr' | 'nl' | 'en';

let currentLocale: Locale = 'fr';

export const setLocale = async (locale: Locale) => {
  currentLocale = locale;
  await AsyncStorage.setItem('locale', locale);
};

export const getLocale = async (): Promise<Locale> => {
  const saved = await AsyncStorage.getItem('locale');
  return (saved as Locale) || 'fr';
};

export const t = (key: string): string => {
  const keys = key.split('.');
  let value: any = translations[currentLocale];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
};

export const initLocale = async () => {
  currentLocale = await getLocale();
};
