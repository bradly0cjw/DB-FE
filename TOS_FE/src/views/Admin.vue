<template>
    <div class="container mt-5">
      <h1 class="text-center mb-4">Admin Page</h1>
      
      <!-- 顯示加載中的提示 -->
      <div v-if="loadingUsers || loadingSellers">
        <p class="text-center">Loading data...</p>
      </div>
  
      <!-- 資料加載完成後顯示用戶和賣家表格 -->
      <div v-else>
        <div class="mb-5">
          <h2>Users</h2>
          <table class="table table-bordered table-hover ">
            <thead class="table-dark table-bordered border-white">
              <tr>
                <th>ID</th>
                <th>Created At</th>
                <th>Username</th>
                <th>Email</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td class="highlighted-column">{{ user.id }}</td>
                <td class="highlighted-column">{{ user.created_at }}</td>
                <td><input class="form-control" v-model="user.username" /></td>
                <td><input class="form-control" v-model="user.email" /></td>
                <td><input class="form-control" v-model="user.password" type="password" /></td>
                <td>
                  <button class="btn btn-primary btn-sm" @click="updateUser(user)">Update</button>
                  <button class="btn btn-danger btn-sm" @click="deleteUser(user.id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div>
          <h2>Sellers</h2>
          <table class="table table-bordered table-hover">
            <thead class="table-dark table-bordered border-white">
              <tr>
                <th>ID</th>
                <th>Created At</th>
                <th>Username</th>
                <th>Email</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="seller in sellers" :key="seller.id">
                <td class="highlighted-column">{{ seller.id }}</td>
                <td class="highlighted-column">{{ seller.created_at }}</td>
                <td><input class="form-control" v-model="seller.username" /></td>
                <td><input class="form-control" v-model="seller.email" /></td>
                <td><input class="form-control" v-model="seller.password" type="password" /></td>
                <td>
                  <button class="btn btn-primary btn-sm" @click="updateSeller(seller)">Update</button>
                  <button class="btn btn-danger btn-sm" @click="deleteSeller(seller.id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';
import testEvents from '@/data/test.json'; // 引入本地的 test.json 文件

export default {
  data() {
    return {
      users: [],
      sellers: [],
      loadingUsers: true,
      loadingSellers: true,
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const apiUrl = process.env.VUE_APP_API_URL;
        const response = await axios.get(`${apiUrl}/users/users`); // 替換為你的 API 路徑
        this.users = Array.isArray(response.data) ? response.data : [];

        // 改成讀取本地的 test.json 文件
        // this.users = testEvents.flatMap(event => event.tickets);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        alert('Failed to fetch users');
        this.users = [];
      } finally {
        this.loadingUsers = false;
      }
    },
    async fetchSellers() {
      try {
        const apiUrl = process.env.VUE_APP_API_URL;
        const response = await axios.get(`${apiUrl}/users/sellers`); // 替換為你的 API 路徑
        this.sellers = Array.isArray(response.data) ? response.data : [];

        // 改成讀取本地的 test.json 文件
        // this.sellers = testEvents.flatMap(event => event.tickets);
      } catch (error) {
        console.error('Failed to fetch sellers:', error);
        alert('Failed to fetch sellers');
        this.sellers = [];
      } finally {
        this.loadingSellers = false;
      }
    },
    updateUser(user) {
      const apiUrl = process.env.VUE_APP_API_URL;
      const originalUser = this.originalUsers.find(u => u.id === user.id);
      const updatedFields = {};

      // 只發送更改的部分
      for (const key in user) {
        if (user[key] !== originalUser[key]) {
          updatedFields[key] = user[key];
        }
      }

      axios.put(`${apiUrl}/users/${user.id}`, updatedFields)
        .then(response => {
          console.log("User updated successfully:", response.data);
          alert("User updated successfully");
        })
        .catch(error => {
          console.error("There was an error updating the user:", error);
          alert("There was an error updating the user");
        });

      // 改成本地操作
      // console.log("User updated successfully:", user);
    },
    deleteUser(userId) {
      const apiUrl = process.env.VUE_APP_API_URL;
      axios.delete(`${apiUrl}/users/${userId}`)
        .then(response => {
          this.users = this.users.filter(user => user.id !== userId);
          console.log("User deleted successfully:", response.data);
          alert("User deleted successfully");
        })
        .catch(error => {
          console.error("There was an error deleting the user:", error);
          alert("There was an error deleting the user");
        });

      // // 改成本地操作
      // this.users = this.users.filter(user => user.id !== userId);
      // console.log("User deleted successfully:", userId);
    },
    updateSeller(seller) {
      const apiUrl = process.env.VUE_APP_API_URL;
      const originalSeller = this.originalSellers.find(s => s.id === seller.id);
      const updatedFields = {};

      // 只發送更改的部分
      for (const key in seller) {
        if (seller[key] !== originalSeller[key]) {
          updatedFields[key] = seller[key];
        }
      }

      axios.put(`${apiUrl}/users/${seller.id}`, updatedFields)
        .then(response => {
          console.log("Seller updated successfully:", response.data);
          alert("Seller updated successfully");
        })
        .catch(error => {
          console.error("There was an error updating the seller:", error);
          alert("There was an error updating the seller");
        });

      // 改成本地操作
      // console.log("Seller updated successfully:", seller);
    },
    deleteSeller(sellerId) {
      const apiUrl = process.env.VUE_APP_API_URL;
      axios.delete(`${apiUrl}/users/${sellerId}`)
        .then(response => {
          this.sellers = this.sellers.filter(seller => seller.id !== sellerId);
          console.log("Seller deleted successfully:", response.data);
          alert("Seller deleted successfully:", response.data);
        })
        .catch(error => {
          console.error("There was an error deleting the seller:", error);
          alert("There was an error deleting the seller");
        });

      // 改成本地操作
      /*
      this.sellers = this.sellers.filter(seller => seller.id !== sellerId);
      console.log("Seller deleted successfully:", sellerId);
      */
    },
  },
  created() {
    this.fetchUsers();
    this.fetchSellers();
  },
};
</script>
  
  <style scoped>
  h1 {
    font-size: 5rem;
    font-weight: bold;
  }
  
  h2 {
    font-size: 3rem;
    margin-bottom: 20px;
  }
  
  table {
    width: 100%;
  }

  table tr:hover {
  background-color: #757272; /* Change this color to your desired hover color */
}

  .btn-sm {
    margin-right: 5px;
  }
  
  .highlighted-column {
    color: #FFFFFF;
    font-weight: bold;
    text-align: center;
  }


  </style>
  