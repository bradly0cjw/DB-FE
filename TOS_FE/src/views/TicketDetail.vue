<template>
  <div v-if="event !== null" class="ticket-detail-page">
    <div class="event-detail d-flex flex-column align-items-center w-100">
      <div class="w-50">
        <h1>{{ event.name }}</h1>
        <p>{{ event.description }}</p>
      </div>
    </div>

    <!-- 只有 seller 可以看到新增票券的區域 -->
    <div v-if="isSeller" class="ticket-form-container">
      <h2>Add New Ticket</h2>
      <form @submit.prevent="saveNewTicket">
        <!-- 名稱 -->
        <div>
          <label>名稱：</label>
          <input v-model="newTicket.name" type="text" class="form-control" required />
        </div>
        <!-- 價格 -->
        <div>
          <label>價格：</label>
          <input v-model.number="newTicket.price" type="number" class="form-control" required />
        </div>
        <!-- 剩餘 -->
        <div>
          <label>剩餘：</label>
          <input v-model.number="newTicket.available" type="number" class="form-control" required />
        </div>
        <!-- 總量 -->
        <div>
          <label>總量：</label>
          <input v-model.number="newTicket.total" type="number" class="form-control" required />
        </div>
        <!-- 描述 -->
        <div>
          <label>描述：</label>
          <textarea v-model="newTicket.description" class="form-control" required></textarea>
        </div>
        <button type="submit">Save</button>
        <button @click="cancelNewTicket">Cancel</button>
      </form>
    </div>

    <div v-if="tickets.length === 0">
      <p>No tickets available for this event.</p>
    </div>
    <div v-else class="ticket-list d-flex justify-content-center">
      <div v-for="ticket in tickets" :key="ticket.id" class="ticket-item">
        <img :src="ticket.imageUrl" alt="Ticket Image" class="ticket-image" />

        <!-- 編輯票券 -->
        <form v-if="editingTicketId === ticket.id" @submit.prevent="saveEdit(ticket)">
          <!-- 名稱 -->
          <div>
            <label>名稱：</label>
            <input v-model="editingFields.name" type="text" class="form-control" required />
          </div>
          <!-- 價格 -->
          <div>
            <label>價格：</label>
            <input v-model.number="editingFields.price" type="number" class="form-control" required />
          </div>
          <!-- 剩餘 -->
          <div>
            <label>剩餘：</label>
            <input v-model.number="editingFields.available" type="number" class="form-control" required />
          </div>
          <!-- 總量 -->
          <div>
            <label>總量：</label>
            <input v-model.number="editingFields.total" type="number" class="form-control" required />
          </div>
          <!-- 描述 -->
          <div>
            <label>描述：</label>
            <textarea v-model="editingFields.description" class="form-control" required></textarea>
          </div>

          <!-- 保存和取消按鈕 -->
          <button type="submit">Save</button>
          <button @click="cancelEdit">Cancel</button>
        </form>

        <!-- 顯示票券資訊 -->
        <div v-else>
          <p><strong>名稱：</strong>{{ ticket.name }}</p>
          <p><strong>價格：</strong>${{ ticket.price }}</p>
          <p><strong>剩餘：</strong>{{ ticket.available }}</p>
          <p><strong>總量：</strong>{{ ticket.total }}</p>
          <p><strong>描述：</strong>{{ ticket.description }}</p>
          <button @click="addToCart(ticket.id)">Add to Cart</button>
          <button v-if="isSeller && editingTicketId !== ticket.id" @click="startEdit(ticket)">
            Edit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import userState from "@/data/user.js";
import testEvents from "@/data/test.json"; // 引入本地的 test.json 文件

export default {
  data() {
    return {
      event: {},
      tickets: [],
      editingTicketId: null,
      editingFields: {
        name: '',
        description: '',
        price: 0,
        available: 0,
        total: 0,
      },
      newTicket: {
        name: '',
        description: '',
        price: 0,
        available: 0,
        total: 0,
      },
    };
  },
  computed: {
    isSeller() {
      return userState.isSeller;
    }
  },
  methods: {
    async fetchEventDetails(eventId) {
      try {
        // this.event = await axios.get(`/events/${eventId}`);

        // 改成讀取本地的 test.json 文件
        this.event = testEvents.find(event => event.id === eventId);
      } catch (error) {
        console.error('Failed to fetch event details:', error.message);
      }
    },
    async fetchTickets(eventId) {
      try {
        // const response = await axios.get(`/events/${eventId}/tickets`);
        // this.tickets = response.data;

        // 改成讀取本地的 test.json 文件
        this.tickets = testEvents.find(event => event.id === eventId).tickets;
      } catch (error) {
        console.error('Failed to fetch tickets:', error);
      }
    },
    async addToCart(ticketId) {
      try {
        // await axios.post('/api/cart', { ticketId });
        // alert('Ticket added to cart!');

        // 改成本地操作
        alert('Ticket added to cart!');
      } catch (error) {
        console.error('Failed to add ticket to cart:', error);
        alert('Failed to add ticket to cart. Please try again later.');
      }
    },
    startEdit(ticket) {
      this.editingTicketId = ticket.id;
      this.editingFields = { ...ticket };
    },
    async saveEdit(ticket) {
      try {
        // await axios.put(`/tickets/${ticket.id}`, this.editingFields);
        // Object.assign(ticket, this.editingFields);
        // this.editingTicketId = null;
        // alert('Ticket updated successfully!');

        // 改成本地操作
        Object.assign(ticket, this.editingFields);
        this.editingTicketId = null;
        alert('Ticket updated successfully!');
      } catch (error) {
        console.error('Failed to update ticket:', error);
        alert('Failed to save changes. Please try again later.');
      }
    },
    cancelEdit() {
      this.editingTicketId = null;
      this.editingFields = {};
    },
    async saveNewTicket() {
      try {
        const response = await axios.post('/tickets', this.newTicket);
        this.tickets.push(response.data);
        this.newTicket = {};
        alert('New ticket added successfully!');

        // 改成本地操作
        /*
        this.tickets.push({ ...this.newTicket, id: Date.now() });
        this.newTicket = {};
        alert('New ticket added successfully!');
        */

      } catch (error) {
        console.error('Failed to add new ticket:', error);
        alert('Failed to add new ticket. Please try again later.');
      }
    },
    cancelNewTicket() {
      this.newTicket = {};
    },
  },
};
</script>

<style scoped>
.ticket-detail-page {
  padding: 20px;
}

.ticket-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.ticket-item {
  border: 1px solid #ccc;
  padding: 20px;
  width: 500px;
  text-align: left;
}

.ticket-image {
  width: 100%;
  height: auto;
  margin-bottom: 15px;
  border-radius: 8px;
}

.ticket-form-container {
  padding: 20px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
}

.ticket-form-container form {
  display: flex;
  flex-direction: column;
}

.ticket-form-container label {
  font-weight: bold;
  margin-top: 10px;
}

.form-control {
  margin-top: 5px;
  margin-bottom: 15px;
  width: 100%;
  padding: 8px;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #0056b3;
}
</style>