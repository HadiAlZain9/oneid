import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Language = "ar" | "en";
type ThemeMode = "light" | "dark";

type AppSettingsContextType = {
  language: Language;
  theme: ThemeMode;
  setLanguage: (lang: Language) => void;
  setTheme: (mode: ThemeMode) => void;
};

const AppSettingsContext = createContext<AppSettingsContextType | null>(null);

export const AppSettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("ar");
  const [theme, setThemeState] = useState<ThemeMode>("light");

  // تحميل الإعدادات من AsyncStorage
  useEffect(() => {
    const loadSettings = async () => {
      const savedLang = await AsyncStorage.getItem("appLanguage");
      const savedTheme = await AsyncStorage.getItem("appTheme");

      if (savedLang === "ar" || savedLang === "en") setLanguageState(savedLang);
      if (savedTheme === "light" || savedTheme === "dark") setThemeState(savedTheme);
    };

    loadSettings();
  }, []);

  // حفظ اللغة
  const setLanguage = async (lang: Language) => {
    setLanguageState(lang);
    await AsyncStorage.setItem("appLanguage", lang);
  };

  // حفظ الثيم
  const setTheme = async (mode: ThemeMode) => {
    setThemeState(mode);
    await AsyncStorage.setItem("appTheme", mode);
  };

  return (
    <AppSettingsContext.Provider value={{ language, theme, setLanguage, setTheme }}>
      {children}
    </AppSettingsContext.Provider>
  );
};

export const useAppSettings = () => {
  const ctx = useContext(AppSettingsContext);
  if (!ctx) throw new Error("useAppSettings must be used inside AppSettingsProvider");
  return ctx;
};