<template>
  <div id="cont">
    <div class="nav">
      <div class="ic" @click="skip()">
        <icon type="arrowLeft" class="icon_fs" />
      </div>
      <span class="nav_title">搜索</span>
      <icon type="" class="icon_fs" />
    </div>
    <div style="width: 100%; height: 2.9rem"></div>
    <div class="search">
      <div>
        <input type="text" placeholder="请输入商家或美食名称" v-model="val" />
      </div>
      <div><button @click="search(val)">提交</button></div>
    </div>
    <div class="history" v-if="schHis.length && status">
      <div class="his_title">搜索历史</div>
      <div class="his_cont" v-for="(item, i) in schHis" :key="i">
        <div @click="chval(item)">{{ item }}</div>
        <div @click="delHistory(i)"><icon type="error" /></div>
      </div>
      <div class="his_footer" @click="clearHis">清空搜索历史</div>
    </div>
    <div v-if="!status">
      <div class="schcont_title">商家</div>
      <div class="searchcont" v-for="(item, i) in shops" :key="i">
        <div>
          <img :src="'https://elm.cangdu.org/img/' + item.image_path" alt="" />
        </div>
        <div>
          <div>
            <p>{{ item.name }} <span>支付</span></p>
          </div>
          <div>
            月售<span>{{ item.recent_order_num }}</span
            >单
          </div>
          <div>
            <span>{{ item.float_delivery_fee }}</span
            >元起送 / 距离<span>{{ item.distance }}</span
            >公里
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
      val: "",
      shops: "",
      status: 2,
    };
  },
  methods: {
    ...mapMutations(["changeSearch", "delHistory", "clearHis",'']),
    search(val: any) {
      (this as any).changeSearch(val);
      (this as any).$http({
        method: "get",
        url: `https://elm.cangdu.org/v4/restaurants?geohash=${(this as any).addressName.geohash}&keyword=${val}`,
      }).then((res: { data: any; }) => {
        (this as any).status = false;
        (this as any).shops = res.data;
      });
    },
    skip() {
      (this as any).$router.go(-1);
    },
    chval(data: any) {
      (this as any).val = data;
    },
  },
  computed: {
    ...mapState(["schHis",'addressName']),
  },
  watch: {
    val(nv: string, ov: any) {
      if (nv == "") {
        (this as any).shops = "";
        (this as any).status = true;
      }
    },
  },
};
</script>

<style scoped lang='less'>
#cont {
  @comstyle();
  @search();
  .search {
    width: 100%;
    height: 4rem;
    display: flex;
    background-color: @wc;
    div {
      height: 100%;
      &:nth-child(1) {
        width: 76%;
        input {
          outline: none;
          border: 1px solid @ccc;
          width: 90%;
          height: 60%;
          margin: 4% 5%;
          background-color: @cef;
          box-sizing: border-box;
          padding: 5%;
          border-radius: 5px;
          font-size: 0.9rem;
        }
      }
      &:nth-child(2) {
        width: 24%;
        button {
          width: 90%;
          height: 60%;
          margin: 12% 5%;
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
    height: 6rem;
    border-bottom: @mborder;
    background-color: @cff;
    display: flex;
    flex-wrap: nowrap;
    div {
      font-size: 0.8rem;
      &:nth-child(1) {
        width: 20%;
        img {
          width: 80%;
          margin: 10%;
        }
      }
      &:nth-child(2) {
        width: 80%;
        display: flex;
        flex-wrap: wrap;
        div {
          line-height: 2rem;
          width: 100%;
          height: 33;
          &:nth-child(1) {
            span {
              color: red;
              border: 1px solid red;
              font-size: 0.5rem;
            }
          }
        }
      }
    }
  }
}
</style>