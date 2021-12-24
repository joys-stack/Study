//自动化创建通过 build/bin/build-entry.js
import ExButton from '../conpoments/button/index.js';
import ExCol from '../conpoments/col/index.js';
import ExIcon from '../conpoments/icon/index.js';
import ExRow from '../conpoments/row/index.js'

const conpoments = [ExButton,
    ExCol,
    ExIcon,
    ExRow]

const install = Vue => {
    conpoments.forEach(conpoment => {
        Vue.component(conpoment.name, conpoment)
    })
}

export default {
    version:'1.0.1',
    install,
    ExButton,
    ExCol,
    ExIcon,
    ExRow
}
