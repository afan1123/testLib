<template>
  <div class="homologous_body">
    <div class="developing_page">
      <img src="../../../assets/images/developing.png" alt="" style="opacity:0.5">
      <div class="developing_text">
        <div class="text1">正在开发中</div>
        <div class="text2">敬请期待项目开放.....</div>
        <el-button type="primary" class="backBtn" @click="backToHome">返回首页</el-button>
      </div>
  </div>
  
  <div  class="tab_homologous" v-if="false">
    <div class="title">代码重用
      <span class="badge_num" v-if="genesMarkData.feature_num">feature: {{genesMarkData.feature_num}}</span>
    </div>
    <div class="reuse_box" v-if="genesMarkData.match_data.length">
      <div class="reuse_item" v-for="(item, index) in genesMarkData.match_data" :key="index">
        <div class="reuse_icon">
          <svg-icon :icon-class="`portrait_${Math.ceil(Math.random()*12)}`" class="portrait" />
        </div>
        <div class="reuse_right">
          <div class="title">{{item.key}}</div>
          <div class="info">
            <div class="label">{{item.nature}}</div>
            <div class="progress_box"  :style="{width: `${item.percent}`}">
              <div class="progress">
                <span></span>
                <!-- <span :style="{width: '90%'}"></span> -->
              </div>
              <div class="count">{{item.num}} 条</div>
              <div class="progress_text">{{item.percent}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="add_list" v-if="genesMarkData.match_data.length > 10">+ 10 数据展示</div> -->
    </div>
    <NoData v-else />

    <div class="title">关联样本</div>
    <el-table
      v-if="genesSampleData.match_data"
      :data="genesSampleData.match_data"
      stripe
      border
      class="table saprk_table" >
      <!-- <el-table-column label="类型" width="120">
        <template slot-scope="{row}">
          <div class="text">{{row.key}}</div>
        </template>
      </el-table-column> -->

      <el-table-column label="SHA256" width="450">
        <template slot-scope="{row}">
          <div class="text">{{row.key}}</div>
        </template>
      </el-table-column>

      <el-table-column label="家族相似度" >
        <template slot-scope="{row}">
          <div class="progress_box"  :style="{width: `${row.percent}`}">
            <div class="progress">
              <span></span>
            </div>
            <div class="count">{{row.num}} 条</div>
            <div class="progress_text">{{row.percent}}</div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div class="add_list" v-if="genesSampleData.match_data.length > 10">+ 10 数据展示</div> -->

  </div>
  </div>
</template>

<script>
  // import { getSample, getMark } from '@/api/v2/genes'
  import { mapGetters } from 'vuex'
  import NoData from '@/components/NoData'

  export default {
    name: 'TabHomologous',
    computed: {
      ...mapGetters(['profileInfo'])
    },
    components: {
      NoData
    },
    data() {
      return {
        DevModule: false,
        genesSampleData: {
          match_data: []
        },
        genesMarkData: {
          match_data: []
        }
      }
    },
    mounted() {
      // this.init()
    },

    methods: {
      backToHome() {
        this.$router.push({ path: `/home` })
      },
      init(flag = 0) {
        const hash = this.$route.params.search
        if (!this.profileInfo.sha256 && flag < 5) {
          setTimeout(() => {
            this.init(flag + 1)
          }, 1000)
          return false
        }
        this.getSampleList(this.profileInfo.sha256 || hash)
        this.getMarkList(this.profileInfo.sha256 || hash)
      },

      // 获取关联样本
      async getSampleList(sha256) {
        // try {
        //   const { data: res } = await getSample({ sha256 })
        //   if (res.code === 200 && res.data) {
        //     this.genesSampleData = {
        //       match_data: [],
        //       ...res.data
        //     }
        //   }
        // } catch (error) {
        //   console.log(error)
        // }
      },

      // 获取代码复用
      async getMarkList(sha256) {
        // try {
        //   const { data: res } = await getMark({ sha256 })
        //   if (res.code === 200 && res.data) {
        //     this.genesMarkData = {
        //       match_data: [],
        //       ...res.data
        //     }
        //   }
        // } catch (error) {
        //   console.log(error)
        // }
      }
    }
  }
</script>

<style lang="scss" scoped>
.homologous_body{
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  .developing_page{
    position: relative;
    // width: PW(553);
    height: PW(215);
    font-size: PW(16);
    color: rgba(255, 255, 255, 0.65) !important;
    display: flex;
    align-items: flex-end;
    .developing_text{
      padding-bottom: 20px;
      .text1{
        font-size: 24px;
        margin: 20px 0;
        color: #fff;
      }
      .text2{
        font-size: 14px;
        margin: 20px 0;
        color: rgb(144, 147, 153);
      }
      .backBtn{
        background-color: #c22827;
	      border-radius: 2px;
        border: #c22827;
        color: #fff;
        padding: 9px 16px;
      }

    }
  }
}

.tab_homologous {
  padding: PW(16) PW(20);
  color: #fff;
  >.title {
    line-height: PW(46);
    font-family: PingFang-SC-Bold;
    padding-left: PW(24);
    margin-top: PW(16);
    font-size: PW(14);
    position: relative;
    &::before {
      position: absolute;
      content: '';
      height: 100%;
      width: PW(4);
      background-color: #a12726;
      border-radius: 2px;
      top: 0;
      left: 0;
    }
  }
  .reuse_box {
    margin-top: PW(8);
    min-height: PW(235);
    font-family: PingFang-SC-Bold;
    color: rgba(255, 255, 255, 0.6);
    font-size: PW(14);
    line-height: 1.5em;
    padding: PW(40) PW(10);
    border-radius: 2px;
    .reuse_item {
      display: flex;
      padding-bottom: PW(15);
      .reuse_icon {
        width: PW(42);
        height: PW(42);
        border-radius: 50%;
        overflow: hidden;
        font-size: PW(42);
      }
      .reuse_right {
        flex: 1;
        padding-left: PW(15);
      }
      .info {
        display: flex;
        font-family: PingFang-SC-Bold;
        font-size: PW(12);
        .title {
          color: #fff;
        }
        .label {
          color: #c22827;
        }
      }
    }
  }
  .table {
    margin-top: PW(8);
  }

  .progress_box {
    min-width: PW(140)!important;
    padding-left: PW(15);
    padding-right: PW(10);
    display: flex;
    align-items: center;
    color: rgba(255, 255, 255, 0.6);
    max-width: 100%;
    .progress {
      flex: 1;
      padding-right: PW(30);
      span {
        display: inline-block;
        width: 100%;
        height: 2px;
        background-color: rgba(245, 34, 45, 0.4);
        border-radius: 3px;
        margin-bottom: PW(4);
        position: relative;
        &::after {
          position: absolute;
          content: '';
          right: PW(-8);
          bottom: PW(-4);
          width: PW(8);
          height: PW(8);
          background-color: rgba(118, 35, 40, 0.4);
          border: solid 1px #762328;
          border-radius: 50%;
          z-index: 9;
        }
      }
    }
    .count {
      position: relative;
      padding-right: .5em;
      margin-right: .5em;
      &::after {
        position: absolute;
        content: '';
        right: 0;
        top: 50%;
        width: 1px;
        height: PW(17);
        transform: translateY(-50%);
        background-color:  rgba(255, 255, 255, 0.6);
        z-index: 9;
      }
    }
  }

  .add_list {
    margin-top: PW(5);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: PingFang-SC-Regular;
    font-size: PW(14);
    height: PW(44);
    background-color: rgba(40, 43, 48, 0.6);
  }
}

.badge_num {
  margin-left: 2em;
	background-color: #ff4d4f;
	border-radius: PW(10);
	font-family: PingFangSC-Regular;
	font-size: PW(12);
  padding: 0 PW(5);
}
</style>
