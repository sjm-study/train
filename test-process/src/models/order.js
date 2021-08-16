import { getOrderList, getOrder } from '@/services/order';

export default {
  namespace: 'orderData',
  state: {
    list: { data: [], meta: {} },
    order: { line_items: [], shipping_address: {}, shippings: [{}], timeline: [{}] },
  },
  effects: {
    *fetchListData({ payload }, { call, put }) {
      const res = yield call(getOrderList, payload);
      yield put({
        type: 'updateList',
        payload: res,
      });
    },
    *fetchOrder({ payload }, { call, put }) {
      const res = yield call(getOrder, payload);
      yield put({
        type: 'updateOrder',
        payload: res,
      });
    },
  },
  reducers: {
    updateList(state, { payload }) {
      return { ...state, list: payload };
    },
    updateOrder(state, { payload }) {
      return { ...state, order: payload };
    },
  },
};
