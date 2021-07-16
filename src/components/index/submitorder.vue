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
    <div class="time">
      <div>送达时间</div>
      <div>
        <div>尽快送达 ｜ 预计{{ "12:12" }}</div>
        <div>
          <div><span>蜂鸟专送</span></div>
        </div>
      </div>
    </div>
    <div class="pay">
      <div>
        <div>支付方式</div>
        <div><div>{{ "在线支付" }}<icon type="arrowRight" /></div></div>
      </div>
      <div>
          <div>红包</div>
          <div>暂时只在饿了么APP中支持</div>
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
  font-size: 0.8rem;
  width: 100%;
  height: 100%;
  background-color: @cef;
  .address {
    width: 100%;
    height: 6rem;
    background-color: #fff;
    display: flex;
    flex-wrap: nowrap;
    border: @mborder;
    & > div {
      height: 100%;
      &:nth-child(1),
      &:nth-child(3) {
        width: 10%;
        line-height: 6rem;
        text-align: center;
      }
      &:nth-child(2) {
        width: 80%;
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
        padding: 1rem;
        p {
          width: 100%;
          height: 50%;
          line-height: 2rem;
          &:nth-child(1) {
            span:nth-child(1) {
              font-size: 1.1rem;
              font-weight: bold;
            }
            span:nth-child(2) {
              font-size: 0.9rem;
            }
          }
          &:nth-child(2) {
            span:nth-child(1) {
              background-color: #f00;
              color: @cff;
              padding: 0 0.3rem;
              border-radius: 3px;
              font-size: 0.7rem;
            }
          }
        }
      }
    }
  }
  .time {
    box-sizing: border-box;
    border-left: 5px solid @mcolor;
    margin-top: 0.8rem;
    display: flex;
    width: 100%;
    height: 6rem;
    background-color: @cff;
    flex-flow: nowrap;
    border-bottom: @mborder;
    & > div {
      height: 100%;
      &:nth-child(1) {
        width: 30%;
        text-align: center;
        line-height: 6rem;
        font-size: 1.1rem;
        font-weight: bold;
      }
      &:nth-child(2) {
        width: 70%;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        padding: 1rem;
        & > div {
          width: 100%;
          &:nth-child(1) {
            text-align: right;
            color: @mcolor;
            font-size: 1rem;
          }
          &:nth-child(2) {
            position: relative;
            & > div {
              position: absolute;
              right: 0;
              > span {
                background-color: @mcolor;
                color: @cff;
                padding: 0.1rem 0.3rem;
                border-radius: 5px;
              }
            }
          }
        }
      }
    }
  }
  .pay {
    box-sizing: border-box;
    width: 100%;
    height: 6rem;
    display: flex;
    padding: 0 1rem;
    flex-wrap: wrap;
    background-color: @cff;
    margin-top: 0.8rem;
    & > div {
      width: 100%;
      height: 50%;
      display: flex;
      flex-wrap: nowrap;
      &:nth-child(1) {
        border-bottom: @mborder;
        line-height: 3rem;
        & > div {
          &:nth-child(1) {
            width: 75%;
          }
          &:nth-child(2) {
            width: 25%;
            position: relative;
            &>div{
                color:#888;
                position: absolute;
                right: 0;
            }
          }
        }
      }
      &:nth-child(2) {
          display: flex;
          flex-wrap: nowrap;
          line-height:3rem;
          &>div{
              color:#888;
              width: 50%;
              &:nth-child(2){
                  text-align: right;
              }
          }
      }
    }
  }
}
</style>