<template>
  <div class="container mt-5">
    <!-- flex box -->
    <div class="d-flex justify-content-center">
      <h1 class="text-center">Event List</h1>
      <!-- Button to Show Event Form -->
      <div class="d-flex justify-content-center mt-4">
        <button v-if="isSeller" @click="showEventForm = true" class="btn btn-primary">Add New Event</button>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-4" v-for="event in events" :key="event.id">
        <EventCard :event="event" @editEvent="editEvent" @deleteEvent="deleteEvent" :isSeller="isSeller" />
      </div>
    </div>

    <!-- Add/Edit Event Form -->
    <div class="event-form-modal" v-if="showEventForm">
      <div class="event-form-container bg-dark">
        <h2>{{ isEditing ? 'Edit Event' : 'Add New Event' }}</h2>
        <form @submit.prevent="saveEvent">
          <!-- Event Name -->
          <div>
            <label>Event Name:</label>
            <input v-model="newEvent.event_name" type="text" class="form-control" required />
          </div>
          <!-- Event Start Date
          <div>
            <label>Start Date:</label>
            <input v-model="newEvent.event_start" type="datetime-local" class="form-control" required />
          </div>
          Event End Date -->
          <!-- <div>
            <label>End Date:</label>
            <input v-model="newEvent.event_end" type="datetime-local" class="form-control" required />
          </div> -->
          <!-- Description -->
          <div>
            <label>Description:</label>
            <textarea v-model="newEvent.description" class="form-control" required></textarea>
          </div>
          <!-- Image URL -->
          <div>
            <label>Image URL:</label>
            <input v-model="newEvent.image_path" type="text" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-success">{{ isEditing ? 'Update' : 'Save' }}</button>
          <button @click="cancelEvent" class="btn btn-secondary">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import EventCard from '@/components/EventCard.vue';
import userState from "@/data/user.js";

export default {
  name: 'Event',
  components: {
    EventCard,
  },
  data() {
    return {
      events: [],
      query: '', // 可以根據需要設置查詢條件
      showEventForm: false,
      isEditing: false,
      newEvent: {
        event_name: '',
        event_start: new Date().toISOString().slice(0, 10),
        event_end: new Date().toISOString().slice(0, 10),
        description: '',
        image_path: '',
        status: "active",
        seller: 0,
      },
      editingEventId: null,
      userInfo: {},
      updatedUserInfo: {},
    };
  },
  computed: {
    isSeller() {
      return userState.isSeller;
    }
  },
  async created() {
    await this.fetchUserInfo();
    await this.fetchEvents();
  },
  methods: {
    async fetchUserInfo() {
      try {
        const apiUrl = process.env.VUE_APP_API_URL;
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${apiUrl}/user`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.userInfo = response.data;
        this.updatedUserInfo = { ...this.userInfo };
        console.log(this.userInfo);
        // // 改成讀取本地的 test.json 文件
        // this.userInfo = testEvents[0].tickets[0];
        // this.updatedUserInfo = { ...this.userInfo };
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    },
    async fetchEvents() {
      try {
        const apiUrl = process.env.VUE_APP_API_URL;
        const response = await axios.get(`${apiUrl}/events/search?q=${this.query}`);
        this.events = response.data;
        console.log(this.events);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    },
    async saveEvent() {
      try {
        const apiUrl = process.env.VUE_APP_API_URL;
        if (this.isEditing) {
          console.log(this.newEvent);
          // convert datetime to date
          this.newEvent.event_start = new Date(this.newEvent.event_start).toISOString().slice(0, 10);
          this.newEvent.event_end = new Date(this.newEvent.event_end).toISOString().slice(0, 10);
          
          await axios.put(`${apiUrl}/events/${this.editingEventId}`, this.newEvent);
          // const index = this.events.findIndex(event => event.id === this.editingEventId);
          Object.assign(this.events, this.editingFields);
          this.editingTicketId = null;
        } else {
          // convert datetime to date
          console.log(this.newEvent);
          this.newEvent.seller= this.userInfo.id;
          this.newEvent.status = "active";
          this.newEvent.event_start = new Date(this.newEvent.event_start).toISOString().slice(0, 10);
          this.newEvent.event_end = new Date(this.newEvent.event_end).toISOString().slice(0, 10);
          const response = await axios.post(`${apiUrl}/events`, this.newEvent);
          this.events.push(response.data);
        }
        this.resetForm();
        alert(this.isEditing ? 'Event updated successfully!' : 'New event added successfully!');
      } catch (error) {
        console.error('Failed to save event:', error);
        alert('Failed to save event. Please try again later.');
      }
    },
    editEvent(event) {
      this.newEvent = { ...event };
      this.editingEventId = event.id;
      this.isEditing = true;
      this.showEventForm = true;
    },
    async deleteEvent(eventId) {
      try {
        const apiUrl = process.env.VUE_APP_API_URL;
        await axios.delete(`${apiUrl}/events/${eventId}`);
        this.events = this.events.filter(event => event.id !== eventId);
        alert('Event deleted successfully!');
      } catch (error) {
        console.error('Failed to delete event:', error);
        alert('Failed to delete event. Please try again later.');
      }
    },
    cancelEvent() {
      this.resetForm();
    },
    resetForm() {
      this.newEvent = {
        event_name: '',
        event_start: '',
        event_end: '',
        description: '',
        image_path: '',
      };
      this.editingEventId = null;
      this.isEditing = false;
      this.showEventForm = false;
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

.event-form-container {
  padding: 20px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  z-index: 1000;
  position: relative;
}

.event-form-modal {
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

.event-form-container form {
  display: flex;
  flex-direction: column;
}

.event-form-container label {
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