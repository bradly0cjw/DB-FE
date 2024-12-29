export default {
    namespaced: true,
    state: {
      isLoggedIn: true,  //測試用，上線請改false
      userInfo: null,
    },
    mutations: {
      setUser(state, userInfo) {
        state.isLoggedIn = true;
        state.userInfo = userInfo;
      },
      logout(state) {
        state.isLoggedIn = false;
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
  