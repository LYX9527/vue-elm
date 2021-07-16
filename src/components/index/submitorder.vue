<template>
  <div id="cont">
    <div class="nav">
      <div class="ic" @click="skip('retail')">
        <icon type="arrowLeft" class="icon_fs" />
      </div>
      <span class="nav_title">确认订单</span>
      <div class="ic">
        <icon type="peronal" class="icon_fs" />
      </div>
    </div>
    <div style="width: 100%; height: 2.9rem"></div>
    <div class="address">
      <div>
        <icon type="location" />
      </div>
      <div>
        <p><span>132</span> <span>先生</span> <span>15858585858</span></p>
        <p><span>无</span> <span>12313223</span></p>
      </div>
      <div>
        <icon type="arrowRight" />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less'>

#cont {
  @comstyle();
  font-size: .8rem;
  .address {
    width: 100%;
    height: 6rem;
    background-color: #a58;
    display: flex;
    flex-wrap: nowrap;
    & > div {
        height:100%;
        &:nth-child(1),&:nth-child(3){
            width: 10%;
            background-color: #fff;
            line-height:6rem;
            text-align: center;
        }
        &:nth-child(2){
            width: 80%;
        }
    }
  }
}
</style>