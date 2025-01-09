<template>
  <div id="app">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Ticket Order System</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link" aria-current="page">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/event" class="nav-link">Event</router-link>
            </li>
            <li class="nav-item d-flex align-items-center">
              <a class="nav-link" href="#" @click="toggleSearchInput">Search</a>
              <div v-if="showSearch" class="search-input">
                <input type="text" v-model="searchQuery" placeholder="Search events..." />
                <button @click="searchEvents">Go</button>
              </div>
            </li>
            <!-- Conditional Buttons for Seller and Admin -->
            <li v-if="userState.isSeller" class="nav-item">
              <router-link to="/seller/dashboard" class="nav-link">Dashboard</router-link>
            </li>
            <li v-if="userState.isAdmin" class="nav-item">
              <router-link to="/admin" class="nav-link">Admin</router-link>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDarkDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                User
              </a>
              <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end">
                <li v-if="!userState.isLoggedIn">
                  <router-link to="/login" class="dropdown-item">Log In</router-link>
                </li>
                <li v-else>
                  <router-link to="/information" class="dropdown-item">Information</router-link>
                </li>
                <li>
                  <router-link
                    :to="userState.isLoggedIn ? '/cart' : '/login'"
                    class="dropdown-item"
                  >
                    Cart
                  </router-link>
                </li>
                <li v-if="userState.isLoggedIn">
                  <router-link to="/orders" class="dropdown-item">Order</router-link>
                </li>
                <li v-if="userState.isLoggedIn">
                  <a class="dropdown-item" href="#" @click="logout">Log Out</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Router View -->
    <router-view />
  </div>
</template>

<script>
import userState from "@/data/user.js"; // 引入全局的 userState

export default {
  name: "App",
  setup() {
    return { userState }; // 通過 provide 將 userState 傳遞給子組件
  },
  methods: {
    logout() {
      userState.logout();
      this.$router.push("/");
      alert("You have logged out.");
    },
    toggleSearchInput() {
      this.showSearch = !this.showSearch;
    },
    searchEvents() {
      if (this.searchQuery) {
        this.$router.push({ path: "/search", query: { q: this.searchQuery } });
      }
    },
  },
  data() {
    return {
      showSearch: false,
      searchQuery: "",
    };
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.search-input {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.search-input input {
  padding: 5px;
  font-size: 14px;
  margin-right: 10px;
}

.search-input button {
  padding: 5px 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

.search-input button:hover {
  background-color: #0056b3;
}
</style>
