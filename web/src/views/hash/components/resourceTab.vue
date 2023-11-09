<template>
  <div>
    <div class="resources">Resources</div>
    <el-table :data="tableData" border class="spark_table" style="width: 100%">
      <el-table-column prop="Entropy" label="Entropy"></el-table-column>
      <el-table-column prop="RVAOff" label="RVAOff"></el-table-column>
      <el-table-column prop="Size" label="Size"></el-table-column>
      <el-table-column prop="Type" label="Type"></el-table-column>
      <el-table-column prop="MD5" label="MD5" min-width="300" ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'sampleTab',
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    pagination: {
      type: Object,
      default: () => {}
    },
    information: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
  .resources {
    padding: 20px 10px 20px;
    font-size: 16px;
    padding-left: 0;
  }
</style>

