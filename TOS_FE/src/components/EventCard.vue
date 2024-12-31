<template>
  <div class="card event-card bg-secondary text-white">
    <img :src="event.image_path || 'default-image-path.jpg'" class="card-img-top" :alt="event.event_name || 'Event Image'" />
    <div class="card-body">
      <h5 class="card-title">{{ event.event_name || 'Event Name' }}</h5>
      <p class="card-text">{{ event.description || 'No description available.' }}</p>
      <div class="d-flex justify-content-between">
        <button class="btn btn-primary" @click="goToDetail">Detail</button>
      </div>
    </div>
  </div>
</template>



<style scoped>
.event-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  max-width: 400px; 
  margin: 10px auto; /* 使卡片居中 */
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
        id : '',
        image_path: '',
        event_name: '',
        description: ''
      })
    },
    
    },
    methods: {
      goToDetail() {
        this.$router.push({ name: 'TicketDetail', params: { id: this.event.id } });
      },
  },
};
</script>
