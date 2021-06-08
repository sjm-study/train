import { saveProductToLoacl, sortProductsList } from '../utils/compose'
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
                type: 'productCountsss',
                payload: payload
            })
        },
        *ProductCountToHigh({ payload }, { put }) {
            yield put({
                type: 'toheight',
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
            for (let i = 0; i < list.length; i++) {
                const element = list[i];
                if (element.id === payload.id) {
                    p = i
                    break
                }
            }
            for (let j = 0; j < list[p].quantitly.length; j++) { // 更新库存
                const a = list[p].quantitly[j];
                if (a.availableSizes === payload.order.availableSizes) {
                    a.quantitly = a.quantitly - payload.order.quantitly
                    break
                }
            }

            // 判读是否删除这个商品
            var rep = 0
            for (let j = 0; j < list[p].quantitly.length; j++) {
                const element = list[p].quantitly[j];
                rep = rep + element.quantitly
            }
            if (rep <= 0) { // 删除这个商品
                list.splice(p, 1)
            }
            saveProductToLoacl(sortProductsList(list))
            return sortProductsList(list)
        },
        addProducts(state, { payload }) {
            saveProductToLoacl(payload.list)
            return sortProductsList(payload.list)
        },
        updateProducts(state, { payload }) {
            // saveProductToLoacl(payload.list)
            return sortProductsList(payload.list)
        },
        addItemProducts(state, { payload }) {
            var list = state
            var p = null
            for (let i = 0; i < list.length; i++) {
                const element = list[i];
                if (element.id === payload.id) {
                    p = i
                    break
                }
            }
            if (p === null) { // 无此商品，新增
                // var data = payload
                // data.quantitly = [
                //     {
                //         quantitly: data.order.quantitly,
                //         availableSizes: data.order.availableSizes
                //     }
                // ]
                // delete data.order

                var data = payload
                data.quantitly = []
                data.availableSizes.forEach(el => {
                    data.quantitly.push({
                        availableSizes: el,
                        quantitly: 0
                    })
                })
                for (let k = 0; k < data.quantitly.length; k++) {
                    if (data.order.availableSizes === data.quantitly[k].availableSizes) {
                        data.quantitly[k].quantitly = data.total
                        break
                    }
                }
                list.push(data)

            } else { // 有此商品
                for (let j = 0; j < list[p].quantitly.length; j++) {
                    const b = list[p].quantitly[j];
                    if (b.availableSizes === payload.order.availableSizes) {
                        b.quantitly = b.quantitly + payload.order.quantitly
                        break
                    }
                }

            }
            saveProductToLoacl(sortProductsList(list))
            return sortProductsList(list)
        },
        productCountsss(state, { payload }) {
            var list = state
            var p = null
            for (let i = 0; i < list.length; i++) {
                if (list[i].id === payload.id) {
                    p = i
                    break
                }
            }
            if (p !== null) {
                for (let j = 0; j < list[p].quantitly.length; j++) {
                    let a = list[p].quantitly[j];
                    if (a.availableSizes === payload.order.availableSizes) {
                        a.quantitly = payload.total - payload.order.quantitly
                        break
                    }
                }

                var rep = 0
                for (let j = 0; j < list[p].quantitly.length; j++) {
                    rep = rep + list[p].quantitly[j].quantitly
                }
                if (rep <= 0) { // 删除这个商品
                    list.splice(p, 1)
                }
            } else {
                var data = payload
                data.quantitly = []
                data.availableSizes.forEach(el => {
                    data.quantitly.push({
                        availableSizes: el,
                        quantitly: 0
                    })
                })
                for (let k = 0; k < data.quantitly.length; k++) {
                    if (data.order.availableSizes === data.quantitly[k].availableSizes) {
                        data.quantitly[k].quantitly = data.total - data.order.quantitly
                        break
                    }
                }
                list.push(data)
            }


            saveProductToLoacl(sortProductsList(list))
            return sortProductsList(list)
        },
        toheight(state, { payload }) {
            var list = state
            var p = null
            for (let i = 0; i < list.length; i++) {
                if (list[i].id === payload.id) {
                    p = i
                    break
                }
            }
            console.log(list[p])
            var rep = 0
            for (let j = 0; j < list[p].quantitly.length; j++) {
                rep = rep + list[p].quantitly[j].quantitly
            }
            if (rep <= 0) { // 删除这个商品
                list.splice(p, 1)
            }
            saveProductToLoacl(sortProductsList(list))
            return sortProductsList(list)
        }
    }
}