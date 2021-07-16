<template>
  <div id="cont">
    <div class="nav">
      <div class="ic" @click="skip('redpacket')">
        <icon type="arrowLeft" class="icon_fs" />
      </div>
      <span class="nav_title">历史红包</span>
      <div class="ic"></div>
    </div>
    <div style="width: 100%; height: 1rem; margin-bottom: 2.9rem"></div>
    <div class="packbody">
      <div
        v-for="(v, i) in redpackets"
        :key="i"
        :style="{ height: v.limit_map ? '8rem' : '6rem' }"
      >
        <div style="background-color:#888"></div>
        <div>
          <div>
            <p class="num">
              <span style="color:#888">¥</span><span style="color:#888">{{ Math.floor(v.amount) }}</span
              ><span style="color:#888">.{{ (v.amount - Math.floor(v.amount)) * 10 }}</span>
            </p>
            <p>{{ v.description_map.sum_condition }}</p>
          </div>
          <div>
            <h1>{{ v.name }}</h1>
            <p>{{ v.end_date }}过期</p>
            <p>限收货手机号为{{ v.phone }}</p>
          </div>
          <div><icon type="outdate" /></div>
        </div>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <p style="font-size: 0.5rem; padding: 0 1rem">
          {{ v.limit_map ? v.limit_map.restaurant_flavor_ids : "" }}
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
      active: 0,
      redpackets: "",
    };
  },
  methods: {
    getHispacket() {
      (this as any).$http({
        method: "get",
        url: `https://elm.cangdu.org/promotion/v2/users/${(this as any).loginMessage.id}/expired_hongbaos?limit=20&offset=0`,
      }).then((res: { data: any; }) => {
        (this as any).redpackets = res.data;
      });
    },
  },
  computed: {
    ...mapState(["loginMessage"]),
  },
  created() {
    (this as any).getHispacket();
  },
};
</script>

<style scoped lang='less'>
#cont {
  @comstyle();
  @redpacket();
  width: 100%;
  padding: 1rem 0; 
  background-color: @cef;
  font-size: 0.8rem;
  i {
    font-size: 3rem;
    color: #888;
  }
  .num {
    span {
      color: #888;
    }
  }
}
</style>