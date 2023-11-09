<template>
  <!-- <div class="details_body" v-if="0"> -->
  <div class="details_body" v-Loading="Loading">
    <div class="details scroll_head"  v-if="JSON.stringify(reportInfo) != '{}'">
      <ScalingTitle title="摘要信息" :defaultFlag="true" :is_badge="false">
        <div class="information_body section">
          <div class="body_box">
            <div class="center">
              <div class="text">
                <span class="label">MD5 :</span>
                {{ reportInfo.md5 || "--" }}
              </div>
              <div class="text">
                <span class="label">SHA1 :</span>
                {{ reportInfo.sha1 || "--" }}
              </div>
              <div class="text">
                <span class="label">SHA256 :</span>
                {{ reportInfo.sha256 || "--" }}
              </div>
              <div class="text">
                <span class="label">SSDEEP :</span>
                {{ reportInfo.ssdeep || "--" }}
              </div>
              <div class="text">
                <span class="label">ImpHash :</span>
                {{ reportInfo.imphash || "--" }}
              </div>
              <div class="text">
                <span class="label">文件名 :</span>
                {{ reportInfo.file_names.join() || "--" }}
              </div>
              <div class="text">
                <span class="label">文件大小 :</span>
                <span v-if="reportInfo.size">{{
                  reportInfo.size | parseSize
                }}</span>
                <span v-else>--</span>
              </div>
            </div>
          </div>
        </div>
      </ScalingTitle>

      <ScalingTitle
        title="图片"
        :defaultFlag="!!reportInfo.image && !!reportInfo.image.length"
        :badgeData="reportInfo.image"
      >
        <div class="images_body section">
          <!-- <div class="img_box"  v-if="reportInfo.Image.length"> -->
          <div class="img_box ve_swiper_box" v-if="reportInfo.image.length">
            <swiper :options="swiperOption">
              <swiper-slide
                v-for="(item, index) in reportInfo.image"
                :key="index"
              >
                <div
                  @click="
                    openImg(
                      `${BASE_API}export/image?filename=${item.image_md5}&type=${item.image_type}`
                    )
                  "
                >
                  <span style="opacity: 0">'</span>
                  <!-- <img src="http://172.16.70.101:8081/orion/profilereport/image?filename=a8088ebcd0e8f6e194a576efa1902522.PNG" alt=""> -->

                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="item.image_md5 || '--'"
                    placement="top-start"
                  >
                    <img
                      :src="`${BASE_API}export/image?filename=${item.image_md5}&type=${item.image_type}`"
                      alt=""
                    />
                  </el-tooltip>
                </div>
              </swiper-slide>
              <div class="swiper-button swiper-button-prev" slot="button-prev">
                <svg-icon icon-class="swiper_prev" class="swiper_prev" />
              </div>
              <div class="swiper-button swiper-button-next" slot="button-next">
                <svg-icon icon-class="swiper_next" class="swiper_next" />
              </div>
            </swiper>
            <!-- <img v-for="(item, index) in reportInfo.Image" :key="index" :src="`data:image/${item.Image_Type};base64,${item.Image_Stream}`" v-if="item.Image_Type!='ioc'"> -->
          </div>
          <no-data v-else />
        </div>
      </ScalingTitle>

      <ScalingTitle
        title="特征标签"
        :defaultFlag="!!reportInfo.tags && !!reportInfo.tags.length"
        :badgeData="reportInfo.tags"
      >
        <div class="tags_body section">
          <div class="tag_box" v-if="reportInfo.tags.length">
            <VeTag
              class="orange mr mb"
              v-for="(tag, index) in reportInfo.tags"
              :key="index + tag"
              :text="tag"
              :tooltip="false"
            />
          </div>
          <no-data v-else />
        </div>
      </ScalingTitle>

      <ScalingTitle
        title="规则标签"
        :defaultFlag="!!reportInfo.ttags && !!reportInfo.ttags.length"
        :badgeData="reportInfo.ttags"
      >
        <div class="tags_body section">
          <div class="tag_box" v-if="reportInfo.ttags.length">
            <VeTag
              class="red mr mb"
              v-for="(tag, index) in reportInfo.ttags"
              :key="index + tag"
              :text="tag"
              :tooltip="false"
            />
          </div>
          <no-data v-else />
        </div>
      </ScalingTitle>

      <ScalingTitle
        title="基本信息"
        :defaultFlag="true"
        :badgeData="reportInfo.basic_information"
      >
        <div class="basic_info_body section">
          <div class="macro" v-if="reportInfo.basic_information">
            <div
              class="list_box"
              :class="{ bgc_none: reportInfo.basic_information.length < 3 }"
            >
              <div
                class="list"
                v-for="(info, key, index) in reportInfo.basic_information"
                :key="index"
              >
                <div class="label">{{ key }}：</div>
                <div class="text">{{ info }}</div>
              </div>
            </div>
          </div>
          <no-data v-else />
        </div>
      </ScalingTitle>

      <!-- <div class="Content_Data section">
        <div class="title">
          <span>样本入库时间</span>
        </div>
        <div class="macro">
          {{reportInfo.Timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}
        </div>
      </div> -->
      <ScalingTitle title="正文" :badgeData="reportInfo.content.content_data">
        <div class="content_data_body section scroll_head">
          <div class="macro" v-if="reportInfo.content.content_data">
            {{ reportInfo.content.content_data }}
          </div>
          <no-data v-else />
        </div>
      </ScalingTitle>

      <ScalingTitle title="宏代码" :badgeData="reportInfo.macros">
        <div class="macro_code_body section">

          <div
            class="code_box scroll_head"
            v-if="reportInfo.macros && reportInfo.macros.length"
          >

            <scaling
              :title="item.macros_record_name"
              v-for="(item, index) in reportInfo.macros"
              :key="index"
            >
              <div>
                <div class="list_box">
                  <div class="laber">Macros_Func_Name</div>
                  <div
                    class="list"
                    v-for="(funcName, idx) in item.macros_func_name"
                    :key="idx"
                  >
                    {{ funcName }}
                  </div>
                </div>
                <div class="list_box">
                  <div class="laber">Macros_SSDEEP</div>
                  <div
                    class="list"
                    v-for="(ssdeep, idx) in item.macros_ssdeep"
                    :key="idx"
                  >
                    {{ ssdeep }}
                  </div>
                </div>
                <!-- <div class="list_box" v-if="item.Macros_Code_Property.length"> -->

                <div class="list_box">
                  <div class="laber">Macros_Code</div>

                  <div class="macros_code">
                  <i class="el-icon-copy-document copy_icon copy_icon_cos macros_code_copy" v-clipboard:copy="item.macros_code.replace(/\\n/g, '\n\t').replace('[', '').replace(']', '')" v-clipboard:success="onCopy" v-clipboard:error="onError"/>

                    <MyCode :CodeString="item.macros_code" />
                  </div>
                </div>
              </div>
            </scaling>
          </div>
          <no-data v-else />
        </div>
      </ScalingTitle>

      <ScalingTitle
        title="宏代码字符串"
        :badgeData="reportInfo.macros_string_list"
      >
        <div class="macros_string_body section">
          <div
            class="code_box scroll_head"
            v-if="reportInfo.macros_string_list.length"
          >
            <scaling title="macros_string_list">
              <div class="list_box scroll_head">
                <div
                  class="list"
                  v-for="(item, index) in reportInfo.macros_string_list"
                  :key="index"
                >
                  {{ item }}
                </div>
              </div>
            </scaling>
          </div>
          <no-data v-else />
        </div>
      </ScalingTitle>

      <ScalingTitle title="控件信息" :badgeData="reportInfo.control_string">
        <div class="control_body section">
          <div class="code_box" v-if="reportInfo.control_string.length">
            <scaling
              v-for="(item, index) in reportInfo.control_string"
              :key="index"
              className="one"
              :title="item.control_record_name"
            >
              <div class="list_box">
                <div
                  class="list"
                  v-for="(ControlString, idx) in item.control_string"
                  :key="idx"
                >
                  {{ ControlString }}
                </div>
              </div>
            </scaling>
          </div>
          <no-data v-else />
        </div>
      </ScalingTitle>

      <ScalingTitle title="内嵌文件" :badgeData="reportInfo.embedding_file">
        <div class="embedding_file_body section">
          <div v-if="embedding_file.length">
            <div class="macro">
              <el-table
                v-if="embedding_file"
                stripe
                border
                :data="embedding_file"
                class="spark_table"
                style="width: 100%"
              >
                <el-table-column label="文件名称">
                  <template slot-scope="{ row }">
                    <div class="text">{{ row.file_name }}</div>
                  </template>
                </el-table-column>

                <el-table-column label="文件大小">
                  <template slot-scope="{ row }">
                    <div class="text" v-if="row.file_size != ''">
                      {{ row.file_size | parseSize }}
                    </div>
                    <div class="text" v-else>--</div>
                  </template>
                </el-table-column>

                <el-table-column label="操作">
                  <template slot-scope="{ row }">
                    <div class="operation">
                      <i
                        class="el-icon-view"
                        v-if="row.file_sha256"
                        v-toInfo="{ value: row.file_sha256, type: 4 }"
                      ></i>
                      <el-popover placement="right" trigger="click">
                        <div class="popover_body">
                          <div class="file_list">
                            <div class="label">MD5:</div>
                            <div class="text">{{ row.file_md5 }}</div>
                            <i
                              class="el-icon-copy-document copy_icon"
                              v-clipboard:copy="row.file_md5"
                              v-clipboard:success="onCopy"
                              v-clipboard:error="onError"
                            />
                          </div>
                          <div class="file_list">
                            <div class="label">SHA1:</div>
                            <div class="text">{{ row.file_sha1 }}</div>
                            <i
                              class="el-icon-copy-document copy_icon"
                              v-clipboard:copy="row.file_sha1"
                              v-clipboard:success="onCopy"
                              v-clipboard:error="onError"
                            />
                          </div>
                          <div class="file_list">
                            <div class="label">SHA256:</div>
                            <div class="text">{{ row.file_sha256 }}</div>
                            <i
                              class="el-icon-copy-document copy_icon"
                              v-clipboard:copy="row.file_sha256"
                              v-clipboard:success="onCopy"
                              v-clipboard:error="onError"
                            />
                          </div>
                        </div>
                        <i class="el-icon-more" slot="reference"></i>
                      </el-popover>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <el-pagination
              v-if="embedding_file.length && pagination.count > 10"
              class="ve_pagination"
              @current-change="pageChange"
              :current-page="pagination.page_num"
              :page-sizes="pagination.sizes"
              layout="total, prev, pager, next"
              :total="pagination.count"
            >
            </el-pagination>
            <!-- <div class="more" v-if="embedding_file.length <br reportInfo.embedding_file.length" @click="embedding_file = reportInfo.embedding_file">
              查看更多
              <i class="el-icon-arrow-right"></i>
            </div> -->
          </div>
          <no-data v-else />
        </div>
      </ScalingTitle>

      <ScalingTitle title="DDE" :badgeData="reportInfo.dde">
        <div class="dee section">
          <div class="code_box" v-if="reportInfo.dde.length">
            <div class="list_box">
              <div
                class="list"
                v-for="(item, index) in reportInfo.dde"
                :key="index"
              >
                {{ item }}
              </div>
            </div>
          </div>
          <no-data v-else />
        </div>
      </ScalingTitle>

      <ScalingTitle title="可见字符串" :badgeData="reportInfo.observed_string">
        <div class="observed_string section">
          <div
            class="code_box"
            v-if="
              reportInfo.observed_string && reportInfo.observed_string.length
            "
          >
           <i class="el-icon-copy-document copy_icon copy_icon_cos" v-clipboard:copy="reportInfo.observed_string.join('\n')" v-clipboard:success="onCopy" v-clipboard:error="onError"/>

            <div class="list_box scroll_head" id="textAreas">
              <div
                class="list"
                v-for="(item, index) in reportInfo.observed_string"
                :key="index"
              >
                <div>{{ item }}</div>
              </div>
              <!-- <div class="btn_page" v-if="ObservedString.length">
                <el-button type="text" @click="setObserved(false)">下一页</el-button>
              </div> -->
            </div>
          </div>
          <no-data v-else />
        </div>
      </ScalingTitle>

      <ScalingTitle title="攻击载荷" :badgeData="reportInfo.payload">
        <div class="payload section">
          <div class="code_box" v-if="reportInfo.payload.length">
            <div class="list_box">
              <div
                class="list"
                v-for="(item, index) in reportInfo.payload"
                :key="index"
              >
                <i class="el-icon-copy-document copy_icon copy_icon_cos" v-clipboard:copy="item" v-clipboard:success="onCopy" v-clipboard:error="onError"/>
                {{ item }}
                <div class="hr"></div>
              </div>
            </div>
          </div>
          <no-data v-else />
        </div>
      </ScalingTitle>

      <ScalingTitle
        title="可疑二进制载荷"
        :badgeData="reportInfo.payload_hex_dump"
      >
        <div class="payload_hex_dump section scroll_head">

          <div class="code_box" v-if="reportInfo.payload_hex_dump.length">
           <i class="el-icon-copy-document copy_icon copy_icon_cos" v-clipboard:copy="reportInfo.payload_hex_dump.join('\n')" v-clipboard:success="onCopy" v-clipboard:error="onError"/>

            <div class="list_box">
              <div
                class="list"
                v-for="(item, index) in reportInfo.payload_hex_dump"
                :key="index"
              >
                <pre><code>{{item}}</code></pre>
                <hr class="hr" />
              </div>
            </div>
          </div>
          <no-data v-else />
        </div>
      </ScalingTitle>

      <ScalingTitle title="疑似威胁指标/IOC" :badgeData="reportInfo.ioc">
        <div class="ioc section">
          <div class="code_box" v-if="reportInfo.ioc.length">
           <i class="el-icon-copy-document copy_icon copy_icon_cos" v-clipboard:copy="reportInfo.ioc.join('\n')" v-clipboard:success="onCopy" v-clipboard:error="onError"/>

            <div class="list_box scroll_head">
              <div
                class="list"
                v-for="(item, index) in reportInfo.ioc"
                :key="index"
              >
                {{ item }}
              </div>
            </div>
          </div>
          <no-data v-else />
        </div>
      </ScalingTitle>

      <ScalingTitle
        title="PE_Information"
        v-if="reportInfo.peinfo && JSON.stringify(reportInfo.peinfo) != '{}'"
        :badgeData="[1]"
      >
        <div class="macro_code_body pe_box section pe_box">
          <div class="center">
            <div class="text" v-if="reportInfo.peinfo.file_signature">
              File_Signature: {{ reportInfo.peinfo.file_signature }}
            </div>
            <div class="text" v-if="reportInfo.peinfo.PDB">
              PDB: {{ reportInfo.peinfo.PDB }}
            </div>
            <div
              class="text"
              v-for="(item, key, index) in reportInfo.peinfo
                .file_version_information"
              :key="index"
            >
              {{ key }}: {{ item }}
            </div>
          </div>
          <sample-tab
            v-if="
              reportInfo.peinfo.sections && reportInfo.peinfo.sections.length
            "
            :tableData="reportInfo.peinfo.sections"
          />
          <resource-tab
            v-if="reportInfo.peinfo.resources && reportInfo.peinfo.resources.length"
            :tableData="reportInfo.peinfo.resources"
          >
        </resource-tab>
          <div class="packing_version" v-if="reportInfo.peinfo.packing_version">
            <div class="lable">加壳信息 :</div>
            <div class="info">{{ reportInfo.peinfo.packing_version }}</div>
          </div>
          <div
            class="code_box"
            v-if="reportInfo.peinfo.exports && reportInfo.peinfo.exports.length"
          >
            <div class="Imports">Exports</div>
            <div class="imports_box scroll_head">
              <scaling
                :defaultFlag="false"
                :title="reportInfo.file_names.join() || '--'"
              >
               <div class="center">
                  <div
                    class="text"
                    v-for="(codes, code_idx) in reportInfo.peinfo.exports"
                    :key="code_idx"
                  >
                    {{ codes }}
                  </div>
                </div>
              </scaling>
            </div>
          </div>     
          <div
            class="code_box"
            v-if="reportInfo.peinfo.imports && reportInfo.peinfo.imports.length"
          >
            <div class="Imports">Imports</div>
            <div class="imports_box scroll_head">
              <scaling
                :defaultFlag="false"
                v-for="(item, index) in reportInfo.peinfo.imports"
                :key="index"
                :title="item.dll_name"
              >
                <div class="center">
                  <div
                    class="text"
                    v-for="(codes, code_idx) in item.dll_func"
                    :key="code_idx"
                  >
                    {{ codes }}
                  </div>
                </div>
              </scaling>
            </div>
            <div v-if="reportInfo.peinfo.certificates && reportInfo.peinfo.certificates.length">
              <div class="Imports">证书</div>
              <div>
                <div class="imports_box scroll_head">
                  <scaling
                    :defaultFlag="false"
                    v-for="(item, index) in reportInfo.peinfo.certificates"
                    :key="index"
                    :title="item.cert_name"
                  >
                    <div class="center">
                      <div
                        class="text"
                        v-for="(v, k) in item.cert_value"
                        :key="k"
                      >
                        <span class="certificate_item_type">{{ v.type }}</span>
                        <span class="certificate_item_value">{{ v.value }}</span>
                      </div> 
                    </div>
                  </scaling>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScalingTitle>

      <ScalingTitle title="Pcode" :badgeData="reportInfo.pcode ? [1] : ''">
        <div class="content_data_body section">
          <div class="macro scroll_head" style="position: relative; padding-top: 0;" v-if="reportInfo.pcode">
           <i class="el-icon-copy-document copy_icon copy_icon_cos macros_code_copy" v-clipboard:copy="reportInfo.pcode" v-clipboard:success="onCopy" v-clipboard:error="onError"/>
            <MyCode :CodeString="reportInfo.pcode" />
          </div>
          <no-data v-else />
        </div>
      </ScalingTitle>

      <ScalingTitle title="注解" :badgeData="reportInfo.note">
        <div class="Note section">
          <div class="code_box" v-if="reportInfo.note">
            <div class="list_box">
              <div class="list">
                {{ reportInfo.note }}
              </div>
            </div>
          </div>
          <no-data v-else />
        </div>
      </ScalingTitle>

      <ScalingTitle title="ATT&CK">
        <div class="file section">
          <div class="macro">
            <no-data />
          </div>
        </div>
      </ScalingTitle>

    </div>
    <NoData v-else style="height:85px" />
  </div>
</template>

<script>
  import Scaling from '@/components/scaling'
  import ScalingTitle from '@/components/ScalingTitle'
  import NoData from '@/components/NoData'
  import MyCode from '@/components/macroCode'
  import SampleTab from './sampleTab'
  import ResourceTab from './resourceTab'
  import { getPagination } from '@/utils'
  import VeTag from '@/components/veTags'
  import { getHashStatic } from '@/api/type'

  export default {
    name: 'TabStatic',
    components: {
      Scaling,
      ScalingTitle,
      MyCode,
      NoData,
      SampleTab,
      ResourceTab,
      VeTag
    },
    watch: {
      reportInfo: {
        immediate: true,
        handler(val) {
          this.embeddingPage = 1
          if (val.embedding_file && val.embedding_file.length) {
            this.setEmbedding()
          }
        }
      },
      '$route.params.search': {
        handler(val, oldVal) {
          if (oldVal && val !== oldVal) {
            this.getStaticData()
          }
        }
      }
    },
    data() {
      return {
        Loading: false,
        reportInfo: {},
        swiperOption: {
          slidesPerView: 'auto',
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        ChartCount: 0,
        pagination: {
          sizes: [10, 20, 40, 60, 80],
          page_num: 0, // 当前页数
          page_size: 20, // 每页显示条目个数
          count: 0
        },
        homologous: {},
        ObservedString: [],
        embedding_file: [], // 内嵌文件
        embeddingPage: 1,
        appendName: '',
        BASE_API: process.env.BASE_API,
        relationKeys: [],
        relationData: {},
        navList: [
          { laber: '摘要信息', active: 1 },
          { laber: '图片', active: 0 }, // Image
          // { laber: '规则标签', active: 0 }, // ttags
          { laber: '特征标签', active: 0 }, // tags
          { laber: '基础信息', active: 0 }, // file_version_information
          // { laber: '样本入库时间', active: 0 }, // Timestamp
          { laber: '正文', active: 0 }, // Content
          { laber: '宏代码', active: 0 }, // macros
          { laber: '宏代码字符串', active: 0 }, // macros_string_list
          { laber: '控件信息', active: 0 }, // control_string
          { laber: '内嵌文件', active: 0 }, // embedding_file
          { laber: 'DDE', active: 0 }, // DDE
          { laber: '可见字符串', active: 0 }, // observed_string
          { laber: '攻击载荷', active: 0 }, // payload
          { laber: '可疑二进制载荷', active: 0 }, // payload_hex_dump
          { laber: '疑似威胁指标/IOC', active: 0 }, // IOC
          { laber: '注解', active: 0 }, // Note
          { laber: 'ATT&CK', active: 0 }, // ATT&CK
          // { laber: '同源性信息摘要', active: 0 }, // homologous
          { laber: 'PE_Information', active: 0 } // PE_Information
        ]
      }
    },

    created() {
      this.getStaticData()
    },
    methods: {
      // 获取静态分析数据
      async getStaticData() {
        try {
          this.Loading = true
          const hash = this.$route.params.search
          const { data: res } = await getHashStatic({ hash })
          this.Loading = false
          if (res.data && res.code === 200) {
            this.reportInfo = res.data
          } else {
            this.reportInfo = {}
          }
        } catch (error) {
          this.Loading = false
          this.reportInfo = {}
          console.error(error)
        }
      },
      /**
       * 内嵌文件页数发生变化
       * @param {Number} page 变动后页数
       */
      pageChange(page) {
        this.embeddingPage = page
        this.setEmbedding(false)
      },

      /**
       * 设置内嵌文件 本地分页
       * @param {*} loading 加载动画,判断是否有传递过来的对象
       */
      setEmbedding(loading) {
        const loadingInstance = loading || this.$loading({ fullscreen: true, text: '正在加载...', background: 'rgba(0, 0, 0, 0.7)' })

        if (this.embedding_file) {
          if (loading) {
            loading.close()
          } else {
            setTimeout(() => {
              loadingInstance.close()
            }, 500)
          }
        }
        setTimeout(() => {
          const pages = getPagination(this.reportInfo.embedding_file, 10, this.embeddingPage)
          this.embeddingPage = this.embeddingPage += 1
          this.embedding_file = pages.data
          this.pagination = pages.pagination
        }, 500)
      },
      // 新页面打开图片
      openImg(url) {
        window.open(url, '_blank')
      },

      onCopy() {
        this.$message.success('复制成功！')
      },

      onError() {
        this.$message.error('复制失败，请手动复制')
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "~@/styles/hunting.scss";
.details_body{
  display: flex;
  position: relative;
  color: #fff;
  // overflow-y: scroll;

  /deep/ .scaling {
    margin-top: PW(8);
    p {
      line-height: PW(25);
    }
  }
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
      color: #fff;
    }
  }

  .label {
    display: inline-block;
    min-width: PW(80);
    color: #acacbb;
  }
  .details{
    flex: 1;
    // padding: PW(24) PW(32) PW(32) PW(17);
    // max-width: PW(1440);
    max-height: PW(740);
    .title{
      color: rgba(255, 255, 255, 0.75);
      font-size: PW(16);
      height: PW(40);
      // padding-top: PW(10);
      font-family: PingFang-SC-Medium;
      span{
        line-height: PW(20);
        // padding-left: PW(10);
      }
    }

    .information_body{
      color: rgba(255, 255, 255, 0.6);
      .body_box{
        display: flex;
      }
    }

    .images_body{
      .img_box{
        padding: 0 PW(60);
        position: relative;
        min-height: PW(50);
        .swiper-container {
          position: static;
          .swiper-button {
            color: #FFF;
          }
        }
      }
      img{
        max-height: PW(177);
        cursor: pointer;
        min-width: PW(16);
        min-height: PW(16);
        // margin-right: PW(20);
      }
    }

    .macro_code_body{
      padding-bottom: PW(20);
      .center {
        padding: PW(10) ;
      }
      .macros_code {
        position: relative;
        padding: 0 PW(20);
      }
      .scroll_head {
        max-height: PW(600);
      }
    }
    .macros_string_body{
      .list_box{
        max-height: PW(350);
        overflow-y: auto;
        word-break:break-all;
      }
    }
    .list_box{
      margin-bottom: PW(20);
      line-height: PW(30);
      color: #fff;
      .label{
        font-size: PW(15);
      }
      .list{
        color: #fff;
        font-size: PW(14);
        transition: background-color .25s ease;
        padding-left: PW(20);
        padding-right: PW(20);
        word-wrap:break-word;

      }
      // .list:nth-of-type(1n){
      //     background-color: #fafafa;
      //   &:hover{
      //     background-color: #f5f7fa;
      //   }
      // }
      // .list:nth-of-type(2n){
      //   background-color: #fff;
      //   &:hover{
      //     background-color: #f5f7fa;
      //   }
      // }
      // &.bgc_none{
      //   .list{
      //     background-color: transparent;
      //     :hover{
      //         background-color: #fafafa;
      //     }
      //   }
      // }
      .list:last-child{
        .hr{
          display: none;
        }
      }
    }
    .embedding_file_body .macro{
      display: flex;
      flex-wrap: wrap;
      .list_box{
        margin-right: PW(30);
        padding: PW(10);
        width: PW(400);
        overflow-x: auto;
        background-color: #fafafa;
        border-radius: PW(6);
        .list{
          font-size: PW(14);
          line-height: PW(25);
          color: #666;
          display: flex;
          background-color: #fafafa;
        }
      }
      .btn_box{
        text-align: center;
      }
    }
    .content_data_body{
      .macro{
        padding: PW(20);
        font-size: PW(14);
        line-height: PW(30);
        max-height: PW(450);
        overflow-y: auto;
        word-break:break-all;
      }
    }
    .basic_info_body{
      .list_box{
        margin-right: PW(30);
        padding: PW(10);
        overflow: hidden;
        .list{
          font-size: PW(14);
          line-height: PW(25);
          display: flex;
          font-family: PingFang-SC-Bold;
          font-size: 14px;
        }
      }
    }
    .homologous{
      .macro{
        padding-left: PW(10);
        font-size: PW(14);
        >div{
          margin-bottom: PW(10);
        }
        span.red{
          color: #e70123;
        }
      }
    }
    .relation{
      .macro{
        display: flex;
        flex-wrap:initial;
        .left_chart{
          flex: 1;
        }
      }
    }
    .btn_page{
      padding-left: PW(20);
    }
  }
}
.hr{
  margin: PW(10) auto;
  height: PW(1);
  background-color: rgba(255,255,255,0.1);
}
.Imports{
  padding: PW(10) PW(20);
  font-size: PW(16);
  padding-left: 0;
  padding-top: PW(20);
}
.pe_box{
  .text{
    font-size: PW(12);
    line-height: 1.7em;
  }
  .center{
    padding-bottom: 0;
  }
}
.popover_body {
  .file_list {
    display: flex;
    .label {
      margin-right: .5em;
      font-weight: 600;
    }
    .copy_icon {
      cursor: pointer;
      // font-size: PW(16);
      margin-left: 1em;
    }
  }
}

.more {
  margin-top: PW(11);
  height: PW(44);
  background-color: rgba(40, 43, 48, 1);
  font-family: PingFangSC-Regular;
  font-size: PW(14);
  color: rgba(255, 255, 255, 0.45);
  @include flex_middle;
  cursor: pointer;
}
.operation {
  display: flex;
  align-items: center;
  >i {
    margin-right: PW(12);
  }
}

.scroll_head {
  max-height: PW(400);
}

.packing_version {
  padding-top: PW(20);
  display: flex;
  align-items: center;
  .lable {
    font-size: PW(14);
    color:#acacbb;
  }
  .info {
    // margin-top: PW(10);
    font-family: PingFangSC-Regular;
    padding-left: 1em;
  }
}

.payload_hex_dump {
  max-height: 500px;
  overflow-y: auto;
}
.copy_icon_cos{
  float: right;
  color: rgba(255, 255, 255, 0.45);
  cursor: pointer;
  z-index: 9;
}
.copy_icon_cos:hover{
  color: rgba(255, 255, 255, 0.85);
}
.macros_code_copy{
  position: absolute;
  top: 48px;
  right: 44px;
}
.certificate_item_type {
  width: 20%;
  display: inline-block;
}
/deep/ .info_body {
  background: rgba(40, 43, 48, 0.6) !important;
}
</style>
