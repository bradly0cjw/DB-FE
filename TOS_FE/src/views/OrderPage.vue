<template>
    <div class="order-page">
      <h1>Your Order</h1>
      <div v-if="orderItems.length === 0">
        <p>Your order is empty!</p>
      </div>
      <div v-else>
        <div v-for="item in orderItems" :key="item.id" class="order-item">
          <img :src="item.image" alt="item.name" />
          <div>
            <h4>{{ item.name }}</h4>
            <p>{{ item.description }}</p>
            <p>Quantity: {{ item.quantity }}</p>
            <p>Total Price: ${{ item.price * item.quantity }}</p>
            <button @click="cancelOrder(item.id)">Cancel Ticket</button>
          </div>
        </div>
      </div>
      <div v-if="orderItems.length > 0" class="order-summary">
        <p>Total Price: ${{ totalPrice }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        orderItems: [],
      };
    },
    mounted() {
      this.fetchOrderItems();
    },
    computed: {
      totalPrice() {
        return this.orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      }
    },
    methods: {
      async fetchOrderItems() {
        try {
          const response = await axios.get('/api/order'); // 替换为你的 API 路径
          this.orderItems = response.data;
        } catch (error) {
          console.error('Failed to fetch order items:', error);
        }
      },
      async cancelOrder(itemId) {
        try {
          const response = await axios.delete(`/api/order/${itemId}`); // 替换为你的退票 API 路径
          if (response.status === 200) {
            // 成功退票后，更新订单列表
            this.orderItems = this.orderItems.filter(item => item.id !== itemId);
            alert('Ticket successfully canceled');
          }
        } catch (error) {
          console.error('Failed to cancel the order:', error);
          alert('Failed to cancel the ticket');
        }
      }
    },
  };
  </script>
  
  <style scoped>
  .order-page {
    padding: 20px;
  }
  
  .order-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .order-item img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }
  
  .order-item div {
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
  
  .order-summary {
    margin-top: 20px;
    font-weight: bold;
  }
  </style>
  