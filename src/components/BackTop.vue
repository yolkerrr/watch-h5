<template>
  <div>
    <a href="javascript:void(0)" class="floatTotop" style="" @click.prevent.stop="goBack"></a>
  </div>
</template>

<script>
  export default {
    name: 'BackTop',
    data () {
      return {

      }
    },
    props:{
      show:{
        type:Boolean,
        default:false
      }
    },
    watch:{
      show(newVal){
        newVal?$('.floatTotop').fadeIn():$('.floatTotop').fadeOut();
      }
    },
    mounted(){
      $('.floatTotop').fadeOut();
    },
    methods: {
      goBack(){
        this.$emit("back");
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .floatTotop{
    height: 46px;
    width: 46px;
    background: url(../assets/float_top.png) 0 0 no-repeat;
    background-size: 46px 46px;
    color: #fff;
    position: fixed;
    right: 10px;
    bottom: 104px;
    z-index: 10;
    border-radius: 3px;
  }
</style>
