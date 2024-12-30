<template>
  <div class="cart-page">
    <h1>Your Cart</h1>
    <!-- 當 cartItems 為空數組時顯示提示 -->
    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>Your cart is empty!</p>
    </div>
    <!-- 當 cartItems 有內容時顯示購物車項目 -->
    <div v-else class="cart-items">
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <img :src="item.image" :alt="item.name" class="item-image" />
        <div class="item-details">
          <h4 class="item-name">{{ item.name }}</h4>
          <p class="item-description">{{ item.description }}</p>
          <p class="item-quantity">Quantity: {{ item.quantity }}</p>
          <button @click="removeFromCart(item.id)" class="remove-button">Remove</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      cartItems: [], // 購物車項目默認為空數組
    };
  },
  mounted() {
    this.fetchCartItems(); // 頁面加載後獲取購物車項目
  },
  methods: {
    async fetchCartItems() {
      try {
        const apiUrl = process.env.VUE_APP_API_URL;
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItems = await Promise.all(
          cart.map(async (ticketId) => {
            const response = await axios.get(`${apiUrl}/tickets/${ticketId}`);
            return response.data;
          })
        );
        this.cartItems = cartItems;
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
        this.cartItems = [];
      }
    },
    removeFromCart(itemId) {
      this.cartItems = this.cartItems.filter(item => item.id !== itemId);
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const updatedCart = cart.filter(id => id !== itemId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    },
  },
};
</script>

<style scoped>
/* 全局樣式 */
.cart-page {
  padding: 20px;
  background-color: #1e1e2f;
  color: #ffffff;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

/* 標題樣式 */
h1 {
  text-align: center;
  font-size: 2rem;
  color: #4CAF50;
  margin-bottom: 20px;
}

/* 空購物車樣式 */
.empty-cart {
  text-align: center;
  font-size: 1.5rem;
  color: #aaa;
  margin-top: 50px;
}

/* 購物車項目列表 */
.cart-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 單個購物車項目 */
.cart-item {
  display: flex;
  align-items: center;
  background-color: #2b2b3c;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

/* 商品圖片 */
.item-image {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  margin-right: 20px;
  object-fit: cover;
}

/* 商品詳細信息 */
.item-details {
  flex: 1;
}

/* 商品名稱 */
.item-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 5px;
  color: #ffffff;
}

/* 商品描述 */
.item-description {
  font-size: 0.9rem;
  color: #cccccc;
  margin-bottom: 10px;
}

/* 商品數量 */
.item-quantity {
  font-size: 1rem;
  margin-bottom: 15px;
  color: #ffffff;
}

/* 按鈕樣式 */
.remove-button {
  padding: 10px 15px;
  font-size: 0.9rem;
  color: white;
  background-color: #ff4d4d;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.remove-button:hover {
  background-color: #e63939;
}
</style>