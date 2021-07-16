<template>
  <div id="cont">
    <div class="nav">
      <icon type="arrowLeft" class="icon_fs" />
      <span class="nav_title">{{ title }}</span>
      <icon type="" class="icon_fs" />
    </div>
  </div>
</template>

<script lang='ts'>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      title: "订单列表",
    };
  },
  computed: {
    ...mapState(["cart"]),
  },
};
</script>

<style scoped lang='less'>
#cont {
  @comstyle();
}
</style>