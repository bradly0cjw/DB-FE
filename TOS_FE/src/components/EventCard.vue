<template>
  <div class="card bg-secondary text-white">
    <img :src="event.image_path || 'default-image-path.jpg'" class="card-img-top" :alt="event.event_name || 'Event Image'" />
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
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>

<script>
export default {
  name: 'EventCard',
  props: {
    event: {
      type: Object,
      required: true,
      default: () => ({
        image_path: '',
        event_name: '',
        description: ''
      })
    },
  },
};
</script>