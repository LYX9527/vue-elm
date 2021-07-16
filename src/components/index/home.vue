<template>
  <div id="cont">
    <div class="nav">
      <div class="ic" @click="skip('search')">
        <icon type="search" class="icon_fs" />
      </div>
      <span class="nav_title" @click="skip('address')">{{
        addressName ? addressName.name : location.name | texthidden(15)
      }}</span>
      <div class="ic" @click="skip(token > 0 ? 'personal' : 'login')">
        <icon type="peronal" class="icon_fs" />
      </div>
    </div>
    <div style="width: 100%; height: 2.9rem"></div>
    <van-swipe class="my-swipe" indicator-color="white" loop>
      <!-- :autoplay="3000" -->
      <van-swipe-item>
        <div class="box">
          <div
            class="img"
            :key="i"
            v-for="(item, i) in banner[0]"
            @click="skip('classify')"
          >
            <img :src="'https://fuss10.elemecdn.com' + item.image_url" alt="" />
            <span>{{ item.title }}</span>
          </div>
        </div></van-swipe-item
      >
      <van-swipe-item>
        <div class="box">
          <div
            class="img"
            :key="i"
            v-for="(item, i) in banner[1]"
            @click="skip('classify')"
          >
            <img :src="'https://fuss10.elemecdn.com' + item.image_url" alt="" />
            <span>{{ item.title }}</span>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
    <div class="content">
      <p><icon type="merchant" /> 附近商家</p>
      <div
        class="merchant"
        v-for="(item, i) in shops"
        :key="i"
        @click="skip('retail', item)"
      >
        <div class="img">
          <img :src="'https://elm.cangdu.org/img/' + item.image_path" alt="" />
        </div>
        <div class="cont_right">
          <div class="top">
            <div>
              <span>品牌</span>
              <span>{{ item.name ? item.name : 郑州 | texthidden(6) }}</span>
            </div>
            <div><span>保</span><span>准</span><span>票</span></div>
          </div>
          <div class="middie">
            <div>
              <van-rate
                v-model="item.rating"
                allow-half
                :size="5"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
                readonly
              />
              <div class="ff">
                <span>{{ item.rating }}</span>
              </div>
              <span>月售{{ item.recent_order_num }}单</span>
            </div>
            <div>
              <p>
                <span>蜂鸟专送</span>
                <span>准时达</span>
              </p>
            </div>
          </div>
          <div class="buttom">
            <div>
              <span>¥{{ item.float_minimum_order_amount }}元起送</span> /
              <span>{{ item.piecewise_agent_fee.tips }}</span>
            </div>
            <div>
              <span>{{ item.distance }}</span> /
              <span>{{ item.order_lead_time }}</span>
            </div>
          </div>
        </div>
      </div>
      <div style="width: 100%; height: 2.9rem"></div>
    </div>
  </div>
</template>

<script lang='ts'>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      value: "",
      grade: 4.7,
      shops: "",
      name: "",
      token: "",
    };
  },
  methods: {
    ...mapMutations(["bner", "chSelfemployed"]),
    getBanner() {
      (this as any)
        .$http({
          method: "get",
          url: "https://elm.cangdu.org/v2/index_entry",
        })
        .then((res: { data: any }) => {
          (this as any).bner(res.data);
        });
    },
    getTotal(latitude: any, longitude: any) {
      (this as any)
        .$http({
          method: "get",
          url: `https://elm.cangdu.org/shopping/restaurants?latitude=${latitude}&longitude=${longitude}`,
        })
        .then((res: { data: any }) => {
          (this as any).shops = res.data;
        });
    },
    skip(address: any, item = 0) {
      (this as any).$router.push({
        name: address,
      });
      if (item) {
        (this as any).chSelfemployed(item);
      }
    },
  },
  created() {
    (this as any).getBanner();
    (this as any).token = (this as any).$cookies.get("token");
    if ((this as any).addressName) {
      (this as any).getTotal(
        (this as any).addressName.latitude,
        (this as any).addressName.longitude
      );
    } else {
      (this as any).getTotal(
        (this as any).location.latitude,
        (this as any).location.longitude
      );
    }
  },
  computed: {
    ...mapState(["banner", "location", "addressName"]),
  },
  mounted() {},
  filters: {
    texthidden(text: string | any[], num: number) {
      if (text.length > num) {
        return text.toString().substring(0, num - 1) + "...";
      } else {
        return text;
      }
    },
  },
};
</script>

<style scoped lang='less'>
#cont {
  @comstyle();
  @shopping();
  .my-swipe .van-swipe-item {
    width: 100%;
    color: @cff;
    background-color: @cff;
    font-size: 20px;
    line-height: 6.3725rem;
    text-align: center;
    height: 12.75rem;
    .box {
      height: 12.75rem;
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      border-bottom: 1px solid @cef;
      .img {
        display: flex;
        flex-wrap: wrap;
        width: 25%;
        height: 50%;
        position: relative;
        img {
          width: 50%;
          height: 50%;
          margin: 10% 25%;
        }
        span {
          line-height: 0.6rem;
          font-size: 0.5rem;
          width: 100%;
          height: 20%;
          z-index: 2000;
          color: #000;
        }
      }
    }
  }
  .content {
    margin-top: 0.8rem;
    p {
      width: 100%;
      height: 2.5rem;
      line-height: 2.5rem;
      box-sizing: border-box;
      font-size: 0.5rem;
      padding: 0 1rem;
    }
  }
}
</style>