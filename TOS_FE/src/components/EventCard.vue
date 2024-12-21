<template>
    <div class="card bg-secondary text-white">
      <img :src="product.image" class="card-img-top" :alt="product.name" />
      <div class="card-body">
        <h5 class="card-title">{{ product.name }}</h5>
        <p class="card-text">{{ product.description }}</p>
        <button class="btn btn-primary">Buy Now</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProductCard',
    props: {
      product: Object,
    },
  };
  </script>
  