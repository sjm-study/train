import request from '@/utils/request';

export function getOrderList(query) {
  return request('/api/admin/orders', {
    method: 'GET',
    params: query,
  });
}

export function getOrder(params) {
  return request(`/api/admin/orders/${params}`, {
    method: 'GET',
  });
}

export function batchShip(data) {
  return request(`api/admin/batches`, { method: 'POST', data })
}