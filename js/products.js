const productsByCategory = {
	fertilizantes: [
		{ name: 'ACT Algas', image: 'act-algas-1.jpg' },
		{ name: 'All', image: 'all-min-1.jpg' },
		{ name: 'Bombstim', image: 'bombstim-1.jpg' },
		{ name: 'Fulvicare', image: 'fulvicare-1.jpg' },        
		{ name: 'Alliado', image: 'alliado-1.jpg' },
		{ name: 'Cobre', image: 'cobre-1.jpg' },
		{ name: 'Drip', image: 'drip-1.jpg' },
		{ name: 'Spray', image: 'spray-1.jpg' },
		{ name: 'Taxi', image: 'taxi-1.jpg' },
		{ name: 'Magnésio', image: 'magnesio-1.jpg' },
		{ name: 'Plant', image: 'plant-1.jpg' },
		{ name: 'Power', image: 'power-1.jpg' },
		{ name: 'Vattariza', image: 'vattariza.png' },
		{ name: 'Doble', image: 'doble-1.jpg' }
	],
	adubos: [
		{ name: 'CA Mag Ferticel', image: 'ca-mag-ferticel.png' },
		{ name: 'KCL Yara', image: 'kcl-yara.jpg' },
		{ name: 'Krista K', image: 'kirsta-k.jpg' },
		{ name: 'Nit-S 25', image: 'nit-s-25.jpg' },
		{ name: 'Nit-SK 25', image: 'nit-sk-25.jpg' },
		{ name: 'Phos', image: 'phos-ferticel.png' }
	],
	defensivos: [
	]
};

function renderProducts() {
	document.querySelectorAll('.product-grid[data-category]').forEach((grid) => {
		const products = productsByCategory[grid.dataset.category] || [];
		grid.innerHTML = products.map(({ name, image }) => `
			<div class="product-card">
				<img src="./images/products/${image}" alt="${name}">
				<span>${name}</span>
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
