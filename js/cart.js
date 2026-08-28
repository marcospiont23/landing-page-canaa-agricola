const cart = new Map();
const cartPanel = document.querySelector('#cart-panel');
const cartItems = document.querySelector('.cart-items');
const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');
const cartCount = document.querySelector('.cart-count');
const cartToggle = document.querySelector('.cart-toggle');
const cartClose = document.querySelector('.cart-close');
const cartBackdrop = document.querySelector('.cart-backdrop');
const whatsappOrder = document.querySelector('.whatsapp-order');

function updateCart() {
	const products = [...cart.entries()];
	const total = products.reduce((sum, [, quantity]) => sum + quantity, 0);

	cartItems.innerHTML = products.map(([name, quantity]) => `
		<li class="cart-item">
			<span>${name}</span>
			<div class="quantity-controls">
				<button type="button" data-action="decrease" data-product="${name}" aria-label="Diminuir quantidade de ${name}">-</button>
				<strong>${quantity}</strong>
				<button type="button" data-action="increase" data-product="${name}" aria-label="Aumentar quantidade de ${name}">+</button>
			</div>
			<button class="remove-item" type="button" data-action="remove" data-product="${name}">Remover</button>
		</li>
	`).join('');

	cartEmpty.hidden = products.length > 0;
	cartTotal.textContent = total;
	cartCount.textContent = total;
	cartCount.hidden = total === 0;
	whatsappOrder.disabled = products.length === 0;
}

function changeQuantity(name, amount) {
	const nextQuantity = (cart.get(name) || 0) + amount;
	if (nextQuantity > 0) {
		cart.set(name, nextQuantity);
	} else {
		cart.delete(name);
	}
	updateCart();
}

function setCartOpen(isOpen) {
	cartPanel.classList.toggle('is-open', isOpen);
	cartPanel.setAttribute('aria-hidden', String(!isOpen));
	cartToggle.setAttribute('aria-expanded', String(isOpen));
	cartBackdrop.hidden = !isOpen;
	document.body.classList.toggle('cart-is-open', isOpen);
	if (isOpen) cartClose.focus();
}

document.querySelectorAll('.add-to-cart').forEach((button) => {
	button.addEventListener('click', () => {
		changeQuantity(button.dataset.product, 1);
		button.textContent = 'Adicionado';
		setTimeout(() => { button.textContent = 'Adicionar'; }, 1200);
	});
});

cartItems.addEventListener('click', (event) => {
	const button = event.target.closest('button[data-action]');
	if (!button) return;
	const { action, product } = button.dataset;
	if (action === 'increase') changeQuantity(product, 1);
	if (action === 'decrease') changeQuantity(product, -1);
	if (action === 'remove') {
		cart.delete(product);
		updateCart();
	}
});

cartToggle.addEventListener('click', () => setCartOpen(!cartPanel.classList.contains('is-open')));
cartClose.addEventListener('click', () => setCartOpen(false));
cartBackdrop.addEventListener('click', () => setCartOpen(false));
document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape' && cartPanel.classList.contains('is-open')) setCartOpen(false);
});

whatsappOrder.addEventListener('click', () => {
	const lines = [...cart.entries()].map(([name, quantity]) => `- ${name} (quantidade: ${quantity})`);
	const message = `Olá! Gostaria de solicitar os seguintes produtos:\n\n${lines.join('\n')}`;
	window.open(`https://wa.me/5527999524877?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});

updateCart();
