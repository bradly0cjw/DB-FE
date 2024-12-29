<template>
  <div class="user-information">
    <h2>用戶基本信息</h2>
    
    <!-- 顯示用戶基本信息 -->
    <div class="user-info">
      <p><strong>用戶名：</strong>{{ userInfo.username }}</p>
      <p><strong>電子郵件：</strong>{{ userInfo.email }}</p>
      <p><strong>出生日期：</strong>{{ userInfo.birthDate }}</p>
      <p><strong>支付信息：</strong>{{ userInfo.paymentInfo }}</p>
    </div>

    <!-- 更新用戶信息表單 -->
    <h3>更新信息</h3>
    <form @submit.prevent="updateUserInfo">
      <div>
        <label for="email">電子郵件：</label>
        <input type="email" id="email" v-model="updatedUserInfo.email" required />
      </div>
      <div>
        <label for="birthDate">出生日期：</label>
        <input type="date" id="birthDate" v-model="updatedUserInfo.birthDate" required />
      </div>
      <div>
        <label for="paymentInfo">支付信息：</label>
        <input type="text" id="paymentInfo" v-model="updatedUserInfo.paymentInfo" required />
      </div>
      <button type="submit">更新信息</button>
    </form>

    <!-- 顯示更新成功或失敗的提示 -->
    <p v-if="updateStatus" :class="updateStatus.success ? 'success' : 'error'">{{ updateStatus.message }}</p>

    <!-- 顯示優惠券列表 -->
    <h3>您的優惠券</h3>
    <ul v-if="coupons.length > 0">
      <li v-for="coupon in coupons" :key="coupon.id">
        <p><strong>{{ coupon.discount_code }}</strong> - {{ coupon.description }}</p>
        <p>折扣類型: {{ coupon.discount_type }}</p>
        <p>折扣值: {{ coupon.discount_value }}%</p>
        <p>有效日期: {{ coupon.start_from }} 至 {{ coupon.expired_at }}</p>
      </li>
    </ul>
    <p v-else>您目前沒有優惠券。</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userInfo: {
        username: '',
        email: '',
        birthDate: '',
        paymentInfo: ''
      },
      updatedUserInfo: {
        email: '',
        birthDate: '',
        paymentInfo: ''
      },
      updateStatus: null, 
      coupons: [] 
    };
  },
  mounted() {
    this.fetchUserInfo(); // 頁面加載後獲取用戶信息
    this.fetchCoupons(); // 獲取用戶的優惠券
  },
  methods: {
    async fetchUserInfo() {
      try {
        const response = await axios.get('/api/user'); // 替換為API 路徑
        this.userInfo = response.data;
        this.updatedUserInfo = { ...this.userInfo };
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    },
    
    async fetchCoupons() {
      try {
        const response = await axios.get('/api/coupons'); // 替換為API 路徑
        this.coupons = response.data;
      } catch (error) {
        console.error('Failed to fetch coupons:', error);
      }
    },
    
    async updateUserInfo() {
      try {
        const response = await axios.put('/api/user', this.updatedUserInfo); // 替換為你的 API 路徑
        if (response.status === 200) {
          this.updateStatus = { success: true, message: '更新成功！' };
          this.userInfo = { ...this.updatedUserInfo };
        } else {
          this.updateStatus = { success: false, message: '更新失敗，請稍後再試。' };
        }
      } catch (error) {
        console.error('Failed to update user info:', error);
        this.updateStatus = { success: false, message: '出現錯誤，請稍後再試。' };
      }
    }
  }
};
</script>

<style scoped>
.user-information {
  max-width: 600px;
  margin: 0 auto;
}

form div {
  margin-bottom: 10px;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.success {
  color: green;
}

.error {
  color: red;
}

ul {
  list-style-type: none;
}

li {
  margin-bottom: 20px;
}

li p {
  margin: 5px 0;
}
</style>
