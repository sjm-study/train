import { composeSubtotal, saveCartToLoacl, ClearCartToLoacl } from '../utils/compose'
export default {
    namespace: 'cart',
    state: {
        list: localStorage.cart ? JSON.parse(localStorage.cart).list : [],
        subtotal: localStorage.cart ? JSON.parse(localStorage.cart).subtotal : 0
    },
    effects: {
        *addCart({ payload }, { call, put }) {
            yield put({
                type: 'addCarts',
                payload: {
                    data: payload
                }
            })
        },
        *deleteCart({ payload }, { put }) {
            yield put({
                type: 'delete',
                payload: payload
            })
        },
        *clearCart({ payload }, { put }) {
            yield put({
                type: 'clear'
            })
        },
        *changeCount({ payload }, { put }) {
            yield put({
                type: 'count',
                payload: payload
            })
        }
    },
    reducers: {
        addCarts(state, { payload }) {
            var p = state.list
            var newGood = JSON.parse(JSON.stringify(payload.data))
            // var sutition = false
            if (p.length <= 0) { // 新建商品
                p.push(newGood)
            } else {
                var lol = []
                var TTT = false
                for (let i = 0; i < p.length; i++) {
                    const element = p[i];
                    if (element.id === newGood.id) { // 有相同的物品id 增加数量
                        lol.push(i)
                    }
                }
                if (lol.length > 0) {
                    // for (let z = 0; z < p[lol].quantitly.length; z++) {
                    //     if (p[lol].quantitly[z].availableSizes === newGood.order.availableSizes) {
                    //         p[lol].quantitly[z].quantitly = p[lol].quantitly[z].quantitly + newGood.order.quantitly
                    //         sutition = true
                    //     }

                    // }
                    for (let w = 0; w < lol.length; w++) {
                        if (p[lol[w]].order.availableSizes === newGood.order.availableSizes) {
                            p[lol[w]].order.quantitly = p[lol[w]].order.quantitly + newGood.order.quantitly
                            TTT = true
                            break
                        }

                    }
                    if (!TTT) { // 新建物品
                        p.push(newGood)
                    }
                } else {
                    p.push(newGood)
                }
            }
            saveCartToLoacl({ ...state, list: [...p], subtotal: composeSubtotal(p) })
            return { ...state, list: [...p], subtotal: composeSubtotal(p) }
        },
        delete(state, { payload }) {
            var list = state.list
            var p = null
            for (let i = 0; i < list.length; i++) {
                const element = list[i];
                if (payload.id === element.id && element.order.availableSizes === payload.order.availableSizes) {
                    p = i
                    break
                }
            }
            if (p !== null) {
                list.splice(p, 1)
            }
            saveCartToLoacl({ ...state, list: [...list], subtotal: composeSubtotal(list) })
            return { ...state, list: [...list], subtotal: composeSubtotal(list) }
        },
        clear() {
            ClearCartToLoacl()
            return { list: [], subtotal: 0 }
        },
        count(state, { payload }) {
            var list = state.list
            for (let i = 0; i < list.length; i++) {
                const element = list[i];
                if (element.id === payload.id && element.order.availableSizes === payload.order.availableSizes) {
                    element.order.quantitly = payload.order.quantitly
                    break
                }
            }
            saveCartToLoacl({ ...state, list: [...list], subtotal: composeSubtotal(list) })
            return { ...state, list: [...list], subtotal: composeSubtotal(list) }
        }
    }
}