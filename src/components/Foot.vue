<template>
  <div>
    <div class="common-footer-holder">123</div>
    <div class="common-foot">
      <cube-tab-bar
        v-model="selectedLabelDefault"
        :data="tabs"
        @click="clickHandler"
      >
      </cube-tab-bar>
    </div>
  </div>

</template>

<script>
  import Vue from "vue";
  import {TabBar} from "cube-ui"
  Vue.use(TabBar);
  export default {
    name: 'Foot',
    data () {
      return {
        selectedLabelDefault:"腕 表",
        tabs:[
          {
            label: '腕 表',
            icon: 'cubeic-home',
            path:"/index"
          }, {
            label: '留 言',
            icon: 'cubeic-like',
            path:"/mine"
          }
        ]
      }
    },
    props:{
      "to":{
        type:String,
        default:"商 品"
      }
    },
    watch:{
      to:function (newVal) {
        this.selectedLabelDefault = newVal;
      }
    },
    methods: {
      clickHandler(label){
        this.$router.push({
          path:this.tabs.find((i)=>i.label === label)["path"]
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import "../css/common/root";
  @import "../css/common/function";
  .common-foot{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: @foot-zIndex;
    background: #FFFFFF;
    border: 1px solid #ececec;
  }
</style>
