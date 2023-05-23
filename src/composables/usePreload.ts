export function usePreload() {
  const isLoading = ref<boolean>(false)

  return {
    isLoading,
  }
}
