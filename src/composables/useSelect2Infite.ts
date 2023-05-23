import { ref, watch } from 'vue'

export function useSelect2Infite(fun,arrayData,filterDta = {}) {
  const searchQuery = ref<string>("")
  const dataNueva = ref<Array<object>>([])
  const page = ref<number>(1)
  const totalLinks = ref<number>(1)
  const filterInterno = ref<object>({})
  
 

  const prev = async () => {
    page.value--
    if(page.value<=1) page.value = 1
    await search()    
  }

  const next = async () => {
    page.value++
    console.log(totalLinks.value);
    

    if(page.value > totalLinks.value){
      page.value = totalLinks.value
    }
    await search()    
  }

  const search = async ()=>{
    let filter = {
      page: page.value,
      searchQuery: searchQuery.value
    }
    for (const key in filterDta) {
      filter[key] = filterDta[key]
    }
    for (const key in filterInterno.value) {
      filter[key] = filterInterno[key]
    }

    totalLinks.value = await fun(filter)     
    dataNueva.value = arrayData.value
  }
  
  watch(searchQuery, async (newQuestion, oldQuestion) => {
    page.value = 1
    let filter = {
      page: page.value,
      searchQuery: newQuestion
    }
    for (const key in filterDta) {
      filter[key] = filterDta[key]
    }
    for (const key in filterInterno.value) {
      filter[key] = filterInterno[key]
    }

    await fun(filter)
    dataNueva.value = [];
    dataNueva.value.push(...arrayData.value)
  })

  return { 
    searchQuery,
    dataNueva,
    page,
    filterInterno,
    next,prev,search,totalLinks
  }
}
