import request from '@/utils/request';

export async function queryCurrent() {
  return request('/admin/currentUser');
}
export async function fetchUser(params) {
  return request('/user/find', {
    params,
  });
}

export async function deleteUser(id) {
  return request(`/user/remove/${id}`, {
    method: 'DELETE',
  });
}
export async function batchDeleteUser(ids) {
  return request('/user/batchRemove', {
    method: 'POST',
    data: {
      ids,
    },
  });
}

export async function createUser(data) {
  return request(`/user/create`, {
    method: 'POST',
    data,
  });
}


export async function updateUser(parmas) {
  const { id, ...data } = parmas;
  return request(`/user/update/${id}`, {
    method: 'PUT',
    data,
  });
}
