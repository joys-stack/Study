import ExButton from './Button.vue'

ExButton.install = Vue => {
    Vue.use(ExButton.name, ExButton)
}

export default ExButton
