import axios from 'axios'
import { useConfig } from '@/composables/useConfig'
const configUse = ref(useConfig())

const baseURL = configUse.value.baseURL+'api'

const config = ref<object>({
  baseURL,
})
 
const axiosIns = axios.create(config.value)

export default axiosIns
