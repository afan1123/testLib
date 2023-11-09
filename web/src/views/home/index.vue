<template>
  <div class="home_content">
    <div class="body_box">
      <div class="map_box">
        <!-- 其他 -->
        <div class="map_bgc"></div>
        <div class="red_line"></div>
        <div class="map_dashed"></div>
        <div class="map_border"></div>
        <div class="map">
          <div class="blue_point"></div>
          <div class="red_point"></div>
        </div>
        <div class="map_before"></div>
        </div>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import { getHotRecommend } from '@/api/center'
  import { getToken } from '@/utils/auth'
  import vueSeamlessScroll from 'vue-seamless-scroll'
  import uploadState from './components/uploadState'
  export default {
    name: 'home',
    inject: ['chnageVisible', 'reload'],
    components: {
      vueSeamlessScroll,
      uploadState
    },
    data() {
      return {
        getToken: getToken(),
        hover_tooltip: true,
        search: '',
        isLoading: '',
        hot_recommends: {},
        rank: ['#CF030C', '#CB5303', '#C99403'],
        fileList: [],
        dialogVisible: false,
        fileState: '',
        fileName: '',
        action: `${process.env.BASE_API}center/reports/upload-sample`,
        progressPercent: 0,
        source: axios.CancelToken.source()
      }
    },
    computed: {
      ataTipsHide: {
        get() {
          return this.hover_tooltip && !localStorage.getItem('ataTipsHide')
        },
        set() {}
      }
    },
    mounted() {
      setTimeout(() => {
        this.isLoading = 'opacity_1'
      }, 0)
    },
    created() {
      if (this.getToken) {
        this.getHotRecommeds()
      }
    },
    methods: {
      // 热点推荐
      async getHotRecommeds() {
        try {
          const { data: res } = await getHotRecommend()
          if (res.code === 200 && res.data) {
            this.hot_recommends = res.data
          }
        } catch (error) {
          console.error(error)
        }
      },
      querySearch(queryString, cb) {
        const type = this.$JudgeType(this.search)
        var results = queryString ? this.showSelect(queryString, type) : []
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      handleSelect({ type, search }) {
        this.search = search
        this.query(type)
      },
      showSelect(queryString, type) {
        const select_arr = [
          { search: `${queryString}`, value: `文件哈希：${queryString}`, type: 'hash' },
          { search: `${queryString}`, value: `数字证书：${queryString}`, type: 'credential' },
          { search: `${queryString}`, value: `邮箱：${queryString}`, type: 'email' },
          { search: `${queryString}`, value: `域名：${queryString}`, type: 'domain' },
          { search: `${queryString}`, value: `URL：${queryString}`, type: 'url' },
          { search: `${queryString}`, value: `IP：${queryString}`, type: 'ip' }
        ]
        if (!type) return select_arr
        return select_arr.filter(v => {
          if (type === 'hash' && queryString.length === 40) {
            return ['hash', 'credential'].includes(v.type)
          } else {
            return v.type === type
          }
        })
      },
      query(search_type = '') {
        const type = search_type || this.$JudgeType(this.search)
        // const search = type === 'url' ? encodeURIComponent(this.search) : this.search
        if (type !== 'url') {
          this.search = this.search.toLocaleLowerCase()
        }
        const search = encodeURIComponent(this.search)
        if (!type) return this.$message.warning('请选择类型!')
        this.$router.push({ path: `/home/${type}/intelligence/${search}` })
      },
      ToDetail({ type, value }) {
        const search = type === 'url' ? encodeURIComponent(value) : value
        this.$router.push({ path: `/home/${type}/intelligence/${search}` })
      },
      ToReportDetail({ id }) {
        const path = `/reports/vulnCircular?id=${id}`
        this.$router.push({ path })
      },
      // 选择文件
      fileChange(file, fileList) {
        const isLt10M = file.size / 1024 / 1024 <= 10
        const pos = file.name.lastIndexOf('.')
        const FiletName = file.name.substring(0, pos)
        if (FiletName.length > 64) {
          this.$message({
            type: 'error',
            message: '上传失败，文件名过长（文件名最大长度为128字符）',
            customClass: 'home_message'
          })
          return false
        }
        if (!isLt10M) {
          // this.$message.error('上传失败，文件文件最大10M')
          this.$message({
            type: 'error',
            message: '上传失败，文件大小最大支持10M',
            customClass: 'home_message'
          })
          return isLt10M
        }
      },
      CancelQuest() {
        this.source.cancel()
        this.chnageVisible(false)
        this.dialogVisible = false
        this.reload()
      },
      // 上传文件接口
      async uploadFile(data) {
        this.fileName = data.file.name
        this.chnageVisible(true)
        this.dialogVisible = true
        this.fileState = 'pending'
        try {
          const formdata = new FormData()
          formdata.append('file', data.file)
          formdata.append('Authorization', getToken())
          const config = {
            onUploadProgress: progressEvent => {
              this.progressPercent = Number((progressEvent.loaded / progressEvent.total * 100).toFixed(2))
            },
            cancelToken: this.source.token
          }
          const { data: res } = await axios.post(this.action, formdata, config)
          if (res.code === 200) {
            this.fileList = []
            this.fileState = 'success'
            setTimeout(() => {
              this.chnageVisible(false)
              this.dialogVisible = false
              this.$router.push(`/home/hash/intelligence/${res.data}`)
            }, 3000)
          } else {
            this.closeModel()
          }
        } catch (error) {
          this.closeModel()
          console.error(error)
        }
      },
      closeModel() {
        this.fileState = 'exception'
        this.fileList = []
        setTimeout(() => {
          this.chnageVisible(false)
          this.dialogVisible = false
        }, 2000)
      },
      // 点击不再提示按钮
      closeTip() {
        this.hover_tooltip = false
        localStorage.setItem('ataTipsHide', true)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @keyframes opacity_frames{
      0%{
        opacity: 0;
      }
      100%{
        opacity: 1;
      }
  }
  @keyframes map_before_opacity{
      0%{
        opacity: 0;
      }
      25%{
        opacity: 1;
      }
      50%{
        opacity: 0;
      }
      75%{
        opacity: 1;
      }
      100%{
        opacity: 0;
      }

  }
  @keyframes map_border_rotate{
    0%{
      opacity: 1;
      transform: translate(-47%, -50%) rotateZ(0deg);
    }
    5%{
      opacity: 0;
    }
    8%{
      opacity: 1;
    }
    25%{
      opacity: 0;
    }
    30%{
      opacity:1;
    }
    50%{
      opacity:0;
    }
    55%{
      opacity: 1;
    }
    75%{
      opacity: 0;
    }
    78%{
      opacity: 1;
    }
    96%{
      opacity: 0;
    }
    100%{
      opacity: 1;
      transform: translate(-47%, -50%) rotateZ(360deg);
    }
  }

  @keyframes map_peak2 {
    0%{
      opacity: 1;
    }
    100%{
      opacity: 0;
    }
  }
  @keyframes svg_rotation {
    from {
        -webkit-transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
    }
}
  .home_content{
    background-color: #111213;
    position: relative;
    height: calc(100vh - 60px);
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      opacity: 0.5;
      background-image: url('../../assets/images/home/bgc_d.png');
      background-size: calc(100vh - 60px) 100vw;

    }
    .body_box{
      padding: 2vw 4vw;
      display: flex;
      justify-content: space-between;
      height: 40.7vw;
      // height: calc(100vh - 176px);
  }

    .left_box{
      width: 18vw;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .top_box {
        opacity: 0;
        transition: opacity 0.2s linear;
        height: 15vw;
        background-color: #111213;
        border: solid 1px transparent;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        position: relative;
        .blue_line {
          position: absolute;
          background: rgba(255, 255, 255, 0.3);
          width: 5vw;
          height: 1px;
          right: -5.26vw;
          top: 5.24vw;
        }
        .blue_line1 {
          width: 15vw;
          height: 1px;
          background: rgba(255, 255, 255, 0.3);
          position: absolute;
          right: -20.2vw;
          top: 5.24vw;
          transform-origin: top left;
          transform: rotate(20deg);
          z-index: 1;
        }
        .left_point {
          width: 0.52vw;
          height: 0.52vw;
          position: absolute;
          border-radius: 50%;
          background-color: #366ed5;
          right: -0.26vw;
          top: 5vw;
        }
        .top{
          width: 100%;
          display: flex;
          align-items: center;
          padding: 20px 20px 0 24px;
          .left{
            width: 34px;
            height: 34px;
            background: url('../../assets/images/home/left_top_t_l.png');
          }
          .right{
            margin-left: 10px;
            flex:1;
	          height: 22px;
            background-image: url('../../assets/images/home/left_top_top_r.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
        }
        // .middle{
        //   margin: 0 auto;
        //   width: 86%;
        //   height: 10vw;
        //   background: url('../../assets/images/home/left_top_middle1.png') no-repeat 50%;
        //   background-size: 61% 100%;
        // }
        .middle{
          margin: 0 auto;
          width: 86%;
          height: 8vw;
          background-image: url('../../assets/images/home/left_top_middle.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
          opacity: 0.7;
          position: relative;
          &::before {
            content: '';
            display: inline-block;
            width: 1.2vw;
            height: 1.2vw;
            background-image: url('../../assets/images/home/peak1.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
            position: absolute;
            // left: 3.8vw;
            // top: 2.4vw;
            left: 25%;
            top: 32%;
            animation: map_peak2 1.5s linear infinite;
          }
        }

        .bottom{
          width: 100%;
          height: 47px;
          background-image: url('../../assets/images/home/left_bottom.png');

        }
      }
      .bottom_box{
        opacity: 0;
        transition: opacity 0.2s linear;
        width: 100%;
        position: relative;
      }
      .bottom_box1{
        opacity: 0;
        transition: opacity 0.2s linear;
        width: 100%;
        .top{
          height: 32px;
          background-image: url('../../assets/images/home/left_b_t.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
        .bottom{
          height: 140px;
          margin-top: 35px;
          background: url('../../assets/images/home/left_b_b.png') no-repeat;
          position: relative;
        }
      }
    }

    .map_box{
      flex: 1;
      position: relative;
      >div{
        position: absolute;
        top: 55%;
        left: 48%;
        transform: translate(-50%, -50%);
      }
      .hot_box {
        // width: 320px;
        width: 272px;
        height: 46px;
        position: absolute;
        top: 23px;
        z-index: 1;
        display: flex;
        justify-content: space-between;
        .volume_box {
          display: flex;
          justify-content: flex-start;
          .svg-icon {
            width: 20px !important;
            height: 20px !important;
            position: relative;
            top: -1px;
          }
        }
        .content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .title {
            color: rgba(255, 255, 255, 0.85);
            font-size: 18px;
            letter-spacing: 3px;
          }
          >div:nth-child(2) {
            display: flex;
            justify-content: space-between;
            span, a {
              display: inline-block;
              color: #dd1920;
              font-size: 14px;
            }
          }
        }
      }
      .search_box {
        position: absolute;
        top: 68%;
        left: 50%;
        width: 40vw;
        z-index: 2;
        .search_input_box {
          width: 40vw;
          height: 4vw;
          padding: 9px;
          background-image: url("../../assets/images/home/s_let_top.png"),
                            url("../../assets/images/home/s_right_top.png"),
                            url("../../assets/images/home/s_right_bottom.png"),
                            url("../../assets/images/home/s_left_bottom.png");
          background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
          background-position: top left, top right, bottom left, bottom right;
          /deep/ .el-autocomplete {
            width: 100%;
            height: 100%;
          }
          /deep/ .el-input {
            height: 100%;
            input{
              height: 100%;
              font-family: PingFangSC-Regular;
              font-size: .9vw;
              color: #fff;
              border: solid 1px rgba(255, 255, 255, 0.12);
              background-color: #731519;
              border-right: 0;
              // text-align: center;
            }
            .el-input__suffix {
              display: flex;
              flex-direction: column;
              justify-content: center;
              right: 20px;
              .svg-icon {
                font-size: 1.2vw;
                cursor: pointer;
                color: #e9e9e9;
              }
              .circle {
                display: inline-block;
                width: 2vw;
                height: 2vw;
                border-radius: 1vw;
                display: flex;
                align-items: center;
                justify-content: center;
                &:hover {
                  background: #93050B;
                  .svg-icon {
                    color: #FFF;
                  }
                }
              }
            }
          }
        }
        /deep/ .search_box_empty {
          background-image: url("../../assets/images/home/s_let_top.png"),
                            url("../../assets/images/home/s_right_top.png");
          background-repeat: no-repeat, no-repeat;
          background-position: top left, top right;
          .el-input input {
            background: #8b161b !important;
          }
        }
        .hot_recommend {
          margin: 0 auto;
          width: 39vw;
          background: rgba(23, 26, 28, 0.8);
          padding: 14px 0 6px 12px;
          z-index: 2;
          margin-top: 16px;
          .title {
            color: rgba(255, 255, 255, 0.8);
            font-size: 14px;
            height: 20px;
            line-height: 20px;
            margin-bottom: 12px;
          }
          .content {
            display: flex;
            div {
              width: 50%;
              ul {
                width: 100%;
                li {
                  width: 100%;
                  color: rgba(255, 255, 255, 0.8);
                  font-size: 14px;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  cursor: pointer;
                  height: 22px;
                  line-height: 22px;
                  margin-bottom: 8px;
                  i {
                    margin-right: 10px;
                    display: inline-block;
                    color: #C8C9CC;
                  }
                  span {
                    &:hover {
                      color: #75BBEE;
                    }
                  }
                }
              }
            }
            .hot_item_left {
              border-right: 0.5px solid rgba(255, 255, 255, 0.1);
              padding: 0 12px;
            }
            .vulns_item_right {
              padding-left: 12px;
            }
            .report_dev {
              width: 100%;
            }
          }
        }
        .hot_recommend_nodata {
          height: 315px;
        }

      }
      .map_bgc{
        width: 33vw;
        height: 28vw;
        background-image: url('../../assets/images/home/map_bgc.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .map_dashed {
        width: 34vw;
        height: 34vw;
        background-image: url('../../assets/images/home/dashed.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        z-index: 2;
      }
      .map_border{
        width: 34vw;
        height: 33vw;
        background-image: url('../../assets/images/home/map_border.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        animation: map_border_rotate 60s linear infinite;
      }
      .map{
        width: 26vw;;
        height: 26vw;
        background-image: url('../../assets/images/home/map.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        transform: translate(-47.5%, -50%);
        // transform: translate(-47.5%, -50%);
        position: relative;
        .blue_point {
          width: 3vw;
          height: 3vw;
          position: absolute;
          background-image: url('../../assets/images/home/blue_point.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
          left: 4vw;
          top: 2vw;
        }
        .red_point {
          width: 1.4vw;
          height: 1.5vw;
          position: absolute;
          right: 9vw;
          bottom: 8.8vw;
          background-image: url('../../assets/images/home/red_point.png');
          background-repeat: no-repeat;
          background-size: 100% 100%
        }
      }
      .map_before{
        width: 500px;
        height: 500px;
        background: url('../../assets/images/home/map_before.png') 100% 100% no-repeat;
        animation: map_before_opacity 5s linear infinite;
      }
    }

    .right_box{
      width: 18vw;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      .seamless-warp {
        height: 12vw;
        overflow: hidden;
      }
      .top_box{
        width: 100%;
        opacity: 0;
        transition: opacity 0.2s linear;
      }
      .top_box1 {
        width: 100%;
        height: 11vw;
        opacity: 0;
        transition: opacity 0.2s linear;
        background: url('../../assets/images/home/right_t_bgc.png') no-repeat;
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .bottom_box{
        opacity: 0;
        transition: opacity 0.2s linear;
        width: 100%;
        height: 15vw;
        background-color: #111213;
        border: solid 1px transparent;
        position: relative;
        background: url('../../assets/images/home/right_b_bg.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .red_line {
          width: 5vw;
          height: 1px;
          background: rgba(255, 255, 255, 0.3);
          position: absolute;
          left: -5.26vw;
          bottom: 4.64vw;
        }
        .red_line1 {
          width: 21.2vw;
          height: 1px;
          background: rgba(255, 255, 255, 0.3);
          position: absolute;
          left: -26.4vw;
          bottom: 4.62vw;
          transform-origin: top right;
          transform: rotate(23deg);
          z-index: 1;
        }
        .right_point {
          width: 0.52vw;
          height: 0.52vw;
          border-radius: 50%;
          background-color: #e51400;;
          position: absolute;
          left: -0.26vw;
          top: 10vw;
        }
        &::before {
          content: '';
          display: inline-block;
          width: 0.5vw;
          height: 0.5vw;
          background: url('../../assets/images/home/peak2.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
          position: absolute;
          left: 7.9vw;
          top: 6.5vw;
          animation: map_peak2 1.5s linear infinite;
        }
      }
    }

    .footer{
      // position: relative;
      width: 100%;
      position: fixed;
      left: 0;
      bottom: 0;
      .bgc_01{
        animation: map_before_opacity 10s linear infinite;
        height: 16px;
        background-image: url('../../assets/images/home/footer.png');
      }
      .bgc_02{
        animation: map_before_opacity 10s linear infinite;
        height: 80px;
        background-image: url('../../assets/images/home/footer_02.png');
      }
      .text {
        color: rgba(255, 255, 255, 0.85);
        font-size: 12px;
        position: fixed;
        bottom: 20px;
        display: inline-block;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
        a {
          color: #75BBEE;
        }
      }
    }
    .opacity_1{
      opacity: 1!important;
    }
  }
</style>

<style>
  .tip_box {
    font-size: 12px;
  }
  .tip_box i {
      position: absolute;
      top: 5px;
      right: 5px;
      cursor: pointer;
    }
  .txt {
    margin: 5px 0;
  }
  .tip_box .closeTip {
    text-align: right;
    cursor: pointer;
    text-decoration: underline;
  }
</style>
