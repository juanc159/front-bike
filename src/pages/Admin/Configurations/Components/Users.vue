<template>
  <div class="mt-4 mb-4">
    <VRow>
      <VCol cols="6">
        <VRow>
          <VCol>
            <VCard class="mx-auto" max-width="470">
              <VCardText>
                <p class="text-h5 text--primary">Seguridad</p>
                <div class="text--primary">
                  <RouterLink :to="{name:'Admin-Role-Index'}">Roles</RouterLink><br>
                  <!-- <RouterLink to="">Niveles de confidencialidad</RouterLink><br>
                  <RouterLink to="">Adicionar usuarios administradores</RouterLink> -->
                </div>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VCol>
      <VCol cols="6">
        <VRow>
          <VCol>
            <VCard class="mx-auto" max-width="470">
              <VCardText>
                <p class="text-h5 text--primary">Usuarios</p>
                <div class="text--primary">
                  <RouterLink :to="{name:'Admin-User-Index'}">Listar usuarios</RouterLink><br>
                  <!-- <RouterLink to="">Invitar a tu contador</RouterLink><br>
                  <RouterLink to="">Convertir usuarios</RouterLink><br>
                  <RouterLink to="">Cambio de clave por usuario</RouterLink> -->
                </div>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VCol>
    </VRow>
  </div>
</template>
