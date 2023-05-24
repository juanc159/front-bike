export function useConfig() {
  const baseURL = ref('http://127.0.0.1:8000/api')
  const base = ref('http://127.0.0.1:8000/api')
  // const baseURL = ref('https://contableback.vetszoo.com/') 

  return {
    baseURL,
    base
  }
}
