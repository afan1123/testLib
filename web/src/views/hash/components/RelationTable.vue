<template>
  <div class="relation_table " :class="{display_none: showView}">
    <div class="table_box scroll_head">
      <div class="switch_view" @click="switchView">
        <i class="switch_off" :class="{switch_no: showView}"></i>
      </div>
      <div class="master_node">
        <span>{{master.target}}</span>
        <i class="copy_icon el-icon-document-copy"
        v-clipboard:copy="master.target"
        />
      </div>
      <!-- <el-collapse class="scroll_head" v-model="activeName" accordion   @change="handleChange">
        <el-collapse-item :name="key" v-for="(val,key, index) in tableData" :key="index" :title="key" >
          <div class="item" v-for="(item, index) in val.datas" :key="index">{{item}}</div>
        </el-collapse-item>
      </el-collapse> -->

      <GraphCopy
        v-for="(val,key, index) in tableData" :key="index+key"
        :title="key"
        :dataLength="val.type_total"
        @append="addNodes"
        @download="downloadGraph(key)"
      >
        <div class="info_body">
          <el-tooltip effect="dark" placement="top-start" v-for="(item, index) in val.datas" :key="index" :content="item">
            <div class="item" v-clipboard:copy="item"
              v-clipboard:success="onCopy">
              {{item}}
            </div>
          </el-tooltip>
        </div>
      </GraphCopy>
    </div>
  </div>
</template>

<script>
  import GraphCopy from '@/components/ScalingTitle/GraphCopy'
  import { getGraphFile } from '@/api/exportFile'
  import { getToken } from '@/utils/auth'

  export default {
    name: 'relation-table',
    components: {
      GraphCopy
    },
    props: {
      tableData: {
        type: Object,
        default: () => {}
      },
      master: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        activeName: '',
        showView: true
      }
    },
    methods: {
      handleChange(val) {
        // console.log(val)
      },

      switchView() {
        this.$emit('resizeChange')
        this.showView = !this.showView
      },

      addNodes(key) {
        this.$emit('append', this.master.target, this.master.target, key, this.master.type)
      },

      // 下载graph数据
      downloadGraph(title) {
        const { type, target } = this.master
        const params = {
          type,
          r_types: title,
          target,
          token: getToken()
        }
        getGraphFile(params)
      },

      onCopy() {
        this.$message({
          message: '复制成功！',
          duration: 500
        })
      }
    }
  }
</script>


<style lang="scss" scoped>
.relation_table {
  width: PW(260);
  position: relative;
  border-left: solid 1px rgba(151, 151, 151, 0.2);
  transition: all 200ms ease-in-out 0s;
  .table_box {
    max-height: PW(582);
  }
  .info_body {
    padding: PW(5) 0;
    padding-left: PW(25);
    .item {
      font-family: PingFangSC-Regular;
      font-size: PW(12);
      padding: PW(11) 0;
      color: rgba(255, 255, 255, 0.6);
      overflow: hidden;
      text-overflow:ellipsis;
      word-wrap: break-word;
      white-space: nowrap;
      cursor: pointer;
    }
  }
  .master_node {
    height: PW(40);
    line-height: PW(40);
    padding: PW(8) PW(15);
    background-color: #343a40;
    font-size: PW(14);
    position: relative;
    // border-radius: 2px;
    font-family: PingFang-SC-Bold;
    font-size: PW(14);
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    margin-bottom: PW(6);
    span {
      flex: 1;
      overflow: hidden;
      text-overflow:ellipsis;
      word-wrap: break-word;
      white-space: nowrap;
      margin-right: PW(5);
    }
    .copy_icon {
      cursor: pointer;
      display: inline-block;
      font-size: PW(16);
    }
  }
  &.display_none {
    width: 0;
  }
  .switch_view {
    width: PW(16);
    height: PW(60);
    background-color: rgba(52, 58, 64, 0.3);
    position: absolute;
    left: 0;
    top: PW(10);
    transform: translateX(-100%);
    @include flex_middle;
    color: #fff;
    cursor: pointer;
    .switch_off {
      width: PW(16);
      height: PW(15);
      background: url('../../../assets/images/switch_off.png') center/contain no-repeat;
    }
    .switch_no {
      background: url('../../../assets/images/switch_no.png') center/contain no-repeat;
    }

  }
}
</style>
