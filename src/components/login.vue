<template>
  <div>
    <div class="nav">
      <div @click="back">
        <icon type="arrowLeft" class="icon_fs" />
      </div>
      <span class="nav_title">密码登录</span>
      <icon type="" class="icon_fs" />
    </div>
    <div class="from">
      <div><input type="text" placeholder="账号" v-model="user" /></div>
      <div>
        <input
          :type="!value ? 'password' : 'text'"
          placeholder="密码"
          v-model="pwd"
        />
        <el-switch
          v-model="value"
          active-color="#13ce66"
          inactive-color="#ccc"
          class="switch"
        >
        </el-switch>
      </div>
      <div>
        <input type="text" placeholder="验证码" v-model="vf" /><img
          :src="Vfturl"
          alt=""
        /><span @click="change"><i>看不清</i><i>换一张</i></span>
      </div>
    </div>
    <div class="tips">
      <p>温馨提示：未注册的账号，登录时将自动登录</p>
      <p>注册过的用户可凭账号密码登录</p>
    </div>
    <van-button type="primary" block class="btn" @click="login"
      >登录</van-button
    >
    <div class="forget"><span @click="forget">重置密码？</span></div>
  </div>
</template>

<script lang='ts'>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      value: false,
      Vfturl: "",
      user: "",
      pwd: "",
      vf: "",
    };
  },
  methods: {
    ...mapMutations(["chLogin"]),
    getVerification() {
      (this as any).$http({
        method: "post",
        url: "https://elm.cangdu.org/v1/captchas",
        withCredentials: true,
      }).then((res: { data: { code: any; }; }) => {
        (this as any).Vfturl = res.data.code;
      });
    },
    change() {
      (this as any).getVerification();
    },
    login() {
      (this as any).$http({
        method: "post",
        url: "https://elm.cangdu.org/v2/login",
        data: {
          username: (this as any).user,
          password: (this as any).pwd,
          captcha_code: (this as any).vf,
        },
        withCredentials: true,
      })
        .then((res: { data: { id: any; status: any; }; }) => {
          (this as any).chLogin(res.data);
          (this as any).$cookies.set('token', res.data.id,'20min')
          return res.data.status;
        })
        .then((res: any) => {
          if (res===void(0)) {
            (this as any).$router.push({
              name: "personal",
            });
          }
        });
    },
    back() {
      (this as any).$router.go(-1);
    },
    forget() {
      (this as any).$router.push({
        name: "forget",
      });
    },
  },
  created() {
    (this as any).getVerification();
  },
};
</script>

<style scoped lang='less'>
@mborder:1px solid #efefef;
.icon_fs {
  font-size: 1.4rem;
  &:nth-of-type(1) {
    width: 4rem;
  }
  &:nth-of-type(2) {
    width: 4rem;
  }
}
.nav {
  background-color: #3092e8;
  display: flex;
  flex-wrap: nowrap;
  height: 2.9rem;
  text-align: center;
  line-height: 2.9rem;
  color: #fff;
  font-size: 1.1rem;
  div {
    width: 4rem;
  }
  span {
    display: inline-block;
    width: 16rem;
  }
}
.from {
  margin-top: 1rem;
  box-sizing: border-box;
  width: 100%;
  input {
    display: block;
    outline: none;
    border: none;
    width: 100%;
    height: 3rem;
    font-size: 1rem;
    box-sizing: border-box;
    border-top: @mborder;
    border-bottom: @mborder;
    padding: 0 1.5rem;
  }
  div {
    position: relative;
    &:nth-child(3) {
      height: 3rem;
      width: 100%;
      border-bottom: @mborder;
      input {
        display: inline-block;
        width: 50%;
        border-bottom: none;
      }
      img {
        position: absolute;
        display: inline-block;
        height: 100%;
      }
      span {
        display: inline-block;
        position: absolute;
        font-size: 0.6rem;
        font-weight: 300;
        right: 1rem;
        line-height: 1rem;
        color: #555;
        top: 0.6rem;
        width: 10%;
        i {
          display: block;
        }
        :nth-child(2) {
          color: #3092e8;
        }
      }
    }
  }
  :nth-child(2) {
    .switch {
      position: absolute;
      right: 1.5rem;
      top: 1rem;
      font-size: 5rem;
    }
  }
}
.tips {
  width: 100%;
  height: 4rem;
  font-size: 0.8rem;
  box-sizing: border-box;
  padding: 0 1rem;
  p {
    line-height: 2rem;
    color: #ff0000;
  }
}
.btn {
  font-size: 1rem;
  width: 90%;
  margin: 0 5%;
  height: 2.8rem;
}
.forget {
  height: 2rem;
  width: 100%;
  position: relative;
  span {
    color: #3092e8;
    position: absolute;
    right: 1rem;
    top: 3rem;
    font-size: 0.8rem;
  }
}
</style>