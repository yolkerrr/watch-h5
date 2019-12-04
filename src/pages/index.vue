<template>
  <div class="_page">
    <div class="page-index _container">
      <div class="index-container">
        <div class="index-list">
        </div>
      </div>
    </div>
    <BackTop/>
    <Foot selectedLabelDefault="商 品"/>
  </div>
</template>

<script>
  import baseMixins from "@/mixins/base"
  import * as watchService from "@/api/watch"
  export default {
    name: 'index',
    mixins:[baseMixins],
    data () {
      return {

      }
    },
    methods: {
    },
    async created(){
      try{
        let data = await this.$request(watchService.getPage.bind(this,{a:1}));
      }catch (e){

      }
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
