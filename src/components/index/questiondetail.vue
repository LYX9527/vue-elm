<template>
  <div id="cont">
    <div class="nav">
      <div class="ic" @click="skip()">
        <icon type="arrowLeft" class="icon_fs" />
      </div>
      <span class="nav_title">{{messagedetail[servicemessage[1][nowservermsg]]}}</span>
      <div class="ic"></div>
    </div>
    <div style="width: 100%; height: 2.9rem"></div>
    <div>
      <p v-html="messagedetail[servicemessage[0][nowservermsg]]" style="font-size: 1.5rem;width:100%"></p>
    </div>
  </div>
</template>

<script lang='ts'>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    skip() {
      (this as any).$router.go(-1);
    },
  },
  computed: {
    ...mapState(["nowservermsg", "servicemessage", "messagedetail"]),
  }
};
</script>

<style scoped lang='less'>
#cont {
    overflow: hidden;
  font-size: 0.8rem;
  @comstyle();
}
</style>