import { reactive } from "vue";

const userState = reactive({      //下列三個預設應為false，測試可改true免登入
  isLoggedIn: false,
  isSeller: false,
  isAdmin: false,  

  userInfo: null,
  setUser(userInfo) {
    this.isLoggedIn = true;
    this.isSeller = userInfo.isSeller || false;
    this.isAdmin = userInfo.isAdmin || false;
    this.userInfo = userInfo;
  },
  logout() {
    this.isLoggedIn = false;
    this.isSeller = false;
    this.isAdmin = false;
    this.userInfo = null;
  },
});

export default userState;
