<template>
  <div id="cont">
    <div class="nav">
      <div class="ic" @click="skip('addadres')">
        <icon type="arrowLeft" class="icon_fs" />
      </div>
      <span class="nav_title">新增地址</span>
      <div class="ic"></div>
    </div>
    <div style="width: 100%; height: 2.9rem"></div>
    <div class="input">
      <input type="text" placeholder="请填写你的姓名" v-model="name" />
      <input type="text" placeholder="小区/写字楼/学校等" v-model="address" />
      <input
        type="text"
        placeholder="请填写详细送餐地址"
        v-model="detailaddress"
      />
      <input type="text" placeholder="请填写能联系到您的手机号" v-model="tel" />
      <input type="text" placeholder="备用联系电话" v-model="sparetel" />
    </div>
    <van-button
      type="primary"
      block
      style="width: 90%; margin: 0.5rem 5%"
      :disabled="
        this.name != '' &&
        this.address != '' &&
        this.detailaddress != '' &&
        tel != ''
          ? false
          : true
      "
      @click="submitaddress"
      >新增地址</van-button
    >
  </div>
</template>

<script lang='ts'>
import { mapState, mapMutations } from "vuex";
import { Notify } from "vant";
export default {
  data() {
    return {
      name: "",
      address: "",
      detailaddress: "",
      tel: "",
      sparetel: "",
    };
  },
  methods: {
    ...mapMutations([""]),
    submitaddress(): void {
      (<any>this).$http({
        method: "post",
        url: `https://elm.cangdu.org/v1/users/${
          (<any>this).loginMessage.id
        }/addresses`,
        data: {
          user_id: (<any>this).loginMessage.id,
          address: (<any>this).address,
          address_detail: (<any>this).detailaddress,
          geohash: (<any>this).addressName.geohash,
          name: (<any>this).name,
          phone: (<any>this).tel,
          tag: 1,
          sex: 1,
          poi_type: (<any>this).sparetel,
          tag_type: 2,
        },
      }).then((res: any) => {
        console.log(res);
        Notify(res.data?.success);
        (<any>this).name='';
        (<any>this).address='';
        (<any>this).detailaddress='';
        (<any>this).tel='';
        (<any>this).sparetel='';
      });
    },
  },
  computed: {
    ...mapState(["loginMessage", "addressName"]),
  },
  created(): void {
    console.log((<any>this).loginMessage);
  },
};
</script>

<style scoped lang='less'>
#cont {
  @comstyle();
  font-size: 0.8rem;
  .input {
    width: 100%;
    background-color: @cff;
    margin-top: 1rem;
    input {
      outline: none;
      width: 90%;
      margin: 0 5%;
      border: @mborder;
      height: 2rem;
      margin-bottom: 0.5rem;
      border-radius: 5px;
      box-sizing: border-box;
      padding: 0 1rem;
      background-color: @cef;
    }
  }
}
</style>