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
import testEvents from '@/data/test.json'; // 引入本地的 test.json 文件

export default {
  name: 'Event',
  components: {
    EventCard,
  },
  data() {
    return {
      events: [],
      query: '', // 可以根據需要設置查詢條件
    };
  },
  async created() {
    await this.fetchEvents();
  },
  methods: {
    async fetchEvents() {
      try {
        // 暫時註解掉接 API 的部分
        const apiUrl = process.env.VUE_APP_API_URL;
        const response = await axios.get(`${apiUrl}/events/search?q=${this.query}`);
        this.events = response.data;

        // 改成讀取本地的 test.json 文件
        //this.events = testEvents;
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    },
  },
};
</script>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.text-center {
  text-align: center;
}

.mt-5 {
  margin-top: 3rem;
}

.mt-4 {
  margin-top: 1.5rem;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.col-md-4 {
  flex: 1 1 calc(33.333% - 20px);
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .col-md-4 {
    flex: 1 1 calc(50% - 20px);
  }
}

@media (max-width: 576px) {
  .col-md-4 {
    flex: 1 1 100%;
  }
}
</style>