<template>
  <div class="card bg-secondary text-white">
    <img :src="event.image_path || 'default-image-path.jpg'" class="card-img-top" :alt="event.event_name || 'Event Image'" />
    <!-- <img :src="'default-image-path.jpg'" class="card-img-top" :alt="event.event_name || 'Event Image'" /> -->
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
        id : '',
        image_path: '',
        event_name: '',
        description: ''
      })
    },
    
    },
    methods: {
      addToCart() {
        var cart = localStorage?.getItem('cart');
        if (!cart) {
          cart = [];
        } else {
          cart = JSON.parse(localStorage.getItem("cart"));
          console.log(cart);
        }
        if (cart.includes(this.event.id)) {
          alert('This event is already in your cart.');
        } else {
          cart = [...cart, this.event.id];
          localStorage.setItem('cart', JSON.stringify(cart));
        }
      },
      goToDetail() {
        this.$router.push({ name: 'TicketDetail', params: { id: this.event.id } });
      },
  },
};
</script>
