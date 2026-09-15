const heroSection = document.querySelector('.hero-section[data-hero-images]');

if (heroSection) {
	try {
		const images = JSON.parse(heroSection.dataset.heroImages);
		const desktopImages = images.filter((image) => !image.includes('mobile'));
		const mobileImages = images.filter((image) => image.includes('mobile'));
		const randomImage = (collection) => collection[Math.floor(Math.random() * collection.length)];
		const asCssImage = (image) => `url("${new URL(image, document.baseURI).href}")`;

		if (desktopImages.length > 0) {
			heroSection.style.setProperty('--hero-image', asCssImage(randomImage(desktopImages)));
		}
		if (mobileImages.length > 0) {
			heroSection.style.setProperty('--hero-mobile-image', asCssImage(randomImage(mobileImages)));
		}
	} catch (error) {
		console.error('Não foi possível selecionar a imagem do hero:', error);
	}
}