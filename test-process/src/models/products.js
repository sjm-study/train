import { getList } from '@/services/products';

export default {
  namespace: 'products',
  state: {
    list: [],
    total: 0,
  },
  effects: {
    *fetchProductsList({ payload }, { call, put }) {
      const res = yield call(getList, payload);
      yield put({
        type: 'saveProductsList',
        payload: res,
      });
    },
  },
  reducers: {
    saveProductsList(state, { payload }) {
      return { ...state, list: payload.data, total: payload.meta.total };
    },
  },
};
