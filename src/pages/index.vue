<template>
  <div class="_page">
    <div class="page-index _container">
      <div class="index-container">
        <div class="index-list">
          <GoodsItem/>
          <GoodsItem/>
          <GoodsItem/>
        </div>
      </div>
    </div>
    <BackTop/>
    <Foot selectedLabelDefault="商 品"/>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {

      }
    },
    methods: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .index-container{
    margin-top: 7.5px;
    padding: 0 12.5px;
  }
</style>
