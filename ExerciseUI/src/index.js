//自动化创建通过 build/bin/build-entry.js
import ExAlert from '../conpoments/alert/index.js';
import ExAvatar from '../conpoments/avatar/index.js';
import ExBacktop from '../conpoments/backtop/index.js';
import ExBadge from '../conpoments/badge/index.js';
import ExBreadcrumb from '../conpoments/breadcrumb/index.js';
import ExBreadcrumbItem from '../conpoments/breadcrumb-item/index.js';
import ExButton from '../conpoments/button/index.js';
import ExButtonGroup from '../conpoments/button-group/index.js';
import ExCard from '../conpoments/card/index.js';
import ExCol from '../conpoments/col/index.js';
import ExIcon from '../conpoments/icon/index.js';
import ExRow from '../conpoments/row/index.js'

const conpoments = [ExAlert,
    ExAvatar,
    ExBacktop,
    ExBadge,
    ExBreadcrumb,
    ExBreadcrumbItem,
    ExButton,
    ExButtonGroup,
    ExCard,
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
    ExAlert,
    ExAvatar,
    ExBacktop,
    ExBadge,
    ExBreadcrumb,
    ExBreadcrumbItem,
    ExButton,
    ExButtonGroup,
    ExCard,
    ExCol,
    ExIcon,
    ExRow
}
