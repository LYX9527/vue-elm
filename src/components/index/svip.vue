<template>
  <div id="cont">
    <div class="nav">
      <div class="ic" @click="skip('personal')">
        <icon type="arrowLeft" class="icon_fs" />
      </div>
      <span class="nav_title">会员中心</span>
      <div class="ic"></div>
    </div>
    <div style="width: 100%; height: 2.9rem"></div>
    <div class="title">
      为账户
      <span style="font-weight: bold">{{ loginMessage.username }}</span>
      购买会员
    </div>
    <div class="vipright">
      <div>会员特权 <span @click="skip('questiondetail',8)">会员说明</span><icon type="arrowRight" /></div>
      <div>
        <div><icon type="omit" /></div>
        <div>
          <h1>减免配送费</h1>
          <p>每月减免30单，每日可减免3单，每单最高减4元</p>
          <p>蜂鸟专送专享</p>
        </div>
      </div>
      <div>
        <div><icon type="mitigate" /></div>
        <div>
          <h1>减免配送费</h1>
          <p>每月减免30单，每日可减免3单，每单最高减4元</p>
          <p>蜂鸟专送专享</p>
        </div>
      </div>
    </div>
    <div class="ktvip">
      <div>开通会员</div>
      <div>
        一个月<span style="color: #f60">¥20</span>
        <span style="border: 1px solid #f60; color: #f60">购买</span>
      </div>
    </div>
    <div class="cardvip" @click="skip('usecart')">
      兑换会员<span>使用卡号卡密</span><icon type="arrowRight" />
    </div>
    <div class="cardvip">
      购买记录<span>开发票</span><icon type="arrowRight" />
    </div>
  </div>
</template>

<script lang='ts'>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["chNowMsg"]),
    skip(address: string, id?: number) {
      this.chNowMsg(id);
      (this as any).$router.push({
        name: address,
      });
    },
  },
  computed: {
    ...mapState(["loginMessage"]),
  },
};
</script>

<style scoped lang='less'>
#cont {
  background-color: @cef;
  width: 100%;
  height: 100%;
  @comstyle();
  font-size: 0.8rem;
  .title {
    background-color: @cef;
    box-sizing: border-box;
    padding: 0 1rem;
    height: 3rem;
    line-height: 3rem;
  }
  .vipright {
    width: 100%;
    box-sizing: border-box;
    background-color: @cff;
    padding: 0 5%;
    height: 15rem;
    display: flex;
    flex-wrap: wrap;
    > div {
      border-bottom: @mborder;
      width: 100%;
      height: 6rem;
      &:nth-child(1) {
        height: 3rem;
        line-height: 3rem;
        position: relative;
        font-size: 1rem;
        span {
          position: absolute;
          font-size: 0.8rem;
          right: 1rem;
        }
        i {
          position: absolute;
          right: 0;
        }
      }
      &:nth-child(2),
      &:nth-child(3) {
        display: flex;
        flex-wrap: nowrap;
        box-sizing: border-box;
        padding: 0.5rem 0;
        > div {
          &:nth-child(1) {
            width: 15%;
            text-align: center;
            line-height: 5rem;
            i {
              font-size: 3rem;
              color: @mcolor;
            }
          }
          &:nth-child(2) {
            font-size: 0.8rem;
            line-height: 1.5rem;
            width: 85%;
            display: flex;
            flex-wrap: wrap;
            box-sizing: border-box;
            padding: 0 0 0 1rem;
            h1 {
              font-size: 1rem;
            }
            p {
              color: @ccc;
            }
          }
        }
      }
    }
  }
  .ktvip {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 6rem;
    margin-top: 0.8rem;
    font-size: 0.8rem;
    background-color: @cff;
    > div {
      box-sizing: border-box;
      line-height: 3rem;
      border-bottom: @mborder;
      padding: 0 1rem;
      width: 100%;
      height: 3rem;
      &:nth-child(2) {
        span:nth-child(2) {
          padding: 0.3rem 0.5rem;
          position: relative;
          right: -15rem;
        }
      }
    }
  }
  .cardvip {
    width: 100%;
    height: 3rem;
    margin-top: 0.8rem;
    font-size: 0.8rem;
    background-color: @cff;
    line-height: 3rem;
    border-bottom: @mborder;
    padding: 0 1rem;
    width: 100%;
    height: 3rem;
    position: relative;
    box-sizing: border-box;
    span {
      position: absolute;
      right: 2rem;
      color: @ccc;
    }
    i {
      position: absolute;
      right: 1rem;
    }
  }
}
</style>