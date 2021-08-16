import request from '@/utils/request';

export function getInfoData() {
  return request('/api/admin/me', {
    method: 'GET',
  });
}
