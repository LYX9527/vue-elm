<template>
  <div id="cont">
    <div class="nav">
      <div class="ic" @click="skip('personal')">
        <icon type="arrowLeft" class="icon_fs" />
      </div>
      <span class="nav_title">服务中心</span>
      <div class="ic"></div>
    </div>
    <div style="width: 100%; height: 2.9rem"></div>
    <div class="title">
      <div>
        <p>
          <icon type="service2" />
        </p>
        <p>在线客服</p>
      </div>
      <div>
        <p>
          <icon type="tel" />
        </p>
        <p>在线客服</p>
      </div>
    </div>
    <div
      style="
        width: 100%;
        height: 4rem;
        box-sizing: border-box;
        padding: 0 1rem;
        line-height: 4rem;
        font-size: 1.2rem;
        border-bottom: 1px solid #efefef;
      "
    >
      热门问题
    </div>
    <div class="content">
      <div v-for="(v, i) in servicemessage[1]" :key="i" class="row" @click="router(i)">
        {{messagedetail[v]}}
        <icon type="arrowRight" />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
        content:'',
    };
  },
  methods: {
    ...mapMutations(["chServicemsg","chNowMsg",'chMsgdetails']),
    getService() {
      (<any>this).$http({
        method: "get",
        url: `https://elm.cangdu.org/v3/profile/explain`,
      }).then((res: { data: any; }) => {
          (<any>this).chMsgdetails(res.data);
          (<any>this).chServicemsg(res.data);
      });
    },
    router(id:number){
        (<any>this).skip('questiondetail');
        (<any>this).chNowMsg(id)
    }
  },
  created() {
      (<any>this).getService();
  },
  computed: {
      ...mapState(['servicemessage','messagedetail'])
  }
};
</script>

<style scoped lang='less'>
#cont {
  font-size: 0.8rem;
  @comstyle();
  .title {
    display: flex;
    flex-wrap: nowrap;
    height: 6rem;
    > div {
      width: 50%;
      height: 100%;
      box-sizing: border-box;
      border: @mborder;
      p {
        text-align: center;
        &:nth-child(1) {
          line-height: 3rem;
          i {
            font-size: 2rem;
          }
        }
      }
    }
  }
  .content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .row {
      width: 100%;
      height: 3rem;
      border-bottom: @mborder;
      line-height: 3rem;
      box-sizing: border-box;
      padding: 0 1rem;
      position: relative;
      i {
        position: absolute;
        right: 1rem;
      }
    }
  }
}
</style>