export function useConfig() {
  const baseURL = ref('https://api.bikers.encode.com.co/api/')
  const base = ref('https://api.bikers.encode.com.co/api/')
  // const baseURL = ref('https://contableback.vetszoo.com/') 

  return {
    baseURL,
    base
  }
}
