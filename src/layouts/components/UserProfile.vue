<script setup lang="ts">
import { useConfig } from '@/composables/useConfig';
import { useAuthenticationStore } from '@/stores/useAuthenticationStore.js';

const configUse = useConfig()

const router = useRouter()
const authentication = useAuthenticationStore()

const logout = async () => {
  await authentication.logout()
  router.push({ path: '/login' })
}

/* Limpia los datos del storage */
const clearStorage = () => {
  authentication.company = {}
  authentication.getMenuData
}
</script>

<template>
  <VBadge
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    bordered
    color="success"
  >
    <VAvatar
      class="cursor-pointer"
      color="primary"
      variant="tonal"
    >
      <VImg :src="authentication.user?.photo ?? `${configUse.base}/img/user.png`" />

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                >
                  <VAvatar
                    color="primary"
                    variant="tonal"
                  >
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
          <VDivider
            v-if="authentication.company.id && !authentication.user.company_id"
            class="my-2"
          />

          <!-- 👉 Cambiar empresa -->
          <VListItem
            v-if="authentication.company.id && !authentication.user.company_id"
            to="/admin/company"
            @click="clearStorage"
          >
            <template #prepend>
              <VIcon
                class="me-2"
                icon="tabler-logout"
                size="22"
              />
            </template>

            <VListItemTitle>Cambiar Empresa</VListItemTitle>
          </VListItem>

          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem
            @click="logout"
          >
            <template #prepend>
              <VIcon
                class="me-2"
                icon="tabler-logout"
                size="22"
              />
            </template>

            <VListItemTitle>Cerrar sesión</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
