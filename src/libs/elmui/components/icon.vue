<template>
  <i class="iconfont" :class="[iconClass, extraClass]"></i>
</template>

<script>
var map = {
  arrowUp: "icon-shangjiantou",
  arrowDown: "icon-zhankai",
  arrowRight:'icon-youjiantou-copy',
  arrowLeft:'icon-zuojiantou',
  search: "icon-fangdajing",
  peronal: "icon-gerenzhongxin",
  elmicon: "icon-elment",
  login:'icon-denglu',
  register:'icon-zhuce',
  merchant:'icon-shangjia',
  error:'icon-cha-',
  phone:'icon-shouji54',
  order:'icon-dingdan-',
  shopping:'icon-daojushangcheng',
  vip:'icon-huangguan',
  service:'icon-weibiaoti-1-05',
  elm:'icon-elemalogo',
  compass:'icon-compass',
  add:'icon-jiahao1',
  divide:'icon-jianhao1',
  cphone:'icon-huabanfuben',
  omit:'icon-sheng',
  mitigate:'icon-jianmianyajinzhong',
  tips:'icon-wenhao',
  outdate:'icon-yiguoqi',
  service2:'icon-kefu2',
  tel:'icon-dianhua',
  cart:'icon-zu',
  trash:'icon-lajitong',
  food1:'icon-hanbao',
  food2:'icon-cha',
  food3:'icon-buding',
  food4:'icon-baomihua',
  food5:'icon-ningmeng',
  food6:'icon-niupai',
  food7:'icon-pijiu',
  food8:'icon-pisa',
  food9:'icon-regou',
  location:'icon-location2'
};
export default {
  name: "icon",
  props: {
    type: {
      type: String,
      required: true,
    },
    extraClass: {
      type: String,
      default: "",
    },
  },
  computed: {
    iconClass() {
      return map[this.type];
    },
  },
  mounted() {
    // console.log("icon is loading...");
  },
};
</script>

<style scoped>
@import "//at.alicdn.com/t/font_2649304_lc6jav3kfdt.css"; 
/* 彩色 */
@import '//at.alicdn.com/t/font_2616734_l398wg0nskf.css'; 
/* 黑白 */
</style>