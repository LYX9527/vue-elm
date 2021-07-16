<template>
  <div id="cont">
    <router-view></router-view>
    <van-tabbar v-model="active" @change="onChange">
      <van-tabbar-item>
        <span>外卖</span>
        <template #icon="">
          <icon type="elmicon" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item>
        <span>搜索</span>
        <template #icon="">
          <icon type="compass" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="orders-o">订单</van-tabbar-item>
      <van-tabbar-item icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang='ts'>
export default {
  data() {
    return {
      active: "",
    };
  },
  methods: {
    onChange(index:number) {
      switch (index) {
        case 0:
          (this as any).$router.push({
            name: "home",
          });
          break;
        case 1:
          (this as any).$router.push({
            name: "search",
          });
          break;
        case 2:
          (this as any).$router.push({
            name: "order",
          });
          break;
        case 3:
          (this as any).$router.push({
            name: "personal",
          });
          break;
      }
    },
  },
};
</script>
<style scoped lang="less">
#cont {
  background-color: @cef;
  width: 100%;
  height: 100%;
}
</style>


