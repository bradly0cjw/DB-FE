<template>
  <div class="container mt-5">
    <h1 class="text-center">Hottest Events!!!</h1>
    <div class="row mt-4">
      <div class="col-md-4" v-for="event in events" :key="event.id">
        <EventCard :event="event" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import EventCard from "@/components/EventCard.vue";
import testEvents from '@/data/test.json'; // 引入本地的 test.json 文件(測試用)

export default {
  name: "Home",
  components: {
    EventCard,
  },
  data() {
    return {
      events: [],
    };
  },
  async created() {
    await this.fetchEvents();
  },
  methods: {
    async fetchEvents() {
      try {
        const apiUrl = process.env.VUE_APP_API_URL;
        const response = await axios.get(`${apiUrl}/events`);
        this.events = response.data;

        // 改成讀取本地的 test.json 文件(測試用)
        //this.events = testEvents;

      } catch (error) {
        console.error('Error fetching events:', error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  padding-top: 20px;
}
</style>
