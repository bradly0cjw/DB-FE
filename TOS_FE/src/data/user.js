export default {
  namespaced: true,
  state: {
    isLoggedIn: true,  // 將初始值設為 false
    isSeller: false,    // 將初始值設為 false
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