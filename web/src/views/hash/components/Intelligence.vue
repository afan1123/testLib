<template>
  <div class="tab_intelligence">
    <ScalingTitle title="IOC信息" :NoUnfold="true" :is_badge="false">
      <el-table
        v-if="profileInfo.ioc"
        :data="profileInfo.ioc && profileInfo.ioc.slice((pagination.page_now-1)*pagination.limit_size, pagination.limit_size*pagination.page_now)"
        stripe
        border
        class="domain_table spark_table spark_table_hrow" >
        <el-table-column label="来源" >
          <template slot-scope="{row}">
            <div class="source_origin">
              <div class="label">
                <div>
                  {{ sourceMap[row.source] || '开源情报' }} <i v-if="row.code">({{ $PrefixZero(row.code) }})</i>
                  <span v-if="row.status === 0" class="ioc_tooltip">过期</span>
                </div>
              </div>
              <div class="update_time">更新时间：{{ row.update_time | parseTime('{y}-{m}-{d}') }}</div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="类别" >
          <template slot-scope="{row}">
            <div>
              <VeTag v-for="(categorie, index) in row.categories" :key="categorie + index"  :text="categorie" />
            </div>
          </template>
        </el-table-column>

        <el-table-column label="家族" >
          <template slot-scope="{row}">
            <div>
              <VeTag class="yellow" v-for="(familie, index) in row.families" :key="familie + index"  :text="familie" />
            </div>
          </template>
        </el-table-column>

        <el-table-column label="组织" >
          <template slot-scope="{row}">
            <div>
              <VeTag class="red" v-for="(tag, index) in row.organizations" :key="tag + index"  :text="tag" />
            </div>
          </template>
        </el-table-column>
      </el-table>
      <NoData v-else />
      <el-pagination
        v-if="profileInfo.ioc && profileInfo.ioc.length"
        class="ve_pagination"
        popper-class="spark_size"
        @size-change="sizeChange"
        @current-change="pageChange"
        :current-page="pagination.page_now"
        :page-sizes="pagination.sizes"
        :page-size="pagination.limit_size"
        prev-text="上一页"
        next-text="下一页"
        :total="profileInfo.ioc.length"
        layout="total, prev, next, sizes">
      </el-pagination>
    </ScalingTitle>

    <ScalingTitle title="关联IP" :NoUnfold="true" :is_badge="false">
      <el-table
        v-if="profileInfo.ips"
        :data="profileInfo.ips"
        stripe
        border
        class="domain_table spark_table spark_table_hrow" >
        <el-table-column label="IP" >
          <template slot-scope="{row}">
            <div class="text">{{row.ip}}</div>
          </template>
        </el-table-column>

        <el-table-column label="地区码" >
          <template slot-scope="{row}">
            <div class="text">{{row.country_code}}</div>
          </template>
        </el-table-column>

        <el-table-column label="更新时间"  width="200">
          <template slot-scope="{row}">
            <div class="text">{{row.update_time | parseTime('{y}-{m}-{d}')}}</div>
          </template>
        </el-table-column>

      </el-table>
      <NoData v-else />
    </ScalingTitle>


    <ScalingTitle title="关联域名" :NoUnfold="true" :is_badge="false">
      <el-table
        v-if="profileInfo.domains"
        :data="profileInfo.domains"
        stripe
        border
        class="domain_table spark_table spark_table_hrow" >
        <el-table-column label="域名" >
          <template slot-scope="{row}">
            <div class="text">{{row.domain}}</div>
          </template>
        </el-table-column>

        <el-table-column label="更新时间" width="200">
          <template slot-scope="{row}">
            <div class="text">{{row.update_time | parseTime('{y}-{m}-{d}')}}</div>
          </template>
        </el-table-column>
      </el-table>
      <NoData v-else />
    </ScalingTitle>

    <ScalingTitle title="关联URL" :NoUnfold="true" :is_badge="false">
      <el-table
        v-if="profileInfo.urls"
        :data="profileInfo.urls"
        stripe
        border
        class="domain_table spark_table spark_table_hrow" >
        <el-table-column label="URL" >
          <template slot-scope="{row}">
            <el-tooltip class="item" effect="dark" :content="row.url" placement="top">
              <div class="text">{{row.url}}</div>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column label="威胁分值" width="200">
          <template slot-scope="{row}">
            <div class="text">{{row.threat_score}}</div>
          </template>
        </el-table-column>

        <el-table-column label="扫描时间" width="200">
          <template slot-scope="{row}">
            <div class="text">{{row.scan_time | parseTime('{y}-{m}-{d}')}}</div>
          </template>
        </el-table-column>
      </el-table>
      <NoData v-else />
    </ScalingTitle>

    <ScalingTitle title="IOC提取(IP)" :NoUnfold="true" :is_badge="false">
      <el-table
        v-if="iocInfo.ip"
        :data="iocInfo.ip"
        stripe
        border
        class="domain_table spark_table spark_table_hrow" >
        <el-table-column label="IP" prop="key" width="120"></el-table-column>
        <el-table-column label="类别">
          <template slot-scope="{row}">
              <VeTag v-for="item in row.category.split(',')" :key="item" class="ve_box" :text="item" />
          </template>
        </el-table-column>

        <el-table-column label="家族">
          <template slot-scope="{row}">
              <VeTag v-for="item in row.family.split(',')" :key="item" class="yellow ve_box" :text="item" />
          </template>
        </el-table-column>
        <el-table-column label="组织">
          <template slot-scope="{row}">
              <VeTag v-for="item in row.organization.split(',')" :key="item" class="red ve_box" :text="item" />
          </template>
        </el-table-column>
        <el-table-column label="威胁等级" width="80">
          <template slot-scope="{row}">
              <VeTag :class="getLevel(row.threat_score).color" :text="getLevel(row.threat_score).label" />
          </template>
        </el-table-column>
        <el-table-column label="地区码" width="80">
          <template slot-scope="{row}">
            <div class="text">{{row.area_code}}</div>
          </template>
        </el-table-column>
        <el-table-column label="解析时间" width="150">
          <template slot-scope="{row}">
            <div class="text">{{row.update_time | parseTime}}</div>
          </template>
        </el-table-column>
        <el-table-column label="提取方式" width="170px">
          <template slot-scope="{row}">
            <span class="text" v-if="row.extraction_method === 0">历史提取</span>
            <span class="text" v-if="row.extraction_method === 1">静态提取</span>
            <span class="text" v-if="row.extraction_method === 2">动态行为提取</span>
            <span class="text" v-if="row.extraction_method === 3">静态提取、动态行为提取</span>
            <!-- <div class="text">{{row.extraction_method === 0 ? '动态行为提取' : '静态提取'}}</div> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="iocInfo.ip.length"
        popper-class="spark_size"
        class="ve_pagination"
        @size-change="ipSizeChange"
        @current-change="ipPageChange"
        :current-page="ipPagination.page_num"
        :page-sizes="ipPagination.sizes"
        :page-size="ipPagination.page_size"
        :total="ipPagination.count"
        prev-text="上一页"
        next-text="下一页"
        layout="total, prev, next, sizes">
      </el-pagination>
      <NoData v-if="!iocInfo.ip" />
    </ScalingTitle>
    <ScalingTitle title="IOC提取(域名)" :NoUnfold="true" :is_badge="false">
      <el-table
        v-if="iocInfo.domain"
        :data="iocInfo.domain"
        stripe
        border
        class="domain_table spark_table spark_table_hrow" >
        <el-table-column label="域名" prop="key">
          <template slot-scope="{row}">
              <el-tooltip class="item" effect="dark" :content="row.key" placement="top">
                <span class="ellipsisClass">{{row.key}}</span>
              </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="类别" >
          <template slot-scope="{row}">
              <VeTag v-for="item in row.category.split(',')" :key="item" class="ve_box" :text="item" />
          </template>
        </el-table-column>

        <el-table-column label="家族">
          <template slot-scope="{row}">
              <VeTag v-for="item in row.family.split(',')" :key="item" class="yellow ve_box" :text="item" />
          </template>
        </el-table-column>
        <el-table-column label="组织">
          <template slot-scope="{row}">
              <VeTag v-for="item in row.organization.split(',')" :key="item" class="red ve_box" :text="item" />
          </template>
        </el-table-column>
        <el-table-column label="威胁等级">
          <template slot-scope="{row}">
              <VeTag :class="getLevel(row.threat_score).color" :text="getLevel(row.threat_score).label" />
          </template>
        </el-table-column>
        <el-table-column label="解析时间">
          <template slot-scope="{row}">
            <div class="text">{{row.update_time | parseTime}}</div>
          </template>
        </el-table-column>
        <el-table-column label="提取方式" width="170px">
          <template slot-scope="{row}">
            <!-- <div class="text">{{row.extraction_method === 0 ? '动态行为提取' : '静态提取'}}</div> -->
            <span class="text" v-if="row.extraction_method === 0">历史提取</span>
            <span class="text" v-if="row.extraction_method === 1">静态提取</span>
            <span class="text" v-if="row.extraction_method === 2">动态行为提取</span>
            <span class="text" v-if="row.extraction_method === 3">静态提取、动态行为提取</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="iocInfo.domain.length"
        class="ve_pagination"
        popper-class="spark_size"
        @size-change="domainSizeChange"
        @current-change="domainPageChange"
        :current-page="domainPagination.page_num"
        :page-sizes="domainPagination.sizes"
        :page-size="domainPagination.page_size"
        :total="domainPagination.count"
        prev-text="上一页"
        next-text="下一页"
        layout="total, prev, next, sizes">
      </el-pagination>
      <NoData v-if="!iocInfo.domain" />
    </ScalingTitle>
    <ScalingTitle title="IOC提取(URL)" :NoUnfold="true" :is_badge="false">
      <el-table
        v-if="iocInfo.url"
        :data="iocInfo.url"
        stripe
        border
        class="domain_table spark_table spark_table_hrow" >
        <el-table-column label="URL" prop="key">
          <template slot-scope="{row}">
              <el-tooltip class="item" effect="dark" :content="row.key" placement="top">
                <span class="ellipsisClass">{{row.key}}</span>
              </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="类别" >
          <template slot-scope="{row}">
              <VeTag v-for="item in row.category.split(',')" :key="item" class="ve_box" :text="item" />
          </template>
        </el-table-column>

        <el-table-column label="家族">
          <template slot-scope="{row}">
              <VeTag v-for="item in row.family.split(',')" :key="item" class="yellow ve_box" :text="item" />
          </template>
        </el-table-column>
        <el-table-column label="组织">
          <template slot-scope="{row}">
             <VeTag v-for="item in row.organization.split(',')" :key="item" class="red ve_box" :text="item" />
          </template>
        </el-table-column>
        <el-table-column label="威胁等级">
          <template slot-scope="{row}">
              <VeTag :class="getLevel(row.threat_score).color" :text="getLevel(row.threat_score).label" />
          </template>
        </el-table-column>
        <el-table-column label="扫描时间">
          <template slot-scope="{row}">
            <div class="text">{{row.update_time | parseTime}}</div>
          </template>
        </el-table-column>
        <el-table-column label="提取方式" width="170px">
          <template slot-scope="{row}">
            <!-- <div class="text">{{row.extraction_method === 0 ? '动态行为提取' : '静态提取'}}</div> -->
            <span class="text" v-if="row.extraction_method === 0">历史提取</span>
            <span class="text" v-if="row.extraction_method === 1">静态提取</span>
            <span class="text" v-if="row.extraction_method === 2">动态行为提取</span>
            <span class="text" v-if="row.extraction_method === 3">静态提取、动态行为提取</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="iocInfo.url.length"
        class="ve_pagination"
        popper-class="spark_size"
        @size-change="urlSizeChange"
        @current-change="urlPageChange"
        :current-page="urlPagination.page_num"
        :page-sizes="urlPagination.sizes"
        :page-size="urlPagination.page_size"
        :total="urlPagination.count"
        prev-text="上一页"
        next-text="下一页"
        layout="total, prev, next, sizes">
      </el-pagination>
      <NoData v-if="!iocInfo.url" />
    </ScalingTitle>
    <ScalingTitle title="IOC提取(样本)" :NoUnfold="true" :is_badge="false">
      <el-table
        v-if="iocInfo.hash"
        :data="iocInfo.hash"
        stripe
        border
        class="domain_table spark_table spark_table_hrow" >
        <el-table-column label="HASH" prop="key">
          <template slot-scope="{row}">
              <el-tooltip class="item" effect="dark" :content="row.key" placement="top">
                <span class="ellipsisClass">{{row.key}}</span>
              </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="类别" >
          <template slot-scope="{row}">
              <VeTag v-for="item in row.category.split(',')" :key="item" class="ve_box" :text="item" />
          </template>
        </el-table-column>

        <el-table-column label="家族">
          <template slot-scope="{row}">
              <VeTag v-for="item in row.family.split(',')" :key="item" class="yellow ve_box" :text="item" />
          </template>
        </el-table-column>
        <el-table-column label="组织">
          <template slot-scope="{row}">
              <VeTag v-for="item in row.organization.split(',')" :key="item" class="red ve_box" :text="item" />
          </template>
        </el-table-column>
        <el-table-column label="威胁等级">
          <template slot-scope="{row}">
              <VeTag :class="getLevel(row.threat_score).color" :text="getLevel(row.threat_score).label" />
          </template>
        </el-table-column>
        <el-table-column label="扫描时间">
          <template slot-scope="{row}">
            <div class="text">{{row.update_time | parseTime}}</div>
          </template>
        </el-table-column>
        <el-table-column label="提取方式" width="170px">
          <template slot-scope="{row}">
            <span class="text" v-if="row.extraction_method === 0">历史提取</span>
            <span class="text" v-if="row.extraction_method === 1">静态提取</span>
            <span class="text" v-if="row.extraction_method === 2">动态行为提取</span>
            <span class="text" v-if="row.extraction_method === 3">静态提取、动态行为提取</span>
            <!-- <div class="text">{{row.extraction_method === 0 ? '动态行为提取' : '静态提取'}}</div> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="iocInfo.hash.length"
        class="ve_pagination"
        popper-class="spark_size"
        @size-change="hashSizeChange"
        @current-change="hashPageChange"
        :current-page="hashPagination.page_num"
        :page-sizes="hashPagination.sizes"
        :page-size="hashPagination.page_size"
        :total="hashPagination.count"
        prev-text="上一页"
        next-text="下一页"
        layout="total, prev, next, sizes">
      </el-pagination>
      <NoData v-if="!iocInfo.hash" />
    </ScalingTitle>
  </div>
</template>

<script>
import NoData from '@/components/NoData/'
import { mapGetters } from 'vuex'
import VeTag from '@/components/veTags'
import ScalingTitle from '@/components/ScalingTitle'
import { getIOCInfo } from '@/api/type'
import { sourceMap } from '@/utils'

export default {
  name: 'TabIntelligence',
  components: {
    NoData,
    VeTag,
    ScalingTitle
  },
  computed: {
    ...mapGetters(['profileInfo', 'Target_Hash'])
  },
  data() {
    return {
      sourceMap,
      intelligence: {
        ioc: [],
        urls: [],
        domains: [],
        ips: []
      },
      iocInfo: {
        ip: [],
        domain: [],
        url: [],
        hash: []
      },
      pagination: {
        sizes: [10, 20, 30, 40],
        page_now: 1, // 当前页数
        limit_size: 10, // 每页显示条目个数
        count: 0
      },
      ipPagination: {
        sizes: [10, 20, 50, 100],
        page_num: 1, // 当前页数
        page_size: 10, // 每页显示条目个数
        count: 0
      },
      urlPagination: {
        sizes: [10, 20, 50, 100],
        page_num: 1, // 当前页数
        page_size: 10, // 每页显示条目个数
        count: 0
      },
      domainPagination: {
        sizes: [10, 20, 50, 100],
        page_num: 1, // 当前页数
        page_size: 10, // 每页显示条目个数
        count: 0
      },
      hashPagination: {
        sizes: [10, 20, 50, 100],
        page_num: 1, // 当前页数
        page_size: 10, // 每页显示条目个数
        count: 0
      }
    }
  },
  watch: {
    'Target_Hash': {
      immediate: true,
      handler(val) {
        for (var i in this.iocInfo) { this.iocInfo[i] = [] }
        val && this.init()
      }
    }
  },
  created() {},
  methods: {
    init() {
      this.$nextTick(() => {
        this.getIOCInfo('ip')
        this.getIOCInfo('url')
        this.getIOCInfo('domain')
        this.getIOCInfo('hash')
      })
    },
    getIOCInfo(type) {
      const local_md5 = localStorage.getItem('local_md5')
      const temp = `${type}Pagination`
      this.iocInfo[type] = []
      this[temp].count = 0
      const data = {
        type: type,
        md5: this.profileInfo.md5 || local_md5,
        from: this[temp].page_num,
        size: this[temp].page_size
      }
      if (type === 'hash') {
        data.type = 'md5'
      }
      getIOCInfo(data).then(res => {
        const resData = res.data
        if (resData.code === 200) {
          this.iocInfo[type] = resData.data.aa_data || []
          this[temp].count = resData.data.count || 0
        }
      })
    },
    ipSizeChange(val) {
      this.ipPagination.page_size = val
      this.ipPagination.page_num = 1
      this.getIOCInfo('ip')
    },
    ipPageChange(val) {
      this.ipPagination.page_num = val
      this.getIOCInfo('ip')
    },
    urlSizeChange(val) {
      this.urlPagination.page_size = val
      this.urlPagination.page_num = 1
      this.getIOCInfo('url')
    },
    urlPageChange(val) {
      this.urlPagination.page_num = val
      this.getIOCInfo('url')
    },
    domainSizeChange(val) {
      this.domainPagination.page_size = val
      this.domainPagination.page_num = 1
      this.getIOCInfo('domain')
    },
    domainPageChange(val) {
      this.domainPagination.page_num = val
      this.getIOCInfo('domain')
    },
    hashSizeChange(val) {
      this.hashPagination.page_size = val
      this.hashPagination.page_num = 1
      this.getIOCInfo('hash')
    },
    hashPageChange(val) {
      this.hashPagination.page_num = val
      this.getIOCInfo('hash')
    },
    pageChange(page_now) {
      this.pagination.page_now = page_now
    },
    sizeChange(limit_size) {
      this.pagination.limit_size = limit_size
    },
    getLevel(socre) {
      const result = {
        label: '',
        color: ''
      }
      if (socre === '' || socre === undefined) {
        return result
      }
      if (socre === 0) {
        result.label = '安全'
        result.color = 'green'
      } else if (socre >= 1 && socre <= 30) {
        result.label = '低危'
        result.color = ''
      } else if (socre >= 31 && socre <= 70) {
        result.label = '中危'
        result.color = 'yellow'
      } else if (socre >= 71 && socre <= 100) {
        result.label = '高危'
        result.color = 'red'
      }
      return result
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/hunting.scss";
.tab_intelligence {
  width: 100%;
  color: #fff;
  overflow: hidden;
  .ve_tag {
    margin-right: 8px;
    margin-top: 7px;
    height: 26px !important;
    line-height: 24px !important;
  }
}

.domain {
  width: 100%;
}

.domain_table {
  //padding: 0 PW(15);
  background-color: transparent;
  // padding-top: PW(20);
}
.add_tag {
  font-size: PW(12);
  line-height: 1em;
  display: flex;
  align-items: center;
  color: #fff;
  >i{
    margin-left: PW(6);
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
.origin{
  display: inline-block;
  text-align: center;
  >div{
    display: inline-block;
  }
  .label{
    font-size: 14px;
    line-height: 22px;
  }
  .update_time{
    margin-top: 5px;
    font-size: 12px;
  }
  span{
    text-align: center;
  }
}
.text {
  color: #fff;
}
.ellipsisClass{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.url_wrap {
  // max-width: 200px;
  // overflow: hidden;
  // white-space: nowrap;
  // text-overflow: ellipsis;
}
/deep/ .info_body{
  padding: 0 !important;
}
.source_origin {
  .label {
    .ioc_tooltip {
      border-radius: 2px;
      display: inline-block;
      width: 46px;
      height: 22px;
      line-height: 22px;
      text-align: center;
      padding: 0;
      background-color: #5b82ab;
      position: absolute;
      margin-left: 6px;
      &::before {
        content: '';
        position: relative;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-right: 6px solid #5b82ab;
        position: absolute;
        left: -5px;
        bottom: 5px;
      }
    }
  }
}
</style>
