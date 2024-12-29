<template>
    <div class="ticket-detail">
      <h1>Ticket Detail</h1>
      <div v-if="ticket">
        <img :src="ticket.image_path" alt="Ticket Image" />
        <h2>{{ ticket.name }}</h2>
        <p>Date: {{ ticket.date }}</p>
        <p>Price: {{ ticket.price }}</p>
        <p>{{ ticket.description }}</p>
      </div>
      <div v-else>
        <p>Loading ticket details...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "TicketDetail",
    data() {
      return {
        ticket: null,
      };
    },
    created() {
      const ticketId = this.$route.params.id;
      this.fetchTicketDetail(ticketId);
    },
    methods: {
      fetchTicketDetail(ticketId) {
        // 模擬 API 請求，替換成實際 API
        const mockData = [
          {
            id: 1,
            name: "音樂會",
            date: "2024-12-10",
            price: 500,
            description: "頂級樂隊表演，一場不容錯過的音樂盛宴！",
            image_path: "/images/concert.jpg",
          },
          {
            id: 2,
            name: "技術講座",
            date: "2024-12-12",
            price: 200,
            description: "了解最新的技術趨勢，分享開發經驗！",
            image_path: "/images/tech-talk.jpg",
          },
        ];
        this.ticket = mockData.find((t) => t.id == ticketId);
      },
    },
  };
  </script>
  
  <style scoped>

  </style>
  