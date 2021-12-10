<!--
@Author DZY
@Description 基础的时间组件
@CreateDate 2021-02-19
@ModifyAuthor
@ModifyDate
@ModifyDescription
-->
<template>
  <a-date-picker
    v-if="type === 'date'"
    v-model="currentValue"
    :style="dateStyle"
    :show-time="showTime"
    :format="format"
    :default-value="defaultValue"
    :disabled="disabled"
    :placeholder="placeholder"
    @change="onChange"
  />
  <a-month-picker
    v-else-if="type === 'month'"
    v-model="currentValue"
    :style="dateStyle"
    :show-time="showTime"
    :format="format"
    :default-value="defaultValue"
    :disabled="disabled"
    :placeholder="placeholder"
    @change="onChange"
  />
</template>

<script>
import moment from 'moment'
export default {
  props: {
    dateStyle: {
      type: Object,
      default: function () {
        return {
          width: '200px'
        }
      }
    },
    showTime: {
      type: Object,
      default: function () {
        return null
      }
    },
    format: {
      type: String,
      default: ''
    },
    valueFormat: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    defaultValue: [String, Object],
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'date'
    }
  },
  data() {
    return {
      currentValue: ''
    }
  },
  watch: {
    currentValue: {
      deep: true,
      handler(newVal, oldVal) {
        const value = this.dateFormat(newVal)
        this.$emit('value', value)
      }
    },
    defaultValue: {
      deep: true,
      handler(newVal, oldVal) {
        if (this.isEmpty(newVal)) {
          this.currentValue = null
        } else {
          if (typeof newVal === 'string') {
            this.currentValue = moment(newVal)
          }
        }
      }
    }
  },
  created() {
    // 设置值
    this.setValue()
  },
  methods: {
    isEmpty(value) {
      if (!value || value === '') {
        return true
      }
      return false
    },
    setValue() {
      this.currentValue = this.defaultValue
    },
    onChange(date, dateString) {
      this.currentValue = date
    },
    dateFormat(val) {
      if (val) {
        if (val['_isUTC'] && val['_offset'] && val['_offset'] > 0) {
          const date = new Date(val['_d'])
          date.setHours(date.getHours() - val['_offset'] / 60)
          return date.Format(this.valueFormat)
        } else {
          return new Date(val['_d']).Format(this.valueFormat)
        }
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
