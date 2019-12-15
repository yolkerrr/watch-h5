<template>
  <div class="page-goods-detail">
    <div class="goods-detail-title">
      <div class="title-icon"></div>
      <div class="title-text">{{goodsDetail.watchName}}</div>
    </div>
    <div class="goods-detail-container">
      <div class="goods-swipe">
        {{goodsDetail.slideUrls}}
      </div>
      <div class="goods-info">
        <div class="goods-name"></div>
        <div class="goods-price">
          {{goodsDetail.price}}
          {{goodsDetail.marketPrice}}
        </div>
        <div class="goods-params">
          {{goodsDetail.brand}}
          {{goodsDetail.spec}}
          {{goodsDetail.classify}}
        </div>
        <div class="goods-detail-img">
          {{goodsDetail.detailUrls}}
        </div>
      </div>
    </div>
    <div class="goods-footer-holder">
      <div class="goods-footer">
        <div class="footer" v-clipboard:copy="copyGoods" v-clipboard:success="onCopy" v-clipboard:error="onError">复制链接</div>
        <div class="footer main">联系客服</div>
      </div>
    </div>
  </div>
</template>

<script>
  import baseMixins from "@/mixins/base"
  import * as watchService from "@/api/watch"
  import * as baseService from "@/api/base"
  export default {
    name: "detail",
    mixins:[baseMixins],
    data(){
      return{
        goodsDetail:{}
      }
    },
    computed:{
      copyGoods(){
        return `${this.goodsDetail.watchName},${this.goodsDetail.spec},${this.goodsDetail.classify}|${this.goodsDetail.watchId}`
      }
    },
    methods:{
      onCopy(){
        this.showToast("内容已复制到粘贴板!");
      },
      onError(){
        this.showToast("复制失败!");
      },
      async fetchData(){
        let {id = ""} = this.$route.query;
        if(id){
          let data = await watchService.getDetail({watchId:id});
          let data1 = await baseService.getSys();
          this.goodsDetail = data.data;
          this.sysInfo = data1.data;
        }
      }
    },
    async created(){
      try{
        await this.fetchData();
      }catch (e){
        console.log(e);
      }
    }
  }
</script>

<style scoped>

</style>
