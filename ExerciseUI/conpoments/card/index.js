import ExCard from './Card.vue'

ExCard.install = Vue => {
    Vue.component(ExCard.name, ExCard)
}

export default ExCard