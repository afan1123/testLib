<template>
  <div class="tab_graph" v-Loading="Loading">
    <el-tooltip effect="dark" content="进入全屏" placement="top">
      <i class="el-icon-rank" v-FullScreen:parent></i>
    </el-tooltip>
    <div class="graph">
      <relation-chart
        v-if="JSON.stringify(echartsData)!='{}'"
        :echartsData="echartsData"
        :appendName="appendName"
        @append="appendNodes"
        :whetherSize="whetherSize"
      />
    </div>
    <relation-table
      :tableData="relationData"
      :master="masterNode"
      @append="appendNodes"
      @resizeChange="resize"
    />
  </div>
</template>

<script>
  import relationChart from './relationChart'
  import { getGraph } from '@/api/type'
  import RelationTable from './RelationTable'
  import IconData from '@/utils/IconData'
  import { mapGetters } from 'vuex'
  import { getGraphType } from '@/utils'

  export default {
    name: 'Graph',
    computed: {
      ...mapGetters(['profileInfo', 'Target_Hash'])
    },
    components: {
      relationChart,
      RelationTable
    },
    data() {
      return {
        echartsData: {},
        masterNode: {},
        oldNodes: [],
        oldLinks: [],
        oldRelations: {},
        oldNodePages: {},
        relationKeys: [],
        ChartCount: 0,
        relationData: {},
        appendName: '',
        whetherSize: '',
        types: {
          h_graph: 'contacted_images,image_features,contacted_ips,embedding_files,contacted_urls,contacted_domains,contacted_domain',
          h_jhash: 'email_jhash,lnk_jhash,macros_jhash,macrosFunc_jhash,payload_jhash,pe_imp_jhash,pe_rsrc_jhash,rtf_struct_jhash,rtf_obj_jhash'
        },
        Loading: false
      }
    },
    watch: {
      'Target_Hash': {
        immediate: true,
        handler(val) {
          console.log(val, '监听')
          this.echartsData = {}
          this.oldNodes = []
          this.oldLinks = []
          this.oldNodePages = {}
          this.oldRelations = {}
          setTimeout(() => {
            val && this.getRelations()
          }, 0)
        }
      }
    },
    mounted() {
      // this.getRelations()
    },
    methods: {
      appendNodes(resource, label, r_types, type) {
        let from
        if (r_types) {
          from = this.oldRelations[r_types] ? this.oldRelations[r_types] += 1 : this.oldRelations[r_types] = 1
        }
        if (type) {
          from = this.oldNodePages[resource] ? this.oldNodePages[resource] += 1 : this.oldNodePages[resource] = 1
        }
        this.getRelations(resource, label, from, r_types, type)
      },
      /**
       * 获取关联关系
       * @param {String} resource 唯一编码MD5等
       * @param {name} resource 唯一编码MD5等
       */
      async getRelations(resource, label, from, r_types, type = 'md5') {
        this.Loading = true
        // if (!resource && !this.profileInfo.md5 && !this.echartsData.nodes && !this.Target_Hash) {
        //   setTimeout(() => {
        //     this.getRelations(resource, label)
        //   }, 1000)
        //   return false
        // }

        // console.log(resource, label, from, r_types)
        const params = {
          type,
          from: from || 1,
          size: 20,
          r_types: r_types || this.types[this.$route.name],
          target: resource || this.profileInfo.md5 || this.Target_Hash
        }

        // const source = old_links.filter(e => e.source === resource)
        // if (source.length) return false
        this.appendName = label || this.appendName
        this.masterNode = {
          target: label || this.appendName,
          type
        }

        try {
          const { data: res } = await getGraph(params)
          this.Loading = false
          // console.log(params)
          // const res = TestData
          // const list = await this.filterHash(res.data.splice(0, 19))
          const newNodes = await this.filterHash(res.data.nodes)
          this.oldNodes = [...newNodes, ...this.oldNodes]
          this.oldLinks = [...res.data.edges, ...this.oldLinks]
          if (res.code === 200) {
            if (!res.data.edges.length && from) {
              return this.$message.warning('没有更多了')
            }
            const setDatas = {
              nodes: this.oldNodes,
              edges: this.oldLinks
            }

            const { nodes, links } = await this.setRelation(setDatas, resource)
            const newData = {
              nodes,
              links
            }
            if (!r_types) {
              this.relationData = res.data.relations
              this.oldRelations = {}
            } else {
              const relations = res.data.relations[r_types]
              const old_relations = this.relationData[r_types]
              relations.datas = [...old_relations.datas, ...relations.datas]
              this.relationData[r_types] = relations
            }
            this.$set(this, 'echartsData', newData)

            // if (!this.relationKeys.includes(name)) {
            //   this.relationKeys.push(name)
            // }

            // const relationData = {}
            // newData.links.forEach(e => {
            //   if (relationData[e.source]) {
            //     relationData[e.source].push(e)
            //   } else {
            //     relationData[e.source] = [e]
            //   }
            // })
            // this.relationKeys = Object.keys(relationData)
            // this.relationData = relationData
            // const listData = { ...this.relationData }

            // if (listData[name] !== undefined) {
            //   listData[name].push(...list)
            // } else {
            //   listData[name] = [...list]
            // }
            // this.relationData = { ...listData }
          }
        } catch (error) {
          this.Loading = false
          console.error(error)
        }
      },

      /**
       * 过滤重复的关联关系
       * @param {*} data 新获取的节点关联
       * @returns {string[]} 返回去重后的节点关系
       */
      filterHash(newNode) {
        const ids = this.oldNodes.map(e => e.id)
        return newNode.filter(e => !ids.includes(e.id))
      },

      /**
       * 设置关联关系图数据格式
       * @param {*} data 需要处理的数据
       * @param {String | undefined} source 数据的来源,允许为空(本身为最顶级)
       *
       */
      setRelation(data) {
        const masterNode = this.profileInfo.md5 || this.Target_Hash
        // const data = await this.filterHash(echartsData)
        const defaultSize = 35
        // const count = this.ChartCount > 3 ? 3 : this.ChartCount
        // if (source) {
        //   symbolSize = defaultSize - count * 5
        // }
        // console.log('data', data)
        const nodes = data.nodes.map(({ type, label, id }) => {
          // console.log(type)
          let category = getGraphType(type)
          let symbolSize = category !== 'nodes' ? defaultSize : 45
          if (label === masterNode && !this.appendName) {
            this.appendName = label
            this.masterNode = {
              target: label,
              type
            }
          }

          if (label === masterNode && category !== 'nodes') {
            symbolSize = 60
            category = 'm_' + category
          }
          let formatter = `${type.toUpperCase()}<br>${label}`
          if (label === type) {
            formatter = type
          }
          return {
            id,
            value: id,
            draggable: true,
            m_label: label,
            type,
            symbolSize,
            symbol: 'image://' + IconData[category],
            tooltip: {
              formatter
            }
          }
        })

        const links = data.edges.map(e => {
          // lineStyle: {
          //   normal: {
          //     color: 'source',
          //   }
          // }
          return {
            source: e.source,
            target: e.target,
            label: {
              normal: {
                show: false,
                // formatter: `graph ${source.slice(0, 12)}`
                formatter: `graph ${e.type}`
              }
            }
          }
        })

        this.ChartCount++
        return {
          nodes,
          links
        }
      },
      // 窗口发生变化, 改变图表大小
      resize() {
        console.log('resize')
        setTimeout(() => {
          this.whetherSize = Math.random().toString().slice(2)
        }, 500)
      }

    }
  }
</script>

<style lang="scss" scoped>
.tab_graph {
  padding-left: PW(20);
  display: flex;
  position: relative;
  min-height: PW(580);
  .graph {
    flex: 1;
    overflow: hidden;
  }
  /deep/ .el-collapse {
    width: PW(300);
  }
  .el-icon-rank {
    position: absolute;
    left: PW(30);
    top: PW(30);
    transform: rotate(45deg);
    color: #fff;
    cursor: pointer;
    z-index: 999;
  }
}
</style>
