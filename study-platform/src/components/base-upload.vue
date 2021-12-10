<template>
  <div style="margin-left:100px">
    <!-- 文件上传操作 -->
    <a-upload-dragger :multiple="true"
                      :file-list="fileList"
                      :showUploadList="false"
                      :customRequest="handleUpload"
                      :before-upload="beforeUpload"
                      :accept="accept"
                      class="upLoad">
      <p class="ant-upload-drag-icon">
        <a-icon type="inbox" />
      </p>
      <p class="ant-upload-text">
        点击或拖动文件到当前区域
      </p>
    </a-upload-dragger>

    <!-- 上传后显示的内容 -->
    <div class="upload-content"
         v-for="(item,index) in uploadInfo"
         :key="index">
      <!-- 显示内容 -->
      <a-input type="text"
               class="ant-upload-list ant-upload-list-text upload-input"
               :disabled="true"
               :placeholder="placeholder"
               v-model="item.name">
        <a-icon slot="suffix"
                :type="uploadType"
                v-if="uploadType ==='check-circle'"
                style="color:green;" />
        <a-icon slot="suffix"
                :type="uploadType"
                v-else-if="uploadType ==='close-circle'"
                style="color:red;" />
        <a-icon slot="suffix"
                :type="uploadType"
                v-else-if="uploadType ==='loading'" />
      </a-input>
      <!-- 预览 -->

      <a-tooltip placement="top"
                 v-show="showFile === '2'">
        <template slot="title">
          <span>预览</span>
        </template>
        <a-button type="link"
                  class="btn-preview">
          <a :href="$config.FinUrl +'research/file/download/'+ item.FileIndexSID"
             target="_blank">
            <a-icon type="eye" />
          </a>
        </a-button>
      </a-tooltip>
      <!-- 删除 -->
      <a-tooltip placement="top">
        <template slot="title">
          <span>删除</span>
        </template>
        <a-button type="link"
                  class="btn-delete"
                  @click="onDelete(index,item.name,item.FileIndexSID)">
          <a-icon type="delete"
                  style="color:red;" />
        </a-button>
      </a-tooltip>
      <a-tooltip placement="top"
                 v-if="showDownload">
        <template slot="title">
          <span>模板下载</span>
        </template>
        <a-button type="link"
                  class="btn-delete"
                  @click="onTemplateDownload">
          <a-icon type="download" />
        </a-button>
      </a-tooltip>
    </div>
  </div>
</template>

<script>
// 导入请求的接口
import { postFileUpload } from '@/api/research'
export default {
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    fileType: {
      type: String,
      default: ''
    },
    accept: {
      type: String,
      default: ''
    },
    showDelete: {
      type: Boolean,
      default: false
    },
    showDownload: {
      type: Boolean,
      default: false
    },
    TemplateUrl: {
      type: String,
      default: ''
    },
    value: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      uploadInfo: [],
      fileList: [],
      loading: false,
      uploadType: '',
      showFile: ''
    }
  },
  mounted () {
  },
  methods: {
    beforeUpload (file) {
      // 校验文件大小（不能大于30M）
      const isLt30M = file.size / 1024 / 1024 < 30
      if (!isLt30M) {
        this.$emit('upload-error', { fileType: this.fileType, errorType: '2', errorMsg: '上传文件的大小不能超过30M' })
        return isLt30M
      }
      if (isLt30M) {
        this.uploadInfo.push(file)
        this.fileList.push(file)
      }
      return isLt30M
    },
    // 上传
    async handleUpload ({ file, fileList }) {
      this.uploadType = 'loading'
      this.loading = true
      const formData = new FormData()
      formData.append('file', file)
      // 上传结果
      const result = await postFileUpload(this.$config.FinUrl, formData)
      if (result && result.code === 1) {
        this.uploadType = 'check-circle'
        this.loading = false
        const data = result.response || {}
        // 上传成功的回调
        this.$emit('upload-success', { fileType: file.type, name: file.name, fileIndex: data.fileIndexID })
      } else {
        this.loading = false
        this.uploadType = 'close-circle'
        this.$message.error('文件上传失败：' + result.error)
      }
    },
    onUpload (param, showFile) {
      this.showFile = showFile
      this.uploadType = 'check-circle'
      this.uploadInfo = []
      param.forEach(item => {
        this.$set(item, 'name', item.OrigFileName)
        if (showFile === '2') {
          this.uploadInfo = param
        }
      })
    },
    // 删除上传的文件
    onDelete (index, name, fileIndexSID) {
      console.log(fileIndexSID)
      this.uploadInfo.splice(index, 1)
      this.fileList.splice(index, 1)
      console.log(this.uploadInfo)
      this.$emit('upload-delete', {
        fileType: this.fileType,
        msg: this.placeholder,
        fileIndexSID: fileIndexSID
      })
    },
    InitData () {
      this.uploadInfo = []
      this.fileList = []
      this.uploadType = ''
    },
    // 模板下载
    onTemplateDownload () {
      var downloadElement = document.createElement('a')
      var href = this.TemplateUrl
      downloadElement.href = href
      downloadElement.download = this.placeholder.substring(3) // 下载后文件名
      document.body.appendChild(downloadElement)
      downloadElement.click() // 点击下载
      document.body.removeChild(downloadElement) // 下载完成移除元素
      window.URL.revokeObjectURL(href) // 释放掉blob对象
    }
  }
}
</script>

<style lang="css" scoped>
.upload {
  display: flex;
}

.upload-content {
  flex: 23;
  position: relative;
}

.upload-content .btn-preview,
.upload-content .btn-delete {
  padding: 0 4px;
}

.upload-progress >>> .ant-progress-bg {
  height: 4px !important;
}

.upload-input,
.upload-input >>> input {
  border: none;
  outline: none;
  flex: 23;
  width: 85%;
}

.upload-input[disabled],
.upload-input >>> .ant-input-disabled {
  background-color: #fff !important;
  color: #000;
  font-weight: 400;
}
.upLoad >>> .ant-upload {
  width: 700px;
}
</style>
