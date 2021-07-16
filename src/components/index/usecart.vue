<template>
  <div id="cont">
    <div class="nav">
      <div class="ic" @click="skip('svip')">
        <icon type="arrowLeft" class="icon_fs" />
      </div>
      <span class="nav_title">兑换 会员</span>
      <div class="ic"></div>
    </div>
    <div style="width: 100%; height: 2.9rem"></div>
    <div class="title">
      成功兑换后将关联到当前账号
      <span style="font-weight: bold">{{ loginMessage.username }}</span>
    </div>
    <div class="input">
      <input type="text" placeholder="请输入10位卡号" v-model="cardnum" />
      <input type="text" placeholder="请输入6位卡密" v-model="cardpwd" />
    </div>
    <van-button type="primary" block style="width: 90%; margin: 5%"
      >兑换</van-button
    >
    <div class="tips">
      <h1>——温馨提示——</h1>
      <p>新兑换的会员服务，权益以「会员说明」为准。</p>
      <p>月卡： 30次减免配送费。</p>
      <p>季卡： 90次减免配送费。</p>
      <p>年卡： 365次减免配送费。</p>
      <p>
        ＊仅限蜂鸟专送订单，每日最多减免3单，每单最高减免4元（一个月按31天计算）
      </p>
    </div>
  </div>
</template>

<script lang='ts'>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      cardnum: "",
      cardpwd: "",
    };
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
  font-size: 0.8rem;
  @comstyle();
  .title {
    background-color: @cef;
    box-sizing: border-box;
    padding: 0 1rem;
    height: 3rem;
    line-height: 3rem;
  }
  .input {
    width: 100%;
    overflow: hidden;
    input {
      width: 100%;
      outline: none;
      border: @mborder;
      height: 3rem;
      font-size: 1rem;
      padding: 0 1rem;
    }
  }
  .tips {
    color: @ccc;
    h1 {
      text-align: center;
      height: 2rem;
      font-size: 1rem;
    }
    p {
      width: 80%;
      margin: 0 10%;
      height: 1.2rem;
    }
  }
}
</style>