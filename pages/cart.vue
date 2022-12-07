<script setup>
import { useCartStore } from '~~/stores/cart-store';
const cartStore = useCartStore()

</script>

<template>
  <div>
    <h2 class='text-white text-2xl text-center my-8'>Your Cart</h2>

    <div v-if='cartStore.cart.length' class='card text-xl'>
      <!-- Product List -->
      <div v-for='product in cartStore.cart' class='flex gap-8 items-center'>
        <img :src="product.img" :alt="product.title">
        <p class='text-white'>{{ product.title }}</p>

        <!-- Product Quantity -->
        <ProductQuantity :product='product' />
        <p class='text-white'>${{ product.price * product.quantity }}</p>

        <!-- Delete Product from Cart -->
        <button class='ml-auto' @click='cartStore.deleteFromCart(product)'>
          <span class='material-icons-outlined text-white'>delete</span>
        </button>
      </div>

      <!-- Cart Total -->
      <div class="text-right pt-4 mt-4 border-t-2">
        <span class='text-white'>Total:&nbsp;</span>
        <span class='text-secondary'>${{ cartStore.cartTotal }}</span>
      </div>
    </div>

    <div v-else>
      <p class="text-white text-center">There are no products in your cart</p>
    </div>

  </div>
</template>


<style scoped>

</style>