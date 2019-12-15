<template>
  <div class="common-goodsItem">
    <div class="box" @click.prevent.stop="goDetail">
      <div class="box-watch-inner">
        <div class="price_inner_img"><img :src="goods['slideUrls'][0]"></div>
        <div class="price_inner_txt">
          <em>{{goods.watchName}}</em>
          <em>{{goods.model}}</em>
          <span>{{goods.classify}},{{goods.spec}}</span>
          <i>¥{{goods.price}}</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsItem',
  data () {
    return {

    }
  },
  props:{
    goods:{
      type:Object,
      default:()=>{{}}
    }
  },
  methods: {
    goDetail(){
      this.$router.push({
        path:"/detail",
        query:{
          id:this.goods.watchId
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .common-goodsItem:nth-child(2n+1) {
    margin-right: 2%;
  }
  .common-goodsItem{
    list-style: none;
    width: 49%;
    float: left;
    margin-bottom: 10px;
    .box{
      .box-watch-inner{
        text-align: center;
        border: 1px solid #dcdcdc;
        background: #fff;
        .price_inner_img{
          padding-top: 5px;
          width: 90%;
          min-width: 90%;
          max-width: 90%;
          margin: 0 auto;
          img{
            width: 100%;
            height: 100%;
            vertical-align: middle;
          }
        }
        .price_inner_txt{
          padding: 7.5px;
          em {
            display: block;
            font-size: 14px;
            color: #000;
            line-height: 20px;
            height: 20px;
            overflow: hidden;
          }
          span {
            display: block;
            font-size: 10px;
            color: #666;
            line-height: 16px;
            height: 16px;
            overflow: hidden;
          }
          i {
            display: block;
            font-size: 14px;
            color: #c00;
            line-height: 15px;
            margin-top: 5px;
          }
        }
      }
    }
  }
</style>
