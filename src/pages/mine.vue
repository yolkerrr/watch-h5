<template>
    <div class="test-container">
      <div class="item-1">
        item-1
      </div>
      <div class="item-holder">
        item-holder
      </div>
    </div>
</template>

<script>
    export default {
        name: "mine"
    }
</script>

<style lang="less" scoped>
  @import "../css/common/function";
  .test-container{
    width: 100%;
    height: 100%;
    background: #00aaff;
    .flex(column);
    .item-1{
      width: 100%;
      .flex_item(1);
      background: #ff0000;
    }
    .item-holder{
      height: 200px;
      width: 100%;
      background: yellow;
    }
  }
</style>
