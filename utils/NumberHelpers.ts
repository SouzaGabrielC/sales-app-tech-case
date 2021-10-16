export const isValidNumber = (n: unknown) => {
  return !(typeof n !== 'number' || isNaN(n))
}