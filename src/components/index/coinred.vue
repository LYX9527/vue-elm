<template>
  <div id="cont">
    <div class="nav">
      <div class="ic" @click="skip('redpacket')">
        <icon type="arrowLeft" class="icon_fs" />
      </div>
      <span class="nav_title">兑换红包</span>
      <div class="ic"></div>
    </div>
    <div style="width: 100%; height: 2.9rem"></div>
    <div class="search">
      <input type="text" placeholder='请输入兑换码' />
      <input type="text" placeholder='验证码' />
      <div>
        <img :src="vfturl" alt="" />
        <div @click="click">
          <span>看不清</span>
          <span>换一张</span>
        </div>
      </div>
    </div>
    <van-button
      type="primary"
      color="#ccc"
      block
      style="width: 90%; margin: 0 auto"
      >兑换</van-button
    >
  </div>
</template>

<script lang='ts'>
export default {
  data() {
    return {
      vfturl: "",
    };
  },
  methods: {
    getVerification() {
      (this as any)
        .$http({
          method: "post",
          url: "https://elm.cangdu.org/v1/captchas",
          withCredentials: true,
        })
        .then((res: { data: { code: any } }) => {
          (this as any).vfturl = res.data.code;
        });
    },
    click() {
      (<any>this).getVerification();
    },
  },
  created() {
    (<any>this).getVerification();
  },
};
</script>

<style lang='less'>
#cont {
  width: 100%;
  height: 100%;
  background-color: @cef;
  @comstyle();
  font-size: 0.8rem;
  .search {
    width: 100%;
    position: relative;
    input {
      width: 90%;
      margin: 0.8rem 5%;
      outline: none;
      border: @mborder;
      height: 3rem;
      box-sizing: border-box;
      border-radius: 5px;
      padding: 0 1rem;
      &:nth-child(2) {
        display: inline-block;
        width: 50%;
      }
    }
    > div {
      display: inline-block;
      height: 3rem;
      background-color: @cff;
      border-radius: 5px;
      position: absolute;
      width: 35%;
      top: 5.4rem;
      line-height: 4.5rem;
      img {
        margin: auto 0;
      }
      div {
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        flex-wrap: wrap;
        height: 100%;
        width: 40%;
        span {
          display: block;
          width: 100%;
          height: 50%;
          line-height: 1.5rem;
          text-align: center;
          &:nth-child(2) {
            color: @mcolor;
          }
        }
      }
    }
  }
}
</style>