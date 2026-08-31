const menuButton = document.getElementById('menu-toggle');
const navigation = document.getElementById('main-navigation');
const menuLinks = document.querySelectorAll('.nav-container a');

const setMenuOpen = (isOpen) => {
	if (!menuButton || !navigation) return;
	navigation.classList.toggle('is-open', isOpen);
	menuButton.setAttribute('aria-expanded', String(isOpen));
};

const closeMobileMenu = () => {
	setMenuOpen(false);
};

menuButton?.addEventListener('click', () => {
	setMenuOpen(!navigation?.classList.contains('is-open'));
});

menuLinks.forEach((link) => {
	link.addEventListener('click', closeMobileMenu);
});

document.addEventListener('click', (event) => {
	if (!navigation?.classList.contains('is-open')) return;
	const clickedInsideMenu = event.target.closest('.nav-container');
	const clickedMenuButton = event.target.closest('.menu-icon');
	if (!clickedInsideMenu && !clickedMenuButton) {
		closeMobileMenu();
	}
});

document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape' && navigation?.classList.contains('is-open')) {
		closeMobileMenu();
	}
});