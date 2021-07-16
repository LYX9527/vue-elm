<template>
  <div id="cont">
    <div class="nav">
      <div class="ic" @click="skip('home')">
        <icon type="arrowLeft" class="icon_fs" />
      </div>
      <span class="nav_title">{{ title }}</span>
      <div class="ic"></div>
    </div>
    <div class="dropdown">
      <div @click="cate(0)">
        {{ title }}<span :class="showid == 0 ? 'up' : 'down'"></span>
      </div>
      <div @click="cate(1)">
        排序<span :class="showid == 1 ? 'up' : 'down'"></span>
      </div>
      <div @click="cate(2)">
        筛选<span :class="showid == 2 ? 'up' : 'down'"></span>
      </div>
    </div>
    <div style="width: 100%; height: 5.3rem"></div>
    <div class="content">
      <div class="cover" v-if="show">
        <div class="menu" v-show="showid == 0">
          <div>
            <div
              v-for="(v, i) in classify"
              :key="v.id"
              @click="change(i)"
              :style="{
                backgroundColor: id == i ? '#fff' : '#efefef',
              }"
            >
              <icon :type="'food' + i" />
              {{ v.name }}
              <div class="numbox">
                <span class="num"> {{ v.count }} </span>
              </div>
              <span class="icon">
                <icon type="arrowRight" />
              </span>
              <div
                :style="{
                  top: -i * 3 + 'rem',
                  display: id == i ? 'block' : 'none',
                }"
                class="list"
              >
                <div
                  v-for="j in v.sub_categories"
                  :key="j.id"
                  v-show="j.id !== v.id"
                  @click="search(j)"
                >
                  <span>
                    {{ j.name }}
                  </span>
                  <div>
                    <span>{{ j.count }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="sort" v-show="showid == 1">
          <div v-for="(v, i) in rule" :key="i" @click="sortSearch(i + 1)">
            {{ v }}
          </div>
        </div>
        <div class="screen" v-show="showid == 2">
          <div>
            <div>
              <p>配送方式</p>
              <div>
                <div
                  :class="checkid[0] == 1 ? 'frame' : ''"
                  @click="checkids(0, 1)"
                >
                  蜂鸟专送
                </div>
              </div>
            </div>
            <div>
              <p>商家属性（可以多选）</p>
              <div>
                <div
                  :class="checkid[i + 1] == item.id ? 'frame' : ''"
                  @click="checkids(i + 1, item.id)"
                  v-for="(item, i) in checks"
                  :key="item.id"
                >
                  {{ item.name }}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div><van-button type="primary" block>清空</van-button></div>
            <div>
              <van-button type="primary" block @click="screenSearch(checkid)"
                >确定{{ count ? "(" + count + ")" : "" }}</van-button
              >
            </div>
          </div>
        </div>
      </div>
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
    </div>
  </div>
</template>

<script lang='ts'>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      title: "美食",
      shops: "",
      activeKey: 0,
      classify: "",
      id: 1,
      show: false,
      showid: 0,
      rule: [
        "起送价最低",
        "配送速度最快",
        "评分最高",
        "智能排序",
        "距离最近",
        "销量最高",
      ],
      count: 0,
      checkid: [0, 0, 0, 0, 0, 0, 0],
      checks: [
        { name: "品牌商", id: 8 },
        { name: "外卖保", id: 7 },
        { name: "准时达", id: 9 },
        { name: "新店", id: 5 },
        { name: "在线支付", id: 3 },
        { name: "开发票", id: 4 },
      ],
    };
  },
  methods: {
    ...mapMutations(["chSelfemployed"]),
    getShopData(latitude: any, longitude: any) {
      (this as any)
        .$http({
          method: "get",
          url: `https://elm.cangdu.org/shopping/v2/restaurant/category?latitude=${latitude}&longitude=${longitude}`,
        })
        .then((res: { data: any }) => {
          (<any>this).classify = res.data;
        });
    },
    getTotal(
      latitude: any,
      longitude: any,
      restaurant_category_ids?: number,
      order_by?: number
    ) {
      (this as any)
        .$http({
          method: "get",
          url: `https://elm.cangdu.org/shopping/restaurants?latitude=${latitude}&longitude=${longitude}&extras[]=activities&offset=0&limit=20&keyword=&restaurant_category_id=&restaurant_category_ids[]=${restaurant_category_ids}&order_by=${order_by}`,
        })
        .then((res: { data: any }) => {
          (this as any).shops = res.data;
          (this as any).shops = { ...(this as any).shops };
        });
    },
    getSceen() {
      (this as any).axios
        .get(
          `https://elm.cangdu.org/shopping/restaurants?extras[]=activities&offset=0&limit=20&keyword=&restaurant_category_id=`,
          {
            params: {
              latitude: (<any>this).addressName.latitude,
              longitude: (<any>this).addressName.longitude,
              support_ids: (<any>this).checkid,
            },
          }
        )
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
    change(id: number) {
      (<any>this).id = id;
    },
    cate(id: number) {
      if ((<any>this).showid != id && (<any>this).show) {
        (<any>this).showid = id;
        return;
      }
      (<any>this).show = !(<any>this).show;
      (<any>this).showid = id;
    },
    search(data: any) {
      (<any>this).getTotal(
        (<any>this).addressName.latitude,
        (<any>this).addressName.longitude,
        data.id
      );
      (<any>this).title = data.name;
      (<any>this).show = !(<any>this).show;
    },
    sortSearch(id: number) {
      (<any>this).getTotal(
        (<any>this).addressName.latitude,
        (<any>this).addressName.longitude,
        "",
        id
      );
      (<any>this).title = "美食";
      (<any>this).show = !(<any>this).show;
    },
    screenSearch() {
      (<any>this).getSceen();
      (<any>this).title = "美食";
      (<any>this).show = !(<any>this).show;
    },
    checkids(data: number, id: string) {
      if ((<any>this).checkid[data] == 0) {
        (<any>this).checkid[data] = id;
        (<any>this).count++;
      } else {
        (<any>this).checkid[data] = 0;
        (<any>this).count--;
      }
      (<any>this).checkid = [...(<any>this).checkid];
    },
  },
  computed: {
    ...mapState(["addressName"]),
  },
  created() {
    (<any>this).getShopData(
      (<any>this).addressName.latitude,
      (<any>this).addressName.longitude
    );
    (<any>this).getTotal(
      (<any>this).addressName.latitude,
      (<any>this).addressName.longitude
    );
  },
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
* {
  box-sizing: border-box;
}
#cont {
  font-size: 0.8rem;
  @comstyle();
  @shopping();
  .dropdown {
    position: fixed;
    width: 100%;
    height: 2.4rem;
    top: 2.9rem;
    display: flex;
    padding: 0.4rem;
    flex-wrap: nowrap;
    border-bottom: @mborder;
    background-color: @cff;
    z-index: 1;
    > div {
      height: 100%;
      width: 100%;
      text-align: center;
      line-height: 1.6rem;
      border-right: @mborder;
      &:nth-child(3) {
        border: none;
      }
      span {
        display: inline-block;
        margin-left: 2px;
        vertical-align: middle;
        border-right: 4px solid transparent;
        border-left: 4px solid transparent;
        transition: all 0.2s;
      }
      .up {
        border-bottom: 4px dashed;
      }
      .down {
        border-top: 4px dashed;
      }
    }
  }
  .content {
    position: relative;
    .cover {
      width: 100%;
      height: 100%;
      background-color: #0008;
      position: fixed;
      top: 5.3rem;
      z-index: 10;
      .menu {
        position: fixed;
        top: 5.3rem;
        background-color: #fff;
        width: 100%;
        height: 27rem;
        display: flex;
        flex-wrap: nowrap;
        > div {
          width: 50%;
          height: auto;
          > div {
            height: 3rem;
            line-height: 3rem;
            padding: 0 1rem;
            position: relative;
            background-color: @cef;
            .icon {
              position: absolute;
              right: 1rem;
            }
            .numbox {
              position: absolute;
              right: 2.5rem;
              top: 0;
              .num {
                font-size: 0.5rem;
                background-color: @ccc;
                border-radius: 20%;
                padding: 0.1rem 0.2rem;
                color: @cff;
              }
            }
            .list {
              position: absolute;
              left: 100%;
              width: 12rem;
              overflow: auto;
              height: 27rem;
              padding: 0 1rem;
              div {
                border-bottom: @mborder;
                position: relative;
                div {
                  position: absolute;
                  top: 0;
                  right: 0;
                }
              }
            }
          }
        }
      }
      .sort {
        width: 100%;
        background-color: @cff;
        div {
          height: 3rem;
          line-height: 3rem;
          padding: 0 2rem;
          border-bottom: @mborder;
        }
      }
      .screen {
        background-color: @cef;
        padding-bottom: 1rem;
        > div {
          p {
            width: 100%;
            height: 1rem;
            font-size: 0.6rem;
            line-height: 1rem;
            padding: 0 1rem;
          }
          &:nth-child(1) {
            height: 12rem;
            > div {
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              background-color: @cff;
              &:nth-child(1) {
                height: 4rem;
                > div {
                  width: 100%;
                  height: 3rem;
                  display: flex;
                  padding: 0.5rem;
                  > div {
                    height: 2rem;
                    width: 30%;
                    text-align: center;
                    line-height: 2rem;
                    border: @mborder;
                  }
                }
              }
              &:nth-child(2) {
                > div {
                  width: 100%;
                  height: 6rem;
                  display: flex;
                  flex-wrap: wrap;
                  padding: 0.5rem;
                  justify-content: space-around;
                  div {
                    width: 30%;
                    text-align: center;
                    height: 2rem;
                    line-height: 2rem;
                    border: @mborder;
                    font-size: 0.7rem;
                  }
                }
              }
            }
          }
          &:nth-child(2) {
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-around;
            div {
              width: 100%;
              padding: 0 1rem;
            }
          }
        }
      }
    }
  }
  .frame {
    border: 1px solid @mcolor!important;
    color: @mcolor;
  }
  .middie > div {
    p {
      width: 100%;
    }
  }
}
</style>