<template>
  <div class="tab_dynamic" v-Loading="Loading">
    <div class="tab_dynamic_body" v-if="JSON.stringify(dynamicData) != '{}'">
      <ScalingTitle title="基本信息" :defaultFlag="true"  :is_badge="false">
        <div class="information_body section">
          <div class="body_box">
            <div class="center">
              <div class="text_row" v-for="item in baseMap" :key="item.key">
                <div class="label">{{ item.label }} : </div>
                <div class="text">{{dynamicInfo[item.key] || '--'}}</div>
              </div>
              <div class="text_row names">
                <div class="label">文件名:</div>
                <div class="name_txt">
                  <p v-for="(name, index) in dynamicInfo.submission_names" :key="'name' + index">{{name}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScalingTitle>
      <ScalingTitle v-if="dynamicData.network" title="网络行为" :defaultFlag="true"  :is_badge="false" class="network">
        <scaling :defaultFlag="true" :title="'HTTP请求' + '（' + dynamicData.network.http.length + '）'">
          <div class="center">
            <div class="text"  v-for="(item, index) in dynamicData.network.http" :key="'http'+index">
              {{item.method}} -> {{item.url}}
            </div>
          </div>
        </scaling>

        <scaling :defaultFlag="true" :title="'DNS解析' + '（' + dynamicData.network.dns.length + '）'">
          <div class="center">
            <div class="text" v-for="(item, index) in dynamicData.network.dns" :key="'dns'+index" >
              {{item.hostname}} -> {{item.ip}}
            </div>
          </div>
        </scaling>

        <scaling :defaultFlag="true" :title="'IP连接' + '（' + dynamicData.network.tcp.length + '）'">
          <div class="center">
            <div class="text" v-for="(item, index) in dynamicData.network.tcp" :key="'tcp' + index" >
              {{item}}
            </div>
            <div class="text" v-for="(item, index) in dynamicData.network.udp" :key="'udp' + index" >
              {{item}}
            </div>
          </div>
        </scaling>

      </ScalingTitle>
    </div>
    <NoData v-else />
  </div>
</template>

<script>
  import scaling from '@/components/scaling'
  import ScalingTitle from '@/components/ScalingTitle'
  import NoData from '@/components/NoData'
  import { parseSize } from '@/filters'
  import { getHashVirus } from '@/api/type'

  export default {
    name: 'TabDynamic',
    components: {
      scaling,
      ScalingTitle,
      NoData
    },
    data() {
      return {
        dynamicData: {},
        Loading: false,
        baseMap: [
          { label: 'MD5', key: 'md5' },
          { label: 'SHA1', key: 'sha1' },
          { label: 'SHA256', key: 'sha256' },
          { label: 'SSDEEP', key: 'ssdeep' },
          { label: 'Magic', key: 'magic' },
          { label: '扫描时间', key: 'scan_date' },
          { label: '文件类型', key: 'file_type' },
          { label: '文件大小', key: 'size' }
        ]
      }
    },
    computed: {
      dynamicInfo() {
        const dynamicInfo = this.dynamicData
        dynamicInfo.size = parseSize(dynamicInfo.size)
        return dynamicInfo
      }
    },
    watch: {
      '$route.params.search': {
        handler(val, oldVal) {
          if (oldVal && val !== oldVal) {
            this.getReportDynamicAla()
          }
        }
      }
    },
    created() {
      this.getReportDynamicAla()
    },
    methods: {
      /**
       * 获取动态分析数据
       * @param commit
       * @param state
       * @param hash
       * @returns {Promise<unknown>}
       */
      async getReportDynamicAla() {
        try {
          this.Loading = true
          const hash = this.$route.params.search
          const { data: res } = await getHashVirus({ hash })
          this.Loading = false
          if (res.data && res.code === 200) {
            this.dynamicData = res.data
          } else {
            this.dynamicData = {}
          }
        } catch (error) {
          this.Loading = false
          console.error(error)
        }
      },
      getFilesystem(key) {
        const data = this.dynamicData.filesystem || {}
        return data[key] || []
      }
    }
  }
</script>

<style lang="scss" scoped>
.tab_dynamic {
  color: #fff;
  position: relative;
  .center{
    font-size: PW(14);
    line-height: PW(35);
    flex:1;
    overflow: hidden;
    // padding-bottom: PW(20);
    .text{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .information_body{
    color: rgba(255, 255, 255, 0.6);
    .body_box{
      display: flex;
    }
  }

}

.text_row {
  display: flex;
  overflow: hidden;
  > * {
    color: #fff;
  }
  .label {
    // text-align: right;
    min-width: PW(80);
    padding-right: PW(10);
    color: #acacbb;
  }
  /deep/ .info {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .name_txt {
    flex: 1;
  }
}
/deep/ .info_body {
  background: rgba(40, 43, 48, 0.6) !important;
}
/deep/ .network {
  .info_body {
    padding: 0;
    background: transparent !important;
  }
  .code_box {
    margin-bottom: 8px;
    .scaling {
      background: #26282C !important;
      .head {
        background: #2C3136 !important;
      }
    }
  }
}
</style>
