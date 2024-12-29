<template>
  <div class="card bg-secondary text-white">
    <img :src="event.image_path || 'default-image-path.jpg'" class="card-img-top" :alt="event.event_name || 'Event Image'" />
    <div class="card-body">
      <h5 class="card-title">{{ event.event_name || 'Event Name' }}</h5>
      <p class="card-text">{{ event.description || 'No description available.' }}</p>
      <button class="btn btn-primary">Buy Now</button>
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
      default: () => ({
        image_path: '',
        event_name: '',
        description: ''
      })
    },
  },
};
</script>