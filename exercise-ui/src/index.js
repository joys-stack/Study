import './assets'
import ExButton from './conpoments/button'
import ExIcon from './conpoments/icon'

const conpoments = [ExButton, ExIcon]
const install = Vue => {
    conpoments.forEach(conpoment => {
        Vue.component(conpoment.name, conpoment)
    })
}

export default {
    install,
    ExButton,
    ExIcon
}