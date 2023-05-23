/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import layoutsPlugin from '@/plugins/layouts'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@core/scss/template/index.scss'
import '@styles/styles.scss'
import 'sweetalert2/src/sweetalert2.scss'
 

//
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Bold } from '@ckeditor/ckeditor5-basic-styles';
import { Italic } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Link } from '@ckeditor/ckeditor5-link';
import { List } from '@ckeditor/ckeditor5-list';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
//

  
import CKEditor from '@ckeditor/ckeditor5-vue';

import i18n from '@/plugins/i18n'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
loadFonts()

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)


 
// Create vue app
const app = createApp(App)


// Use plugins 
app.use(vuetify)
app.use(pinia)
app.use(router)
app.use(i18n)
app.use(layoutsPlugin) 
app.use(CKEditor) 

// Mount vue app
app.mount('#app')
