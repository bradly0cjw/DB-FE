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
          <table class="table table-bordered table-hover">
            <thead class="table-dark">
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
            <thead class="table-dark">
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
        // const response = await axios.get('/api/users'); // 替換為你的 API 路徑
        // this.users = Array.isArray(response.data) ? response.data : [];

        // 改成讀取本地的 test.json 文件
        this.users = testEvents.flatMap(event => event.tickets);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        this.users = [];
      } finally {
        this.loadingUsers = false;
      }
    },
    async fetchSellers() {
      try {
        // const response = await axios.get('/api/sellers'); // 替換為你的 API 路徑
        // this.sellers = Array.isArray(response.data) ? response.data : [];

        // 改成讀取本地的 test.json 文件
        this.sellers = testEvents.flatMap(event => event.tickets);
      } catch (error) {
        console.error('Failed to fetch sellers:', error);
        this.sellers = [];
      } finally {
        this.loadingSellers = false;
      }
    },
    updateUser(user) {
      // axios.put(`/api/users/${user.id}`, user)
      //   .then(response => {
      //     console.log("User updated successfully:", response.data);
      //   })
      //   .catch(error => {
      //     console.error("There was an error updating the user:", error);
      //   });

      // 改成本地操作
      console.log("User updated successfully:", user);
    },
    deleteUser(userId) {
      // axios.delete(`/api/users/${userId}`)
      //   .then(response => {
      //     this.users = this.users.filter(user => user.id !== userId);
      //     console.log("User deleted successfully:", response.data);
      //   })
      //   .catch(error => {
      //     console.error("There was an error deleting the user:", error);
      //   });

      // 改成本地操作
      this.users = this.users.filter(user => user.id !== userId);
      console.log("User deleted successfully:", userId);
    },
    updateSeller(seller) {
      // axios.put(`/api/sellers/${seller.id}`, seller)
      //   .then(response => {
      //     console.log("Seller updated successfully:", response.data);
      //   })
      //   .catch(error => {
      //     console.error("There was an error updating the seller:", error);
      //   });

      // 改成本地操作
      console.log("Seller updated successfully:", seller);
    },
    deleteSeller(sellerId) {
      // axios.delete(`/api/sellers/${sellerId}`)
      //   .then(response => {
      //     this.sellers = this.sellers.filter(seller => seller.id !== sellerId);
      //     console.log("Seller deleted successfully:", response.data);
      //   })
      //   .catch(error => {
      //     console.error("There was an error deleting the seller:", error);
      //   });

      // 改成本地操作
      this.sellers = this.sellers.filter(seller => seller.id !== sellerId);
      console.log("Seller deleted successfully:", sellerId);
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
  
  .btn-sm {
    margin-right: 5px;
  }
  
  .highlighted-column {
    color: #FFFFFF;
    font-weight: bold;
    text-align: center;
  }
  </style>
  