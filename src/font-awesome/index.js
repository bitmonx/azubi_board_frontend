import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEdit, faTrash, faUser, faArrowLeft, faUtensils, faWineBottle, faSpinner } from '@fortawesome/free-solid-svg-icons'

library.add(faEdit)
library.add(faTrash)
library.add(faUser)
library.add(faArrowLeft)
library.add(faUtensils)
library.add(faWineBottle)
library.add(faSpinner)

Vue.component('fa-icon', FontAwesomeIcon)
