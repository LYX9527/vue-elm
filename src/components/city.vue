<template>
  <div id="cont">
    <div class="nav">
      <div class="ic" @click="skip()">
        <icon type="arrowLeft" class="icon_fs" />
      </div>
      <span class="nav_title">{{ location.name }}</span>
      <div class="ic" @click="skip()">切换城市</div>
    </div>
    <div style="width: 100%; height: 2.9rem"></div>
    <div class="search">
      <div>
        <input
          type="text"
          placeholder="请输入学校，商务楼，地址"
          v-model="val"
        />
      </div>
      <div><button @click="search(val)">提交</button></div>
    </div>
    <div class="history" v-if="cityHis.length && status">
      <div class="his_title">搜索历史</div>
      <div class="his_cont" v-for="(item, i) in cityHis" :key="i">
        <div @click="chval(item)">{{ item }}</div>
        <div @click="delCity(i)"><icon type="error" /></div>
      </div>
      <div class="his_footer" @click="clearCity">清空搜索历史</div>
    </div>
    <div v-if="!status">
      <div class="schcont_title">结果</div>
      <div class="searchcont" v-for="(item, i) in citys" :key="i" @click="chaddress(item)">
        <p>
          {{ item.name }}
        </p>
        <p>
          {{ item.address | texthidden }}
        </p>
      </div>
      <div style='width:100%;height:2.9rem;'></div>
    </div>
  </div>
</template>

<script lang='ts'>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      val: "",
      citys: "",
      status: 2,
    };
  },
  methods: {
    ...mapMutations(["changeCity", "delCity", "clearCity",'chName']),
    search(val: any) {
      (this as any).changeCity(val);
      (this as any).$http({
        method: "get",
        url: `https://elm.cangdu.org/v1/pois?city_id=${(this as any).location.id}&keyword=${val}&type=search`,
      }).then((res: { data: any; }) => {
        (this as any).status = false;
        (this as any).citys = res.data;
      });
    },
    skip() {
      (this as any).$router.go(-1);
    },
    chaddress(data: any){
        (this as any).chName(data);
        (this as any).$router.push({
            name:'home'
        })
    },
    chval(data: any){
        (this as any).val = data;
    }
  },
  computed: {
    ...mapState(["cityHis", "location"]),
  },
  watch: {
    val(nv: string, ov: any) {
      if (nv == "") {
        (this as any).shops = "";
        (this as any).status = true;
      }
    },
  },
  filters: {
    texthidden(text: string|any[]) {
      if (text.length > 30) {
        return text.toString().substring(0, 25) + "...";
      } else {
        return text;
      }
    },
  },
};
</script>

<style scoped lang='less'>
#cont {
  @search();
  @comstyle();
  .search {
    width: 100%;
    height: 8rem;
    display: flex;
    background-color: @wc;
    flex-wrap: wrap;
    div {
      height: 50%;
      &:nth-child(1) {
        width: 100%;
        input {
          outline: none;
          border: 1px solid @ccc;
          width: 90%;
          height: 30%;
          margin: 4% 5%;
          box-sizing: border-box;
          padding: 5%;
          border-radius: 5px;
          font-size: 0.9rem;
        }
      }
      &:nth-child(2) {
        width: 100%;
        box-sizing: border-box;
        padding: 0 5%;
        button {
          width: 100%;
          height: 60%;
          font-size: 1rem;
          background-color: @mcolor;
          border: none;
          color: @wc;
        }
      }
    }
  }
  .searchcont {
    width: 100%;
    height: 4rem;
    border-bottom: @mborder;
    background-color: @cff;
    display: flex;
    flex-wrap: wrap;
    p {
      box-sizing: border-box;
      padding: 0 1.5rem;
      font-size: 0.8rem;
      line-height: 2rem;
      width: 100%;
      height: 50%;
      &:nth-child(1) {
        font-size: 1rem;
      }
      &:nth-child(2) {
        font-size: 0.8rem;
        color: #ccc;
      }
    }
  }
}
</style>