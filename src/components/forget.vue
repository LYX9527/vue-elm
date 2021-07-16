<template>
  <div>
    <div class="nav">
      <div @click="back">
        <icon type="arrowLeft" class="icon_fs" />
      </div>
      <span class="nav_title">重置密码</span>
      <icon type="" class="icon_fs" />
    </div>
    <div class="from">
      <div><input type="text" placeholder="账号" v-model="user" /></div>
      <div><input type="text" placeholder="旧密码" v-model="oldpwd" /></div>
      <div>
        <input type="text" placeholder="请输入新密码" v-model="newpwd" />
      </div>
      <div>
        <input type="password" placeholder="请确认密码" v-model="ppwd" />
      </div>
      <div>
        <input type="text" placeholder="验证码" v-model="vf" /><img
          :src="Vfturl"
          alt=""
        /><span @click="change"><i>看不清</i><i>换一张</i></span>
      </div>
    </div>
    <van-button type="primary" block class="btn" @click="changepwd">确认修改</van-button>
  </div>
</template>

<script lang='ts'>
export default {
  data() {
    return {
      user: "",
      oldpwd: "",
      newpwd: "",
      ppwd: "",
      Vfturl: "",
      vf: "",
    };
  },
  methods: {
    getVerification() {
      (this as any).$http({
        method: "post",
        url: "https://elm.cangdu.org/v1/captchas",
        withCredentials: true,
      }).then((res: { data: { code: any; }; }) => {
        (this as any).Vfturl = res.data.code;
      });
    },
    changepwd() {
      (this as any).$http({
        method: "post",
        url: "https://elm.cangdu.org/v2/changepassword",
        withCredentials: true,
        data: {
            username:(this as any).user,
            oldpassWord:(this as any).oldpwd,
            newpassword:(this as any).newpwd,
            confirmpassword:(this as any).ppwd,
            captcha_code:(this as any).vf,
        }
      }).then((res: any) => {
          console.log(res);
      });
    },
    change() {
      (this as any).getVerification();
    },
    back() {
      (this as any).$router.go(-1);
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
    &:nth-child(5) {
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
.btn {
  font-size: 1rem;
  width: 90%;
  margin: 2rem 5%;
  height: 2.8rem;
}
</style>