<template>
  <div id="app">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Ticket Order System</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
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
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                User
              </a>
              <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end">
                <li v-if="!isLoggedIn">
                  <router-link to="/login" class="dropdown-item">Log In</router-link>
                </li>
                <li v-else>
                  <router-link to="/information" class="dropdown-item">Information</router-link>
                </li>
                <li>
                  <router-link :to="isLoggedIn ? '/cart' : '/login'" class="dropdown-item">
                    Cart
                  </router-link>
                </li>
                <li v-if="isLoggedIn">
                  <router-link to="/orders" class="dropdown-item">Order</router-link>
                </li>
                <li v-if="isLoggedIn">
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
export default {
  name: "App",
  data() {
    return {
      isLoggedIn: false, // 登入狀態，初始為未登入
      showSearch: false, // 控制搜索框的顯示
      searchQuery: '',   // 搜索框中的文本
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("authToken");
      this.isLoggedIn = false;
      alert("You have logged out.");
      this.$router.push("/");
    },
    toggleSearchInput() {
      // 切換搜索框顯示
      this.showSearch = !this.showSearch;
    },
    searchEvents() {
      // 觸發搜索事件，並導航到搜索結果頁面
      if (this.searchQuery) {
        this.$router.push({ path: '/search', query: { q: this.searchQuery } });
      }
    }
  },
  mounted() {
    // 模擬從後端獲取登入狀態
    const userToken = localStorage?.getItem("authToken");
    if (userToken) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
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