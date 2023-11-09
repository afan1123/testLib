<template>
  <div>
    <div class="sections">Sections</div>
    <el-table :data="tableData" border class="spark_table" style="width: 100%">
      <el-table-column prop="Name" label="Name"></el-table-column>
      <el-table-column prop="RawSize" label="RawSize"></el-table-column>
      <el-table-column prop="VirtualAddress" label="VirtualAddress"></el-table-column>
      <el-table-column prop="VirtualSize" label="VirtualSize"></el-table-column>
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
  .sections {
    padding: 0px 10px 20px;
    font-size: 16px;
    padding-left: 0;
  }
</style>

