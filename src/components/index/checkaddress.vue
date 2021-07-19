<template>
  <div id="cont">
    <div class="nav">
      <div class="ic" @click="skip('submitorder')">
        <icon type="arrowLeft" class="icon_fs" />
      </div>
      <span class="nav_title">选择地址</span>
      <div class="ic"></div>
    </div>
    <div style="width: 100%; height: 2.9rem"></div>
    <div class="box">
      <div v-for="(v, i) in addresses" :key="i" @click="check(v)">
        <p>
          <span style="font-size: 1.1rem">{{ v.name }}</span>
          <span style="margin: 0 1rem">{{ v.sex == 1 ? "先生" : "女士" }}</span>
          <span>{{ v.phone }}</span>
        </p>
        <p>
          <span
            style="
              background: #f00;
              color: #fff;
              border-radius: 5px;
              padding: 0 0.2rem;
            "
            >{{ v.tag }}</span
          >
          <span>{{ v.address_detail }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { mapState ,mapMutations} from "vuex";
export default {
  data() {
    return {
      addresses: "",
    };
  },
  methods: {
    ...mapMutations(['chSubAdd']),
    getAddtol() {
      (<any>this)
        .$http({
          method: "get",
          url: `https://elm.cangdu.org/v1/users/${
            (<any>this).loginMessage.id
          }/addresses`,
        })
        .then((res: any) => {
          (<any>this).addresses = res.data;
        });
    },
    check(data: any) {
        (<any>this).chSubAdd(data);
        (<any>this).skip('submitorder');
    }
  },
  computed: {
    ...mapState(["loginMessage"]),
  },
  created(): void {
    (<any>this).getAddtol();
  },
};
</script>

<style lang='less' scoped>
#cont {
  font-size: 0.8rem;
  @comstyle();
  .box {
    margin-top: 0.5rem;
    > div {
      width: 100%;
      display: flex;
      height: 4rem;
      flex-wrap: wrap;
      border: @mborder;
      background-color: @cff;
      p {
        box-sizing: border-box;
        padding: 0 1rem;
        width: 100%;
        height: 2rem;
        line-height: 2rem;
        &:nth-child(1) {
          font-size: 1rem;
        }
      }
    }
  }
}
</style>