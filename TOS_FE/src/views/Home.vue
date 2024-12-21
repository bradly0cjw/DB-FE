<template>
  <div class="container mt-5">
    <h1 class="text-center">Hottest Events!!!</h1>
    <div class="row mt-4">
      <div
        class="col-md-4"
        v-for="product in products"
        :key="product.id"
      >
        <EventCard :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import products from "@/data/test.json";
import EventCard from "@/components/EventCard.vue";

export default {
  name: "Home",
  components: {
    EventCard,
  },
  data() {
    return {
      products,
    };
  },
};
</script>

<style scoped>
.container {
  padding-top: 20px;
}
</style>
