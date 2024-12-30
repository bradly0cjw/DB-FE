<template>
  <div class="login-page">
    <div class="login-header">
      <h1>Login Portal</h1>
      <p>Please select your login type below</p>
    </div>
    <div class="login-container">
      <!-- User Login -->
      <div class="login-card">
        <h2>User Login</h2>
        <form @submit.prevent="handleUserLogin">
          <div class="form-group">
            <label for="userEmail">Email</label>
            <input type="email" v-model="userEmail" id="userEmail" placeholder="Enter your email" required />
          </div>
          <div class="form-group">
            <label for="userPassword">Password</label>
            <input type="password" v-model="userPassword" id="userPassword" placeholder="Enter your password" required />
          </div>
          <button type="submit" class="btn">Login</button>
          <p v-if="userError" class="error">{{ userError }}</p>
        </form>
      </div>

      <!-- Seller Login -->
      <div class="login-card">
        <h2>Seller Login</h2>
        <form @submit.prevent="handleSellerLogin">
          <div class="form-group">
            <label for="sellerEmail">Email</label>
            <input type="email" v-model="sellerEmail" id="sellerEmail" placeholder="Enter your email" required />
          </div>
          <div class="form-group">
            <label for="sellerPassword">Password</label>
            <input type="password" v-model="sellerPassword" id="sellerPassword" placeholder="Enter your password" required />
          </div>
          <button type="submit" class="btn">Login</button>
          <p v-if="sellerError" class="error">{{ sellerError }}</p>
        </form>
      </div>
    </div>
  </div>
</template>



<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      // User login data
      userEmail: '',
      userPassword: '',
      userError: null,

      // Seller login data
      sellerEmail: '',
      sellerPassword: '',
      sellerError: null,
    };
  },
  methods: {
    ...mapActions('user', ['login']),
    
    // Handle user login
    async handleUserLogin() {
      try {
        const apiUrl = process.env.VUE_APP_API_URL;
        const response = await axios.post(`${apiUrl}/login`, {
          email: this.userEmail,
          password: this.userPassword,
        }); // 替換為你的 API 路徑
        // 假設 API 返回一個 token
        const { token } = response.data;

        // 儲存 token（此處使用 localStorage）
        localStorage.setItem("userToken", token);
        this.$router.push("/");
      } catch (error) {
        console.error('User login failed:', error);
        this.userError = 'Invalid email or password. Please try again.';
      }
    },

    // Handle seller login
    async handleSellerLogin() {
      try {
        const apiUrl = process.env.VUE_APP_API_URL;
        const response = await axios.post(`${apiUrl}/login`, {
          email: this.sellerEmail,
          password: this.sellerPassword,
        });
        const { token } = response.data;
        localStorage.setItem("sellerToken", token);
        this.$router.push("/seller/dashboard");  // Redirect to seller dashboard
      } catch (error) {
        console.error('Seller login failed:', error);
        this.sellerError = 'Invalid email or password. Please try again.';
      }
    },
  },
};
</script>

<style scoped>
/* 整體頁面設計 */
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #2b2b2b;
  color: #e0e0e0;
  font-family: 'Arial', sans-serif;
  padding: 20px;
}

/* 頁面標題 */
.login-header {
  text-align: center;
  margin-bottom: 40px;
}

.login-header h1 {
  font-size: 72px;
  color: #ffffff;
}

.login-header p {
  font-size: 16px;
  color: #bbbbbb;
}

/* 登入容器 */
.login-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 50px;
  width: 100%;
  max-width: 1500px;
}

/* 登入卡片 */
.login-card {
  background-color: #3c3c3c;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 600px;
  text-align: center;
}

.login-card h2 {
  margin-bottom: 36px;
  font-size: 24px;
  color: #ffffff;
}


.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #bbbbbb;
}

.form-group input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #555555;
  border-radius: 5px;
  background-color: #2b2b2b;
  color: #e0e0e0;
  box-sizing: border-box;
}

.form-group input::placeholder {
  color: #888888;
}

.form-group input:focus {
  border-color: #888888;
  outline: none;
}

/* 按鈕樣式 */
.btn {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  background-color: #4CAF50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn:hover {
  background-color: #666666;
}

/* 錯誤消息 */
.error {
  color: #ff4d4d;
  margin-top: 10px;
  font-size: 14px;
}
</style>
