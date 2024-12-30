<template>
  <div class="order-page">
    <h1>Your Order</h1>
    <!-- Empty Order -->
    <div v-if="orderItems.length === 0" class="empty-order">
      <p>Your order is empty!</p>
    </div>
    <!-- Order Items -->
    <div v-else class="order-items">
      <div v-for="item in orderItems" :key="item.id" class="order-item">
        <img :src="item.image" alt="item.name" class="item-image" />
        <div class="item-details">
          <h4 class="item-name">{{ item.name }}</h4>
          <p class="item-description">{{ item.description }}</p>
          <p class="item-quantity">Quantity: {{ item.quantity }}</p>
          <p class="item-total-price">Total Price: ${{ item.price * item.quantity }}</p>
          <button @click="cancelOrder(item.id)" class="cancel-button">Cancel Ticket</button>
        </div>
      </div>
    </div>
    <!-- Order Summary -->
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
        const response = await axios.get('/api/order'); // Replace with your API path
        this.orderItems = response.data;
      } catch (error) {
        console.error('Failed to fetch order items:', error);
      }
    },
    async cancelOrder(itemId) {
      try {
        const response = await axios.delete(`/api/order/${itemId}`); // Replace with your cancel API path
        if (response.status === 200) {
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
/* General styles for the page */
.order-page {
  padding: 20px;
  background-color: #1e1e2f; /* Dark background */
  color: #ffffff;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

/* Title styles */
h1 {
  text-align: center;
  font-size: 2rem;
  color: #4CAF50;
  margin-bottom: 20px;
}

/* Empty order message styles */
.empty-order {
  text-align: center;
  font-size: 1.5rem;
  color: #aaa;
  margin-top: 50px;
}

/* Order items styles */
.order-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Single order item styling */
.order-item {
  display: flex;
  align-items: center;
  background-color: #2b2b3c; /* Dark gray background */
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

/* Item image styling */
.item-image {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  margin-right: 20px;
  object-fit: cover;
}

/* Item details container */
.item-details {
  flex: 1;
}

/* Item name styles */
.item-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 5px;
  color: #ffffff;
}

/* Item description styles */
.item-description {
  font-size: 0.9rem;
  color: #cccccc;
  margin-bottom: 10px;
}

/* Item quantity and price styles */
.item-quantity,
.item-total-price {
  font-size: 1rem;
  margin-bottom: 10px;
  color: #ffffff;
}

/* Cancel button styles */
.cancel-button {
  padding: 10px 15px;
  font-size: 0.9rem;
  color: white;
  background-color: #ff4d4d; /* Red background for cancel */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cancel-button:hover {
  background-color: #e63939; /* Darker red when hovered */
}

/* Order summary styles */
.order-summary {
  margin-top: 20px;
  font-weight: bold;
  color: #ffffff;
}
</style>
