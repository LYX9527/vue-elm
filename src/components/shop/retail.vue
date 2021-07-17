<template>
  <div id="cont">
    <div class="nav">
      <div class="ic" @click="skip('home')">
        <icon type="arrowLeft" class="icon_fs" />
      </div>
      <span class="nav_title">{{ shop.name }}</span>
      <div class="ic"></div>
    </div>
    <div style="width: 100%; height: 2.9rem"></div>
    <div class="retail_title">
      <div>
        <img :src="'https://elm.cangdu.org/img/' + shop.image_path" alt="" />
      </div>
      <div>
        <p>{{ shop.name }}</p>
        <p>商家配送 / 分钟送达 / 配送费¥{{ shop.float_delivery_fee }}</p>
        <p>公告：{{ shop.promotion_info }}</p>
      </div>
      <div>
        <p>
          {{
            shop.activities && shop.activities[0]
              ? shop.activities[0].description
              : "无"
          }}
        </p>
        <p>
          {{ shop.activities ? shop.activities.length : 0 }}个活动<icon
            type="arrowRight"
          />
        </p>
      </div>
      <div
        class="bg_img"
        :style="{
          background: `url(https://elm.cangdu.org/img/${shop.image_path})`,
        }"
      ></div>
    </div>
    <van-tabs
      style="margin-top: 0.5rem; position: fixed; top: 10.9rem; width: 100%"
    >
      <van-tab title="商品">
        <div class="menu">
          <div class="box">
            <a
              v-for="(v, i) in menus"
              :key="i"
              :href="'#chaper' + i"
              @click="cheack(i)"
              :style="{ backgroundColor: color == i ? '#fff' : '#efefef' }"
              >{{ v.name }}</a
            >
          </div>
          <div class="box">
            <div v-for="(v, i) in menus" :key="i" class="area">
              <h1 :id="'chaper' + i">
                <span>{{ v.name }} </span> {{ v.description }}
                <span><icon type="arrowRight" /></span>
              </h1>
              <div v-for="(m, n) in v.foods" :key="n" class="grid">
                <div @click.stop="changeGood(m)">
                  <img
                    :src="'https://elm.cangdu.org/img/' + m.image_path"
                    alt=""
                  />
                </div>
                <div>
                  <p>{{ m.name }}</p>
                  <p>月售{{ m.month_sales }}份 好评率{{ m.satisfy_rate }}%</p>
                  <p>
                    <span class="price">¥{{ m["specfoods"][0]["price"] }}</span>
                    <span class="btn" v-if="m.specfoods.length == 1">
                      <transition name="slide-fade">
                        <span
                          @click="
                            addcart({
                              data: m.specfoods[0],
                              type: '-',
                              id: 0,
                              key: selfemployed.id,
                            })
                          "
                          v-show="
                            cart[selfemployed.id] &&
                            cart[selfemployed.id][m.specfoods[0].sku_id]
                          "
                          ><icon type="divide"
                        /></span>
                      </transition>
                      <span
                        style="
                          display: inline-block;
                          width: 1rem;
                          text-align: center;
                        "
                        >{{
                          cart[selfemployed.id] &&
                          cart[selfemployed.id][m.specfoods[0].sku_id]
                            ? cart[selfemployed.id][m.specfoods[0].sku_id]
                                .quantity
                            : ""
                        }}</span
                      >
                      <span
                        @click="
                          addcart({
                            data: m.specfoods[0],
                            type: '+',
                            id: 0,
                            key: selfemployed.id,
                          })
                        "
                        ><icon type="add"
                      /></span>
                    </span>
                    <span class="btn" v-else>
                      <span class="change" @click="chgshow(m)">选规格</span>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div style="width: 100%; height: 4rem"></div>
          </div>
        </div>
        <div class="foot" :style="{ zIndex: alert ? 2 : 3000 }">
          <div @click="show = !show">
            <div>
              <transition
                appear
                name="animate__animated"
                enter-active-class="animate__shakeY"
                leave-active-class="animate__hinge"
              >
                <div v-show="kit"><icon type="cart" /></div>
              </transition>
            </div>
            <div>
              <p>¥{{ this.total }}元</p>
              <p>配送费¥5</p>
            </div>
          </div>
          <div
            :style="{
              backgroundColor: 20 - this.total > 0 ? '#555' : '#4cd964',
            }"
            @click="submitCart()"
          >
            {{
              20 - this.total > 0
                ? "还差¥" + (20 - this.total) + "起送"
                : "去结算"
            }}
          </div>
        </div>
        <van-action-sheet v-model="show" title="购物车">
          <div class="shopp">
            <ul style="position: relative">
              <li class="line line_bottom">
                <div>商品名称</div>
                <div>商品单价</div>
                <div>商品总价</div>
                <div>商品个数</div>
              </li>
              <li style="height: 2rem"></li>
              <li class="line line_top">
                <div>购物车</div>
                <div></div>
                <div></div>
                <div @click="clCart(selfemployed.id)">
                  <icon type="trash" />清空购物车
                </div>
              </li>
              <li v-for="(v, i) in carts" :key="i" class="line">
                <div>
                  {{
                    v.specs.length > 0
                      ? "(" + v.specs[0].value + ")"
                      : "" | texthidden
                  }}{{ v.name | texthidden }}
                </div>
                <div>
                  {{ v.price }}
                </div>
                <div>
                  {{ v.price * v.quantity }}
                </div>
                <div>
                  <span
                    @click="
                      addcart({
                        data: 0,
                        type: '-',
                        id: v.sku_id,
                        key: selfemployed.id,
                      })
                    "
                    ><icon type="divide"
                  /></span>
                  {{ v.quantity }}
                  <span
                    @click="
                      addcart({
                        data: 0,
                        type: '+',
                        id: v.sku_id,
                        key: selfemployed.id,
                      })
                    "
                    ><icon type="add"
                  /></span>
                </div>
              </li>
            </ul>
          </div>
        </van-action-sheet>
        <van-popup v-model="alert" round closeable :overlay="true">
          <div style="width: 20rem; height: 15rem" class="alert">
            <div>
              {{ showcont.name }}
            </div>
            <div>
              <p>规格</p>
              <p>
                <span
                  v-for="(v, i) in showcont.specfoods"
                  :key="i"
                  @click="chrule(v)"
                  :class="id == v.sku_id ? 'checked' : 'unchecked'"
                  >{{ v.specs_name }}
                </span>
              </p>
            </div>
            <div>
              <div>¥{{ checked.price ? checked.price : 0 }}</div>
              <div><span @click="ruleAddcart">加入购物车</span></div>
            </div>
          </div>
        </van-popup>
      </van-tab>
      <van-tab title="评价" style="background-color: #efefef" class="grade_box">
        <div class="grade_title">
          <div>
            <p>{{ score ? score.food_score.toFixed(1) : "NaN" }}</p>
            <p>综合评价</p>
            <p>
              高于周边商家{{
                score ? (score.compare_rating * 100).toFixed(2) + "%" : "NaN"
              }}
            </p>
          </div>
          <div>
            <p>
              服务态度
              <van-rate
                v-model="score.overall_score"
                allow-half
                void-icon="star"
                void-color="#eee"
                size="10"
              /><span class="reg">{{
                score && score.overall_score
                  ? score.overall_score.toFixed(1)
                  : 0
              }}</span>
            </p>
            <p>
              菜品评价<van-rate
                v-model="score.service_score"
                allow-half
                void-icon="star"
                void-color="#eee"
                size="10"
              /><span class="reg">{{
                score && score.service_score
                  ? score.service_score.toFixed(1)
                  : 0
              }}</span>
            </p>
            <p>
              送达时间 <span>{{ score ? score.deliver_time : "NaN" }}</span
              ><span>分钟</span>
            </p>
          </div>
        </div>
        <div class="grade_body">
          <div
            v-for="(val, i) in grade"
            :key="i"
            @click="checkGrade(i)"
            :class="gradeid == i ? 'checkgrade' : ''"
          >
            {{ val.name }}({{ val.count }})
          </div>
        </div>
        <div class="grade_content">
          <div v-for="(v, i) in gradetotal" :key="i">
            <div>
              <img src="" alt="" />
            </div>
            <div>
              <p>
                {{ v.username }} <span>{{ v.rated_at }}</span>
              </p>
              <p>
                <van-rate
                  v-model="v.rating_star"
                  allow-half
                  void-icon="star"
                  void-color="#eee"
                  size="10"
                />
                <span>{{ v.time_spent_desc ? v.time_spent_desc : "" }}</span>
              </p>
              <div>
                <img
                  v-if="v.item_ratings && v.item_ratings[0]"
                  :src="
                    v.item_ratings && v.item_ratings[0]
                      ? 'https://fuss10.elemecdn.com/d/c8/' +
                        v.item_ratings[0].image_hash +
                        '.jpeg'
                      : ''
                  "
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang='ts'>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      status: true,
      activeKey: 0,
      shop: "",
      menus: "",
      color: 0,
      carts: [],
      show: false,
      total: 0,
      alert: false,
      showcont: "",
      ruleprice: 0,
      id: "",
      checked: "",
      gradetotal: "",
      score: "",
      grade: "",
      gradeid: 0,
      kit: true,
    };
  },
  methods: {
    ...mapMutations(["chCart", "clearCart", "chFood", "saveCarts"]),
    getRest(id = 3276) {
      (<any>this)
        .$http({
          method: "get",
          url: `https://elm.cangdu.org/shopping/restaurant/${id}`,
        })
        .then((res: { data: any }) => {
          (<any>this).shop = res.data;
        });
    },
    getMenu(id = 3276) {
      (<any>this)
        .$http({
          method: "get",
          url: `https://elm.cangdu.org/shopping/v2/menu?restaurant_id=${id}`,
        })
        .then((res: { data: any }) => {
          (<any>this).menus = res.data;
        });
    },
    cheack(data: any) {
      (<any>this).color = data;
    },
    addcart(food: any) {
      (<any>this).chCart(food);
      (<any>this).showCart();
      (<any>this).kit = !(<any>this).kit;
      (<any>this).kit = !(<any>this).kit;
    },
    submitCart() {
      (<any>this).saveCarts((<any>this).carts);
      (<any>this).skip("submitorder");
    },
    showCart() {
      if ((<any>this).cart[(<any>this).selfemployed.id]) {
        let arr: Array<any>;
        arr = [];
        let arr2: Array<any>;
        arr2 = [];
        (<any>this).total = 0;
        Object.keys((<any>this).cart[(<any>this).selfemployed.id]).forEach(
          (item) => {
            arr.push(item);
          }
        );
        for (let i = 0; i < arr.length; i++) {
          arr2.push((<any>this).cart[(<any>this).selfemployed.id][arr[i]]);
        }
        arr2.forEach((item, i) => {
          if (item.quantity == 0) {
            arr2.splice(i, 1);
          }
        });
        (<any>this).carts = arr2;
        arr2.forEach((item, i) => {
          (<any>this).total += item.quantity * item.price;
        });
      } else {
        (<any>this).carts = [];
        (<any>this).total = 0;
      }
    },
    clCart(data: number): void {
      (<any>this).clearCart(data);
      (<any>this).showCart();
    },
    chgshow(data: any): void {
      (<any>this).showcont = data;
      (<any>this).alert = true;
    },
    chrule(data: { sku_id: any }) {
      (<any>this).id = data.sku_id;
      (<any>this).checked = data;
    },
    ruleAddcart() {
      if ((<any>this).id) {
        (<any>this).addcart({
          data: (<any>this).checked,
          type: "+",
          id: 0,
          key: (<any>this).selfemployed.id,
        });
      }
      (<any>this).checked = "";
      (<any>this).alert = false;
      (<any>this).id = 0;
    },
    getGrade(id: number) {
      (this as any) //评价详情
        .$http({
          method: "get",
          url: `https://elm.cangdu.org/ugc/v2/restaurants/${id}/ratings`,
        })
        .then((res: { data: { code: any } }) => {
          (this as any).gradetotal = res.data;
        });
      (this as any) //评分类型
        .$http({
          method: "get",
          url: `https://elm.cangdu.org/ugc/v2/restaurants/${id}/ratings/tags`,
        })
        .then((res: { data: { code: any } }) => {
          (this as any).grade = res.data;
        });
      (<any>this) //评分分数
        .$http({
          method: "get",
          url: `https://elm.cangdu.org/ugc/v2/restaurants/${id}/ratings/scores`,
        })
        .then((res: { data: { code: any } }) => {
          (this as any).score = res.data;
        });
    },
    checkGrade(id: number) {
      (<any>this).gradeid = id;
    },
    changeGood(id: any) {
      (<any>this).chFood(id);
      (<any>this).skip("goods");
    },
  },
  created() {
    (<any>this).getRest((<any>this).selfemployed.id);
    (<any>this).getMenu((<any>this).selfemployed.id);
    (<any>this).getGrade((<any>this).selfemployed.id);
    (<any>this).showCart();
  },
  computed: {
    ...mapState(["selfemployed", "cart"]),
  },
  filters: {
    texthidden(text: string | any[]) {
      if (text.length > 6) return text.toString().substring(0, 5) + "...";
      return text;
    },
  },
};
</script>

<style scoped lang='less'>
* {
  box-sizing: border-box;
}
#cont {
  @comstyle();
  font-size: 0.8rem;
  .retail_title {
    height: 8rem;
    font-style: normal;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    font-size: 0.2rem;
    position: fixed;
    top: 2.9rem;
    // z-index: 2;
    color: @cef;
    font-size: 0.8rem;
    font-weight: 100;
    div {
      &:nth-child(1) {
        width: 20%;
        height: 6rem;
        img {
          width: 80%;
          margin: 0 10%;
          position: relative;
          top: 20%;
        }
      }
      &:nth-child(2) {
        display: flex;
        flex-wrap: wrap;
        width: 80%;
        height: 6rem;
        p {
          width: 100%;
          height: 2rem;
          text-align: left;
          padding: 0 1rem;
          line-height: 2rem;
        }
      }
      &:nth-child(3) {
        width: 100%;
        height: 2rem;
        display: flex;
        flex-wrap: nowrap;
        p {
          width: 70%;
          height: 2rem;
          text-align: left;
          line-height: 2rem;
          padding: 0 1rem;
          &:nth-child(2) {
            width: 30%;
            text-align: right;
            padding-right: 0rem;
          }
        }
      }
      &:nth-child(4) {
        width: 100%;
        height: 8rem;
        background-repeat: no-repeat;
        background-size: cover;
        -webkit-filter: blur(20px);
        -moz-filter: blur(20px);
        -o-filter: blur(20px);
        -ms-filter: blur(20px);
        filter: blur(20px);
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
      }
    }
  }
  .menu {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    font-size: 0.8rem;
    .box {
      &:nth-child(1) {
        width: 25%;
        height: 39rem;
        overflow: auto;
        a {
          display: block;
          height: 3rem;
          border: @mborder;
          text-align: center;
          line-height: 3rem;
        }
      }
      &:nth-child(2) {
        width: 75%;
        height: 39rem;
        overflow: auto;
        .area {
          width: 100%;
          border: @mborder;
          .grid {
            height: 6rem;
            display: flex;
            flex-wrap: nowrap;
            border: @mborder;
            div {
              &:nth-child(1) {
                width: 30%;
                img {
                  width: 80%;
                  margin: 10%;
                }
              }
              &:nth-child(2) {
                width: 70%;
                display: flex;
                flex-wrap: wrap;
                p {
                  width: 100%;
                  height: 2rem;
                  line-height: 2rem;
                  &:nth-child(3) {
                    .price {
                      position: relative;
                      top: -0.6rem;
                    }
                    .btn {
                      position: relative;
                      right: -6rem;
                      display: inline-block;
                      width: 4rem;
                      height: 2rem;
                      .change {
                        border: 1px solid @mcolor;
                        background-color: @mcolor;
                        color: @cff;
                        height: 1.5rem;
                        text-align: center;
                        line-height: 1.5rem;
                        width: 3rem;
                        display: block;
                        border-radius: 5px;
                      }
                      span {
                        position: absolute;
                        top: 0;
                        &:nth-child(3) {
                          right: 0.8rem;
                        }
                        &:nth-child(2) {
                          right: 1.9rem;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          h1 {
            background-color: @cef;
            height: 2rem;
            text-align: left;
            padding: 0 1rem;
            line-height: 2rem;
            position: relative;
            i {
              position: absolute;
              right: 1rem;
            }
            span {
              font-size: 1.2rem;
            }
          }
        }
      }
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
  .foot {
    width: 100%;
    height: 3rem;
    background-color: #000;
    position: fixed;
    z-index: 3000;
    bottom: 0;
    display: flex;
    flex-wrap: nowrap;
    > div {
      &:nth-child(1) {
        width: 70%;
        display: flex;
        flex-wrap: nowrap;
        > div {
          &:nth-child(1) {
            width: 30%;
            position: relative;
            > div {
              border-radius: 50%;
              position: absolute;
              background-color: #000;
              top: -1.2rem;
              left: 1.2rem;
              i {
                font-size: 3rem;
              }
            }
          }
          &:nth-child(2) {
            width: 70%;
            display: flex;
            flex-wrap: wrap;
            p {
              width: 100%;
              padding: 0 1rem;
              color: @cff;
              &:nth-child(1) {
                height: 60%;
                line-height: 1.8rem;
                font-size: 1rem;
              }
              &:nth-child(2) {
                height: 40%;
                line-height: 1.2rem;
                font-size: 0.5rem;
              }
            }
          }
        }
      }
      &:nth-child(2) {
        width: 30%;
        color: @cff;
        line-height: 3rem;
        text-align: center;
        background-color: #555;
      }
    }
  }
  .shopp {
    padding: 16px 16px 4rem;
    height: 15rem;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .line {
    height: 2rem;
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    line-height: 2rem;
    border-bottom: @mborder;
    > div {
      width: 25%;
      height: 100%;
      text-align: center;
      &:nth-child(4) {
        line-height: 2rem;
        button {
          font-size: 0.5rem;
          height: 1rem;
          display: inline-block;
          line-height: 0.9rem;
          text-align: center;
          padding: 0.3rem;
        }
      }
    }
  }
  .line_top {
    position: fixed;
    background-color: @cff;
    width: 92%;
    left: 1rem;
    bottom: 14rem;
  }
  .line_bottom {
    position: fixed;
    background-color: @cff;
    width: 92%;
    left: 1rem;
    bottom: 12rem;
  }
  .alert {
    > div {
      width: 100%;
      display: flex;
      &:nth-child(1) {
        text-align: center;
        display: block;
        height: 3rem;
        line-height: 3rem;
      }
      &:nth-child(2) {
        flex-wrap: wrap;
        height: 4rem;
        p {
          width: 100%;
          height: 2rem;
          line-height: 2rem;
          padding: 0 0.4rem;
          span {
            border: @mborder;
            border-radius: 5px;
            margin: 0 1rem;
            padding: 0.2rem;
          }
        }
      }
      &:nth-child(3) {
        flex-wrap: nowrap;
        background-color: @cef;
        position: fixed;
        bottom: 0;
        height: 3rem;
        line-height: 2rem;
        div {
          width: 50%;
          height: 3rem;
          padding: 0 0.4rem;
          line-height: 3rem;
          &:nth-child(1) {
            color: #f60;
            font-size: 1.2rem;
            font-weight: bold;
          }
          &:nth-child(2) {
            text-align: right;
            span {
              height: 2rem;
              border: @mborder;
              background-color: @mcolor;
              color: @cff;
              padding: 0.5rem;
            }
          }
        }
      }
    }
  }
  .checked {
    border: 1px solid @mcolor;
    color: @mcolor;
  }
  .unchecked {
    border: @mborder;
  }
  .grade_box {
    height: 39.2rem;
    overflow: auto;
    .grade_title {
      background-color: @cff;
      display: flex;
      width: 100%;
      height: 8rem;
      flex-wrap: nowrap;
      padding: 1rem 2rem;
      border: @mborder;
      & > div {
        width: 50%;
        display: flex;
        flex-wrap: wrap;
        &:nth-child(1) {
          p {
            width: 100%;
            text-align: center;
            &:nth-child(1) {
              height: 40%;
              color: #f60;
              font-size: 1.8rem;
              line-height: 2.4rem;
            }
            &:nth-child(2) {
              height: 30%;
              line-height: 1.8rem;
              font-size: 0.9rem;
            }
            &:nth-child(3) {
              height: 30%;
              font-size: 0.6rem;
              color: #888;
            }
          }
        }
        &:nth-child(2) {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          p {
            font-size: 0.6rem;
            width: 100%;
            height: 30%;
            .reg {
              color: #f60;
            }
          }
        }
      }
    }
    .grade_body {
      background-color: @cff;
      margin-top: 1rem;
      border: @mborder;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: left;
      height: 10rem;
      padding: 0 1rem;
      padding-top: 1rem;
      & > div {
        height: 2rem;
        font-size: 0.8rem;
        text-align: center;
        line-height: 2rem;
        box-sizing: content-box;
        padding: 0 0.3rem;
        margin-right: 0.5rem;
        background-color: #ebf5ff;
        border-radius: 5px;
      }
    }
    .grade_content {
      width: 100%;
      & > div {
        width: 100%;
        height: 12rem;
        background-color: @cff;
        display: flex;
        flex-wrap: nowrap;
        & > div {
          &:nth-child(1) {
            width: 20%;
          }
          &:nth-child(2) {
            p:nth-child(1) {
              width: 100%;
              height: 2rem;
              line-height: 2rem;
              position: relative;
              span {
                position: absolute;
                right: 1rem;
              }
            }
            width: 80%;
            div {
              img {
                width: 3rem;
                height: 3rem;
              }
            }
          }
        }
      }
    }
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .checkgrade {
    background-color: #3190e8 !important;
    color: #fff;
  }
}
</style>