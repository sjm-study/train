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
            if (p !== null) {
                list.splice(p, 1)
            }
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
            list.push(payload.data)
            saveProductToLoacl(list)
            return list
        }
    }
}