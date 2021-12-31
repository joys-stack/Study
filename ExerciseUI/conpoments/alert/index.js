import ExAlert from './Alert.vue'

ExAlert.install = Vue => {
    Vue.component(ExAlert.name, ExAlert)
}

export default ExAlert