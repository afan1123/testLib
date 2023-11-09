<template>
  <div>
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="40%"
      :show-close="false"
      :close-on-click-modal="false"
      :modal="false">
      <div class="content">
        <div class="loading">
          <el-progress v-if="fileState==='pending'" type="circle" :percentage="progressPercent" class="progress_pending"></el-progress>
          <el-progress v-else type="circle" :percentage="100" :status="fileState"></el-progress>
          <span>{{ loadingText[fileState] }}</span>
        </div>
        <div class="file_wrap">
          <div class="file_name">
            <i class="el-icon-tickets"></i>
            <span>{{ fileName }}</span>
            <i class="el-icon-close" @click="CancelQuest"></i>
          </div>
          <el-progress v-if="fileState==='pending'" :percentage="progressPercent"></el-progress>
          <el-progress v-else :percentage="100" :status="fileState"></el-progress>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    fileName: {
      type: String,
      default: ''
    },
    state: {
      type: String,
      default: ''
    },
    progressPercent: {
      type: Number,
      default: 10
    }
  },
  computed: {
    fileState: {
      set() {},
      get() {
        return this.state
      }
    }
  },
  data() {
    return {
      loadingText: {
        success: '上传成功！',
        exception: '上传失败！服务器运行错误！',
        pending: '正在上传中……'
      }
    }
  },
  created() {},
  methods: {
    CancelQuest() {
      this.$emit('CancelQuest')
    }
  }
}

</script>

<style lang='scss' scoped>
  /deep/ .el-dialog {
    .el-dialog__header {
      padding: 0;
    }
    .el-dialog__body {
      padding: 24px 10px 16px;
      .content {
        .el-progress {
          .el-progress-circle {
            width: 48px !important;
            height: 48px !important;
          }
        }
        .loading {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          margin-bottom: 20px;
          height: 48px;
          > span {
            color: rgba(0, 0, 0, 0.85);
            font-size: 16px;
            font-weight: bold;
            margin-left: 20px;
          }
          .progress_pending {
            .el-progress__text {
              display: none !important;
            }
          }
        }
        .file_wrap {
          .file_name {
            margin-bottom: 10px;
            height: 22px;
            display: flex;
            align-items: center;
            justify-content: center;
            i { font-size: 16px;}
            .el-icon-close {
              cursor: pointer;
            }
            span {
              font-size: 14px;
              color: rgba(0, 0, 0, 0.65);
              margin: 0 10px 0 5px;
            }
          }
          .el-progress-bar__outer {
            width: 100%;
          }
        }
      }
    }
  }
</style>