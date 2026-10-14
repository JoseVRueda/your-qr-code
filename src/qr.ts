import QRCode from 'qrcode'

export type QrType = 'url' | 'text' | 'wifi' | 'email' | 'phone'
export type ErrorLevel = 'L' | 'M' | 'Q' | 'H'
export type WifiEncryption = 'WPA' | 'WEP' | 'nopass'

export type QrInput =
  | { type: 'url'; value: string }
  | { type: 'text'; value: string }
  | {
      type: 'wifi'
      ssid: string
      password: string
      encryption: WifiEncryption
      hidden: boolean
    }
  | { type: 'email'; value: string }
  | { type: 'phone'; value: string }

export interface QrStyle {
  size: number
  level: ErrorLevel
  foreground: string
  background: string
}

export interface PayloadResult {
  payload: string
  hint?: string
}

const SCHEME = /^[a-z][a-z0-9+.-]*:/i

export function buildPayload(input: QrInput): PayloadResult {
  switch (input.type) {
    case 'url':
      return { payload: normalizeUrl(input.value) }
    case 'text':
      return { payload: input.value.trim() }
    case 'email':
      return { payload: buildEmail(input.value) }
    case 'phone':
      return { payload: buildPhone(input.value) }
    case 'wifi':
      return buildWifi(input)
  }
}

export function contrastWarning(foreground: string, background: string): string | null {
  const fg = relativeLuminance(foreground)
  const bg = relativeLuminance(background)
  if (fg === null || bg === null) return null

  const [hi, lo] = fg > bg ? [fg, bg] : [bg, fg]
  const ratio = (hi + 0.05) / (lo + 0.05)

  if (ratio < 4) {
    return 'El contraste es bajo y puede costar escanear el código.'
  }
  if (bg < fg) {
    return 'El fondo es más oscuro que los módulos. Algunos lectores esperan módulos oscuros sobre fondo claro.'
  }
  return null
}

export function renderCanvas(
  canvas: HTMLCanvasElement,
  text: string,
  style: QrStyle,
): Promise<void> {
  return QRCode.toCanvas(canvas, text, {
    width: style.size,
    margin: 2,
    errorCorrectionLevel: style.level,
    color: {
      dark: style.foreground,
      light: style.background,
    },
  })
}

export function renderSvg(text: string, style: QrStyle): Promise<string> {
  return QRCode.toString(text, {
    type: 'svg',
    width: style.size,
    margin: 2,
    errorCorrectionLevel: style.level,
    color: {
      dark: style.foreground,
      light: style.background,
    },
  })
}

function normalizeUrl(raw: string): string {
  const value = raw.trim()
  if (!value || /^[a-z][a-z0-9+.-]*:\/?\/?$/i.test(value)) return ''
  if (SCHEME.test(value)) return value
  return `https://${value}`
}

function buildEmail(raw: string): string {
  const value = raw.trim()
  if (!value) return ''
  return /^mailto:/i.test(value) ? value : `mailto:${value}`
}

function buildPhone(raw: string): string {
  const value = raw.trim()
  if (!value) return ''
  const number = value.replace(/^tel:/i, '').replace(/[^\d+*#]/g, '')
  if (!number || number === '+') return ''
  return `tel:${number}`
}

function buildWifi(input: Extract<QrInput, { type: 'wifi' }>): PayloadResult {
  const ssid = input.ssid.trim()
  if (!ssid) return { payload: '' }

  const password = input.password
  if (input.encryption !== 'nopass' && password.length === 0) {
    return {
      payload: '',
      hint: 'Añade la contraseña o elige «Sin contraseña».',
    }
  }

  const parts = [`WIFI:T:${input.encryption}`, `S:${escapeWifi(ssid)}`]
  if (input.encryption !== 'nopass') parts.push(`P:${escapeWifi(password)}`)
  if (input.hidden) parts.push('H:true')
  return { payload: `${parts.join(';')};;` }
}

function escapeWifi(value: string): string {
  return value.replace(/[\\;,":]/g, (char) => `\\${char}`)
}

function relativeLuminance(hex: string): number | null {
  const channels = parseHex(hex)
  if (!channels) return null
  const [r, g, b] = channels.map((channel) => {
    const value = channel / 255
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function parseHex(hex: string): [number, number, number] | null {
  const match = /^#?([0-9a-f]{6})$/i.exec(hex.trim())
  if (!match) return null
  const value = Number.parseInt(match[1], 16)
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255]
}
