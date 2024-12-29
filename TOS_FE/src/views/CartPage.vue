<template>
    <div class="cart-page">
      <h1>Your Cart</h1>
      <div v-if="cartItems.length === 0">
        <p>Your cart is empty!</p>
      </div>
      <div v-else>
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <img :src="item.image" alt="item.name" />
          <div>
            <h4>{{ item.name }}</h4>
            <p>{{ item.description }}</p>
            <p>Quantity: {{ item.quantity }}</p>
            <button @click="removeFromCart(item.id)">Remove</button>
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
        cartItems: [],
      };
    },
    mounted() {
      this.fetchCartItems();
    },
    methods: {
      async fetchCartItems() {
        try {
          const response = await axios.get('/api/cart'); // 替換為你的 API 路徑
          this.cartItems = response.data;
        } catch (error) {
          console.error('Failed to fetch cart items:', error);
        }
      },
      removeFromCart(itemId) {
        this.cartItems = this.cartItems.filter(item => item.id !== itemId);
      },
    },
  };
  </script>
  
  <style scoped>
  .cart-page {
    padding: 20px;
  }
  
  .cart-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .cart-item img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }
  
  .cart-item div {
    flex: 1;
  }
  
  button {
    padding: 10px 15px;
    background-color: #ff0000;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #cc0000;
  }
  </style>