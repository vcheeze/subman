export const getFromLocalStorage = <T>(key: string): T | null => {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return null
  }
}

export const saveToLocalStorage = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') {
    return
  }

  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}
