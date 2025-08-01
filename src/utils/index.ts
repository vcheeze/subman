import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const whitespaceRegex = /\s+/

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(fullName: string | undefined) {
  if (!fullName) {
    return ''
  }

  const cleanName = fullName
    .replace(/[^a-zA-Z\s]/g, '') // Remove non-letters
    .trim()

  const words = cleanName
    .split(whitespaceRegex)
    .filter((word) => word.length > 0)
    .filter(
      (word) =>
        !['dr', 'mr', 'mrs', 'ms', 'jr', 'sr'].includes(word.toLowerCase()),
    )

  if (words.length === 0) {
    return ''
  }
  if (words.length === 1) {
    return words[0][0].toUpperCase()
  }

  return words[0][0].toUpperCase() + words.at(-1)?.[0].toUpperCase()
}
