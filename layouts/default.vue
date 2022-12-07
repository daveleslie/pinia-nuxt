<script setup lang="ts">
import { useCartStore } from '~~/stores/cart-store'

const { signOut } = useSession()

const logout = async () => {
	await signOut()
}

const cartStore = useCartStore()

cartStore.getCart()
</script>

<template>
	<div class="m-8">
		<header class="wrapper flex justify-between">
			<NuxtLink to="/"
				><h1 class="text-secondary text-5xl">Aether Candles</h1></NuxtLink
			>
			<NuxtLink to="/cart">
				<span class="material-icons-outlined text-secondary text-5xl"
					>shopping_bag</span
				>
				<client-only
					><span class="bg-white rounded-full pt-0 pb-1 px-2 font-bold badge">{{
						cartStore.cartQuantity
					}}</span></client-only
				>
			</NuxtLink>
			<button @click='logout()'><span class="material-icons-outlined text-secondary text-5xl">logout</span></button>
		</header>

		<div class="wrapper">
			<slot></slot>
		</div>
	</div>
</template>

<style scoped>
.badge {
	position: relative;
	left: -15px;
}
</style>
