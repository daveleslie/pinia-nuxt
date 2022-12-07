<script setup lang="ts">
import { useCartStore } from '~~/stores/cart-store';
const { product } = defineProps(['product'])
const cartStore = useCartStore()

const isPending = ref(false)

const addToCart = async () => {
  isPending.value = true
  await cartStore.addToCart(product)
  console.log(Date.now())
  setTimeout(() => {
    isPending.value = false
    navigateTo('/cart')
  }, 2000)
}
</script>

<template>
  <div class='card flex items-center gap-8'>
    <img :src="product.img" :alt="product.title">
    <div>
      <p class="text-2xl text-secondary">{{ product.title }}</p>
      <p class="text-2xl text-gray-50">{{ product.description }}</p>
      <p class="text-lg text-secondary my-3">R{{ product.price }}</p>
      <button class='btn' @click='addToCart()' :disabled='isPending'>
        <span v-show='!isPending'>Add to Cart</span>
        <span v-show='isPending'>Adding...</span>
      </button>
    </div>

  </div>
</template>


<style scoped>

</style>