import {
  dateFormat,
  getFirstDayOfMonth,
  getLastMonth
} from '../lib/common'

// 时间通用函数
window.Date.prototype.Format = dateFormat
window.Date.prototype.FirstDayOfMonth = getFirstDayOfMonth
window.Date.prototype.LastMonth = getLastMonth
