<template>
  <div id="cont">
    <div class="nav">
      <div class="ic" @click="skip('personal')">
        <icon type="arrowLeft" class="icon_fs" />
      </div>
      <span class="nav_title">账户信息</span>
      <div class="ic"></div>
    </div>
    <div style="width: 100%; height: 2.9rem"></div>
    <div class="info">
      <div>
        <span>头像</span>
        <img :src="'https://elm.cangdu.org/img/'+loginMessage.avatar" alt="" />
        <icon class="icon" type="arrowRight" />
      </div>
      <div>
        <span>用户名</span>
        <span>{{ loginMessage.username }}</span>
        <icon class="icon" type="arrowRight" />
      </div>
      <div @click='skip("addadres")'>
        <span>收货地址</span>
        <span></span>
        <icon class="icon" type="arrowRight" />
      </div>
    </div>
    <div class="phone">
      <div>账号绑定</div>
      <div @click="alt()">
        <span><icon type="cphone" />手机</span>
        <icon class="icon" type="arrowRight" />
      </div>
    </div>
    <div class="safe">
      <div>账号绑定</div>
      <div @click="skip('forget')">
        <span>登录密码</span>
        <span class="change">修改</span>
        <icon class="icon" type="arrowRight" />
      </div>
    </div>
    <van-button type="danger" block style="width: 90%; margin: 5%" @click="exit"
      >退出登录</van-button
    >
  </div>
</template>

<script lang='ts'>
import { mapState, mapMutations } from "vuex";
import { Dialog } from "vant";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["chLogin"]),
    exit() {
      Dialog.confirm({
        title: "确认",
        message: "是否退出登录？",
      })
        .then(() => {
          (this as any).$cookies.remove("token");
          (this as any).chLogin({});
          (this as any).skip("login");
        })
        .catch(() => {});
    },
    alt() {
      Dialog.alert({
        message: "请在手机APP上操作",
      }).then(() => {
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
  @comstyle();
  .info {
    width: 100%;
    height: 11rem;
    display: flex;
    flex-wrap: wrap;
    font-size: 0.8rem;
    margin-top: 0.8rem;
    div {
      background-color: @cff;
      border: @mborder;
      box-sizing: border-box;
      padding: 0 2rem 0 1rem;
      &:nth-child(1) {
        height: 5rem;
        width: 100%;
        line-height: 5rem;
        position: relative;
        img {
          height: 3rem;
          border-radius: 50%;
          position: absolute;
          top: 1rem;
          right: 3rem;
        }
      }
      &:nth-child(2),
      &:nth-child(3) {
        width: 100%;
        height: 3rem;
        line-height: 3rem;
        position: relative;
        span {
          &:nth-child(1) {
            float: left;
          }
          &:nth-child(2) {
            float: right;
          }
        }
      }
    }
  }
  .icon {
    right: 0.8rem;
    position: absolute;
    color: @ccc;
  }
  .phone,
  .safe {
    font-size: 0.8rem;
    div {
      border: @mborder;
      &:nth-child(1) {
        height: 2rem;
        box-sizing: border-box;
        padding: 0 1rem;
        line-height: 2rem;
        background-color: @cef;
      }
      &:nth-child(2) {
        height: 3rem;
        box-sizing: border-box;
        padding: 0 1rem;
        line-height: 3rem;
        background-color: @cff;
        position: relative;
        .change {
          right: 2rem;
          position: absolute;
          color: @ccc;
        }
      }
    }
  }
}
</style>