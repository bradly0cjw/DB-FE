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
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/" class="nav-link" aria-current="page">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/event" class="nav-link">Event</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Search</a>
            </li>
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
              <ul class="dropdown-menu dropdown-menu-dark">
                <li v-if="!isLoggedIn">
                  <router-link to="/login" class="dropdown-item">Log In</router-link>
                </li>
                <li v-else>
                  <router-link to="/information" class="dropdown-item">Information</router-link>
                </li>
                <li>
                  <router-link
                    :to="isLoggedIn ? '/cart' : '/login'"
                    class="dropdown-item"
                  >
                    Cart
                  </router-link>
                </li>
                <li v-if="isLoggedIn">
                  <router-link to="/order" class="dropdown-item">Order</router-link>
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
    };
  },
  methods: {
    logout() {
      // 模擬登出邏輯
      this.isLoggedIn = false;
      alert("You have logged out.");
      this.$router.push("/");
    },
  },
  mounted() {
    // 模擬從後端獲取登入狀態
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      this.isLoggedIn = true;
    }
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>
