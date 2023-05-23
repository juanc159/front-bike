<script setup lang="ts">
import { AuthenticationStore } from '@/stores/Authentication';
import { useConfig } from '@/composables/useConfig'
const configUse = ref(useConfig())

const authentication = AuthenticationStore()

const logout = async () => {
  await authentication.logout()
}
/* Limpia los datos del storage */
const clearStorage = () => {
  authentication.company = {};
  authentication.getMenuData
}
</script>

<template>
  <VBadge dot location="bottom right" offset-x="3" offset-y="3" bordered color="success">
    <VAvatar class="cursor-pointer" color="primary" variant="tonal">
      <VImg :src="authentication.user?.photo ?? configUse.baseURL + 'img/user.png'" />

      <!-- SECTION Menu -->
      <VMenu activator="parent" width="230" location="bottom end" offset="14px">
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge dot location="bottom right" offset-x="3" offset-y="3" color="success">
                  <VAvatar color="primary" variant="tonal">
                    <VImg :src="authentication.user?.photo" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              {{ authentication.user.name }}
            </VListItemTitle>
            <VListItemSubtitle>
              {{ authentication.user.role_name }}
            </VListItemSubtitle>
          </VListItem>
          <!-- Divider -->
          <VDivider v-if="authentication.company.id && !authentication.user.company_id" class="my-2" />

          <!-- 👉 Cambiar empresa -->
          <VListItem to="/admin/company" @click="clearStorage()"
            v-if="authentication.company.id && !authentication.user.company_id">
            <template #prepend>
              <VIcon class="me-2" icon="tabler-logout" size="22" />
            </template>

            <VListItemTitle>Cambiar Empresa</VListItemTitle>
          </VListItem>

          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem :to="{ name: 'Login' }" @click="logout">
            <template #prepend>
              <VIcon class="me-2" icon="tabler-logout" size="22" />
            </template>

            <VListItemTitle>Cerrar sesión</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
