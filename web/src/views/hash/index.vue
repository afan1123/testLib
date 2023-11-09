<template>
  <div class="hash_content">
    <!-- 头部基本信息 -->
    <div class="base_info" v-Loading="HeaderLoading">
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
              <el-divider direction="vertical"></el-divider>
              <span v-if="FileCode && FileCode === 200" class="file_btn_ok" @click="ClickFile"><svg-icon icon-class="sample_ok"></svg-icon>动态报告</span>
              <!-- <span v-else-if="FileCode && FileCode === 200 && SandBoxSorce=== 0" class="file_btn_error"><svg-icon icon-class="sample_ok"></svg-icon>动态报告</span> -->
              <span v-else class="file_btn_error">
                <svg-icon
                  v-if="FIleNameIsOwner && RunningNum > 0 && FileCode!==404"
                  :class="{rotating_two:FileCode===210}"
                  :icon-class="FileCode && iconState[FileCode]">
                </svg-icon>动态报告
              </span>
              <!-- <el-divider direction="vertical"></el-divider>
              <span class="refresh_pull" @click="reload"><svg-icon icon-class="refresh_pull"></svg-icon></span> -->
            </div>
          </div>
          <div class="ve_tag_box">
            <span class="tag_title">VE标签</span>
            <div>
              <span class="ve_tag tag_threat" v-for="(v, k) in formatInfoData.tags" :key="k + v" >{{ v }}</span>
              <span class="ve_tag red" v-if="hashHeader.tags_hunter.length" v-for="(item, index) in hashHeader.tags_hunter" :key="index + item" >{{ item }}</span>
              <span class="ve_tag blue" v-if="hashHeader.tags_vt.length" v-for="(item, index) in hashHeader.tags_vt" :key="index + item">{{ item }}</span>
              <span class="ve_tag red" v-if="hashHeader.rules_hunter.length" v-for="(item, index) in hashHeader.rules_hunter" :key="index + item">{{ item }}</span>
              <span class="ve_tag red" v-if="hashHeader.rules_yara.length" v-for="(item, index) in hashHeader.rules_yara" :key="index + item">{{ item }}</span>
            </div>
          </div>
          <div class="user_tag_box">
            <span class="tag_title">用户标签</span>
            <div>
              <VeTag
                v-for="(rule, index) in UserTags"
                :key="'rule' + index + rule"
                :text="rule"
                :tooltip="false"
              />
              <ReadTags @add="OpenTagDrawer">
                <div class="add_tag read_tags">
                  添加用户标签
                  <i class="el-icon-circle-plus-outline"></i>
                </div>
              </ReadTags>
            </div>
          </div>
        </div>
        <div class="info_icon_box">
          <div
            class="image_icon yara"
            v-if="filterArr(hashHeader.rules_yara).length"
          ></div>
          <div
            class="image_icon hunting"
            v-if="filterArr(hashHeader.rules_hunter).length"
          ></div>
          <div
            class="image_icon"
            v-if="SandBoxSorce !== ''"
            :class="'sb_' + getSandBoxLevel(SandBoxSorce, 1)"
          >
            <!-- <span>{{ SandBoxSorce }}</span> -->
          </div>
          <div
            class="image_icon"
            v-if="hashHeader.level >= 0"
            :class="'ai_' + getLevel(hashHeader.level, 10).class"
          >
            <span>{{ hashHeader.level * 10 }}</span>
          </div>
          <div
            class="image_icon"
            v-if="formatInfoData.threat_score || formatInfoData.threat_score === 0"
            :class="'ti_' + getLevel(formatInfoData.threat_score).class"
          >
            <span style="fontSize:24px">{{ $IntellLevel(formatInfoData.threat_score).iconText }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- VEAI -->
    <!-- <Ve-Ai v-if="sparkLogo" /> -->
    <!-- 内容 -->
    <div class="location" v-Loading="ProfileLoading">
      <div class="positioning">
        <div class="label mdfive">
          <span>威胁等级:</span>
          <VeTag
            v-if="formatInfoData.threat_score"
            :tooltip="false"
            :class="getLevel(formatInfoData.threat_score / 10, 10).class"
            :text="getLevel(formatInfoData.threat_score / 10, 10).text"
            />
            <span v-else>&nbsp;--</span>
        </div>
        <div class="label"
          v-for="(item, index) in labelMap"
          :key="index + item.key"
          :class="item.key">
          <span>{{ item.label }}:</span>
          <VeTag
            v-if="item.key === 'file_type' && formatInfoData[item.key]"
            :text="formatInfoData[item.key]"
            :tooltip="false"
          />
          <el-tooltip
            v-else-if="formatInfoData[item.key] && item.tooltip"
            class="item"
            effect="dark"
            :content="formatInfoData[item.key].toString()"
            placement="top-start"
          >
            <span class="info">
              {{ formatInfoData[item.key].toString() }}
            </span>
          </el-tooltip>
          <span class="info" v-else-if="formatInfoData[item.key]">
            {{ formatInfoData[item.key].toString() }}
          </span>
          <span class="info" v-else>--</span>
        </div>
        <div class="label threat_label">
          <span>威胁情报:</span>
          <template v-if="iocData">
            <VeTag
              v-if="iocData.categories"
              class="mr"
              v-for="(categorie, index) in iocData.categories"
              :key="'categorie' + categorie + index"
              :text="categorie"
              :tooltip="false"
            />
            <VeTag
              v-if="iocData.families"
              class="mr yellow"
              v-for="(familie, index) in iocData.families"
              :key="'familie' + familie + index"
              :text="familie"
              :tooltip="false"
            />
            <VeTag
              v-if="iocData.organizations"
              class="mr red"
              v-for="(org, index) in iocData.organizations"
              :key="'org' + org + index"
              :text="org"
              :tooltip="false"
            />
          </template>
          <span class="info" v-else>&nbsp;--</span>
        </div>
      </div>
    </div>
    <div class="home_body">
      <div class="details_info">
        <el-tabs
          type="card"
          @tab-click="handleClick"
          v-model="tabPageName"
        >
          <el-tab-pane
            :label="item.label"
            :class="item.name"
            :name="item.name"
            v-for="(item, index) in tabMap"
            :key="item.name">
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
  import UserTag from '@/components/Drawer/userTag'
  import DisTort from '@/components/Drawer/distort'
  import { hashData } from '@/utils/Data'
  import { getLevel, getSandBoxLevel } from '@/utils/index'
  import { mapGetters } from 'vuex'
  import { AddUserTag } from '@/api/center'
  import { getHashHeader, getPermaLink } from '@/api/type'
  import { setPageId } from '@/utils/auth'
  export default {
    name: 'index',
    inject: ['reload'],
    components: {
      ReadTags,
      VeTag,
      DisTort,
      UserTag,
      VeAi
    },
    data() {
      return {
        aiTags: [],
        tabPageName: 'intelligence',
        hashHeader: {},
        activeName: 'intelligence',
        iocData: {},
        showView: true,
        addUserTag: false,
        HeaderLoading: false,
        userTagStr: '',
        labelMap: [
          { label: 'MD5', key: 'md5', tooltip: true },
          { label: 'SHA1', key: 'sha1', tooltip: true },
          { label: 'SHA256', key: 'sha256', tooltip: true },
          { label: '曾用名', key: 'file_name', tooltip: true },
          { label: '文件大小', key: 'file_size', tooltip: false },
          { label: '文件类型', key: 'file_type', tooltip: false },
          { label: 'ssdeep', key: 'ssdeep', tooltip: true },
          { label: '杀软告警', key: 'virus_name', tooltip: false },
          { label: '编译时间', key: 'petsTime', tooltip: false },
          { label: '首次发现', key: 'found_time', tooltip: false },
          { label: '最近发现', key: 'last_seen', tooltip: false },
          { label: '入库时间', key: 'active_time', tooltip: false }
        ],
        tabMap: hashData,
        iconState: {
          '500': 'sample_error',
          '210': 'sample_running'
        }
      }
    },
    computed: {
      ...mapGetters([
        'profileInfo',
        'DynamicAnalysisData',
        'staticInfoData',
        'intelligenceData',
        'comments',
        'UserTags',
        'FileCode',
        'SandBoxSorce',
        'ProfileLoading',
        'FIleNameIsOwner',
        'RunningNum',
        'sparkLogo',
        'WebResultCount'
      ]),
      formatInfoData() {
        if (this.isObjNull(this.profileInfo) || !this.profileInfo) {
          return {}
        }
        try {
          const infoData = this.profileInfo
          if (!this.isObjNull(infoData)) {
            if (infoData.detection_ratio && infoData.detection_ratio.length) {
              infoData.virus_name = infoData.detection_ratio[0] >= 4 ? '恶意' : '非恶意'
            }
          }
          // 处理威胁情报数据
          if (!this.isObjNull(infoData)) {
            if (infoData && infoData.ioc && infoData.ioc.length) {
              this.iocData = infoData.ioc[0]
            } else {
              this.iocData = null
            }
          }
          return infoData
        } catch (error) {
          console.log('formatInfoData error:', error)
        }
      }
    },
    watch: {
      $route: {
        immediate: true,
        handler({ name, params }, oldVal) {
          this.tabPageName = name.slice(2)
          if (oldVal && params.search !== oldVal.params.search) {
            setPageId(this.$MapCode.HashCode)
            this.$store.dispatch('infoInitialize', params.search)
            this.$store.dispatch('WebResultCount', { q: params.search })
            this.getHashHeader(params.search)
            setTimeout(() => {
              this.showView = !this.showView
            }, 500)
          }
        }
      }
    },
    created() {
      setPageId(this.$MapCode.HashCode)
      const hash = this.$route.params.search
      this.$store.dispatch('infoInitialize', hash)
      this.$store.dispatch('WebResultCount', { q: hash })
      this.getHashHeader(hash)
    },
    methods: {
      async getHashHeader(hash) {
        try {
          this.HeaderLoading = true
          const { data: res } = await getHashHeader({ hash })
          this.HeaderLoading = false
          if (res.code === 200) {
            this.hashHeader = res.data || {}
            this.aiTags = [
              ...this.profileInfo.tags,
              ...this.hashHeader.tags_hunter || [],
              ...this.hashHeader.tags_vt || [],
              ...this.hashHeader.rules_hunter || [],
              ...this.hashHeader.rules_yara || []
            ]
          }
        } catch (error) {
          this.HeaderLoading = false
          console.error(error)
        }
      },
      ToCommentsTab() {
        this.handleClick({ name: 'comments' })
      },
      handleClick({ name }) {
        if (name !== this.$route.name.slice(2)) {
          const search = encodeURIComponent(this.$route.params.search)
          this.$router.push(`/home/hash/${name}/${search}`)
        }
      },
      delUserTags() {
        this.$confirm('确认删除吗？', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.updatedUserTag('del')
        }).catch(() => {
          this.$message.info('已取消删除')
        })
      },
      // 点击动态报告
      async ClickFile() {
        try {
          const resource = localStorage.getItem('local_md5')
          const { data: res } = await getPermaLink({ resource })
          if (res.code === 200) {
            window.open(res.data[0])
          }
        } catch (error) {
          console.error(error)
        }
      },
      // 添加研判标签
      async updatedUserTag(type) {
        const params = {
          query_string: this.formatInfoData.md5,
          tags: type ? '' : this.userTagStr
        }
        try {
          const { data: res } = await AddUserTag(params)
          this.addTagClose()
          if (res.code === 200) {
            this.$message.success(type ? '删除成功' : '添加成功')
            setTimeout(() => {
              this.$store.dispatch('getUserTags', this.formatInfoData.md5)
            }, 500)
          }
        } catch (error) {
          console.error(error)
        }
      },
      addTagClose() {
        this.addUserTag = false
        this.userTagStr = ''
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
        this.$store.dispatch('getUserTags', this.formatInfoData.md5)
      },
      /**
       * 过滤数组内 null 空值
       * @param {String[]} tags
       */
      filterArr(tags = []) {
        return tags.filter(e => !!e)
      },
      getLevel(level, take) {
        return getLevel(level, take)
      },
      getSandBoxLevel(level, take) {
        return getSandBoxLevel(level, take)
      },
      isObjNull(obj) {
        return !obj && JSON.stringify(obj) === '{}'
      }
    }
  }
</script>


<style lang="scss" scoped>
.hash_content {
  .base_info{
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    background-color: #16181A;
    position: relative;
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
        display: inline-block;
        font-size: 28px;
        max-width: 500px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .operat_name {
        display: inline-block;
        display: flex;
        align-items: center;
        .info_operat {
          margin-left: 12px;
          display: flex;
          align-items: center;
          .svg-icon {
            font-size: 16px;
            margin-right: 10px;
          }
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
      .file_btn_ok {
        @extend .distort_btn;
        color: #FFF;
        display: flex;
      }
      .file_btn_error {
        color: #5a5b59;
        font-size: 14px;
        display: flex;
      }
      .refresh_pull {
        display: flex;
        cursor: pointer;
        font-size: 16px;
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
        flex: 1;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .button-new-tag {
          margin-top: 0;
          margin-bottom: 3px;
        }
        .ve_tag {
          margin: 0 !important;
          margin-right: 8px !important;
          margin-bottom: 4px !important;
          height: 26px !important;
          padding: 0 8px;
          line-height: 24px !important;
          background-color: rgba(93, 112, 146, 0.2);
          border-radius: 2px;
          border: solid 1px rgba(93, 112, 146, 0.5);
          color: #FFF;
          font-size: 12px;
          &.tag_ai {
            background-color: rgba(63, 177, 246, 0.2);
            border: solid 1px rgba(63, 177, 246, 0.5);
          }
          &.tag_threat {
            background-color: rgba(209, 162, 60, 0.2);
            border: solid 1px rgba(209, 162, 60, 0.5);
          }
          &.tag_zichan {
            background-color: rgba(194, 40, 39, 0.2);
            border: solid 1px rgba(194, 40, 39, 0.5);
          }
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
  .info_icon_box {
    display: flex;
  }
  .image_icon {
    width: PW(98);
    height: PW(98);
    overflow: hidden;
    color: #fffeef;
    font-size: PW(38);
    @include flex_middle;
    font-family: PingFang-SC-Bold;
    margin-right: PW(10);
    &.ai_red {
      background: url('../../assets/images/hash/ai_red.png') center/100% no-repeat;
    }
    &.ai_gray {
      background: url('../../assets/images/hash/ai_gray.png') center/100% no-repeat;
    }
    &.ai_green {
      background: url('../../assets/images/hash/ai_green.png') center/100% no-repeat;
    }
    &.ai_yellow {
      background: url('../../assets/images/hash/ai_yellow.png') center/100% no-repeat;
    }
    &.hunting {
      background: url('../../assets/images/hash/hunting.png') center/100% no-repeat;
    }
    &.ti_green, &.ti_gray {
      background: url('../../assets/images/hash/ti_green.png') center/100% no-repeat;
    }
    &.ti_yellow {
      background: url('../../assets/images/hash/ti_orange.png') center/100% no-repeat;
    }
    &.ti_red {
      background: url('../../assets/images/hash/ti_red.png') center/100% no-repeat;
    }
    &.yara {
      background: url('../../assets/images/details/yara.png') center/100% no-repeat;
    }
    &.sb_zero {
      background: url('../../assets/images/hash/sb_zero.png') center/100% no-repeat;
    }
    &.sb_one {
      background: url('../../assets/images/hash/sb_one.png') center/100% no-repeat;
    }
    &.sb_two {
      background: url('../../assets/images/hash/sb_two.png') center/100% no-repeat;
    }
    &.sb_three {
      background: url('../../assets/images/hash/sb_three.png') center/100% no-repeat;
    }
    &.sb_four {
      background: url('../../assets/images/hash/sb_four.png') center/100% no-repeat;
    }
    &.sb_five {
      background: url('../../assets/images/hash/sb_five.png') center/100% no-repeat;
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
  .location{
    background-color: #070910;
    box-shadow: 0px 2px 4px -3px rgba(69, 133, 255, 0.1);
    border: solid 1px #111213;
    position: relative;
    .positioning{
      background-color: $BgcColor;
      border-left: 4px solid  rgba(244, 82, 59, 0.5);
      display: flex;
      align-items: center;
      flex-wrap: wrap;
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
        display: inline-block;
        .ve_tag {
          margin: 0 !important;
          margin-left: 4px !important;
          vertical-align: middle;
        }
        >span:nth-child(1) {
          color: #ACACBB;
        }
      }
      .threat_label {
        width: 60%;
        display: flex;
        align-items: center;
      }
      .file_type, .mdfive {
        display: flex;
        align-items: center;
      }
    }
  }
  .ve_dialog {
    /deep/ .el-dialog {
      width: 500px!important;
    }
    .dialog_body {
      display: flex;
      align-items: center;
      .label {
        padding-right: 1em;
        color: #fff;
      }
      /deep/ .el-input {
        max-width: PW(220);
      }
    }
  }
  /deep/ .el-badge__content {
    background: #f42741;
    border: 0;
    padding: 0 6px !important;
    display: inline;
  }
  @import "~@/styles/hunting.scss";
}
</style>
