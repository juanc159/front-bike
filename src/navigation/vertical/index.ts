import type { VerticalNavItems } from '@/@layouts/types'

import { AuthenticationStore } from '@/stores/Authentication'

const {getMenuData} = storeToRefs(AuthenticationStore()) 

export default getMenuData as VerticalNavItems