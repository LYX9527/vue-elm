<template>
  <div style="background-color: #efefef">
    <div class="nav">
      <div @click="skip('home')">
        <icon type="elmicon" class="icon_fs" />
      </div>
      <div></div>
      <div @click="skip('login')">
        <icon :type="status ? 'login' : 'register'" class="icon_fs" />
      </div>
    </div>
    <div style="width: 100%; height: 2.9rem"></div>
    <div class="city_title">
      <div ct_top>
        <span>当前定位城市：</span> <span>定位不准时，请在城市列表中选择</span>
      </div>
      <div @click="chct(location)">
        <span>{{ location.name }}</span> <span><icon type="arrowRight" /></span>
      </div>
    </div>
    <div class="hot_city">
      <div class="ht_title">热门城市</div>
      <div class="ht_body">
        <div v-for="(item, i) in hotCitys" :key="i" @click="chct(item)">
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="allCitys">
      <div v-for="(item, i) in allCitys" :key="i" class="partcity">
        <span class="aC_title">{{ i == "A" ? i + " (按字母排序)" : i }}</span>
        <div v-for="(v, j) in allCitys[i]" :key="j" @click="chct(v)">
          {{ v.name | texthidden }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      status: 1,
      hotCitys: [],
    };
  },
  methods: {
    ...mapMutations(["changeCitys", "chLocation"]),
    getLocation() {
      (this as any)
        .$http({
          method: "get",
          url: "https://elm.cangdu.org/v1/cities?type=guess",
        })
        .then((res: { data: any }) => {
          (this as any).chLocation(res.data);
        });
    },
    getHot() {
      (this as any)
        .$http({
          method: "get",
          url: "https://elm.cangdu.org/v1/cities?type=hot",
        })
        .then((res: { data: any }) => {
          (this as any).hotCitys = res.data;
        });
    },
    getallCitys() {
      (this as any)
        .$http({
          method: "get",
          url: "https://elm.cangdu.org/v1/cities?type=group",
        })
        .then((res: { data: any }) => {
          (this as any).changeCitys(res.data);
        });
    },
    skip(name: any) {
      (this as any).$router.push({
        name,
      });
    },
    chct(data: any) {
      (this as any).chLocation(data);
      (this as any).$router.push({
        name: "city",
      });
    },
  },
  computed: {
    ...mapState(["allCitys", "location"]),
  },
  created() {
    (this as any).getLocation();
    (this as any).getHot();
    (this as any).getallCitys();
  },
  filters: {
    texthidden(text: string | any[]) {
      if (text.length > 6) {
        return text.toString().substring(0, 5) + "...";
      } else {
        return text;
      }
    },
  },
};
</script>

<style scoped lang='less'>
.icon_fs {
  font-size: 1.4rem;
  box-sizing: border-box;
  padding: 0 1.25rem;
}
.nav {
  background-color: @mcolor;
  display: flex;
  flex-wrap: nowrap;
  height: 2.9rem;
  text-align: center;
  line-height: 2.9rem;
  color: @wc;
  font-size: 1.1rem;
  position: fixed;
  width: 100%;
  z-index: 999;
  div {
    width: 20%;
  }
  :nth-child(2) {
    width: 60%;
  }
}
.city_title {
  background-color: @wc;
  width: 100%;
  height: 5rem;
  margin-bottom: 1rem;
  div:nth-child(1),
  div:nth-child(2) {
    font-size: 0.8rem;
    height: 2.5rem;
    width: 100%;
    display: flex;
    border-bottom: 1px solid #ddd;
    span {
      display: inline-block;
      line-height: 2.5rem;
      box-sizing: border-box;
      padding: 0 0.5rem;
      color: #777;
      &:nth-child(1) {
        width: 40%;
        text-align: left;
      }
      &:nth-child(2) {
        width: 60%;
        text-align: right;
      }
    }
  }
  div:nth-child(2) {
    span:nth-child(1) {
      color: @mcolor;
      font-size: 1.2rem;
      font-weight: 300;
    }
  }
}
.hot_city {
  height: 7rem;
  background-color: @wc;
  .ht_title {
    height: 2rem;
    line-height: 2rem;
    box-sizing: border-box;
    padding: 0 0.5rem;
    color: #777;
    border-bottom: @mborder;
    font-size: 0.8rem;
  }
  .ht_body {
    height: 5rem;
    display: flex;
    flex-wrap: wrap;
    div {
      width: 25%;
      height: 50%;
      text-align: center;
      line-height: 2.5rem;
      box-sizing: border-box;
      border-right: @mborder;
      border-bottom: @mborder;
      font-size: 0.9rem;
      color: @mcolor;
    }
    :nth-of-type(4n) {
      border-right: none;
    }
  }
}
.allCitys {
  .partcity {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    margin-top: 1rem;
    background-color: @wc;
    div {
      box-sizing: border-box;
      width: 25%;
      height: 2.5rem;
      font-size: 0.9rem;
      text-align: center;
      line-height: 2.5rem;
      border-right: @mborder;
      border-bottom: @mborder;
      color: #777;
    }
    :nth-of-type(4n) {
      border-right: none;
    }
    .aC_title {
      width: 100%;
      height: 1.8rem;
      line-height: 1.8rem;
      box-sizing: border-box;
      padding: 0 0.5rem;
      font-size: 0.7rem;
      text-align: left;
      border-bottom: @mborder;
    }
  }
}
</style>