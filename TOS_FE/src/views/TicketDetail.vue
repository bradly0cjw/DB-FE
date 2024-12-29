<template>
    <div class="order-page">
      <h1>Your Orders</h1>
      <div v-if="orders.length === 0">
        <p>You have no orders yet!</p>
      </div>
      <div v-else>
        <div v-for="order in orders" :key="order.id" class="order-item">
          <h4>Order #{{ order.id }}</h4>
          <p>Status: {{ order.status }}</p>
          <p>Payment Status: {{ order.payment_status }}</p>
          <p>Date: {{ order.order_date }}</p>
          
          <div v-for="item in order.items" :key="item.ticket_id" class="order-item-details">
            <img :src="item.image" alt="item.name" />
            <div>
              <h5>{{ item.name }}</h5>
              <p>{{ item.description }}</p>
              <p>Quantity: {{ item.quantity }}</p>
              <p>Price: ${{ item.price }}</p>
              <p>Total: ${{ item.quantity * item.price }}</p>
            </div>
          </div>
  
          <button v-if="order.status === 'Pending'" @click="cancelOrder(order.id)">Cancel Order</button>
          <router-link :to="{ name: 'OrderDetail', params: { id: order.id } }">
            <button>View Details</button>
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        orders: [],
      };
    },
    mounted() {
      this.fetchOrders();
    },
    methods: {
      async fetchOrders() {
        try {
          const response = await axios.get('/api/orders'); // 替換為你的 API 路徑
          this.orders = response.data;
        } catch (error) {
          console.error('Failed to fetch orders:', error);
        }
      },
      async cancelOrder(orderId) {
        try {
          await axios.post(`/api/orders/${orderId}/cancel`); // 替換為你的 API 路徑
          this.fetchOrders(); // 重新獲取訂單列表
        } catch (error) {
          console.error('Failed to cancel order:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .order-page {
    padding: 20px;
  }
  
  .order-item {
    border: 1px solid #ccc;
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .order-item-details {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .order-item-details img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }
  
  button {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    margin-top: 10px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>