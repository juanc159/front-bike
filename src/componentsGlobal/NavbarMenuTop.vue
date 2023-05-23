<script setup lang="ts">
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

const titles = [
  {
    title: "Proceso de ventas",
    links: [
      {
        icon: 'tabler-user',
        title: 'Factura',
        to: { name: 'Admin-Invoice-Index' },
      }, 
      {
        icon: 'tabler-user',
        title: 'Recibo Caja',
        to: { name: 'Admin-CashReceipt-Index' },
      }, 
    ]
  },
  {
    title: "Proceso de compras",
    links: [
      // {
      //   icon: 'tabler-user',
      //   title: 'Tercero',
      //   to: { name: 'Admin-Third-Index' },
      // }, 
    ]
  },
  {
    title: "Otros",
    links: [
      // {
      //   icon: 'tabler-user',
      //   title: 'Tercero',
      //   to: { name: 'Admin-Third-Index' },
      // }, 
    ]
  },
  {
    title: "Catalogos",
    links: [
      {
        icon: 'tabler-user',
        title: 'Tercero',
        to: { name: 'Admin-Third-Index' },
      },
      {
        icon: 'tabler-user',
        title: 'Usuario',
        to: { name: 'Admin-User-Index' },
      },
      {
        icon: 'tabler-user',
        title: 'Empleado',
        to: { name: 'Admin-Employee-Index' },
      },
      {
        icon: 'tabler-user',
        title: 'Nómina',
        to: { name: 'Admin-Payroll-Index' },
      },
      {
        icon: 'tabler-user',
        title: 'Producto/Servicio',
        to: { name: 'Admin-Product-Index' },
      },
    ]
  }
]
const router = useRouter()
</script>

<template>
  <VBtn variant="text" color="default" size="small" icon>

    <VIcon size="24" icon="tabler-layout-grid-add" />

    <VMenu activator="parent" offset="14px" location="bottom end">
      <VCard width="430" max-height="560" class="d-flex flex-column">
        <VCardItem class="py-4">
          <VCardTitle  >Módulos</VCardTitle>

          <template #append>
            <VBtn size="x-small" variant="text" color="default" icon>
              <VIcon size="22" icon="tabler-layout-grid-add" />
            </VBtn>
          </template>
        </VCardItem>

        <VDivider />

        <PerfectScrollbar :options="{ wheelPropagation: false }">
          <VRow class="ma-0 mt-n1">
            <VCol v-for="(shortcut, index) in titles" :key="shortcut.title" cols="6"
              class="text-center border-t cursor-pointer pa-4" :class="(index + 1) % 2 ? 'border-e' : ''"
              @click="router.push(shortcut.to)">

              <h6 class="text-base font-weight-semibold mt-2 mb-0">
                {{ shortcut.title }}
              </h6>
              <ul class="mx-5">
                <li style=" list-style-type: circle; text-align: initial;" v-for="(link, indexLink) in shortcut.links">
                  <RouterLink :to="link.to" class="mr-2">{{ link.title }}</RouterLink>
                </li>
              </ul>
            </VCol>
          </VRow>
        </PerfectScrollbar>
      </VCard>
    </VMenu>
  </VBtn>
</template>
