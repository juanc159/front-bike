export function useConfig() {
  const baseURL = ref('https://back-bike.test/api')
  const base = ref('https://back-bike.test/api')
  // const baseURL = ref('https://contableback.vetszoo.com/') 

  return {
    baseURL,
    base
  }
}
