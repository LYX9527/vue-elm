<template>
  <div id="cont">
    <div class="nav">
      <div class="ic">
        <icon type="arrowLeft" class="icon_fs" />
      </div>
      <span class="nav_title">我的</span>
      <div class="ic">
        <icon type="" class="icon_fs" />
      </div>
    </div>
    <div style="width: 100%; height: 2.9rem"></div>
    <div class="per_title">
      <div>
        <img :src="'https://elm.cangdu.org/img/'+loginMessage.avatar" alt="">
      </div>
      <div>
        <p @click="skip(token > 0 && token ? 'permessage' : 'login')">
          {{ token > 0 ? loginMessage.username : "登录/注册" }}
        </p>
        <p>
          <icon type="phone" />{{
            token > 0 && loginMessage.mobile != ""
              ? loginMessage.mobile
              : "暂无绑定手机号"
          }}
        </p>
      </div>
      <div><icon type="arrowRight" /></div>
    </div>
    <div class="wallet">
      <div @click="skip(token>0?'balance':'login')">
        <p><span class="ee">0.00</span>元</p>
        <p>我的余额</p>
      </div>
      <div @click="skip(token>0?'redpacket':'login')">
        <p>
          <span class="yy">{{ token > 0 ? loginMessage.gift_amount : 0 }}</span
          >个
        </p>
        <p>我的优惠</p>
      </div>
      <div @click="skip(token>0?'integral':'login')">
        <p>
          <span class="ff">{{ token > 0 ? loginMessage.point : 0 }}</span
          >分
        </p>
        <p>我的积分</p>
      </div>
    </div>
    <div class="body">
      <div @click="skip(token>0?'order':'login')" >
        <p><icon type="order" />我的订单</p>
        <p>
          <icon type="arrowRight" />
        </p>
      </div>
      <div>
        <p><icon type="shopping" />积分商城</p>
        <p>
          <icon type="arrowRight" />
        </p>
      </div>
      <div @click="skip(token>0?'svip':'login')">
        <p><icon type="vip" />饿了么会员卡</p>
        <p>
          <icon type="arrowRight" />
        </p>
      </div>
    </div>
    <div class="footer">
      <div @click="skip('service')"> 
        <p><icon type="service" />服务中心</p>
        <p>
          <icon type="arrowRight" />
        </p>
      </div>
      <div @click="skip('download')">
        <p><icon type="elm" />下载饿了么APP</p>
        <p>
          <icon type="arrowRight" />
        </p>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      token: "",
    };
  },
  methods: {
    ...mapMutations([]),
  },
  computed: {
    ...mapState(["loginMessage"]),
  },
  created() {
    (this as any).token = (this as any).$cookies.get("token");
  },
};
</script>

<style scoped lang='less'>
#cont {
  @comstyle();
  .per_title {
    background-color: @mcolor;
    height: 6rem;
    border-top: @mborder;
    display: flex;
    flex-wrap: nowrap;
    div {
      color: @cff;
      height: 100%;
      &:nth-of-type(1) {
        width: 20%;
        box-sizing: border-box;
        padding: 1rem .5rem 0;
        img{
          width: 100%;
          border-radius:50%;
        }
      }
      &:nth-of-type(2) {
        width: 70%;
        display: flex;
        flex-wrap: wrap;
        p {
          width: 100%;
          text-align: left;
          box-sizing: border-box;
          padding: 0 1rem;
          line-height: 3rem;
          font-size: 1.5rem;
          &:nth-child(2) {
            font-size: 0.8rem;
          }
        }
      }
      &:nth-of-type(3) {
        width: 10%;
        line-height: 6rem;
        text-align: center;
        color: @cff;
      }
    }
  }
  .wallet {
    width: 100%;
    height: 6rem;
    background-color: @cff;
    display: flex;
    flex-wrap: nowrap;
    margin-bottom: 1rem;
    div {
      width: 33.3333%;
      display: flex;
      flex-wrap: wrap;
      border-right: @mborder;
      p {
        width: 100%;
        font-size: 0.8rem;
        text-align: center;
        &:nth-child(1) {
          height: 60%;
          line-height: 3.6rem;
        }
        &:nth-child(2) {
          height: 40%;
          line-height: 2.4rem;
          color: #888;
        }
      }
    }
    :nth-child(3) {
      border: none;
    }
    span {
      font-size: 2rem;
      font-weight: 600;
    }
    .ee {
      color: #f90;
    }
    .yy {
      color: #ff5f3e;
    }
    .ff {
      color: #6ac20b;
    }
  }
  .body {
    @temstyle();
    height: 9rem;
  }
  .footer {
    @temstyle();
    margin-top: 1rem;
    height: 6rem;
  }
}
</style>