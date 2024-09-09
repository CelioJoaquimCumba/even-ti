export const enum LOCAL_STORAGE_KEYS {
  SPACE = 'space',
}

export const setLocalStorage = (key: LOCAL_STORAGE_KEYS, value: unknown) => {
  const serializedValue = JSON.stringify(value)
  localStorage.setItem(key, serializedValue)
}
export const removeLocalStorage = (key: LOCAL_STORAGE_KEYS) => {
  localStorage.removeItem(key)
}

export const getLocalStorage = (key: LOCAL_STORAGE_KEYS) => {
  if (typeof window === 'undefined') return null
  const value = localStorage.getItem(key)
  if (!value || value === 'undefined') {
    return null
  }
  return JSON.parse(value)
}
