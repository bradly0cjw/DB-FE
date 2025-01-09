<template>
  <div v-if="event !== null" class="ticket-detail-page">
    <div class="event-detail d-flex justify-content-between w-100">
      <div class="w-50">
        <h1>{{ event.event_name }}</h1>
        <p>{{ event.description }}</p>
      </div>
      <!-- 只有 seller 可以看到新增票券的按鈕 -->
      <div v-if="isSeller" class="d-flex align-items-start">
        <button @click="showTicketForm = true" class="btn btn-primary">Add New Ticket</button>
      </div>
    </div>



    <!-- 新增票券的表單 -->
    <div v-if="showTicketForm" class="ticket-form-modal ">
      <div class="ticket-form-container bg-dark">
        <h2>Add New Ticket</h2>
        <form @submit.prevent="saveNewTicket">
          <!-- 名稱 -->
          <div>
            <label>名稱：</label>
            <input v-model="newTicket.ticket_name" type="text" class="form-control" required />
          </div>
          <!-- 價格 -->
          <div>
            <label>價格：</label>
            <input v-model.number="newTicket.price" type="number" class="form-control" required />
          </div>
          <!-- 剩餘 -->
          <div>
            <label>剩餘：</label>
            <input v-model.number="newTicket.quantity" type="number" class="form-control" required />
          </div>
          <!-- 開始時間 -->
          <div>
            <label>開始時間：</label>
            <input v-model="newTicket.ticket_start" type="datetime" class="form-control" required />
          </div>
          <!-- 結束時間 -->
          <div>
            <label>結束時間：</label>
            <input v-model="newTicket.ticket_end" type="datetime" class="form-control" required />
          </div>
          <!-- 描述 -->
          <div>
            <label>描述：</label>
            <textarea v-model="newTicket.description" class="form-control" required></textarea>
          </div>
          <!-- 圖片URL-->
          <div>
            <label>圖片URL:</label>
            <input v-model="newTicket.image_path" type="text" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-success">Save</button>
          <button @click="showTicketForm = false" class="btn btn-secondary">Cancel</button>
        </form>
      </div>
    </div>


    <div v-if="tickets.length === 0">
      <p>No tickets available for this event.</p>
    </div>
    <div v-else class="ticket-list d-flex justify-content-center">
      <div v-for="ticket in tickets" :key="ticket.id" class="ticket-item">
        <img :src="ticket.image_path" alt="Ticket Image" class="ticket-image" />
        <!-- Edit ticket form-->
        <!-- 編輯票券 -->
        <form v-if="editingTicketId === ticket.id" @submit.prevent="saveEdit(ticket)">
          <!-- 名稱 -->
          <div>
            <label>名稱：</label>
            <input v-model="editingFields.ticket_name" type="text" class="form-control" required />
          </div>
          <!-- 價格 -->
          <div>
            <label>價格：</label>
            <input v-model.number="editingFields.price" type="number" class="form-control" required />
          </div>
          <!-- 剩餘 -->
          <div>
            <label>剩餘：</label>
            <input v-model.number="editingFields.quantity" type="number" class="form-control" required />
          </div>
          <!-- 開始時間 -->
          <div>
            <label>開始時間：</label>
            <input v-model="editingFields.ticket_start" type="datetime-local" class="form-control" required />
          </div>
          <!-- 結束時間 -->
          <div>
            <label>結束時間：</label>
            <input v-model="editingFields.ticket_end" type="datetime-local" class="form-control" required />
          </div>
          <!-- 描述 -->
          <div>
            <label>描述：</label>
            <textarea v-model="editingFields.description" class="form-control" required></textarea>
          </div>
          <!-- img path -->
          <div>
            <label>圖片URL:</label>
            <input v-model="editingFields.image_path" type="text" class="form-control" required />
          </div>

          <!-- 保存和取消按鈕 -->
          <button type="submit">Save</button>
          <button @click="cancelEdit">Cancel</button>
        </form>

        <!-- 顯示票券資訊 -->
        <div v-else>
          <div>
            <p><strong>名稱：</strong>{{ ticket.ticket_name }}</p>
            <p><strong>價格：</strong>${{ ticket.price }}</p>
            <p><strong>剩餘：</strong>{{ ticket.quantity }}</p>
            <p><strong>開始時間：</strong>{{ ticket.ticket_start }}</p>
            <p><strong>結束時間：</strong>{{ ticket.ticket_end }}</p>
            <p><strong>描述：</strong>{{ ticket.description }}</p>

            <!-- flexbox -->
            <div class="d-flex justify-content-between">
              <button @click="addToCart(ticket.id)" class="btn btn-primary">Add to Cart</button>
              <button v-if="isSeller && editingTicketId !== ticket.id" @click="startEdit(ticket)"
                class="btn btn-warning">Edit</button>
              <button v-if="isSeller && editingTicketId !== ticket.id" @click="deleteticket(ticket)"
                class="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import userState from "@/data/user.js";

export default {
  data() {
    return {
      event: {},
      tickets: [],
      showTicketForm: false,
      editingTicketId: null,
      editingFields: {
        ticket_name: '',
        description: '',
        price: 0,
        quantity: 0,
        total: 0,
        ticket_start: new Date().toISOString().slice(0, 16),
        ticket_end: new Date().toISOString().slice(0, 16),
        image_path: '',

      },
      newTicket: {
        ticket_name: '',
        description: '',
        price: 0,
        quantity: 0,
        total: 0,
        ticket_start: new Date().toISOString().slice(0, 16),
        ticket_end: new Date().toISOString().slice(0, 16),
        image_path: '',
      },
    };
  },
  computed: {
    isSeller() {
      return userState.isSeller;
    }
  },
  async created() {
    const eventId = this.$route.params.id;
    await this.fetchEventDetails(eventId);
    await this.fetchTickets(eventId);
    console.log(this.tickets);
  },
  methods: {
    async fetchEventDetails(eventId) {
      try {
        const apiUrl = process.env.VUE_APP_API_URL;
        const response = await axios.get(`${apiUrl}/event/${eventId}`);
        this.event = response.data;
      } catch (error) {
        console.error('Failed to fetch event details:', error.message);
      }
    },
    async fetchTickets(eventId) {
      try {
        const apiUrl = process.env.VUE_APP_API_URL;
        const response = await axios.get(`${apiUrl}/events/${eventId}/tickets`);
        // format time
        response.data.forEach(ticket => {
          ticket.ticket_start = new Date(ticket.ticket_start).toISOString().replace('T', ' ').slice(0, 16);
          ticket.ticket_end = new Date(ticket.ticket_end).toISOString().replace('T', ' ').slice(0, 16);
        });
        this.tickets = response.data;
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
      this.editingFields = {
        ...ticket,
        ticket_start: ticket.ticket_start,
        ticket_end: ticket.ticket_end,
      };
    },
    async saveEdit(ticket) {
      try {
        const apiUrl = process.env.VUE_APP_API_URL;
        await axios.put(`${apiUrl}/tickets/${ticket.id}`, this.editingFields);
        Object.assign(ticket, this.editingFields);
        this.editingTicketId = null;
        alert('Ticket updated successfully!');

        // // 改成本地操作
        // Object.assign(ticket, this.editingFields);
        // this.editingTicketId = null;
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
        const apiUrl = process.env.VUE_APP_API_URL;
        this.newTicket.event_id = this.event.id;
        console.log(this.newTicket);
        const response = await axios.post(`${apiUrl}/tickets`, this.newTicket);
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
    async deleteticket(ticket) {
      try {
        const apiUrl = process.env.VUE_APP_API_URL;
        await axios.delete(`${apiUrl}/tickets/${ticket.id}`);
        this.tickets = this.tickets.filter(t => t.id !== ticket.id);
        alert('Ticket deleted successfully!');

        // // 改成本地操作
        // this.tickets = this.tickets.filter(t => t.id !== ticket.id);
        // alert('Ticket deleted successfully!');
      } catch (error) {
        console.error('Failed to delete ticket:', error);
        alert('Failed to delete ticket. Please try again later.');
      }
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
  background-color: #fff;
  z-index: 1000;
  position: relative;
}

.ticket-form-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
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
}

button:hover {
  background-color: #0056b3;
}
</style>