<template>
  <div class="user-container">
    <!-- 用戶基本信息 -->
    <div class="card user-info">
      <h2>用戶基本信息</h2>
      <p><strong>用戶名：</strong>{{ userInfo.username }}</p>
      <p><strong>電子郵件：</strong>{{ userInfo.email }}</p>
      <p><strong>出生日期：</strong>{{ userInfo.birthDate }}</p>
    </div>

    <!-- 更新用戶信息表單 -->
    <div class="card user-update">
      <h2>更新用戶信息</h2>
      <form @submit.prevent="updateUserInfo">
        <div class="form-group">
          <label for="email">電子郵件：</label>
          <input type="email" id="email" v-model="updatedUserInfo.email" required />
        </div>
        <div class="form-group">
          <label for="birthDate">出生日期：</label>
          <input type="date" id="birthDate" v-model="updatedUserInfo.birthDate" required />
        </div>
        <button type="submit" class="btn">更新資訊</button>
      </form>
      <p v-if="updateStatus" :class="updateStatus.success ? 'success' : 'error'">
        {{ updateStatus.message }}
      </p>
    </div>

    <!-- 優惠券列表 -->
    <div class="card user-coupons">
      <h2>您的優惠券</h2>
  <!-- 如果優惠券數組為空，顯示提示 -->
      <ul v-if="coupons.length > 0">
        <li v-for="coupon in coupons" :key="coupon.id" class="coupon-item">
          <p><strong>{{ coupon.discount_code }}</strong> - {{ coupon.description }}</p>
          <p>折扣類型: {{ coupon.discount_type }}</p>
          <p>折扣值: {{ coupon.discount_value }}%</p>
          <p>有效日期: {{ coupon.start_from }} 至 {{ coupon.expired_at }}</p>
        </li>
      </ul>
      <p v-else>您目前沒有優惠券。</p>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import testEvents from '@/data/test.json'; // 引入本地的 test.json 文件

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
    this.fetchUserInfo();
    this.fetchCoupons();
  },
  methods: {
    async fetchUserInfo() {
      try {
        // const apiUrl = process.env.VUE_APP_API_URL;
        // const token = localStorage.getItem('authToken');
        // const response = await axios.get(`${apiUrl}/user`, {
        //   headers: {
        //     Authorization: `Bearer ${token}`
        //   }
        // });
        // this.userInfo = response.data;
        // this.updatedUserInfo = { ...this.userInfo };

        // 改成讀取本地的 test.json 文件
        this.userInfo = testEvents[0].tickets[0];
        this.updatedUserInfo = { ...this.userInfo };
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    },
    async fetchCoupons() {
      try {
        // const response = await axios.get('/api/coupons');
        // this.coupons = Array.isArray(response.data) ? response.data : [];

        // 改成讀取本地的 test.json 文件
        this.coupons = testEvents.flatMap(event => event.tickets);
      } catch (error) {
        console.error('Failed to fetch coupons:', error);
        this.coupons = [];
      }
    },
    async updateUserInfo() {
      try {
        const response = await axios.put('/api/user', this.updatedUserInfo);
        if (response.status === 200) {
          this.updateStatus = { success: true, message: '更新成功！' };
          this.userInfo = { ...this.updatedUserInfo };
        } else {
          this.updateStatus = { success: false, message: '更新失敗，請稍後再試。' };
        }

        // 改成本地操作
        /*
        this.updateStatus = { success: true, message: '更新成功！' };
        this.userInfo = { ...this.updatedUserInfo };
        */

      } catch (error) {
        console.error('Failed to update user info:', error);
        this.updateStatus = { success: false, message: '出現錯誤，請稍後再試。' };
      }
    }
  }
};
</script>


<style scoped>
/* 全局容器樣式 */
.user-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr; 
}

/* 卡片樣式 */
.card {
  background-color: #1e1e2f;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  color: #ffffff;
}

/* 標題樣式 */
.card h2 {
  margin-bottom: 20px;
  border-bottom: 2px solid #4CAF50;
  padding-bottom: 10px;
}

/* 表單樣式 */
.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 14px;
  margin-bottom: 5px;
}

.form-group input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #2b2b3c;
  color: #fff;
}

.form-group input:focus {
  outline: none;
  border-color: #4CAF50;
}

/* 按鈕樣式 */
.btn {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  color: #ffffff;
  background-color: #4CAF50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #45a049;
}

/* 成功或錯誤消息樣式 */
.success {
  color: #4CAF50;
  margin-top: 10px;
}

.error {
  color: #ff4d4d;
  margin-top: 10px;
}

/* 優惠券列表樣式 */
.user-coupons ul {
  list-style: none;
  padding: 0;
}

.coupon-item {
  margin-bottom: 15px;
  padding: 15px;
  background-color: #2b2b3c;
  border-radius: 5px;
}

.coupon-item p {
  margin: 5px 0;
}
</style>
