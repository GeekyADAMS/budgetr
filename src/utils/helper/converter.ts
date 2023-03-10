export function hexToRgb(hex: string | undefined, opacity: number = 1): string {
  if (!hex) return `rgba(0,0,0, ${opacity})`

  hex = hex.replace('#', '')

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

export function stringToCamelCase<T extends string>(str: T): T {
  let result = ''
  let nextCharUppercase = false

  for (let i = 0; i < str.length; i++) {
    const char = str[i]

    if (char === ' ') {
      nextCharUppercase = true
    } else {
      if (nextCharUppercase) {
        result += char.toUpperCase()
        nextCharUppercase = false
      } else {
        result += char.toLowerCase()
      }
    }
  }

  return result as T
}
