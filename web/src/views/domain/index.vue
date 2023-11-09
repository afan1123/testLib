<template>
  <div class="index_content">
    <div class="base_info">
      <div class="info_box">
        <div class="info">
          <div class="operat_name">
            <span class="info_name">{{ $route.params.search }}</span>
            <img v-if="sparkLogo" src="../../assets/images/spark1.png" />
            <div class="info_operat">
              <i
                class="el-icon-copy-document coypbtn"
                v-clipboard:copy="$route.params.search"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
              ></i>
              <el-divider direction="vertical"></el-divider>
              <i class="el-icon-chat-line-square" @click="ToCommentsTab"></i>
              <el-divider direction="vertical"></el-divider>
              <span @click="OpenDistort" class="distort_btn">误报反馈</span>
            </div>
          </div>
          <div class="ve_tag_box">
            <span class="tag_title">VE标签</span>
            <div>
              <span class="ve_tag tag_threat" v-for="(v, k) in intelligence.tags" :key="k" >{{ v }}</span>
            </div>
          </div>
          <div class="user_tag_box">
            <span class="tag_title">用户标签</span>
            <div>
              <VeTag
                v-for="(rule, index) in user_tags"
                :key="'rule' + index + rule"
                :text="rule"
                :tooltip="false"
              />
              <ReadTags
                v-if="true"
                @add="OpenTagDrawer"
              >
                <div class="add_tag read_tags">
                  添加用户标签
                  <i class="el-icon-circle-plus-outline"></i>
                </div>
              </ReadTags>
            </div>
          </div>
        </div>
        <Intell-Level :sorce="intelligence.threat_score" />
      </div>
    </div>
    <!-- VEAI -->
    <!-- <Ve-Ai v-if="sparkLogo" /> -->
    <div class="location">
      <div class="positioning">
        <template v-if="domainwhois">
          <div class="label"><span>注册者:</span> {{ domainwhois.registrar }}</div>
          <div class="label"><span>地区:</span> {{ domainwhois.admin_country }} {{ domainwhois.admin_state_province }} </div>
          <div class="label"><span>注册日期:</span> {{ domainwhois.creation_date | parseTime }}</div>
          <el-tooltip class="item" :manual="!domainwhois.registrant_organization" effect="dark" :content="`所属组织:${domainwhois.registrant_organization}`" placement="top-start">
            <div class="label"><span>所属组织:</span> {{domainwhois.registrant_organization }}</div>
          </el-tooltip>
          <div class="label"><span>PDNS:</span> {{ pnds }}</div>
          <div class="label"><span>更新日期:</span> {{ domainwhois.updated_date | parseTime }}</div>
          <div class="label"><span>Alexa排名:</span> {{ alexa }}</div>
          <div class="label"><span>INAN ID:</span> {{ domainwhois.registrar_iana_id }}</div>
          <div class="label"><span>到期日期:</span> {{ domainwhois.expiration_date | parseTime }}</div>
        </template>
      </div>
    </div>
    <div class="home_body">
      <div>
        <el-tabs type="card"
          @tab-click="handleClick"
          v-model="activeName"
          >
          <el-tab-pane
            :label="item.label"
            :class="item.name"
            :name="item.name"
            v-for="(item, index) in tabMap"
            :key="item.name" >
            <span slot="label" v-if="item.name === 'comments'">评论
              <el-badge class="item" :value="comments.count || 0" :max="99"></el-badge>
            </span>
            <span slot="label" v-if="item.name === 'webresult'">网页结果
              <el-badge class="item" :value="WebResultCount || 0" :max="99"></el-badge>
            </span>
          </el-tab-pane>
        </el-tabs>
        <div class="view_box" :key="showView">
          <keep-alive>
            <router-view
              class="tab_contetnt_body"
              ref="tab_contetnt_body"
            />
          </keep-alive>
        </div>
      </div>
    </div>
    <!-- 误报反馈抽屉 -->
    <DisTort ref="distort" @CloseDistort="CloseDistort" />
    <!-- 添加用户标签抽屉 -->
    <UserTag ref="usertag" @AddSuccess="AddSuccess" @CloseTagDrawer="CloseTagDrawer"></UserTag>

  </div>
</template>

<script>
  import ReadTags from '@/components/readTags/Tags'
  import VeTag from '@/components/veTags'
  import VeAi from '@/components/veAI'
  import DisTort from '@/components/Drawer/distort'
  import UserTag from '@/components/Drawer/userTag'
  import IntellLevel from '@/components/IntellLevel'
  import { getUserTags, getDomainWhois } from '@/api/search'
  import { domainData } from '@/utils/Data'
  import { mapGetters } from 'vuex'
  import { setPageId } from '@/utils/auth'
  export default {
    name: 'index',
    components: {
      ReadTags,
      VeTag,
      DisTort,
      UserTag,
      IntellLevel,
      VeAi
    },
    data() {
      return {
        tabMap: domainData,
        domainwhois: {},
        alexa: '',
        activeName: 'intelligence',
        user_tags: [], // 用户标签
        limitCode: 200,
        showView: true,
        WebResultTotal: 0
      }
    },
    computed: {
      ...mapGetters(['WebResultCount', 'intelligence', 'comments', 'pnds', 'sparkLogo'])
    },
    watch: {
      $route: {
        immediate: true,
        handler({ name, params }, oldVal) {
          this.activeName = name.slice(2)
          if (oldVal && params.search !== oldVal.params.search) {
            /* 清除内存中pnds的数据 */
            localStorage.removeItem('pnds')
            this.$store.commit('REQUIRE_PNDS', '')
            /* 域名调取接口 */
            this.InitDomain()
            setTimeout(() => {
              this.showView = !this.showView
            }, 500)
          }
        }
      }
    },
    created() {
      /* 清除内存中pnds的数据 */
      const pnds = localStorage.getItem('pnds') || ''
      this.$store.commit('REQUIRE_PNDS', pnds)
      /* 域名调取接口 */
      this.activeName = this.$route.name.slice(2)
      this.InitDomain()
    },
    beforeDestroy() {
      localStorage.removeItem('pnds')
    },
    methods: {
      ToCommentsTab() {
        this.handleClick({ name: 'comments' })
      },
      handleClick({ name }) {
        if (name !== this.$route.name.slice(2)) {
          const search = encodeURIComponent(this.$route.params.search)
          this.$router.push(`/home/domain/${name}/${search}`)
        }
      },
      /* 搜索域名调的接口 */
      async InitDomain() {
        setPageId(this.$MapCode.DomainCode)
        this.getUserTags()
        this.getDomainWhois()
        const { search } = this.$route.params
        await this.$store.dispatch('Intelligence', { name: 'domain', search })
        this.$store.dispatch('getSparkHvList', { value: search })
        this.$store.dispatch('comments', { query_string: search, page_now: 1, limit_size: 20 })
        await this.$store.dispatch('WebResultCount', { q: search })
      },

      /* 用户标签 */
      async getUserTags() {
        try {
          const { data: res } = await getUserTags({ query_string: this.$route.params.search })
          if (res.code === 200) {
            this.user_tags = res.data
          }
        } catch (err) {
          console.error(err)
        }
      },

      // 域名的whois
      async getDomainWhois() {
        this.domainwhois = {}
        const res = await getDomainWhois({ arguement: this.$route.params.search })
        if (res.status_code === 200 && res.data && res.data.whois) {
          this.domainwhois = res.data.whois
          this.alexa = res.data.alexa
        }
      },
      onCopy() {
        this.$message({ message: '复制成功！', duration: 500 })
      },
      onError() {
        this.$message.error('复制失败，请手动复制')
      },

      // 打开误报反馈抽屉
      OpenDistort() {
        this.$refs.distort.dialogVisible = true
      },
      // 关闭误报反馈抽屉
      CloseDistort() {
        this.$refs.distort.dialogVisible = false
      },
      // 打开用户标签抽屉
      OpenTagDrawer() {
        this.$refs.usertag.dialogVisible = true
        this.$refs.usertag.HideUserTag = true
        this.$refs.usertag.HideIndustryTag = true
      },
      // 关闭用户标签抽屉
      CloseTagDrawer() {
        this.$refs.usertag.dialogVisible = false
      },
      // 子组件添加标签成功告知父组件
      AddSuccess() {
        this.getUserTags()
      },
      showMsg({ data }) {
        if (data && this.limitCode !== 409 && data.code === 409) {
          this.limitCode = 409
          this.$alert('今日访问接口次数已达到限额, 如有商业需要请联系客服', {
            confirmButtonText: '确定',
            callback: action => {
              this.$router.push('/')
            }
          })
        }
      }
    }
  }
</script>


<style lang="scss" scoped>
.index_content {
  .base_info{
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    background-color: #16181A;
  }
  /deep/ .el-progress, /deep/ .el-progress-bar__inner,  /deep/ .el-progress-bar__outer {
    height: 4px !important;
  }
  .head{
    .title{
      font-family: PingFang-SC-Regular;
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ffffff;
    }
    .head_right{
      display: flex;
      align-items: center;
      button{
        width: 34px;
	      height: 34px;
        background-color: #222529;
        border-radius: 10px;
        border: solid 0.5px rgba(255, 255, 255, 0.1);
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 15px;
        margin-left: 0;
      }
      .save{
        width: 85px;
        height: 34px;
        background-color: #387dff;
        border-radius: 10px;
        border: solid 1px rgba(32, 53, 128, 0.16);
        padding: 0;
        color: #fff;
      }
      .lint{
        border-right: 1px solid #8590b3;
        margin-right: 15px;
        height: 24px;
      }
    }
  }
  .info_box{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .info{
      font-family: PingFang-SC-Bold;
      font-size: 32px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .info_name {
        font-size: 28px;
      }
      .operat_name {
        display: flex;
        align-items: center;
        .info_operat {
          margin-left: 12px;
          display: flex;
          align-items: center;
        }
      }
      .copy_icon {
        cursor: pointer;
        display: inline-block;
        font-size: PW(16);
        width: PW(16);
        height: PW(16);
        background: url('../../assets/images/copy.png') center no-repeat;
        background-size: 100% 100%;
        color: #ACADAE;
      }
      .el-divider {
        height: 14px;
        background-color: #ACADAE;
        margin: 0 8px;
      }
      .distort_btn {
        color: #ACADAE;
        font-size: 14px;
        cursor: pointer;
      }
      i {
        font-size: 16px;
        cursor: pointer;
        color: #ACADAE;
      }
      img {
        position: relative;
        right: -2px;
        top: -10px;
      }
    }

    .ve_tag_box {
      margin: 16px 0;
    }
    .user_tag_box, .ve_tag_box {
      display: flex;
      .tag_title {
        color: rgba(255, 255, 255, 0.85);
        font-size: 14px;
        display: inline-block;
        width: 60px;
        margin-right: 10px;
        height: 26px;
        line-height: 24px;
      }
      div {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .button-new-tag {
          margin-top: 0;
        }
        .ve_tag {
          height: 26px !important;
          line-height: 24px !important;
          background-color: rgba(93, 112, 146, 0.2);
          border-radius: 2px;
          border: solid 1px rgba(93, 112, 146, 0.5);
          color: #FFF;
          font-size: 12px;
          margin: 0;
          margin-right: 10px;
          padding: 0 8px;
        }
        .tag_ai {
          background-color: rgba(63, 177, 246, 0.2);
          border: solid 1px rgba(63, 177, 246, 0.5);
        }
        .tag_threat {
          background-color: rgba(209, 162, 60, 0.2);
          border: solid 1px rgba(209, 162, 60, 0.5);
        }
        .tag_zichan {
          background-color: rgba(194, 40, 39, 0.2);
          border: solid 1px rgba(194, 40, 39, 0.5);
        }
      }
    }
    .add_tag {
      font-size: 12px;
      line-height: 1em;
      display: flex;
      align-items: center;
      color: #fff;
      >i {
        opacity: .5;
        margin-left: PW(6);
      }
    }
  }
  .location{
    background-color: #070910;
    box-shadow: 0px 2px 4px -3px rgba(69, 133, 255, 0.1);
    border: solid 1px #111213;
    .positioning{
      background-color: $BgcColor;
      border-left: 4px solid  rgba(244, 82, 59, 0.5);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .label{
        width: 30%;
        padding:0 30px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 42px;
        letter-spacing: 0px;
        color: #ffffff;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        >span:nth-child(1) {
          color: #ACACBB;
        }
      }
    }
  }
  .home_body{
    background-color: #16181A;
    padding: 30px 0;
    >div:nth-child(1) {
      background-color: $BgcColor;
    }
    /deep/ .el-tabs{
      height: 100%;
      .el-tabs__nav{
        border: none;
      }
      .el-tabs__header{
        height: 56px;
        padding: 2px;
        border-bottom: 2px solid rgba(255, 255, 255, 0.05);
        margin-bottom: 18px;
        background-color: $BgcColor !important;
        .el-tabs__nav-wrap{
          border-bottom: #FFF;
        }
        #tab-spark {
          position: relative;
          &::before {
            content: '';
            display: inline-block;
            width: 16px;
            height: 18px;
            background: url('../../assets/images/spark1.png') no-repeat;
            background-size: 100% 100%;
            position: absolute;
            right: 0;
            top: 35%;
            transform: translateY(-50%);

          }
        }
        .el-tabs__item {
          font-family: PingFangSC-Regular;
          font-size: 15px;
          font-weight: normal;
          font-stretch: normal;
          height: 54px;
          line-height: 54px;
          letter-spacing: 0px;
          border: none;
          color: #FFF;
          position: relative;
          &.is-active{
            font-family: PingFangSC-Medium;
            color: $brightRed;
            // color: #FFF;
            &::after{
              position: absolute;
              bottom: 0;
              width: 60%;
              height: 2px;
              content: '';
              left: 50%;
              transform: translateX(-50%);
              background-color: $brightRed;
            }
          }
          .el-badge__content {
            width: 18px;
            height: 18px;
            border-radius: 9px !important;
            background: $brightRed;
            border: 0;
            padding: 0 6px !important;
            display: inline;
          }
        }
      }
      .el-tabs__content{
        min-height: calc(100% - 86px);
        padding-top: 0;
        .table_page{
          min-height: calc(100vh - 482px);
          .border-box{
            >.title{
              font-family: PingFangSC-Medium;
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #ffffff;
            }
          }
        }
        .no_data {
          margin-top: 0;
        }
      }
    }
    .view_box {
      padding: 0 20px 20px;
    }
  }

}
</style>
