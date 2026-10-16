export type Locale = 'es' | 'en'

const es = {
  metaTitle: 'Generador de código QR gratis',
  metaDescription:
    'Crea un código QR de un enlace, texto, Wi-Fi, correo o teléfono. Se genera en tu navegador, gratis y sin cuenta.',
  brand: 'Tu código QR',
  imageAlt: 'Generador de código QR gratis en el navegador',
  languageLabel: 'Idioma',
  eyebrow: 'En tu navegador',
  lede: 'Escribe un enlace y el código aparece al instante. Nada sale de este navegador: no hay cuentas ni se guarda nada.',
  contentType: 'Tipo de contenido',
  typeUrl: 'Enlace',
  typeText: 'Texto',
  typeWifi: 'Wi-Fi',
  typeEmail: 'Correo',
  typePhone: 'Teléfono',
  urlLabel: 'Enlace',
  urlPlaceholder: 'ejemplo.com o https://…',
  textLabel: 'Texto',
  textPlaceholder: 'Lo que quieras codificar',
  ssidLabel: 'Nombre de la red',
  passwordLabel: 'Contraseña',
  securityLabel: 'Seguridad',
  encWpa: 'WPA/WPA2',
  encWep: 'WEP',
  encNone: 'Sin contraseña',
  hiddenNetwork: 'Red oculta',
  emailLabel: 'Correo',
  emailPlaceholder: 'nombre@correo.com',
  phoneLabel: 'Teléfono',
  phonePlaceholder: '+34 600 000 000',
  settings: 'Ajustes',
  sizeLabel: 'Tamaño',
  levelLabel: 'Corrección de errores',
  levelL: 'L — baja, cabe más texto',
  levelM: 'M — media',
  levelQ: 'Q — alta',
  levelH: 'H — máxima',
  foreground: 'Módulos',
  background: 'Fondo',
  previewLabel: 'Vista previa',
  empty: 'Escribe un contenido para ver el código.',
  encoded: 'Se codifica',
  downloadPng: 'Descargar PNG',
  downloadSvg: 'Descargar SVG',
  copyImage: 'Copiar imagen',
  filePng: 'codigo-qr.png',
  fileSvg: 'codigo-qr.svg',
  howTitle: 'Cómo funciona',
  step1Title: 'Elige el tipo',
  step1Body: 'Enlace, texto, Wi-Fi, correo o teléfono.',
  step2Title: 'Escribe el contenido',
  step2Body: 'El código aparece al instante.',
  step3Title: 'Descarga PNG o SVG',
  step3Body: 'También puedes copiar la imagen. El código no sale del navegador.',
  faqTitle: 'Preguntas frecuentes',
  faq1q: '¿Es gratis?',
  faq1a: 'Sí. Puedes crear y descargar el código sin cuenta y sin pago.',
  faq2q: '¿Se guarda lo que escribo?',
  faq2a: 'No. El código se genera en tu navegador. Nada se envía a un servidor ni se guarda.',
  faq3q: '¿Qué puedo codificar?',
  faq3a: 'Un enlace, un texto, una red Wi-Fi, un correo o un teléfono.',
  faq4q: '¿Qué es la corrección de errores?',
  faq4a:
    'Es lo que permite leer el código aunque se tape o se dañe una parte. L cabe más texto; H aguanta más daño y el código queda más denso.',
  faq5q: '¿Por qué importa el contraste?',
  faq5a:
    'El lector distingue los módulos oscuros del fondo claro. Si los colores se parecen, el código puede no leerse.',
  wifiPassword: 'Añade la contraseña o elige «Sin contraseña».',
  contrastLow: 'El contraste es bajo y puede costar escanear el código.',
  contrastDark:
    'El fondo es más oscuro que los módulos. Algunos lectores esperan módulos oscuros sobre fondo claro.',
  tooLong: 'El contenido es demasiado largo para un código QR. Acórtalo.',
  copied: 'Imagen copiada.',
  copyFailed: 'No se pudo copiar. Descarga el PNG.',
}

const en: Record<keyof typeof es, string> = {
  metaTitle: 'Free QR code generator',
  metaDescription:
    'Create a QR code for a link, text, Wi-Fi, email, or phone number. It is generated in your browser, free, and no account is required.',
  brand: 'Your QR code',
  imageAlt: 'Free QR code generator in the browser',
  languageLabel: 'Language',
  eyebrow: 'In your browser',
  lede: 'Type a link and the code appears instantly. Nothing leaves this browser: there are no accounts and nothing is saved.',
  contentType: 'Content type',
  typeUrl: 'Link',
  typeText: 'Text',
  typeWifi: 'Wi-Fi',
  typeEmail: 'Email',
  typePhone: 'Phone',
  urlLabel: 'Link',
  urlPlaceholder: 'example.com or https://…',
  textLabel: 'Text',
  textPlaceholder: 'Anything you want to encode',
  ssidLabel: 'Network name',
  passwordLabel: 'Password',
  securityLabel: 'Security',
  encWpa: 'WPA/WPA2',
  encWep: 'WEP',
  encNone: 'No password',
  hiddenNetwork: 'Hidden network',
  emailLabel: 'Email',
  emailPlaceholder: 'name@email.com',
  phoneLabel: 'Phone',
  phonePlaceholder: '+1 555 000 0000',
  settings: 'Settings',
  sizeLabel: 'Size',
  levelLabel: 'Error correction',
  levelL: 'L — low, fits more text',
  levelM: 'M — medium',
  levelQ: 'Q — high',
  levelH: 'H — maximum',
  foreground: 'Modules',
  background: 'Background',
  previewLabel: 'Preview',
  empty: 'Enter some content to see the code.',
  encoded: 'Encoded as',
  downloadPng: 'Download PNG',
  downloadSvg: 'Download SVG',
  copyImage: 'Copy image',
  filePng: 'qr-code.png',
  fileSvg: 'qr-code.svg',
  howTitle: 'How it works',
  step1Title: 'Choose the type',
  step1Body: 'Link, text, Wi-Fi, email, or phone.',
  step2Title: 'Enter the content',
  step2Body: 'The code appears instantly.',
  step3Title: 'Download PNG or SVG',
  step3Body: 'You can also copy the image. The code stays in the browser.',
  faqTitle: 'Frequently asked questions',
  faq1q: 'Is it free?',
  faq1a: 'Yes. You can create and download the code with no account and no payment.',
  faq2q: 'Is what I type saved?',
  faq2a: 'No. The code is generated in your browser. Nothing is sent to a server or saved.',
  faq3q: 'What can I encode?',
  faq3a: 'A link, some text, a Wi-Fi network, an email, or a phone number.',
  faq4q: 'What is error correction?',
  faq4a:
    'It lets the code be read even if part of it is covered or damaged. L fits more text; H survives more damage and the code is denser.',
  faq5q: 'Why does contrast matter?',
  faq5a:
    'The scanner tells dark modules apart from a light background. If the colors are too similar, the code may not scan.',
  wifiPassword: 'Add the password or choose “No password”.',
  contrastLow: 'The contrast is low, so the code may be hard to scan.',
  contrastDark:
    'The background is darker than the modules. Some scanners expect dark modules on a light background.',
  tooLong: 'The content is too long for a QR code. Shorten it.',
  copied: 'Image copied.',
  copyFailed: 'Could not copy the image. Download the PNG.',
}

const messages: Record<Locale, Record<keyof typeof es, string>> = { es, en }

export type MessageKey = keyof typeof es

const STORAGE_KEY = 'qr-locale'

let locale: Locale = readStoredLocale() ?? detectLocale()
let controlBound = false
const listeners = new Set<() => void>()

export function t(key: MessageKey): string {
  return messages[locale][key]
}

export function setLocale(next: Locale): void {
  if (next === locale) return
  locale = next
  persistLocale(next)
  applyTranslations()
  for (const listener of listeners) listener()
}

export function onLocaleChange(listener: () => void): void {
  listeners.add(listener)
}

export function applyTranslations(): void {
  document.documentElement.lang = locale
  document.title = t('metaTitle')

  setMeta('name', 'description', t('metaDescription'))
  setMeta('property', 'og:locale', locale === 'es' ? 'es_ES' : 'en_US')
  setMeta('property', 'og:site_name', t('brand'))
  setMeta('property', 'og:title', t('metaTitle'))
  setMeta('property', 'og:description', t('metaDescription'))
  setMeta('property', 'og:image:alt', t('imageAlt'))
  setMeta('name', 'twitter:title', t('metaTitle'))
  setMeta('name', 'twitter:description', t('metaDescription'))
  setMeta('name', 'twitter:image:alt', t('imageAlt'))

  for (const element of document.querySelectorAll<HTMLElement>('[data-i18n]')) {
    const key = element.dataset.i18n
    if (isMessageKey(key)) element.textContent = t(key)
  }

  for (const element of document.querySelectorAll<HTMLElement>('[data-i18n-placeholder]')) {
    const key = element.dataset.i18nPlaceholder
    if (
      isMessageKey(key) &&
      (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement)
    ) {
      element.placeholder = t(key)
    }
  }

  for (const element of document.querySelectorAll<HTMLElement>('[data-i18n-aria-label]')) {
    const key = element.dataset.i18nAriaLabel
    if (isMessageKey(key)) element.setAttribute('aria-label', t(key))
  }

  writeJsonLd('ld-app', appJsonLd())
  writeJsonLd('ld-faq', faqJsonLd())
  syncLanguageControl()
  bindLanguageControl()
  document.documentElement.classList.add('i18n-ready')
}

function readStoredLocale(): Locale | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    if (value === 'es' || value === 'en') return value
  } catch {
    // Storage can be blocked; the browser language is still available.
  }
  return null
}

function persistLocale(value: Locale): void {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // The choice still applies for this visit.
  }
}

function syncLanguageControl(): void {
  for (const button of document.querySelectorAll<HTMLButtonElement>('[data-locale]')) {
    button.setAttribute('aria-pressed', button.dataset.locale === locale ? 'true' : 'false')
  }
}

function bindLanguageControl(): void {
  if (controlBound) return
  const group = document.querySelector('.lang')
  if (!group) return
  controlBound = true
  group.addEventListener('click', (event) => {
    const target = event.target
    if (!(target instanceof Element)) return
    const next = target.closest<HTMLButtonElement>('[data-locale]')?.dataset.locale
    if (next === 'es' || next === 'en') setLocale(next)
  })
}

function detectLocale(): Locale {
  const preferred = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const language of preferred) {
    const base = language.toLowerCase().split('-')[0]
    if (base === 'es' || base === 'en') return base
  }
  return 'es'
}

function isMessageKey(value: string | undefined): value is MessageKey {
  return value !== undefined && Object.hasOwn(es, value)
}

function setMeta(attribute: 'name' | 'property', key: string, content: string): void {
  document
    .querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
    ?.setAttribute('content', content)
}

function writeJsonLd(id: string, data: unknown): void {
  const script = document.getElementById(id)
  if (script) script.textContent = JSON.stringify(data)
}

function appJsonLd(): unknown {
  const url = document.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.content ?? ''
  const image = document.querySelector<HTMLMetaElement>('meta[property="og:image"]')?.content ?? ''
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: t('brand'),
    url,
    description: t('metaDescription'),
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    inLanguage: locale,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    image,
  }
}

function faqJsonLd(): unknown {
  const pairs: Array<[MessageKey, MessageKey]> = [
    ['faq1q', 'faq1a'],
    ['faq2q', 'faq2a'],
    ['faq3q', 'faq3a'],
    ['faq4q', 'faq4a'],
    ['faq5q', 'faq5a'],
  ]
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pairs.map(([question, answer]) => ({
      '@type': 'Question',
      name: t(question),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(answer),
      },
    })),
  }
}
