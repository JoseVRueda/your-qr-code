import { applyTranslations, onLocaleChange, t, type MessageKey } from './i18n'
import {
  buildPayload,
  contrastWarning,
  renderCanvas,
  renderSvg,
  type ContrastWarning,
  type ErrorLevel,
  type QrInput,
  type QrStyle,
  type QrType,
  type WifiEncryption,
} from './qr'

applyTranslations()
onLocaleChange(() => {
  void refresh()
})

const form = document.querySelector<HTMLFormElement>('#composer')
const panels = document.querySelectorAll<HTMLElement>('.panel')
const urlInput = document.querySelector<HTMLInputElement>('#url')
const textInput = document.querySelector<HTMLTextAreaElement>('#text')
const ssidInput = document.querySelector<HTMLInputElement>('#ssid')
const passwordInput = document.querySelector<HTMLInputElement>('#password')
const encryptionInput = document.querySelector<HTMLSelectElement>('#encryption')
const hiddenInput = document.querySelector<HTMLInputElement>('#hidden-network')
const emailInput = document.querySelector<HTMLInputElement>('#email')
const phoneInput = document.querySelector<HTMLInputElement>('#phone')
const sizeInput = document.querySelector<HTMLInputElement>('#size')
const sizeValue = document.querySelector<HTMLOutputElement>('#size-value')
const levelInput = document.querySelector<HTMLSelectElement>('#level')
const foregroundInput = document.querySelector<HTMLInputElement>('#foreground')
const backgroundInput = document.querySelector<HTMLInputElement>('#background')
const stage = document.querySelector<HTMLElement>('#stage')
const empty = document.querySelector<HTMLElement>('#empty')
const canvas = document.querySelector<HTMLCanvasElement>('#canvas')
const warning = document.querySelector<HTMLElement>('#warning')
const error = document.querySelector<HTMLElement>('#error')
const payloadBox = document.querySelector<HTMLElement>('#payload')
const payloadText = document.querySelector<HTMLElement>('#payload-text')
const pngButton = document.querySelector<HTMLButtonElement>('#png')
const svgButton = document.querySelector<HTMLButtonElement>('#svg')
const copyButton = document.querySelector<HTMLButtonElement>('#copy')
const status = document.querySelector<HTMLElement>('#status')

if (
  !form ||
  !urlInput ||
  !textInput ||
  !ssidInput ||
  !passwordInput ||
  !encryptionInput ||
  !hiddenInput ||
  !emailInput ||
  !phoneInput ||
  !sizeInput ||
  !sizeValue ||
  !levelInput ||
  !foregroundInput ||
  !backgroundInput ||
  !stage ||
  !empty ||
  !canvas ||
  !warning ||
  !error ||
  !payloadBox ||
  !payloadText ||
  !pngButton ||
  !svgButton ||
  !copyButton ||
  !status
) {
  throw new Error('A page element is missing.')
}

const ui = {
  form,
  urlInput,
  textInput,
  ssidInput,
  passwordInput,
  encryptionInput,
  hiddenInput,
  emailInput,
  phoneInput,
  sizeInput,
  sizeValue,
  levelInput,
  foregroundInput,
  backgroundInput,
  stage,
  empty,
  canvas,
  warning,
  error,
  payloadBox,
  payloadText,
  pngButton,
  svgButton,
  copyButton,
  status,
}

let renderToken = 0
let currentSvg = ''
let timer = 0
let statusTimer = 0

ui.form.addEventListener('submit', (event) => {
  event.preventDefault()
})

ui.form.addEventListener('input', () => {
  updateSizeLabel()
  syncWifiFields()
  scheduleRender()
})

ui.form.addEventListener('change', (event) => {
  const target = event.target
  if (target instanceof HTMLInputElement && target.name === 'type') {
    showPanel(target.value as QrType)
    focusActiveField()
  }
  updateSizeLabel()
  syncWifiFields()
  void refresh()
})

ui.pngButton.addEventListener('click', () => {
  download(t('filePng'), ui.canvas.toDataURL('image/png'))
})

ui.svgButton.addEventListener('click', () => {
  if (!currentSvg) return
  const blob = new Blob([currentSvg], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  download(t('fileSvg'), url)
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
})

ui.copyButton.addEventListener('click', () => {
  void copyImage()
})

showPanel('url')
updateSizeLabel()
syncWifiFields()
clearPreview(t('empty'))

function scheduleRender(): void {
  window.clearTimeout(timer)
  timer = window.setTimeout(() => {
    void refresh()
  }, 80)
}

async function refresh(): Promise<void> {
  const token = ++renderToken
  const { payload, hint } = buildPayload(readInput())
  const style = readStyle()

  if (!payload) {
    clearPreview(hint ? t(hint) : t('empty'))
    return
  }

  try {
    await renderCanvas(ui.canvas, payload, style)
    const svg = await renderSvg(payload, style)
    if (token !== renderToken) return
    currentSvg = svg
    showPreview(payload, style)
  } catch {
    if (token !== renderToken) return
    currentSvg = ''
    showFailure(t('tooLong'))
  }
}

function readInput(): QrInput {
  const type = selectedType()
  switch (type) {
    case 'url':
      return { type, value: ui.urlInput.value }
    case 'text':
      return { type, value: ui.textInput.value }
    case 'email':
      return { type, value: ui.emailInput.value }
    case 'phone':
      return { type, value: ui.phoneInput.value }
    case 'wifi':
      return {
        type,
        ssid: ui.ssidInput.value,
        password: ui.passwordInput.value,
        encryption: ui.encryptionInput.value as WifiEncryption,
        hidden: ui.hiddenInput.checked,
      }
  }
}

function readStyle(): QrStyle {
  return {
    size: Number(ui.sizeInput.value),
    level: ui.levelInput.value as ErrorLevel,
    foreground: ui.foregroundInput.value,
    background: ui.backgroundInput.value,
  }
}

function selectedType(): QrType {
  const selected = ui.form.querySelector<HTMLInputElement>('input[name="type"]:checked')
  const value = selected?.value
  if (value === 'text' || value === 'wifi' || value === 'email' || value === 'phone') {
    return value
  }
  return 'url'
}

function showPanel(type: QrType): void {
  for (const panel of panels) {
    panel.hidden = panel.dataset.type !== type
  }
}

function focusActiveField(): void {
  const panel = document.querySelector<HTMLElement>(`.panel[data-type="${selectedType()}"]`)
  panel?.querySelector<HTMLElement>('input, textarea')?.focus()
}

function updateSizeLabel(): void {
  ui.sizeValue.textContent = `${ui.sizeInput.value} px`
}

function syncWifiFields(): void {
  const openNetwork = ui.encryptionInput.value === 'nopass'
  ui.passwordInput.disabled = openNetwork
}

function showPreview(payload: string, style: QrStyle): void {
  ui.stage.classList.add('is-ready')
  ui.stage.style.background = style.background
  ui.stage.style.setProperty('--qr-size', `${style.size}px`)
  ui.empty.hidden = true
  ui.canvas.hidden = false
  ui.error.hidden = true
  ui.payloadText.textContent = payload
  ui.payloadBox.hidden = false
  setBusy(false)

  const message = contrastMessage(contrastWarning(style.foreground, style.background))
  ui.warning.hidden = !message
  ui.warning.textContent = message ?? ''
}

function clearPreview(message: string): void {
  currentSvg = ''
  const context = ui.canvas.getContext('2d')
  context?.clearRect(0, 0, ui.canvas.width, ui.canvas.height)
  ui.stage.classList.remove('is-ready')
  ui.stage.style.background = ''
  ui.empty.hidden = false
  ui.empty.textContent = message
  ui.canvas.hidden = true
  ui.warning.hidden = true
  ui.error.hidden = true
  ui.payloadBox.hidden = true
  ui.payloadText.textContent = ''
  clearStatus()
  setBusy(true)
}

function showFailure(message: string): void {
  currentSvg = ''
  ui.stage.classList.remove('is-ready')
  ui.empty.hidden = true
  ui.canvas.hidden = true
  ui.warning.hidden = true
  ui.payloadBox.hidden = true
  ui.error.hidden = false
  ui.error.textContent = message
  clearStatus()
  setBusy(true)
}

function setBusy(disabled: boolean): void {
  ui.pngButton.disabled = disabled
  ui.svgButton.disabled = disabled
  ui.copyButton.disabled = disabled
}

function download(filename: string, href: string): void {
  const link = document.createElement('a')
  link.href = href
  link.download = filename
  link.click()
}

async function copyImage(): Promise<void> {
  try {
    if (!navigator.clipboard?.write) throw new Error('Clipboard unavailable')
    const blob = new Promise<Blob>((resolve, reject) => {
      ui.canvas.toBlob((result) => {
        if (result) resolve(result)
        else reject(new Error('No image'))
      }, 'image/png')
    })
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
    setStatus('copied')
  } catch {
    setStatus('copyFailed')
  }
}

function contrastMessage(warning: ContrastWarning | null): string | null {
  const keys: Record<ContrastWarning, MessageKey> = {
    low: 'contrastLow',
    darkBackground: 'contrastDark',
  }
  return warning ? t(keys[warning]) : null
}

function setStatus(key: MessageKey): void {
  ui.status.dataset.i18n = key
  ui.status.textContent = t(key)
  window.clearTimeout(statusTimer)
  statusTimer = window.setTimeout(() => {
    clearStatus()
  }, 2500)
}

function clearStatus(): void {
  delete ui.status.dataset.i18n
  ui.status.textContent = ''
  window.clearTimeout(statusTimer)
}
