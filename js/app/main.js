const app = Vue.createApp({
	data() {
		return {
			cart: [],
			services: [
				{
					id: 1,
					name: 'Mecánico Industrial',
					description: '',
					price: 3250
				},{
					id: 2,
					name: 'Tec. Aire Acondicionado',
					description: '',
					price: 3250
				},{
					id: 3,
					name: 'Ayudante General',
					description: '',
					price: 2340
				},{
					id: 4,
					name: 'Supervisor Corporativo',
					description: '',
					price: 4160
				},{
					id: 5,
					name: 'Supervisor Industrial',
					description: '',
					price: 5460
				},{
					id: 6,
					name: 'Fontanero (plomero)',
					description: '',
					price: 3250
				},{
					id: 7,
					name: 'Herrero',
					description: '',
					price: 3250
				},{
					id: 8,
					name: 'Diseñador Solid Works',
					description: 'por diseño es otro costo',
					price: 4550
				},{
					id: 9,
					name: 'Técnico T.I.',
					description: '',
					price: 3770
				},{
					id: 10,
					name: 'Grúa 10 toneladas',
					description: 'por servicio',
					price: 0
				},{
					id: 11,
					name: 'Grúa 7 toneladas',
					description: 'por servicio',
					price: 0
				},{
					id: 12,
					name: 'Operador de fabricación de piezas',
					description: 'en planta con equipo de cliente  (torno, fresa, CNC)',
					price: 5200
				}
			]
		}
	},
	methods: {
		addToCart(id) {
			if(!id) {
				return;
			}
			let selectedItem = this.services.find(item => item.id === id)

			if (selectedItem) {
				let existingItem = this.cart.find(item => item.id === id)

				if (existingItem) {
					existingItem.quantity++;
				} else {
					selectedItem.quantity = 1;
					this.cart.push(selectedItem)
				}
			}
		},
		removeFromCart(selectedIndex) {
			this.cart = this.cart.filter((item,index) => index !== selectedIndex)
		}
	}
})