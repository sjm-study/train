import request from '@/utils/request';

// 获取商品列表
export function getList(query) {
  return request(`/api/admin/products`, {
    method: 'GET',
    params: query,
  });
}
