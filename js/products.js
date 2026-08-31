const productsByCategory = {
	fertilizantes: [
		{ name: 'ACT Algas', image: 'act-algas-1.jpg' },
		{ name: 'All Min 3.0', image: 'all-min-1.jpg' },
		{ name: 'Bombstim', image: 'bombstim-1.jpg' },
		{ name: 'Fulvicare Gold', image: 'fulvicare-1.jpg' },        
		{ name: 'Alliado', image: 'alliado-1.jpg' },
		{ name: 'Vitta Care Cobre', image: 'cobre-1.jpg' },
		{ name: 'Vitta Drip', image: 'drip-1.jpg' },
		{ name: 'Vitta Spray', image: 'spray-1.jpg' },
		{ name: 'Taxi', image: 'taxi-1.jpg' },
		{ name: 'Vitta Care Magnésio', image: 'magnesio-1.jpg' },
		{ name: 'Plant Humus', image: 'plant-1.jpg' },
		{ name: 'Vitta Power', image: 'power-1.jpg' },
		{ name: 'Vittariza', image: 'vattariza.png' },
		{ name: 'Doble ACT', image: 'doble-1.jpg' }
	],
	adubos: [
		{ name: 'Dynamus CA+Mag 25kg', description: '19,5% Ca + 5,46% Mg + 5,39% S + Mat. Orgânica', image: 'ca-mag-ferticel.png' },
		{ name: 'Yara KCL 50kg', description: '0-0-60', image: 'kcl-yara.jpg' },
		{ name: 'Krista K 25kg', description:'13-00-43', image: 'kirsta-k.jpg' },
		{ name: 'Nit-S 25kg', description:'21% N + 24% S', image: 'nit-s-25.jpg' },
		{ name: 'Nit-SK 25kg', description:'15-00-15 + 17% S', image: 'nit-sk-25.jpg' },
		{ name: 'Dynamus Phos 25kg', description:'11,62% Ca + 2% Mg + 5,12% S + 12,12% P + Mat. Orgânica', image: 'phos-ferticel.png' }
	],
	defensivos: [
		{ name: 'Nit-SK 25kg', description:'15-00-15 + 17% S', image: 'nit-sk-25.jpg' },
	],
	implementos: [
	]
};

function renderProducts() {
	document.querySelectorAll('.product-grid[data-category]').forEach((grid) => {
		const products = productsByCategory[grid.dataset.category] || [];
		grid.innerHTML = products.map(({ name, image, description }) => `
			<div class="product-card">
				<img src="./images/products/${image}" alt="${name}">
				<span>${name}</span>
				${description ? `<small>${description}</small>` : ''}
				<button class="add-to-cart" type="button" data-product="${name}">Adicionar</button>
			</div>
		`).join('');
	});
}

renderProducts();

const categoryDetails = document.querySelectorAll('.category-item');

categoryDetails.forEach((category) => {
	category.addEventListener('toggle', () => {
		if (!category.open) return;

		categoryDetails.forEach((otherCategory) => {
			if (otherCategory !== category) otherCategory.open = false;
		});
	});
});
