<template>
  <div class="chart" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { isRelation } from '@/utils'

export default {
  props: {
    whetherSize: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    echartsData: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    echartsData: {
      deep: true,
      handler(val) {
        // console.log(JSON.stringify(val))
        // console.log(val)
        this.init(val)
      }
    },
    whetherSize: {
      deep: true,
      handler(val) {
        console.log('whetherSize')
        this.chart && this.chart.resize()
      }
    }
  },
  data() {
    return {
      chart: null,
      currentGraph: {
        nodes: {},
        links: {}
      },
      nodeMap: {}
    }
  },
  mounted() {
    // this.initChart(this.currentGraph)
    this.init(this.echartsData)
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },

  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },

  methods: {
    // 页面加载时，第一次初始数据
    init(graph) {
      console.log('init')
      this.initChart(graph)
    },

    // 渲染画面
    initChart({ nodes = {}, links = {}}) {
      const that = this
      const chart = echarts.init(this.$el, 'macarons')
      chart.off('click')
      chart.off('dblclick')

      // 绘制图表
      chart.setOption({
        tooltip: {},
        hoverAnimation: true,
        animationDuration: 3000,
        animationEasingUpdate: 'quinticInOut',
        series: [{
          type: 'graph',
          layout: 'force',
          force: {
            repulsion: 210, // 节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
            gravity: 0.1, // 节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
            edgeLength: 60, // 边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
            layoutAnimation: true
          },
          symbol: 'circle',
          symbolSize: 32,
          roam: true, // 禁止用鼠标滚轮缩小放大效果
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize: [0, 6],
          itemStyle: {
            normal: {
              borderColor: '#fff',
              borderWidth: 1,
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.3)'
            }
          },
          label: {
            position: 'right',
            formatter: '{b}'
          },
          // 圆圈内的文字
          // label: {
          //   normal: {
          //     show: false,
          //     position: 'right',
          //     formatter: function(item) {
          //       return item.data.labelText
          //     },
          //     fontSize: 12,
          //     fontStyle: '500'
          //   }
          // },
          data: nodes,
          links
        }]
      })

      chart.resize()

      chart.on('dblclick', params => {
        const type = params.data.type
        if (!type || isRelation(type)) return false
        if (params.dataType !== 'node') return false
        const node = params.data
        that.$emit('append', node.m_label, node.m_label, null, node.type)
      })
      that.chart = chart
    }
  }
}
</script>
