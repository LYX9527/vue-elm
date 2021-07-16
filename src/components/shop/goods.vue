<template>
  <div id="cont">
    <div class="nav">
      <div class="ic" @click="skip('retail')">
        <icon type="arrowLeft" class="icon_fs" />
      </div>
      <span class="nav_title">{{ food.name }}</span>
      <div class="ic"></div>
    </div>
    <div class="conent">
      <img :src="'https://elm.cangdu.org/img/' + food.image_path" alt="" />
      <p v-if='food.description'>{{food.description}}</p>
      <p>{{ food.name }}</p>
      <p>
        评分<van-rate
          v-model="food.rating"
          allow-half
          void-icon="star"
          void-color="#eee"
          size="10"
        />
        <span style="color:#f60">{{ food.rating }}</span>
      </p>
      <p>月售：{{ food.month_sales }}单 <span style="color:#f60">售价：¥{{ food.specfoods[0].price }} 起</span></p>
      <p>评论数：{{ food.name }} <span>好评率 {{food.satisfy_rate+'%'}}</span> </p>
    </div>
  </div>
</template>

<script lang='ts'>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["food"]),
  },
  created() {
    console.log((<any>this).food);
  },
};
</script>

<style lang='less'>
#cont {
  @comstyle();
  .conent {
    img {
      width: 100%;
    }
    p{
      width: 100%;
      height: 2rem;
      line-height: 2rem;
      box-sizing: border-box;
      padding:0 1rem;
    }
  }
}
</style>