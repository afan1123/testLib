<template>
  <div class="tab_comments">
    <div class="tab_comments_body" >
<!--      <div class="title">评论消息</div>-->
      <div class="comments_box" v-if="commentList.length">
        <div class="list"
             v-for="(comment, index) in commentList"
             :key="index + comment.create_time">
          <div class="img_left">
            <svg-icon :icon-class="`portrait_${Math.ceil(Math.random()*12)}`" class="portrait" />
          </div>
          <CommentsCard :comment="comment" :showName="true" />
        </div>
        <div class="pagination_box">
          <el-pagination
            class="ve_pagination"
            @size-change="sizeChange"
            @current-change="pageChange"
            :current-page="pagination.page_now"
            :page-sizes="pagination.sizes"
            :page-size="pagination.limit_size"
            prev-text="上一页"
            next-text="下一页"
            :total="tableCount"
            layout="total, prev, next, sizes">
          </el-pagination>
        </div>
      </div>

      <NoData v-else />

      <div class="container_box">
          <div class="title"></div>
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="content">
          </el-input>
      </div>
      <div class="btn submit" @click="submit">确认评论</div>
    </div>
  </div>
</template>

<script>
  import CommentsCard from '@/components/CommentsCard'
  // import { getSampleComments, addComment } from '@/api/v2/center'
  import NoData from '@/components/NoData'
  import { mapGetters } from 'vuex'
  import { getHashType } from '@/utils/validate'

  export default {
    name: 'TabComments',
    computed: {
      ...mapGetters(['userInfo', 'profileInfo'])
    },
    components: {
      NoData,
      CommentsCard
    },
    data() {
      return {
        getHashType,
        tableCount: 0,
        content: '',
        commentList: [],
        pagination: {
          sizes: [20, 40, 60, 80],
          page_now: 1, // 当前页数
          limit_size: 20 // 每页显示条目个数
        }
      }
    },
    created() {
      this.getComentList()
    },
    methods: {
      sizeChange(limit_size) {
        this.pagination.limit_size = limit_size
        this.pagination.page_now = 1
        this.getComentList()
      },

      // 翻页操作
      pageChange(page_now) {
        this.pagination.page_now = page_now
        this.getComentList()
      },

      // 发表评论
      async submit() {
        // const { md5, sha1, sha256 } = this.profileInfo
        // let hashData = {
        //   md5: '',
        //   sha1: '',
        //   sha256: ''
        // }
        // if (md5 && sha1 && sha256) {
        //   hashData = { md5, sha1, sha256 }
        // } else {
        //   const hash = this.$route.params.search
        //   const key = getHashType(hash)
        //   hashData[key] = this.$route.params.search
        // }
        // const params = {
        //   author: this.userInfo.logon_name,
        //   ...hashData,
        //   comments: this.content
        // }
        // try {
        //   const { data: res } = await addComment(params)
        //   if (res.code === 200) {
        //     this.content = ''
        //     this.$message.success('发表成功')
        //     setTimeout(() => {
        //       this.getComentList()
        //     }, 1000)
        //   } else {
        //     this.$message.error(res.msg)
        //   }
        // } catch (err) {
        //   console.error(err)
        //   this.$message.error(err)
        // }
      }

      /**
       * 获取样本内所有评论
       * @returns {Promise<void>}
       */
      // async getComentList() {
      //   const params = {
      //     page_now: this.pagination.page_now,
      //     limit_size: this.pagination.limit_size,
      //     resource: this.$route.params.search
      //   }
      //   try {
      //     const { data: res } = await getSampleComments(params)
      //     if (res.code === 200 && res.data) {
      //       this.commentList = res.data.aa_data
      //       this.tableCount = res.data.count
      //     }
      //   } catch (err) {
      //     console.error(err)
      //   }
      // }
    }
  }
</script>

<style lang="scss" scoped>
.tab_comments {
  padding: PW(20);
  padding-top: PW(16);
  color: #fff;
  >.title {
    line-height: PW(44);
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
  .comments_box {
    margin-bottom: PW(20);
    padding: PW(15);
    padding-top: 0;
    .list {
      display: flex;
      .img_left {
        margin-top: PW(16);
        width: PW(28);
        height: PW(28);
        margin-right: PW(18);
        font-size: PW(28);
        // background-color: rgba(255, 255, 255, 0.85);
        border-radius: 50%;
      }
    }
  }
  .container_box{
    margin-top: PW(20);
    min-height: PW(283);
    display: flex;
    flex-direction: column;
    border-radius: 2px;
    border: solid 1px rgba(255, 255, 255, 0.09);
    .title {
      background-color: #2a2e32;
      line-height: PW(40);
      height: PW(40);
      @include flex_middle;
      justify-content: flex-end;
      padding: 0 PW(20);
      border-bottom: solid 1px rgba(255, 255, 255, 0.09);
      height: PW(40);
      // background: red!important;
      position: relative;
      &::before{
        content: '评论';
        position: absolute;
        width: 4em;
        height: 88%;
        left: PW(40);
        top: 10%;
        transform: translateY(1px);
        background-color: $BgcColor;
        text-align: center;
        font-size: PW(14);
        color: #fff;
        border: solid 1px rgba(255, 255, 255, 0.09);
        border-radius: 2px;
        border-bottom: 0;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
    /deep/ .el-textarea {
      flex: 1;
      display: flex;
      padding-top: .5em;
      .el-textarea__inner {
        flex: 1;
        background-color: transparent;
        border:0;
        outline:none;
        resize:none;
        color: #fff;
      }
    }
  }
  .submit {
    // margin: 0 PW(20);
    margin-top: PW(16);
    text-align: center;
    line-height: PW(40);
    background-color: #2d2f31;
    font-family: PingFangSC-Regular;
    font-size: PW(14);
    border-radius: 2px;
    cursor: pointer;
  }
}
.comments {
  flex: 1;
}
</style>
