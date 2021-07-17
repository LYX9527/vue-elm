export default {
    //首页轮播图内容
    bner(state: { banner: {}[][]; }, data: []) {
        data.forEach((v: {}, i: number) => {
            if (i > 7) {
                state.banner[1].push(v)
            } else {
                state.banner[0].push(v)
            }
        })
    },
    //全部城市
    changeCitys(state: { allCitys: {}; }, data: { [x: string]: any; }) {
        let newObj: { [key: string]: any; } = {};
        Object.keys(data).sort().map(key => {
            newObj[key] = data[key]
        })
        state.allCitys = newObj
    },
    //单个城市
    chLocation(state: { location: any; }, data: any) {
        state.location = data
    },
    //搜索美食历史
    changeSearch(state: { schHis: any[]; }, data: any) {
        if (data && state.schHis.indexOf(data) == -1) state.schHis.push(data);
    },
    delHistory(state: { schHis: any[]; }, data: any) {
        state.schHis.splice(data, 1)
    },
    clearHis(state: { schHis: never[]; }) {
        state.schHis = [];
    },
    //搜索城市历史
    changeCity(state: { cityHis: any[]; }, data: any) {
        if (data && state.cityHis.indexOf(data) == -1) state.cityHis.push(data);
    },
    delCity(state: { cityHis: any[]; }, data: any) {
        state.cityHis.splice(data, 1)
    },
    clearCity(state: { cityHis: never[]; }) {
        state.cityHis = [];
    },
    //当前城市信息
    chName(state: { addressName: any; }, data: any) {
        state.addressName = data
    },
    //单个商户信息
    chSelfemployed(state: { selfemployed: any; }, data: any) {
        state.selfemployed = data;
    },
    //登录成功信息
    chLogin(state: { loginMessage: any; }, data: any) {
        state.loginMessage = data;
    },
    //修改服务信息头
    chServicemsg(state: { servicemessage: string[][]; }, data: { [x: string]: any; }) {
        state.servicemessage = [[], []];
        delete data['index']
        Object.keys(data).forEach((v, i) => {
            if (i % 2 == 0) {
                state.servicemessage[0].push(v);
            } else {
                state.servicemessage[1].push(v);
            }
        })
    },
    //修改当前显示id
    chNowMsg(state: { nowservermsg: any; }, data: any) {
        state.nowservermsg = data;
    },
    //修改存储内容
    async chMsgdetails(state: { messagedetail: any; }, data: any) {
        state.messagedetail = data
    },
    //购物车增加减少
    chCart(state: { cart: { [key: number]: { [x: string]: { attrs: [], extra: {}, quantity: number; id: number | undefined, name: string | unknown, packing_fee: number | undefined, price: number | undefined, sku_id: number | string, specs: unknown, stock: number | undefined }; } } }, data: { [x: string]: any; }) {
        let carts = (sku_id: string | number, key: number, name?: unknown, food_id?: number, packing_fee?: number, price?: number, specs?: [], stock?: number) => {
            if (data['type'] == '+') {
                if (state.cart[key]) {
                    if (state.cart[key][sku_id]) {
                        state.cart[key][sku_id].quantity++;
                        state.cart = { ...state.cart }
                        return
                    } else {
                        state.cart[key][sku_id] = { attrs: [], extra: {}, id: food_id, name, packing_fee, price, sku_id, quantity: 1, specs, stock, }
                        state.cart = { ...state.cart }
                        return
                    }
                } else {
                    state.cart[key] = {};
                    state.cart = { ...state.cart }
                }
                state.cart[key][sku_id] = { attrs: [], extra: {}, id: food_id, name, packing_fee, price, sku_id, quantity: 1, specs, stock, }
                state.cart = { ...state.cart }
            } else {
                if (state.cart[key][sku_id]) {
                    if (state.cart[key][sku_id].quantity == 1) {
                        delete state.cart[key][sku_id]
                        state.cart = { ...state.cart }
                        return
                    }
                    state.cart[key][sku_id].quantity--;
                    state.cart = { ...state.cart }
                    return;
                }
            }
        }
        if (data['data']) {
            let { name, food_id, packing_fee, price, sku_id, specs, stock } = data['data'];
            carts(sku_id, data['key'], name, food_id, packing_fee, price, specs, stock);
        } else {
            let sku_id = data['id']
            carts(sku_id, data['key']);
        }
    },
    //清空购物车
    clearCart(state: { cart: { [key: string]: any }; }, data: any) {
        delete state.cart[data]
        state.cart = { ...state.cart }
    },
    //改变当前的商品
    chFood(state: { food: { [key: string]: any } }, data: any) {
        state.food = data
    },
    saveCarts(state: { carts: any[] }, data: []) {
        state.carts = data;
    }
}