<template>
  <div class="search-page" v-if="events.length > 0">
    <h1>Search Results</h1>
    <div class="event-list">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
    </div>
  </div>
  <div v-else>
    <p>No events found.</p>
  </div>
</template>

<script>
import axios from 'axios';
import EventCard from '@/components/EventCard.vue';

export default {
  name: 'Search',
  components: {
    EventCard,
  },
  data() {
    return {
      events: [],
    };
  },
  async created() {
    const query = this.$route.query.q;
    await this.searchEvents(query);
  },
  watch: {
    '$route.query.q': async function(newQuery) {
      await this.searchEvents(newQuery);
    }
  },
  methods: {
    async searchEvents(query) {
      try {
        const apiUrl = process.env.VUE_APP_API_URL;
        const response = await axios.get(`${apiUrl}/events/search?q=${query}`);
        this.events = response.data;
        console.log(this.events);
      } catch (error) {
        console.error('Failed to fetch search results:', error);
        this.events = [];
      }
    }
  }
};
</script>

<style scoped>
.search-page {
  padding: 20px;
}

.event-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>