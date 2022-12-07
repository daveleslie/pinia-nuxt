<script setup lang="ts">
import { useCartStore } from '~~/stores/cart-store'
defineProps(['product'])

const cartStore = useCartStore()

</script>


<template>
	<div class='flex'>
    <button class='btn' @click='cartStore.decreaseItem(product)'> -  </button>
    <p class="py-1 px-4 mx-1 rounded-sm text-large bg-gray-200">
      {{ product.quantity }}
    </p>  
    <button class='btn' @click='cartStore.increaseItem(product)'> + </button>
  </div>
</template>


<style scoped></style>
