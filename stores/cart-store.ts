import { defineStore } from 'pinia'
import { Product } from '@/types/index'

export type RootState = {
	cart: Product[]
}

export const useCartStore = defineStore('cart', {
	state: () => ({
		cart: []
	} as RootState),
	getters: {
		cartTotal(): number {
			return this.cart.reduce((total: number, item: Product) => {
				return total + item.price * item.quantity
			}, 0)
		},
		cartQuantity(): number {
			return this.cart.reduce((total, item) => {
				return total + item.quantity
			}, 0)
		}
	},
	actions: {
		// called in default layout
		async getCart() {
			const data: Product[] = await $fetch('http://localhost:4000/cart')
			this.cart = data
		},
		async deleteFromCart(product: Product) {
			// update app state
			this.cart = this.cart.filter(p => p.id !== product.id)

			// delete record from db
			await $fetch('http://localhost:4000/cart/' + product.id, {
				method: 'DELETE'
			})
		},
		async increaseItem(product: Product) {
			// update state
			let updatedProduct: Product | undefined  
			this.cart = this.cart.map(p => {
				if (p.id === product.id) {
					p.quantity += 1
					updatedProduct = p
				}
				return p
			})
			// update cart in db
			await $fetch('http://localhost:4000/cart/' + product.id, {
				method: 'PUT',
				body:	JSON.stringify(updatedProduct)
			})
		},
		async decreaseItem(product: Product) {
			// update state
			let updatedProduct: Product | undefined  
			this.cart = this.cart.map(p => {
				if (p.id === product.id && p.quantity > 1) {
					p.quantity--
					updatedProduct = p
				}
				return p
			})
			// update cart in db
			if (updatedProduct) {
				await $fetch('http://localhost:4000/cart/' + product.id, {
					method: 'PUT',
					body:	JSON.stringify(updatedProduct)
				})
			}
		},
		async addToCart(product: Product) {
			// check if product exists in cart
			const existingCartItem = this.cart.find(p => p.id === product.id)
			if (existingCartItem) {
				this.increaseItem(existingCartItem)
			} else {
				product.quantity = 1
				this.cart.push(product)
				await $fetch('http://localhost:4000/cart', {
					method: 'POST',
					body: JSON.stringify(product)
				})
			}

		}
	}
})

