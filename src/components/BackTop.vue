<template>
  <div>
    <a href="javascript:void(0)" class="floatTotop" style=""></a>
  </div>
</template>

<script>
  export default {
    name: 'BackTop',
    data () {
      return {

      }
    },
    mounted(){
      $('.floatTotop').fadeOut();
      $(window).scroll(function(){
        if($(window).scrollTop()==0){
          $('.floatTotop').fadeOut();
          $('.floatshare').fadeOut();
        }
        else{
          $('.floatTotop').fadeIn();
          $('.floatshare').fadeIn();
        }
      });
      $('.floatTotop').live('click', function(){
        $(window).scrollTop(0);
      });
    },
    methods: {

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
