import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEdit, faTrash, faUser, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

library.add(faEdit)
library.add(faTrash)
library.add(faUser)
library.add(faArrowLeft)

Vue.component('fa-icon', FontAwesomeIcon)
