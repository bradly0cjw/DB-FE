export default {
  namespaced: true,
  state: {
    isLoggedIn: true,  // 測試用，上線請改 false
    isSeller: true,   // 新增 isSeller 判斷
    userInfo: null,
  },
  mutations: {
    setUser(state, userInfo) {
      state.isLoggedIn = true;
      state.isSeller = userInfo.isSeller || false; // 根據 userInfo 設置 isSeller
      state.userInfo = userInfo;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.isSeller = false;
      state.userInfo = null;
    },
  },
  actions: {
    login({ commit }, userInfo) {
      commit('setUser', userInfo);
    },
    logout({ commit }) {
      commit('logout');
    },
  },
};