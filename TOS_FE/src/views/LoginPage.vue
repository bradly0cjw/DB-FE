<template>
  <div class="login-page">
    <div class="login-header">
      <h1>Login Portal</h1>
      <p>Please log in to access your account</p>
    </div>
    <div class="login-container">
      <!-- Unified Login -->
      <div class="login-card">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              v-model="email"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              v-model="password"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" class="btn">Login</button>
          <p v-if="error" class="error">{{ error }}</p>
        </form>
        <button class="btn register-btn" @click="navigateToRegister">
          Register
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async handleLogin() {
      try {
        const apiUrl = process.env.VUE_APP_API_URL;
        const response = await axios.post(`${apiUrl}/login`, {
          email: this.email,
          password: this.password,
        });

        const { token, role  } = response.data;
        console.log("Login successful:", token, role );
        localStorage.setItem("authToken", token);
        
        // 更新 user.js 中的狀態
        userState.setUser(userInfo);

        // 根據 userType 跳轉
        if (role  === "user") {
          this.$router.push("/");
        } else if (role  === "seller") {
          this.$router.push("/seller/dashboard");
        } 
        else if (role  === "admin") {
          this.$router.push("/admin");
        }else {
          this.error = "Unknown user type.";
        }
      } catch (error) {
        console.error("Login failed:", error);
        this.error = "Invalid email or password. Please try again.";
      }
    },
    navigateToRegister() {
      this.$router.push("/register");
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

.register-btn {
  margin-top: 20px;
  background-color: #2196F3;
}
.register-btn:hover {
  background-color: #0b7dda;
}
</style>
