/* eslint-disable no-undef */

import React from 'react'
import ReactDOM from 'react-dom/client'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

// translations
import { csLanguage, enLanguage } from './translations'

// App Container
import AppContainer from './App'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV === 'development',
    load: 'languageOnly',
    fallbackLng: 'cs',
    supportedLngs: ['en', 'cs'],
    resources: {
      en: {
        translation: enLanguage,
      },
      cs: {
        translation: csLanguage,
      },
    },
  })

// ========================================================
// Render Setup
// ========================================================
const mountNode = document.getElementById('app')
const root = ReactDOM.createRoot(mountNode)

// This code is excluded from production bundle
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.dispose(() => { root.unmount() })
  module.hot.accept()
}

root.render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>
)