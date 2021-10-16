export const isValidDate = (d) => {
  return d instanceof Date && !isNaN(d.getTime());
}

export const checkDateStringFormat = (s: string) => {
  return /^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(s)
}