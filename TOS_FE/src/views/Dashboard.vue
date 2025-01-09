<template> 
  <div class="dashboard-container">
    <!--
    活動管理區
    <div class="card event-management">
      <h2>活動管理</h2>

      新增/修改活動表單
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

      已建立的活動列表
      <div v-if="events.length > 0">
        <h3>已建立的活動</h3>
        <ul>
          <li v-for="event in events" :key="event.id" class="event-item">
            <p><strong>{{ event.name }}</strong> ({{ event.date }})</p>
            <p>{{ event.description }}</p>
            <div class="action-buttons">
              <button @click="editEvent(event)" class="btn edit-btn">
                <i class="fas fa-edit"></i> 修改活動
              </button>
              <button @click="editTicket(ticket)" class="btn editT-btn">
                <i class="fas fa-edit"></i> 修改活動票券
              </button>
              <button @click="deleteEvent(event.id)" class="btn delete-btn">
                <i class="fas fa-trash-alt"></i> 刪除活動
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>無已建立的活動</p>
      </div>
    </div>
  -->
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
          <label for="couponType">折扣類型：</label>
          <select id="couponType" v-model="couponForm.type">
            <option value="ship">運費</option>
            <option value="product">商品</option>
            <option value="total">總金額</option>
          </select>
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
            <p>類型: {{ coupon.type }}</p>
            <div class="action-buttons">
              <button @click="editCoupon(coupon)" class="btn edit-btn">
                <i class="fas fa-edit"></i> 修改優惠券
              </button>
              <button @click="deleteCoupon(coupon.id)" class="btn delete-btn">
                <i class="fas fa-trash-alt"></i> 刪除優惠券
              </button>
            </div>
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
import testEvents from '@/data/test.json'; // 引入本地的 test.json 文件

export default {
  data() {
    return {
      events: [],
      eventForm: {
        id: null,
        name: '',
        date: '',
        description: ''
      },
      coupons: [],
      couponForm: {
        id: null,
        code: '',
        discount: '',
        type: 'total',
        expiration: ''
      }
    };
  },
  mounted() {
    // this.fetchEvents();
    this.fetchCoupons();
  },
  methods: {
    async fetchEvents() {
      try {
        const apiUrl = process.env.VUE_APP_API_URL;
        const response = await axios.get(`${apiUrl}/events`);
        this.events = response.data;

        // 改成讀取本地的 test.json 文件
        // this.events = testEvents;
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    },
    async fetchCoupons() {
      try {
        const apiUrl = process.env.VUE_APP_API_URL;
        const response = await axios.get(`${apiUrl}/coupons`);
        this.coupons = response.data;

        // 改成讀取本地的 test.json 文件
        // this.coupons = testEvents.flatMap(event => event.tickets);
      } catch (error) {
        console.error("Failed to fetch coupons:", error);
      }
    },
    async submitEvent() {
      try {
        const apiUrl = process.env.VUE_APP_API_URL;
        if (this.eventForm.id) {
          await axios.put(`${apiUrl}/events/${this.eventForm.id}`, this.eventForm);
        } else {
          await axios.post(`${apiUrl}/events`, this.eventForm);
        }
        this.fetchEvents();
        this.eventForm = { id: null, name: '', date: '', description: '' };

        // 改成本地操作
        // if (this.eventForm.id) {
        //   const index = this.events.findIndex(event => event.id === this.eventForm.id);
        //   if (index !== -1) {
        //     this.events.splice(index, 1, { ...this.eventForm });
        //   }
        // } else {
        //   this.events.push({ ...this.eventForm, id: Date.now() });
        // }
        // this.eventForm = { id: null, name: '', date: '', description: '' };
      } catch (error) {
        console.error("Failed to submit event:", error);
      }
    },
    async submitCoupon() {
      try {
        const apiUrl = process.env.VUE_APP_API_URL;
        if (this.couponForm.id) {
          await axios.put(`${apiUrl}/coupons/${this.couponForm.id}`, this.couponForm);
        } else {
          await axios.post(`${apiUrl}/coupons`, this.couponForm);
        }
        this.fetchCoupons();
        this.couponForm = { id: null, code: '', discount: '', type: 'total', expiration: '' };

        // 改成本地操作
        // if (this.couponForm.id) {
        //   const index = this.coupons.findIndex(coupon => coupon.id === this.couponForm.id);
        //   if (index !== -1) {
        //     this.coupons.splice(index, 1, { ...this.couponForm });
        //   }
        // } else {
        //   this.coupons.push({ ...this.couponForm, id: Date.now() });
        // }
        // this.couponForm = { id: null, code: '', discount: '', type: 'total', expiration: '' };
      } catch (error) {
        console.error("Failed to submit coupon:", error);
      }
    },
    async deleteEvent(eventId) {
      try {
        const apiUrl = process.env.VUE_APP_API_URL;
        await axios.delete(`${apiUrl}/events/${eventId}`);
        this.fetchEvents();

        // 改成本地操作
        //this.events = this.events.filter(event => event.id !== eventId);

      } catch (error) {
        console.error("Failed to delete event:", error);
      }
    },
    async deleteCoupon(couponId) {
      try {
        const apiUrl = process.env.VUE_APP_API_URL;
        await axios.delete(`${apiUrl}/coupons/${couponId}`);
        this.fetchCoupons();

        // 改成本地操作
        //this.coupons = this.coupons.filter(coupon => coupon.id !== couponId);

      } catch (error) {
        console.error("Failed to delete coupon:", error);
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

.event-item,
.coupon-item {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #5B5B5B;
  border-radius: 5px;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.btn {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  font-size: 14px;
  color: #ffffff;
  background-color: #4CAF50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn i {
  margin-right: 8px;
  font-size: 16px;
}

.btn:hover {
  background-color: #45a049;
}

.edit-btn {
  background-color: #007bff;
}

.edit-btn:hover {
  background-color: #0056b3;
}

.editT-btn {
  background-color: #4CAF50;
}

.editT-btn:hover {
  background-color: #45a049;
}

.delete-btn {
  background-color: #ff4d4d;
}

.delete-btn:hover {
  background-color: #e60000;
}
</style>
