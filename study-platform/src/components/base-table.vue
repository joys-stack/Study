<template>
  <div class="common common-table">
    <a-table
      ref="commmonTableRef"
      :columns="columns"
      :data-source="data"
      :bordered="bordered"
      :scroll="{ x: '100%', y:y}"
      :pagination="false"
      :rowKey="record=>record[rowKey]"
      :loading="loading"
      @change="handleChange"
      :row-selection="showRowSelection? { selectedRowKeys: rowSelectKeys, onChange: onSelectChange, type: checkType } : null"
      :customRow="openCustomRow ? customRow : null"
      :type="checkType"
      :rowClassName="()=> rowClassName"
    >
      <template
        slot="index"
        slot-scope="text, record, index"
      >
        {{(pagination.current-1)*pagination.pageSize+parseInt(index)+1}}
      </template>
      <template
        slot-scope="text,record"
        :slot="slot"
        v-for="slot in Object.keys($scopedSlots).filter(key => key !== 'expandedRowRender') "
      >
        <slot
          :name="slot"
          v-bind="record"
        ></slot>
      </template>
    </a-table>
    <div
      class="common-pagination"
      v-if="showPagination"
    >
      <a-pagination
        show-size-changer
        show-quick-jumper
        v-model="pagination.current"
        :page-size-options="pagination.pageSizeOptions"
        :total="pagination.total"
        :show-total="total => `共 ${total} 条`"
        :page-size="pagination.pageSize"
        @showSizeChange="onShowSizeChange"
        @change="onChange"
      >
      </a-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      default: function () {
        return []
      }
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    bordered: {
      type: Boolean,
      default: true
    },
    pagination: {
      type: Object,
      default() {
        return {
          current: 1,
          pageSize: 150,
          total: 0,
          pageSizeOptions: ['150', '250', '350', '450']
        }
      }
    },
    // 是否展示分页，默认为true
    showPagination: {
      type: Boolean,
      default: true
    },
    // 计算表格高度的数值
    subHeight: {
      type: Number,
      default: 258
    },
    rowKey: {
      type: String
    },
    rowSelectKeys: {
      type: Array,
      default: () => {
        return []
      }
    },
    showRowSelection: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    openCustomRow: {
      type: Boolean,
      default: true
    },
    checkType: {
      type: String,
      default: 'checkbox'
    },
    rowClassName: {
      type: String,
      default: ''
    }
  },
  watch: {
    subHeight() {
      this.onResize()
    }
  },
  data() {
    return {
      tableObj: {},
      y: 0,
      selectIndex: -1
    }
  },
  created() {
  },
  activated() {
    // 动态生成表格的高度
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },
  destroyed() {
    window.removeEventListener('resize', this.onResize)
  },
  mounted() {
    this.onFindObject(this.$refs.commmonTableRef)
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      // 页面大小改变重置表格的高度
      this.$forceUpdate()
      this.tableObj.$el.style.height = window.innerHeight - this.subHeight + 'px'
      this.y = window.innerHeight - this.subHeight
    },
    onShowSizeChange(current, pageSize) {
      this.$emit('showSizeChange', current, pageSize)
    },
    // 递归查询表格的 类 ant-table-body 对象
    onFindObject(obj) {
      if (obj.$children && obj.$children.length > 0) {
        obj.$children.forEach(item => {
          if (obj.$el.className === 'ant-table-body') {
            this.tableObj = obj
            return
          }
          this.onFindObject(item)
        })
      }
    },
    handleChange(pagination, filters, sorter) {
      this.$emit('change', filters, sorter)
    },
    onChange(pageNumber) {
      this.$emit('pageChange', pageNumber)
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.$emit('rowSelectChange', selectedRowKeys, selectedRows)
    },
    customRow(record, index) {
      return {
        on: {
          // 行点击时间
          click: (event) => {
            this.selectIndex = index
            this.$emit('rowClick', record)
          },
          // 行双击事件
          dblclick: (event) => {
            this.$emit('rowDBClick', record)
          },
          contextmenu: (event) => { },
          // 鼠标移入行事件
          mouseenter: (event) => { },
          // 鼠标移出行事件
          mouseleave: (event) => { }
        }
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
