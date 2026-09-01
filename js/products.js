const defaultProductsByCategory = {
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
		{ name: 'Krista K 25kg', description: '13-00-43', image: 'kirsta-k.jpg' },
		{ name: 'Vitta Nit S 25kg', description: '21% N + 24% S', image: 'nit-s-25.jpg' },
		{ name: 'Vitta Nit SK 25kg', description: '15-00-15 + 17% S', image: 'nit-sk-25.jpg' },
		{ name: 'Dynamus Phos 25kg', description: '11,62% Ca + 2% Mg + 5,12% S + 12,12% P + Mat. Orgânica', image: 'phos-ferticel.png' },
		{ name: 'Yara Bela 50kg', description: '18-04-17', image: '18-04-17.jpg' },
		{ name: 'Yara Mila 50kg', description: '19-04-19', image: '19-04-19.jpg' },
		{ name: 'Fertifull 25kg', description: '5% N + 27% P + 33% K + Micros + Aminoácidos + Hormônio', image: 'fertfull.jpg' },
		{ name: 'Amiorgan 25kg', description: '17% N + 18% S + Aminoácidos', image: 'amiorgan.jpg' },
		{ name: 'Magnésio 25kg', description: '1% K + 9% Mg + 11,8% S', image: 'magnesio.png' },
		{ name: 'Yara Calcinit 25kg', description: '15,5% N + 18,5% Nitrato Cálcio', image: 'yara-calcinit.png' },
		{ name: 'Yara MAP 25kg', description: '12-00-61% P', image: 'yara-map.png' },
		{ name: 'Yara Rega 25kg', description: '18-05-18', image: 'yara-rega.jpg' }
	],
	defensivos: [
		{ name: 'Albaugh', image: './images/defensivos/albaugh-logo.svg' },
		{ name: 'Alta', image: './images/defensivos/alta-logo.png' },
		{ name: 'ADAMA', image: './images/defensivos/adama-logo.svg' },
		{ name: 'BASF', image: './images/defensivos/basf-logo.png' },
		{ name: 'Bayer', image: './images/defensivos/bayer-logo.svg' },
		{ name: 'Corteva', image: './images/defensivos/corteva-logo.jpg' },
		{ name: 'CropChem', image: './images/defensivos/cropchem-logo.png' },
		{ name: 'FMC', image: './images/defensivos/fmc-logo.jpg' },
		{ name: 'Helm', image: './images/defensivos/helm-logo.jpg' },
		{ name: 'Ihara', image: './images/defensivos/ihara-logo.png' },
		{ name: 'Nortox', image: './images/defensivos/nortox-logo.png' },
		{ name: 'Rainbow', image: './images/defensivos/rainbow-logo.jpg' },
		{ name: 'Simbiose', image: './images/defensivos/simbiose-logo.png' },
		{ name: 'Sinon', image: './images/defensivos/sinon-logo.jpg' },
		{ name: 'Syngenta', image: './images/defensivos/syngenta-logo.jpg' },
		{ name: 'Tide', image: './images/defensivos/tide-logo.png' },
		{ name: 'UPL', image: './images/defensivos/upl-logo.jpg' }
	],
	implementos: [
		{ name: 'Dosador Costal Simétrico', image: 'dosador-guarany.png', description: 'Guarany 20L' },
		{ name: 'Aplicador Costal de Granulos', image: 'aplicador-granulos.jpg', description: 'Guarany 16L' },
		{ name: 'Atomizador Costal', image: 'atomizador-kw.jpeg', description: 'Kawashima 26cc' },
		{ name: 'Derriçadeira Café', image: 'derricadeira-cafe.jpeg', description: 'Kawashima 26cc' },
		{ name: 'Eletrosserra Poda', image: 'eletrosserra-3.jpg', description: 'Kawashima 7 pol' },
		{ name: 'Pulverizador Costal 20L', image: 'pulverizador-kw.jpeg', description: 'Kawashima' },
		{ name: 'Perfurador de Solo', image: 'perfurador-kw.jpeg', description: 'Kawashima 52cc' },
		{ name: 'Roçadeira Lateral', image: 'rocadeira-52-kw.jpeg', description: 'Kawashima 52cc' },
		{ name: 'Soprador Costal', image: 'soprador-kw.jpeg', description: 'Kawashima 52cc' }
	]
};

function getStoredProducts() {
	try {
		const stored = localStorage.getItem('canaa_products');
		if (stored) {
			const parsed = JSON.parse(stored);
				const hasLegacyAdubos = Array.isArray(parsed.adubos)
					&& (parsed.adubos.length === 6 || parsed.adubos.length === 9)
					&& parsed.adubos.every((product) => [
						'ca-mag-ferticel.png',
						'kcl-yara.jpg',
						'kirsta-k.jpg',
						'nit-s-25.jpg',
						'nit-sk-25.jpg',
						'phos-ferticel.png',
						'18-04-17.jpg',
						'19-04-19.jpg',
						'fertfull.jpg'
					].includes(product?.image));
				const hasLegacyDefensivos = Array.isArray(parsed.defensivos)
					&& parsed.defensivos.length === 1
					&& parsed.defensivos[0]?.image === 'nit-sk-25.jpg';
					const adubos = hasLegacyAdubos ? defaultProductsByCategory.adubos : parsed.adubos;
				const defensivos = hasLegacyDefensivos ? defaultProductsByCategory.defensivos : parsed.defensivos;
			return {
				fertilizantes: Array.isArray(parsed.fertilizantes) ? parsed.fertilizantes : [],
					adubos: Array.isArray(adubos) ? adubos : [],
					defensivos: Array.isArray(defensivos) ? defensivos : [],
				implementos: Array.isArray(parsed.implementos) ? parsed.implementos : []
			};
		}
	} catch (e) {
		console.error('Erro ao ler produtos do localStorage:', e);
	}
	try {
		localStorage.setItem('canaa_products', JSON.stringify(defaultProductsByCategory));
	} catch (e) {
		console.error('Erro ao inicializar localStorage:', e);
	}
	return defaultProductsByCategory;
}

const productsByCategory = getStoredProducts();

function saveStoredProducts(data) {
	const normalized = {
		fertilizantes: Array.isArray(data?.fertilizantes) ? data.fertilizantes : [],
		adubos: Array.isArray(data?.adubos) ? data.adubos : [],
		defensivos: Array.isArray(data?.defensivos) ? data.defensivos : [],
		implementos: Array.isArray(data?.implementos) ? data.implementos : []
	};

	try {
		localStorage.setItem('canaa_products', JSON.stringify(normalized));
		return true;
	} catch (e) {
		console.error('Erro ao salvar produtos no localStorage:', e);
		return false;
	}
}

function resolveProductImage(image) {
	if (!image) return './images/logo/logo-canaa-agricola.svg';
	if (image.startsWith('data:') || image.startsWith('http://') || image.startsWith('https://') || image.startsWith('./') || image.startsWith('/')) {
		return image;
	}
	return `./images/products/${image}`;
}

function renderProducts() {
	document.querySelectorAll('.product-grid[data-category]').forEach((grid) => {
		const category = grid.dataset.category;
		const products = productsByCategory[category] || [];

		if (products.length === 0) {
			grid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--gray-500); padding: 2rem 0; font-size: 0.95rem;">Nenhum produto cadastrado nesta categoria no momento.</p>';
			return;
		}

		grid.innerHTML = products.map(({ name, image, description }) => {
			const isDefensivo = category === 'defensivos';
			const whatsappMessage = encodeURIComponent(`Gostaria de mais informações dos produtos da marca "${name}".`);

			return `
			<div class="product-card">
				<img src="${resolveProductImage(image)}" alt="${name}">
				<span>${name}</span>
				${description ? `<small>${description}</small>` : ''}
				${isDefensivo
					? `<a class="add-to-cart product-information-link" href="https://wa.me/5527999524877?text=${whatsappMessage}" target="_blank" rel="noopener noreferrer">Pedir mais informações</a>`
					: `<button class="add-to-cart" type="button" data-product="${name}">Adicionar</button>`}
			</div>
			`;
		}).join('');
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
