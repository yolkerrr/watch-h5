<template>
  <div class="page-index-list">
    <div class="list-input-holder">
      <div class="list-input">
        <div class="well-search" @click.prevent.stop="showWellSearch">高级搜索</div>
        <div class="input">
          <input type="text" v-model="watchName" @keyup.enter="search" placeholder="输入商品名字搜索">
        </div>
        <div class="search" @click.prevent.stop="search">搜 索</div>
      </div>
    </div>
    <div class="list-container">
      <div class="foodPanel-container">
        <div class="wrap">
          <Scroll
            :list="list"
            ref="scroll"
            listenScroll
            @scroll="scroll"
            :pullUpLoad="pullUpLoad"
            @pullingUp="pullingUp"
            :hasNext="hasNext"
          >
            <div id="scroll-container">
              <GoodsItem :goods="goods" v-for="(goods,gIndex) in list" :key="gIndex"/>
              <!--<div slot="pullup" style="line-height:54px;width: 100%;text-align: center;font-size: 14px;color: #999">暂时没有更多商品</div>-->
            </div>
          </Scroll>
        </div>
      </div>
    </div>
    <BackTop :show="show" @back="backTop"/>
    <cube-popup type="my-popup" :position="'top'"  ref="myPopup4">
      <div class="goods-filter">
        <div class="filter-panel">
          <div class="filter-item" @click.prevent.stop="current = item.key" :class="current === item.key?'active':''" v-for="item in filterList">{{item.name}}</div>
        </div>
        <div  class="container" v-show="current === 'classify'">
          <Scroll
            :list="classifyData"
          >
            <div class="container-item" :class="selectClassifyStore[classify.classifyId]?'active':''" v-for="classify in classifyData" @click.prevent.stop="select('Classify',classify)">
              {{classify.classify}}
            </div>
          </Scroll>
        </div>
        <div  class="container" v-show="current === 'spec'">
          <Scroll
            :list="specData"
          >
            <div class="container-item" :class="selectSpecStore[spec.specId]?'active':''" v-for="spec in specData" @click.prevent.stop="select('Spec',spec)">
              {{spec.spec}}
            </div>
          </Scroll>
        </div>
        <div  class="container" v-show="current === 'price'">
          <div class="container-row">
            <div class="label">最低价:</div>
            <div class="value">
              <input type="text" placeholder="请输入最低价" v-model="minPrice">
            </div>
          </div>
          <div class="container-row">
            <div class="label">最高价:</div>
            <div class="value">
              <input type="text" placeholder="请输入最高价" v-model="maxPrice">
            </div>
          </div>
        </div>
        <div class="container" v-show="current === 'brand'">
          <Scroll
            :list="brandData"
          >
            <div class="container-item" :class="selectBrandStore[brand.brandId]?'active':''" v-for="brand in brandData" @click.prevent.stop="select('Brand',brand)">
              {{brand.brand}}
            </div>
          </Scroll>
        </div>
        <div class="footer">
          <div class="footer-item" @click.prevent.stop="reset">重 置</div>
          <div class="footer-item submit" @click.prevent.stop="doWellSearch">搜 索</div>
        </div>
      </div>
    </cube-popup>
    <Foot selectedLabelDefault="腕 表"/>
  </div>
</template>

<script>
  import baseMixins from "@/mixins/base"
  import * as watchService from "@/api/watch"
  import * as baseService from "@/api/base"
  export default {
    name: 'index',
    mixins:[baseMixins],
    data () {
      return {
        minPrice:'',
        maxPrice:'',
        wellSearch:false,
        list:[],
        filterList:[
          {name:"品 牌",key:"brand"},
          {name:"规 格",key:"spec"},
          {name:"分 类",key:"classify"},
          {name:"价 格",key:"price"},
        ],
        current:"brand",
        brandData:[],
        specData:[],
        classifyData:[],
        selectBrandStore:{},
        selectSpecStore:{},
        selectClassifyStore:{},
        show:false,
        pullUpLoad: {
          threshold: 30,
          txt:{

          }
        },
        page:1,
        pageSize:20,
        filter:{},
        defaultFilter:{},
        watchName:"",
        hasNext:false,
        showBackTopOffset:10,
        scrollC:null
      }
    },
    methods: {
      reset(){
        this.selectBrandStore = {};
        this.selectSpecStore = {};
        this.selectClassifyStore = {};
        this.minPrice = "";
        this.maxPrice = "";
      },
      getBaseFilter(type){
        let result = [];
        Object.keys(this[`select${type}Store`]).map((key)=>{
          if(this[`select${type}Store`][key]){
            result.push(key);
          }
        });
        return result;
      },
      checkPrice(){
        let max = Number(this.maxPrice);
        let min = Number(this.minPrice);
        if(isNaN(max) || isNaN(min) || ((min !== 0 || max !== 0) && max < min)){
          return false;
        }
        return true;
      },
      doWellSearch(){
        if(!this.checkPrice()){
          this.showToast("价格设置不合理");
          return false;
        }
        let obj = {};
        obj['brand'] = this.getBaseFilter('Brand');
        obj['spec'] = this.getBaseFilter('Spec');
        obj['classify'] = this.getBaseFilter('Classify');
        let max = Number(this.maxPrice);
        let min = Number(this.minPrice);
        if(max!==0 || min!==0){
          this.filter['price'] = {max,min};
        }else{
          delete this.filter['price']
        }
        this.filter = {...this.filter,...obj};
        this.$refs['myPopup4'].hide();
        this.fetchData(true);
      },
      select(type,context){
        if(this.st){
          clearTimeout(this.st);
        }
        this.st = setTimeout(()=>{
          if(this[`select${type}Store`][context[`${type.toLowerCase()}Id`]]){
            this.$set(this[`select${type}Store`],context[`${type.toLowerCase()}Id`],null);
          }else{
            this.$set(this[`select${type}Store`],context[`${type.toLowerCase()}Id`],context);
          }
        },50);
      },
      async getBaseData(){
        let obj = {
          page:1,
          size:1000,
          filter:{}
        };
        let brandData = await this.$request(baseService.getBase.bind(this,'brand',obj));
        let specData = await this.$request(baseService.getBase.bind(this,'spec',obj));
        let classifyData = await this.$request(baseService.getBase.bind(this,'classify',obj));
        this.brandData = brandData.data;
        this.specData = specData.data;
        this.classifyData = classifyData.data;
      },
      showWellSearch(){
        this.$refs['myPopup4'].show();
      },
      search(){
        this.reset();
        this.filter = {
          watchName:this.watchName
        };
        this.fetchData(true);
      },
      backTop(){
        this.$refs['scroll'].scrollTo(0,0);
      },
      scroll({x,y}){
        this.show = y < 0 && Math.abs(y) > this.showBackTopOffset;
      },
      async fetchData(refresh = false){
        if(refresh){
          this.page = 1;
        }
        let obj = {
          page:this.page,
          size:this.pageSize,
          filter:this.filter
        };
        let data = await this.$request(watchService.getPage.bind(this,obj));
        this.hasNext = data.hasNext;
        if(refresh)this.$refs["scroll"]._initScroll();
        if(refresh)this.$refs["scroll"].scrollTo(0,0);
        this.list = refresh?data.data:this.list.concat(data.data);
      },
      async pullingUp() {
        if(!this.hasNext){
          return false;
        }
        this.page += 1;
        await this.fetchData();
      }
    },
    async created(){
      try{
        await this.fetchData(true);
        await this.getBaseData();
      }catch (e){
        console.log(e)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../css/common/function";
  .page-index-list{
    width: 100vw;
    height: 100%;
    .flex(column);
    background: #f2f2f2;
    .goods-filter{
      min-height: 340px;
      max-height: 340px;
      height: 340px;
      background: #FFFFFF;
      .flex(column);
      .filter-panel{
        height: 40px;
        .flex();
        border-bottom: 1px solid #ececec;
        margin-bottom: 4px;
        .filter-item{
          .flex_item(1);
          text-align: center;
          font-size: 15px;
          color: #0a0a0a;
          line-height: 40px;
          &.active{
            border-bottom: 2px solid #ff0000;
            color: #ff0000;
          }
        }
      }
      .container{
        .flex_item(1);
        overflow: scroll;
        padding: 10px;
        .container-item{
          width: 30%;
          height: 32px;
          overflow: hidden;
          padding: 0 4px;
          text-align: center;
          line-height: 32px;
          background: #f2f2f2;
          color: #0a0a0a;
          font-size: 14px;
          border-radius: 4px;
          margin-right: calc(10% / 2);
          margin-top: 10px;
          display: inline-block;
          &.active{
            background: #ff0000;
            color: #FFF;
          }
          &:nth-child(3n){
            margin-right: 0;
          }
        }
        .container-row{
          .flex();
          font-size: 14px;
          .label{
            width: 100px;
            text-align: center;
            line-height: 40px;
          }
          .value{
           .flex_item(1);
            height: 40px;
            input{
              height: 30px;
              line-height: 30px;
              margin: 5px 0;
              border: 1px solid #ececec;
              padding-left: 10px;
            }
          }
        }
      }
      .footer{
        height: 40px;
        .flex();
        border-top: 1px solid #ececec;
        margin-top: 4px;
        .footer-item{
          .flex_item(1);
          text-align: center;
          font-size: 15px;
          color: #0a0a0a;
          line-height: 40px;
          &:last-child{
            border-left: 1px solid #ececec;
          }
          &.submit{
            background: #00aaff;
            color: #FFF;
          }
        }
      }
    }
    .list-input-holder{
      width: 100%;
      height: 40px;
    }
    .list-input{
      position: fixed;
      top:0;
      left: 0;
      right: 0;
      z-index: 1;
      height: 40px;
      width: 100%;
      padding-left: 7.5px;
      .flex();
      font-size: 14px;
      .well-search{
        height: 30px;
        line-height: 30px;
        background: #FFF;
        text-align: center;
        width: 74px;
        border-radius: 4px;
        margin: 5px 5px 5px 0;
        color: #00aaff;
      }
      .input{
        .flex_item(1);
        height: 40px;
        input{
          height: 30px;
          padding: 0 10px;
          line-height: 30px;
          margin: 5px 0;
          width: 100%;
        }
      }
      .search{
        width: 46px;
        font-size: 14px;
        color: #00aaff;
        line-height: 40px;
        text-align: center;
      }
    }
    .list-container{
      .flex_item(1);
      overflow: scroll;
      background: #FFFFFF;
      padding:7.5px ;
      .foodPanel-container {
        height: 100%;
        width: 100%;
        /* border: 1px solid red */
      }
      .wrap {
        height: 100%;
        width: 100%;
        overflow: scroll;
      }
    }
  }
</style>
