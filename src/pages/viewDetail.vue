<script setup lang="ts">
import { useCrudPublicationStore } from '@/pages/Admin/Publication/Store/useCrudPublicationStore';
import headerBiker from '@/pages/headerBiker.vue';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import { num_miles } from '@/@core/utils/validators';
import 'swiper/css';
const keySwiper = ref(1)
const publicationStore = useCrudPublicationStore()
const { publications } = storeToRefs(publicationStore)
const route = useRoute()
onMounted(async () => {
  publicationStore.fetchAllData({})
  await fetchViewDetailPublication(Number(route.params.id))
})

const publication = ref({
  name: null,
  description: null,
  price: null,
})
const fetchViewDetailPublication = async (id: number) => {
  publication.value = await publicationStore.fetchViewDetail(id)
  keySwiper.value++
}


const onSwiper = (swiper) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log('slide change');
};
const changePage = (id: number) => {
  fetchViewDetailPublication(id)
};
</script>
<template>
  <div>
    <VContainer>
      <headerBiker></headerBiker>

      <VRow>
        <VCol>
          <VCard>
            <VRow>
              <VCol cols="6">
                <div class="ma-auto pa-5">
                  <VCarousel hide-delimiters :key="keySwiper">
                    <VCarouselItem v-for="(image, indexI) in publication.files" :key="indexI" :src="image.path">
                    </VCarouselItem>
                  </VCarousel>
                  <!-- <VImg :src="publication.files[0].path" /> -->
                </div>
              </VCol>
              <VCol cols="6">

                <div>
                  <VCardItem>
                    <VCardTitle>{{ publication.name }}</VCardTitle>
                  </VCardItem>

                  <VCardText>
                    {{ publication.description }}
                  </VCardText>

                  <VCardText class="text-subtitle-1">
                    <span>Precio :</span> <span class="font-weight-medium">${{ num_miles(publication.price) }}</span>
                  </VCardText>

                  <VCardActions class="justify-space-between">
                    <VBtn @click="publicationStore.abrirWhatsApp" variant="outlined" block color="success">
                      <VIcon icon="tabler-brand-whatsapp"></VIcon>
                      Contacto
                    </VBtn>
                    <!-- <IconBtn color="secondary" icon="tabler-share" /> -->
                  </VCardActions>
                </div>
              </VCol>
            </VRow>
          </VCard>
        </VCol>
      </VRow>

      <VRow>
        <VCol>
          <VCard>
            <VCardTitle primary-title>Productos</VCardTitle>
            <VCardText>
              <swiper :slides-per-view="6" :space-between="50" @swiper="onSwiper" @slideChange="onSlideChange">
                <swiper-slide v-for="(item, index) in publications" :key="index">
                  <VCard :to="{
                    name: 'ViewDetail', params: { id: item.id }
                  }" @click="changePage(item.id)">
                    <VImg height="200" cover :src="item.files[0].path"></VImg>
                    <VCardTitle primary-title>{{ item.name }}</VCardTitle>
                    <VCardText class="text-center">
                      <strong class="text-success">{{ item.price }}</strong>
                    </VCardText>
                  </VCard>
                </swiper-slide>
                ...
              </swiper>

            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>
  
  
<route lang="yaml">
path: /detail/:id
name: ViewDetail 
meta:
  layout: blank
  name: ViewDetail 
  action: read
  subject: Auth
</route>
 