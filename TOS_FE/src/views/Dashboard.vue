<template>
  <div class="dashboard-container">
    <!-- 活動管理區 -->
    <div class="card event-management">
      <h2>活動管理</h2>

      <!-- 新增/修改活動表單 -->
      <form @submit.prevent="submitEvent">
        <div class="form-group">
          <label for="eventName">活動名稱：</label>
          <input type="text" id="eventName" v-model="eventForm.name" required />
        </div>
        <div class="form-group">
          <label for="eventDate">活動日期：</label>
          <input type="date" id="eventDate" v-model="eventForm.date" required />
        </div>
        <div class="form-group">
          <label for="eventDescription">活動描述：</label>
          <textarea id="eventDescription" v-model="eventForm.description" required></textarea>
        </div>
        <button type="submit" class="btn">提交活動</button>
      </form>

      <!-- 已建立的活動列表 -->
      <div v-if="events.length > 0">
        <h3>已建立的活動</h3>
        <ul>
          <li v-for="event in events" :key="event.id" class="event-item">
            <p><strong>{{ event.name }}</strong> ({{ event.date }})</p>
            <p>{{ event.description }}</p>
            <button @click="editEvent(event)">修改活動</button>
            <button @click="deleteEvent(event.id)">刪除活動</button>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>無已建立的活動</p>
      </div>
    </div>

    <!-- 優惠券管理區 -->
    <div class="card coupon-management">
      <h2>優惠券管理</h2>

      <!-- 新增/修改優惠券表單 -->
      <form @submit.prevent="submitCoupon">
        <div class="form-group">
          <label for="couponCode">優惠券代碼：</label>
          <input type="text" id="couponCode" v-model="couponForm.code" required />
        </div>
        <div class="form-group">
          <label for="couponDiscount">折扣值：</label>
          <input type="number" id="couponDiscount" v-model="couponForm.discount" required />
        </div>
        <div class="form-group">
          <label for="couponExpiration">過期日期：</label>
          <input type="date" id="couponExpiration" v-model="couponForm.expiration" required />
        </div>
        <button type="submit" class="btn">提交優惠券</button>
      </form>

      <!-- 已建立的優惠券列表 -->
      <div v-if="coupons.length > 0">
        <h3>已建立的優惠券</h3>
        <ul>
          <li v-for="coupon in coupons" :key="coupon.id" class="coupon-item">
            <p><strong>{{ coupon.code }}</strong> - {{ coupon.discount }}% off</p>
            <p>過期日期: {{ coupon.expiration }}</p>
            <button @click="editCoupon(coupon)">修改優惠券</button>
            <button @click="deleteCoupon(coupon.id)">刪除優惠券</button>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>無已建立的優惠券</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      events: [], // 已建立的活動列表
      eventForm: {
        name: '',
        date: '',
        description: ''
      },
      coupons: [], // 已建立的優惠券列表
      couponForm: {
        code: '',
        discount: '',
        expiration: ''
      }
    };
  },
  mounted() {
    this.fetchEvents(); // 獲取活動列表
    this.fetchCoupons(); // 獲取優惠券列表
  },
  methods: {
    // 獲取活動列表
    async fetchEvents() {
      try {
        const apiUrl = process.env.VUE_APP_API_URL;
        const response = await axios.get(`${apiUrl}/events`);
        this.events = Array.isArray(response.data) ? response.data : [];
      } catch (error) {
        console.error('Failed to fetch events:', error);
        this.events = [];
      }
    },

    // 獲取優惠券列表
    async fetchCoupons() {
      try {
        const apiUrl = process.env.VUE_APP_API_URL;
        const response = await axios.get(`${apiUrl}/coupons`);
        this.coupons = Array.isArray(response.data) ? response.data : [];
      } catch (error) {
        console.error('Failed to fetch coupons:', error);
        this.coupons = [];
      }
    },

    // 提交活動
    async submitEvent() {
      try {
        const apiUrl = process.env.VUE_APP_API_URL;
        let response;
        if (this.eventForm.id) {
          response = await axios.put(`${apiUrl}/events/${this.eventForm.id}`, this.eventForm);
        } else {
          response = await axios.post(`${apiUrl}/events`, this.eventForm);
        }
        if (response.status === 200) {
          this.fetchEvents();
          this.eventForm = { name: '', date: '', description: '' };
        }
      } catch (error) {
        console.error('Failed to submit event:', error);
      }
    },

    // 提交優惠券
    async submitCoupon() {
      try {
        const apiUrl = process.env.VUE_APP_API_URL;
        let response;
        console.log(this.couponForm.id);
        if (this.couponForm.id) {
          response = await axios.put(`${apiUrl}/coupons/${this.couponForm.id}`, this.couponForm);
          console.log("@@");  
        } else {
          response = await axios.post(`${apiUrl}/coupons`, this.couponForm);
          console.log("@");  
        }
        if (response.status === 200) {
          this.fetchCoupons();
          this.couponForm = { code: '', discount: '', expiration: '' };
        }
      } catch (error) {
        console.error('Failed to submit coupon:', error);
      }
    },

    // 編輯活動
    editEvent(event) {
      this.eventForm = { ...event };
    },

    // 刪除活動
    async deleteEvent(eventId) {
      const apiUrl = process.env.VUE_APP_API_URL;
      try {
        const response = await axios.delete(`${apiUrl}/events/${eventId}`);
        if (response.status === 200) {
          this.fetchEvents();
        }
      } catch (error) {
        console.error('Failed to delete event:', error);
      }
    },

    // 編輯優惠券
    editCoupon(coupon) {
      this.couponForm = { ...coupon };
    },

    // 刪除優惠券
    async deleteCoupon(couponId) {
      const apiUrl = process.env.VUE_APP_API_URL;
      try {
        const response = await axios.delete(`${apiUrl}/coupons/${couponId}`);
        if (response.status === 200) {
          this.fetchCoupons();
        }
      } catch (error) {
        console.error('Failed to delete coupon:', error);
      }
    }
  }
};
</script>

<style scoped>
.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr;
}

.card {
  background-color: #1e1e2f;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  color: #ffffff;
}

.card h2 {
  margin-bottom: 20px;
  border-bottom: 2px solid #4CAF50;
  padding-bottom: 10px;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 14px;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #2b2b3c;
  color: #fff;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #4CAF50;
}

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

.event-item,
.coupon-item {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #2b2b3c;
  border-radius: 5px;
}
</style>
