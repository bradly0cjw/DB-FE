<template>
  <div class="container mt-5">
    <h1 class="text-center">Event List</h1>
    <div class="row mt-4">
      <div class="col-md-4" v-for="event in events" :key="event.id">
        <EventCard :event="event" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import EventCard from '@/components/EventCard.vue';

export default {
  name: 'Event',
  components: {
    EventCard,
  },
  data() {
    return {
      events: [],
    };
  },
  created() {
    this.fetchEvents();
  },
  methods: {
    async fetchEvents() {
      try {
        const response = await axios.get('http://backend:3000/events');
        this.events = response.data;
        console.log('Events:', this.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    },
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>