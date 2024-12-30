<template>
    <div class="register-page">
      <div class="register-header">
        <h1>Register</h1>
        <p>Create your account to get started</p>
      </div>
      <div class="register-container">
        <div class="register-card">
          <h2>Sign Up</h2>
          <form @submit.prevent="handleRegister">
            <div class="form-group">
              <label for="name">Name</label>
              <input
                type="text"
                v-model="name"
                id="name"
                placeholder="Enter your name"
                required
              />
            </div>
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
            <div class="form-group">
              <label for="confirmPassword">Confirm Password</label>
              <input
                type="password"
                v-model="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm your password"
                required
              />
            </div>
            <button type="submit" class="btn">Register</button>
            <p v-if="error" class="error">{{ error }}</p>
            <p v-if="successMessage" class="success">{{ successMessage }}</p>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        error: null,
        successMessage: null,
      };
    },
    methods: {
      async handleRegister() {
        // 清空錯誤訊息
        this.error = null;
        this.successMessage = null;
  
        // 驗證密碼一致性
        if (this.password !== this.confirmPassword) {
          this.error = "Passwords do not match.";
          return;
        }
  
        try {
          const apiUrl = process.env.VUE_APP_API_URL;
          const response = await axios.post(`${apiUrl}/register`, {
            name: this.name,
            email: this.email,
            password: this.password,
          });
  
          // 假設後端回傳註冊成功消息
          this.successMessage = "Registration successful! You can now log in.";
          this.clearForm();
        } catch (error) {
          console.error("Registration failed:", error);
          this.error = "Registration failed. Please try again.";
        }
      },
      clearForm() {
        this.name = "";
        this.email = "";
        this.password = "";
        this.confirmPassword = "";
      },
    },
  };
  </script>
  
  <style scoped>
  /* 整體頁面設計 */
  .register-page {
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
  .register-header {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .register-header h1 {
    font-size: 72px;
    color: #ffffff;
  }
  
  .register-header p {
    font-size: 16px;
    color: #bbbbbb;
  }
  
  /* 註冊容器 */
  .register-container {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 600px;
  }
  
  /* 註冊卡片 */
  .register-card {
    background-color: #3c3c3c;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    width: 100%;
    text-align: center;
  }
  
  .register-card h2 {
    margin-bottom: 36px;
    font-size: 24px;
    color: #ffffff;
  }
  
  /* 表單組 */
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
  
  /* 成功消息 */
  .success {
    color: #4CAF50;
    margin-top: 10px;
    font-size: 14px;
  }
  </style>
  