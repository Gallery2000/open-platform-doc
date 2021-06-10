import request from '@/utils/request';

export async function accountLogin(data) {
  return request('/admin/login', {
    method: 'POST',
    data,
  });
}
