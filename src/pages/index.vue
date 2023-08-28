<script setup lang="ts">
import { useCrudPublicationStore } from '@/pages/Admin/Publication/Store/useCrudPublicationStore';
const publicationStore = useCrudPublicationStore()
const { publications } = storeToRefs(publicationStore)
onMounted(async () => {
  await fetchPublication()
})

const fetchPublication = async () => {
  await publicationStore.fetchAll({})
}

</script>
<template>
  <div>
    <h1>
      hola pagina de inicio
      <ul>
        <li v-for="(item, index) in publications" :key="index">
          {{ item }}
        </li>
      </ul>
    </h1>
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
 