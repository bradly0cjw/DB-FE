<template>
  <div class="card bg-secondary text-white">
    <!-- <img :src="event.image_path || 'default-image-path.jpg'" class="card-img-top" :alt="event.event_name || 'Event Image'" /> -->
    <img :src="'default-image-path.jpg'" class="card-img-top" :alt="event.event_name || 'Event Image'" />
    <div class="card-body">
      <h5 class="card-title">{{ event.event_name || 'Event Name' }}</h5>
      <p class="card-text">{{ event.description || 'No description available.' }}</p>
      <div class="d-flex justify-content-between">
        <button class="btn btn-primary" @click="goToDetail">Detail</button>
        <button class="btn btn-primary" @click="addToCart">Add to Cart</button>
        <button class="btn btn-primary">Buy Now</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventCard',
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goToDetail() {
      this.$router.push({ name: 'TicketDetail', params: { id: this.event.id } });
    },
    async addToCart() {
      try {
        await axios.post('/api/cart', { productId: this.event.id });
        alert(`${this.event.event_name} has been added to your cart!`);
      } catch (error) {
        console.error('Failed to add product to cart:', error);
        alert('Failed to add product to cart. Please try again later.');
      }
    },
  },
};
</script>

<style scoped>
.event-card {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 10px;
  text-align: center;
}

button {
  margin: 5px;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>