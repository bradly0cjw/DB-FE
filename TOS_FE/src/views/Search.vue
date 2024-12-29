<template>
    <div class="search-page" v-if="events.length > 0">
      <h1>Search Results</h1>
      <div class="event-list">
        <EventCard v-for="event in events" :key="event.id" :product="event" />
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
          const response = await axios.get(`/api/events/search?q=${query}`); // 替換為你的 API 路徑
          this.events = response.data;
        } catch (error) {
          console.error('Failed to fetch search results:', error);
          this.events = []; // 確保在出錯時 events 為空數組
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