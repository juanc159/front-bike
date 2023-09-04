<script setup lang="ts">
import { limitText, num_miles } from '@/@core/utils/validators';
import { useCrudPublicationStore } from '@/pages/Admin/Publication/Store/useCrudPublicationStore';
import headerBiker from '@/pages/headerBiker.vue';
import ws from '@/pages/ws.vue';
const router = useRouter()
const publicationStore = useCrudPublicationStore()
const { publications } = storeToRefs(publicationStore)
onMounted(async () => {
  await fetchPublication()
})

const fetchPublication = async () => {
  await publicationStore.fetchAllData({})
}
const openDetail = async (id: number) => {
  router.push({
    name: 'ViewDetail', params: { id: id }
  })
}


</script>
<template>
  <div>

    <VContainer>

      <headerBiker></headerBiker>
      <VRow>
        <VCol lg="4" sm="6" cols="12" v-for="(item, index) in  publications " :key="index">
          <VCard>

            <VCardText>
              <VCarousel hide-delimiters>
                <VCarouselItem v-for="(image, indexI) in item.files" :key="indexI" :src="image.path"></VCarouselItem>
              </VCarousel>
            </VCardText>

            <VCardItem>
              <VCardTitle>{{ item.name }}</VCardTitle>
            </VCardItem>

            <VCardText>
              <p class="font-weight-medium text-base">
                {{ num_miles(item.price) }}
              </p>

              <p class="mb-0">
                {{ limitText(item.description, 200) }} <span class="text-primary" @click="openDetail(item.id)"
                  style="cursor: pointer;">Leer mas</span>
              </p>
            </VCardText>


            <VCardText>

              <VRow>
                <VCol cols="12" sm="6">
                  <VBtn :to="{
                    name: 'ViewDetail', params: { id: item.id }
                  }" block color="success">
                    <VIcon class="mr-1" icon="tabler-list-details"></VIcon>
                    Ver detalle
                  </VBtn>
                </VCol>

                <VCol cols="12" sm="6">
                  <VBtn variant="outlined" block @click="publicationStore.abrirWhatsApp('hola')">
                    <VIcon class="mr-1" icon="tabler-brand-whatsapp"></VIcon>
                    Contacto
                  </VBtn>
                </VCol>
              </VRow>
            </VCardText>

          </VCard>
        </VCol>
      </VRow>
    </VContainer>

    <ws />

  </div>
</template>
  
  
<route lang="yaml">
path: /
meta:
  layout: blank
  name: Home 
  action: read
  subject: Auth
</route>


 