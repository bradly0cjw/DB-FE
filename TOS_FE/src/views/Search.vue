<template>
  <div class="search-page" v-if="events.length > 0">
    <h1 class="page-title">Search Results</h1>
    <div class="event-list">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
    </div>
  </div>
  <div v-else>
    <div class="no-results">
      <p>No events found.</p>
    </div>
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
    '$route.query.q': async function (newQuery) {
      await this.searchEvents(newQuery);
    }
  },
  methods: {
    async searchEvents(query) {
      try {
        const apiUrl = process.env.VUE_APP_API_URL;
        const response = await axios.get(`${apiUrl}/events/search?q=${query}`);
        this.events = response.data;

        // 改成讀取本地的 test.json 文件
        /*
        this.events = testEvents.filter(event => event.event_name.includes(query));
        console.log(this.events);
        */

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
  background-color: #121212;
  /* 深色背景 */
  color: #e0e0e0;
  /* 淺灰色文字 */
}

.page-title {
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  /* 白色文字 */
  margin-bottom: 20px;
}

.event-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
}

.no-results {
  text-align: center;
  padding: 50px;
  background-color: #333;
  /* 深灰色背景 */
  border-radius: 8px;
  color: #aaa;
  /* 淺灰色文字 */
}

.no-results p {
  font-size: 1.2rem;
}

.event-card {
  background-color: #1e1e1e;
  /* 深色卡片背景 */
  color: #fff;
  /* 白色文字 */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  width: calc(33.33% - 20px);
  margin-bottom: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.event-card:hover {
  transform: translateY(-5px);
  /* 卡片懸浮效果 */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
}

/* 響應式設計，確保手機端顯示良好 */
@media (max-width: 768px) {
  .event-list {
    justify-content: center;
  }

  .event-card {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.5rem;
  }
}
</style>
