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
        *changeCount({payload}, {put}) {
            yield put({
                type:'count',
                payload: payload
            })
        }
    },
    reducers: {
        addCarts(state, { payload }) {
            var p = state.list
            var newGood = JSON.parse(JSON.stringify(payload.data))
            var sutition = false
            if (p.length > 0) {
                for (let i = 0; i < p.length; i++) {
                    console.log('进入循环')
                    if (p[i].id === newGood.id && p[i].order.availableSizes === newGood.order.availableSizes) {
                        p[i].order.quantitly++
                        sutition = true
                        console.log('相等')
                        break
                    }
                }
                if (!sutition) {
                    p.push(newGood)
                }
            } else {
                console.log('第一次')
                p.push(newGood)
            }
            console.log(p)
            saveCartToLoacl({ ...state, list: [...p], subtotal: composeSubtotal(p) })
            return { ...state, list: [...p], subtotal: composeSubtotal(p) }
        },
        delete(state, { payload }) {
            var list = state.list
            var p = null
            for (let i = 0; i < list.length; i++) {
                const element = list[i];
                if (payload.id === element.id) {
                    p = i
                    break
                }
            }
            if (p !== null) {
                list.splice(p, 1)
            }
            console.log(payload.id)
            console.log(p)
            saveCartToLoacl({ ...state, list: [...list], subtotal: composeSubtotal(list) })
            return { ...state, list: [...list], subtotal: composeSubtotal(list) }
        },
        clear(state, { }) {
            ClearCartToLoacl()
            return { list: [], subtotal: 0 }
        },
        count(state, {payload}) {
            var list = state.list
            for (let i = 0; i < list.length; i++) {
                const element = list[i];
                if (element.id === payload.id && element.order.availableSizes === payload.order.availableSizes) {
                    element.order = payload.order
                    break
                }
            }
            saveCartToLoacl({...state, list:[...list], subtotal: composeSubtotal(list)})
            return {...state, list:[...list], subtotal: composeSubtotal(list)}
        }
    }
}