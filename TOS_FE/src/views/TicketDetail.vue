<template>
  <div class="ticket-detail-page">
    <h1>{{ event.name }}</h1>
    <p>{{ event.description }}</p>
    <div v-if="tickets.length === 0">
      <p>No tickets available for this event.</p>
    </div>
    <div v-else class="ticket-list">
      <div v-for="ticket in tickets" :key="ticket.id" class="ticket-item">
        <h4>{{ ticket.name }}</h4>
        <p>{{ ticket.description }}</p>
        <p>Price: ${{ ticket.price }}</p>
        <p>Available: {{ ticket.available }}</p>
        <button @click="addToCart(ticket.id)">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      event: {},
      tickets: [],
    };
  },
  async created() {
    const eventId = this.$route.params.id;
    await this.fetchEventDetails(eventId);
    await this.fetchTickets(eventId);
  },
  methods: {
    async fetchEventDetails(eventId) {
      try {
        const response = await axios.get(`/api/events/${eventId}`); // 替換為你的 API 路徑
        this.event = response.data;
      } catch (error) {
        console.error('Failed to fetch event details:', error);
      }
    },
    async fetchTickets(eventId) {
      try {
        const response = await axios.get(`/api/events/${eventId}/tickets`); // 替換為你的 API 路徑
        this.tickets = response.data;
      } catch (error) {
        console.error('Failed to fetch tickets:', error);
      }
    },
    async addToCart(ticketId) {
      try {
        await axios.post('/api/cart', { ticketId }); // 替換為你的 API 路徑
        alert('Ticket added to cart!');
      } catch (error) {
        console.error('Failed to add ticket to cart:', error);
        alert('Failed to add ticket to cart. Please try again later.');
      }
    },
  },
};
</script>

<style scoped>
.ticket-detail-page {
  padding: 20px;
}

.ticket-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.ticket-item {
  border: 1px solid #ccc;
  padding: 20px;
  width: 200px;
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