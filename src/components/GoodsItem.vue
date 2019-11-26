<template>
  <div class="common-goodsItem">
    <div class="box">
      <div class="box-watch-inner">
        <div class="price_inner_img"><img src="http://productimg.xbiao.com/25/240_360/512714567315376.jpg" alt="劳力士潜航者型116610LV-97200 绿盘"></div>
        <div class="price_inner_txt">
          <em>劳力士潜航者型</em>
          <em>116610LV-97200 绿盘</em>
          <span>自动机械,40mm,904L不锈钢(蚝式钢)</span>
          <i>¥70500</i>
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
  methods: {

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
          img{
            width: 90%;
            margin: 0 auto;
          }
        }
        .price_inner_txt{
          padding: 7.5px 0;
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
