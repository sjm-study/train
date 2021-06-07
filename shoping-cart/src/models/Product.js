import { saveProductToLoacl } from '../utils/compose'
export default {
    namespace: 'productList',
    state: localStorage.products ? JSON.parse(localStorage.products) : [],
    effects: {
        *deleteProduct({ payload }, { put }) {
            yield put({
                type: 'deleteProducts',
                payload: payload
            })
        },
        *addProduct({ payload }, { put }) {
            yield put({
                type: 'addProducts',
                payload: payload
            })
        },
        *updateProduct({ payload }, { put }) {
            yield put({
                type: 'updateProducts',
                payload: payload
            })
        },
        *addProductItem({ payload }, { put }) {
            yield put({
                type: 'addItemProducts',
                payload: payload
            })
        },
        *changeProductCount({ payload }, { put }) {
            yield put({
                type: 'productCount',
                payload: payload
            })
        },
        // 默认排序
        *defaultSort({ payload }, { put }) {
            var p = payload.list
            p.sort((a, b) => { return a.id - b.id })
            yield put({
                type: 'updateProducts',
                payload: { list: p }
            })
        },
        // 价格高到低
        *hightSort({ payload }, { put }) {
            var p = payload.list
            p.sort((a, b) => { return b.price - a.price })
            yield put({
                type: 'updateProducts',
                payload: { list: p }
            })
        },
        // 价格低到高
        *lowSort({ payload }, { put }) {
            var p = payload.list
            p.sort((a, b) => { return a.price - b.price })
            yield put({
                type: 'updateProducts',
                payload: { list: p }
            })
        }
    },
    reducers: {
        deleteProducts(state, { payload }) {
            var list = state
            var p = null
            var opo = null
            for (let i = 0; i < list.length; i++) {
                const element = list[i];
                if (element.id === payload.id) {
                    p = i
                    break
                }
            }
            if (p !== null) {
                for (let j = 0; j < list[p].quantitly.length; j++) {
                    const element = list[p].quantitly[j];
                    if (element.availableSizes === payload.order.availableSizes) {
                        opo = j
                        break
                    }
                }
            }
            if (list[p].quantitly[opo].quantitly - payload.order.quantitly <= 0) {
                var a = 0
                list[p].quantitly[opo].quantitly = 0
                list[p].quantitly.forEach(el => {
                    a = a + el.quantitly
                });
                if (a === 0) {
                    list.splice(p, 1)
                }
            } else { // 还有库存
                list[p].quantitly[opo].quantitly = list[p].quantitly[opo].quantitly - payload.order.quantitly
            }
            console.log(payload)
            saveProductToLoacl(list)
            return list
        },
        addProducts(state, { payload }) {
            saveProductToLoacl(payload.list)
            return payload.list
        },
        updateProducts(state, { payload }) {
            // saveProductToLoacl(payload.list)
            console.log(payload)
            return payload.list
        },
        addItemProducts(state, { payload }) {
            var list = state
            var p = null
            for (let i = 0; i < list.length; i++) {
                const element = list[i];
                if (element.id === payload.data.id) {
                    p = i
                    break
                }
            }
            if (p === null) { // 不存在
                let result = payload.data
                for (let j = 0; j < result.quantitly.length; j++) {
                    const element = result.quantitly[j];
                    if (element.availableSizes === result.order.availableSizes) {
                        element.quantitly = result.order.quantitly
                        break
                    }
                }
                result.order = {}
                list.push(result)
            } else {
                for (let j = 0; j < list[p].quantitly.length; j++) {
                    if (list[p].quantitly[j].availableSizes === payload.data.order.availableSizes) {
                        console.log('jinlail')
                        list[p].quantitly[j].quantitly = list[p].quantitly[j].quantitly + payload.data.order.quantitly
                        break
                    }
                }
                list[p].order = {}
            }
            saveProductToLoacl(list)
            return list
        },
        productCount(state, { payload }) {
            var list = state
            var p = null
            for (let i = 0; i < list.length; i++) {
                const element = list[i];
                if (element.id === payload.id) {
                    p = i
                    break
                }
            }
            list[p] = payload
            saveProductToLoacl(list)
            return list
        }
    }
}