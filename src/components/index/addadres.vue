<template>
  <div id="cont">
    <div class="nav">
      <div class="ic" @click="skip('permessage')">
        <icon type="arrowLeft" class="icon_fs" />
      </div>
      <span class="nav_title">编辑地址</span>
      <div class="ic"></div>
    </div>
    <div style="width: 100%; height: 2.9rem"></div>
    <div class="box">
      <div v-for="(v, i) in addresses" :key="i">
        <p>{{ v.address }}</p>
        <p>{{ v.phone }}</p>
      </div>
    </div>
    <div class="btn" @click="skip('add')">
      新增地址<icon type="arrowRight" />
    </div>
  </div>
</template>

<script lang='ts'>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      addresses: "",
    };
  },
  methods: {
    getAddtol() {
      (<any>this)
        .$http({
          method: "get",
          url: `https://elm.cangdu.org/v1/users/${
            (<any>this).loginMessage.id
          }/addresses`,
        })
        .then((res: any) => {
          console.log(res);
          (<any>this).addresses = res.data;
        });
    },
  },
  computed: {
    ...mapState(["loginMessage"]),
  },
  created(): void {
    (<any>this).getAddtol();
  },
};
</script>

<style scoped lang='less'>
#cont {
  font-size: 0.8rem;
  @comstyle();
  .btn {
    width: 100%;
    height: 3rem;
    font-size: 0.8rem;
    text-align: left;
    line-height: 3rem;
    position: relative;
    box-sizing: border-box;
    padding: 0 1rem;
    border-bottom: @mborder;
    border-top: @mborder;
    margin-top: 0.5rem;
    i {
      position: absolute;
      right: 1rem;
    }
  }
  .box {
    margin-top: 0.5rem;
    > div {
      width: 100%;
      display: flex;
      height: 4rem;
      flex-wrap: wrap;
      border:@mborder;
      p {
        box-sizing: border-box;
        padding: 0 1rem;
        width: 100%;
        height: 2rem;
        line-height: 2rem;
        &:nth-child(1){
          font-size: 1rem;
        }
      }
    }
  }
}
</style>