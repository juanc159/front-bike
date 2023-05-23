<script setup lang="ts">
import SelfWithholdingList from '@/pages/Admin/Tax/Components/SelfWithholding/Components/SelfWithholdingList.vue';
import SelfWithholdingForm from '@/pages/Admin/Tax/Components/SelfWithholding/Components/SelfWithholdingForm.vue';
import {useSelfWithholdingStore} from '@/stores/Admin/useSelfWithholdingStore';

const selfWithholdingStore = useSelfWithholdingStore()

const { typeAction } = storeToRefs(selfWithholdingStore)

onUnmounted(() => {
  selfWithholdingStore.$reset();
})

</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard v-show="typeAction !== 'form'" title="Lista autorentenciones">
          <VCardText>
            <SelfWithholdingList :key="selfWithholdingStore.keyList" />
          </VCardText>
        </VCard>
        <VCard v-show="typeAction === 'form'" title="Formulario autorentenciones">
          <VCardText>
            <SelfWithholdingForm />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<!-- <route lang="yaml">
meta:
  action: read
  subject: Auth
  redirectIfLoggedIn: true
  requiredPermission: admin.role.index
</route> -->
