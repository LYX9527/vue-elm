<template>
  <div id="cont">
    <div class="nav">
      <div class="ic" @click="skip('retail')">
        <icon type="arrowLeft" class="icon_fs" />
      </div>
      <span class="nav_title">确认订单</span>
      <div class="ic" @click="skip('personal')">
        <icon type="peronal" class="icon_fs" />
      </div>
    </div>
    <div style="width: 100%; height: 2.9rem"></div>
    <div class="address" @click="skip('checkaddress')">
      <div>
        <icon type="phone" />
      </div>
      <div>
        <p><span>{{subadd.name}}</span> <span>{{subadd.sex?'先生':'女士'}}</span> <span>{{subadd.phone}}</span></p>
        <p><span>{{ subadd.tag }}</span> <span>{{subadd.address_detail}}</span></p>
      </div>
      <div>
        <icon type="arrowRight" />
      </div>
    </div>
    <div class="time">
      <div>送达时间</div>
      <div>
        <div>尽快送达 ｜ 预计{{ "12:12" }}</div>
        <div>
          <div><span>蜂鸟专送</span></div>
        </div>
      </div>
    </div>
    <div class="pay">
      <div class="commn">
        <div>支付方式</div>
        <div>
          <div>{{ "在线支付" }}<icon type="arrowRight" /></div>
        </div>
      </div>
      <div>
        <div>红包</div>
        <div>暂时只在饿了么APP中支持</div>
      </div>
    </div>
    <div class="cart">
      <div>
        <div>
          <img :src="'https://elm.cangdu.org/img/' + selfemployed.image_path" alt="" />
        </div>
        <div>{{selfemployed.name}}</div>
      </div>
      <div class="food" v-for="(v, i) in cart" :key="i">
        <div>{{ v.name }}</div>
        <div>x{{ v.quantity }}</div>
        <div>¥{{ v.price }}</div>
      </div>
      <div class="foot">
        <div>配送费</div>
        <div>¥5</div>
      </div>
      <div class="foot">
        <div>订单 {{ " ¥" + total }}</div>
        <div style="color: #f60">待支付{{ " ¥" + (total + 5) }}</div>
      </div>
    </div>
    <div class="remark">
      <div>
        <div>订单备注</div>
        <div>
          <div>{{ "口味偏好等" }}<icon type="arrowRight" /></div>
        </div>
      </div>
      <div>
        <div>发票抬头</div>
        <div>
          <div>{{ "不需要开发票" }}<icon type="arrowRight" /></div>
        </div>
      </div>
    </div>
    <div style="width:100%;height:3rem;"></div>
    <div class="order">
      <div>待支付¥{{ total }}</div>
      <div @click="submit()">确认下单</div>
    </div>
  </div>
</template>

<script lang='ts'>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      cart: [],
      total: 0,
    };
  },
  methods: {
    submit() {
      let { id, location } = (<any>this).selfemployed;
      (<any>this)
        .$http({
          method: "post",
          url: "https://elm.cangdu.org/v1/carts/checkout",
          data: {
            restaurant_id: id,
            geohash: `${location[0]},${location[1]}`,
            entities: [(<any>this).carts],
          },
        })
        .then((res: any) => {
          console.log(res);
        });
    },
  },
  computed: {
    ...mapState(["selfemployed", "carts",'subadd']),
  },
  created() {
    (<any>this).cart = (<any>this).carts;
    (<any>this).total = 0;
    (<any>this).cart.forEach((item: any) => {
      (<any>this).total += item.price * item.quantity;
    });
  },
};
</script>

<style lang='less'>
#cont {
  @comstyle();
  font-size: 0.8rem;
  width: 100%;
  height: 100%;
  background-color: @cef;
  .address {
    width: 100%;
    height: 6rem;
    background-color: #fff;
    display: flex;
    flex-wrap: nowrap;
    border: @mborder;
    & > div {
      height: 100%;
      &:nth-child(1),
      &:nth-child(3) {
        width: 10%;
        line-height: 6rem;
        text-align: center;
      }
      &:nth-child(2) {
        width: 80%;
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
        padding: 1rem;
        p {
          width: 100%;
          height: 50%;
          line-height: 2rem;
          &:nth-child(1) {
            span:nth-child(1) {
              font-size: 1.1rem;
              font-weight: bold;
            }
            span:nth-child(2) {
              font-size: 0.9rem;
            }
          }
          &:nth-child(2) {
            span:nth-child(1) {
              background-color: #f00;
              color: @cff;
              padding: 0 0.3rem;
              border-radius: 3px;
              font-size: 0.7rem;
            }
          }
        }
      }
    }
  }
  .time {
    box-sizing: border-box;
    border-left: 5px solid @mcolor;
    margin-top: 0.8rem;
    display: flex;
    width: 100%;
    height: 6rem;
    background-color: @cff;
    flex-flow: nowrap;
    border-bottom: @mborder;
    & > div {
      height: 100%;
      &:nth-child(1) {
        width: 30%;
        text-align: center;
        line-height: 6rem;
        font-size: 1.1rem;
        font-weight: bold;
      }
      &:nth-child(2) {
        width: 70%;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        padding: 1rem;
        & > div {
          width: 100%;
          &:nth-child(1) {
            text-align: right;
            color: @mcolor;
            font-size: 1rem;
          }
          &:nth-child(2) {
            position: relative;
            & > div {
              position: absolute;
              right: 0;
              > span {
                background-color: @mcolor;
                color: @cff;
                padding: 0.1rem 0.3rem;
                border-radius: 5px;
              }
            }
          }
        }
      }
    }
  }
  .pay {
    box-sizing: border-box;
    width: 100%;
    height: 6rem;
    display: flex;
    padding: 0 1rem;
    flex-wrap: wrap;
    background-color: @cff;
    margin-top: 0.8rem;
    & > div {
      width: 100%;
      height: 50%;
      display: flex;
      flex-wrap: nowrap;
      &:nth-child(1) {
        border-bottom: @mborder;
        line-height: 3rem;
        & > div {
          &:nth-child(1) {
            width: 75%;
          }
          &:nth-child(2) {
            width: 25%;
            position: relative;
            & > div {
              color: #888;
              position: absolute;
              right: 0;
            }
          }
        }
      }
      &:nth-child(2) {
        display: flex;
        flex-wrap: nowrap;
        line-height: 3rem;
        & > div {
          color: #888;
          width: 50%;
          &:nth-child(2) {
            text-align: right;
          }
        }
      }
    }
  }
  .cart {
    width: 100%;
    margin-top: 0.8rem;
    background-color: @cff;
    height: auto;
    & > div {
      display: flex;
      flex-wrap: nowrap;
      &:nth-child(1) {
        width: 100%;
        height: 4rem;
        padding: 0;
        background-color: @cff;

        border-bottom: @mborder;
        & > div {
          &:nth-child(1) {
            width: 20%;
            position: relative;
            img {
              position: absolute;
              left: 1rem;
              top: 1rem;
              width: 50%;
            }
          }
          &:nth-child(2) {
            width: 80%;
            line-height: 4rem;
            text-align: left;
          }
        }
      }
    }
    .food {
      height: 3rem;
      box-sizing: border-box;
      padding: 0 1rem;
      & > div {
        line-height: 3rem;
        &:nth-child(1) {
          width: 60%;
        }
        &:nth-child(2) {
          width: 20%;
          color: #f60;
          text-align: right;
        }
        &:nth-child(3) {
          width: 20%;
          text-align: right;
        }
      }
    }
    .foot {
      height: 3rem;
      padding: 0 1rem;
      & > div {
        line-height: 3rem;
        &:nth-child(1) {
          width: 60%;
        }
        &:nth-child(2) {
          width: 40%;
          text-align: right;
        }
      }
    }
  }
  .remark {
    width: 100%;
    background-color: @cff;
    margin-top: 0.8rem;
    box-sizing: border-box;
    padding: 0 1rem;
    & > div {
      display: flex;
      flex-wrap: nowrap;
      width: 100%;
      height: 3rem;
      line-height: 3rem;
      & > div {
        &:nth-child(1) {
          width: 60%;
        }
        &:nth-child(2) {
          width: 40%;
          position: relative;
          & > div {
            color: #888;
            position: absolute;
            right: 0;
          }
        }
      }
    }
  }
  .order {
    width: 100%;
    height: 3rem;
    line-height: 3rem;
    position: fixed;
    bottom: 0;
    z-index: 2;
    color: @cff;
    display: flex;
    flex-wrap: nowrap;
    & > div {
      &:nth-child(1) {
        width: 70%;
        background-color: #3c3c3c;
        box-sizing: border-box;
        padding-left: 1.5rem;
        font-size: 0.9rem;
      }
      &:nth-child(2) {
        width: 30%;
        background-color: #56d176;
        text-align: center;
        font-size: 1rem;
      }
    }
  }
}
</style>