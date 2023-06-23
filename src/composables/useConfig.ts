export function useConfig() {
  const baseURL = ref('https://bikers.encode.com.co/api')
  const base = ref('https://bikers.encode.com.co/api')
  // const baseURL = ref('https://contableback.vetszoo.com/') 

  return {
    baseURL,
    base
  }
}
