import { queryCurrent } from '@/services/user';
import { setAuthority } from '@/utils/authority';
import * as api from "@/services/user";

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      if (response.status.code === 0) {
        yield put({
          type: 'saveCurrentUser',
          payload: response.data,
        });
      }
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(api.fetchUser, payload);
      if(response.status.code===0){
        yield put({
          type: 'changeUsers',
          payload: response.data.list,
        });
      }
      return response;
    },
    *submit({ payload, event }, { call }) {
      const response = yield call(api[event], payload);
      return response;
    },
  },
  reducers: {
    changeUsers(state, action) {
      return { ...state, list: action.payload };
    },
    saveCurrentUser(state, { payload }) {
      setAuthority(payload.auth);
      return { ...state, currentUser: payload || {} };
    },
  },
};
export default UserModel;
