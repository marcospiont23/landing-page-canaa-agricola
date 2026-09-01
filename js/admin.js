// admin.js - Controle e Operações do Painel Administrativo

// 2. Lista de Imagens existentes em ./images/products/
const availableImages = [
	'18-04-17.jpg',
	'19-04-19.jpg',
	'Coffea arabica.jpg',
	'act-algas-1.jpg',
	'act-algas-5.jpg',
	'all-min-1.jpg',
	'all-min-5.jpg',
	'alliado-1.jpg',
	'alliado-5.jpg',
	'amiorgan.jpg',
	'aplicador-granulos.jpg',
	'atomizador-kw.jpeg',
	'bombstim-1.jpg',
	'bombstim-5.jpg',
	'ca-mag-ferticel.png',
	'cobre-1.jpg',
	'derricadeira-cafe.jpeg',
	'doble-1.jpg',
	'doble-5.jpg',
	'dosador-guarany.png',
	'drip-1.jpg',
	'eletrosserra-1.jpg',
	'eletrosserra-2.jpg',
	'eletrosserra-3.jpg',
	'eletrosserra-4.jpg',
	'fertfull.jpg',
	'fulvicare-1.jpg',
	'fulvicare-5.jpg',
	'kcl-yara.jpg',
	'kirsta-k.jpg',
	'magnesio-1.jpg',
	'magnesio.png',
	'nit-s-25.jpg',
	'nit-sk-25.jpg',
	'perfurador-kw.jpeg',
	'phos-ferticel.png',
	'plant-1.jpg',
	'pow-1.jpg',
	'power-1.jpg',
	'power-5.jpg',
	'pulverizador-kw.jpeg',
	'rocadeira-52-kw.jpeg',
	'soprador-kw.jpeg',
	'spray-1.jpg',
	'taxi-1.jpg',
	'tesoura-1.jpg',
	'tesoura-2.jpg',
	'vattariza.png',
	'vergota flor cafe.jpg',
	'yara-calcinit.png',
	'yara-map.png',
	'yara-rega.jpg',
	'./images/defensivos/adama-logo.svg',
	'./images/defensivos/albaugh-logo.svg',
	'./images/defensivos/alta-logo.png',
	'./images/defensivos/basf-logo.png',
	'./images/defensivos/bayer-logo.svg',
	'./images/defensivos/corteva-logo.jpg',
	'./images/defensivos/cropchem-logo.png',
	'./images/defensivos/fmc-logo.jpg',
	'./images/defensivos/helm-logo.jpg',
	'./images/defensivos/ihara-logo.png',
	'./images/defensivos/nortox-logo.png',
	'./images/defensivos/rainbow-logo.jpg',
	'./images/defensivos/simbiose-logo.png',
	'./images/defensivos/sinon-logo.jpg',
	'./images/defensivos/syngenta-logo.jpg',
	'./images/defensivos/tide-logo.png',
	'./images/defensivos/upl-logo.jpg'
];

// Estado da Aplicação
let currentCategoryFilter = 'all';
let currentSearchTerm = '';
let productsData = getStoredProducts();
let pendingDelete = { category: '', index: -1, name: '' };

// Elementos DOM
const tableBody = document.getElementById('products-table-body');
const emptyState = document.getElementById('empty-state');
const searchInput = document.getElementById('search-input');
const tabButtons = document.querySelectorAll('.tab-btn');

// Modais
const productModal = document.getElementById('product-modal');
const deleteModal = document.getElementById('delete-modal');
const passwordModal = document.getElementById('password-modal');
const productForm = document.getElementById('product-form');
const passwordForm = document.getElementById('password-form');

// Campos do Formulário de Produto
const editCategoryInput = document.getElementById('edit-category');
const editIndexInput = document.getElementById('edit-index');
const productCategorySelect = document.getElementById('product-category');
const productNameInput = document.getElementById('product-name');
const productDescInput = document.getElementById('product-description');
const productImageSelect = document.getElementById('product-image-select');
const productImageCustom = document.getElementById('product-image-custom');
const productImageFile = document.getElementById('product-image-file');

// Elementos de Prévia
const previewImg = document.getElementById('preview-img');
const previewName = document.getElementById('preview-name');
const previewDesc = document.getElementById('preview-desc');

// 3. Inicialização
function init() {
	populateImageOptions();
	renderDashboard();
	setupEventListeners();
	initSessionMonitoring();
}

function populateImageOptions() {
	productImageSelect.innerHTML = '<option value="">-- Escolha uma imagem existente da pasta --</option>';
	availableImages.forEach((imgName) => {
		const option = document.createElement('option');
		option.value = imgName;
		option.textContent = imgName;
		productImageSelect.appendChild(option);
	});
}

// 4. Renderização do Painel e Tabela
function renderDashboard() {
	updateMetrics();
	renderTable();
}

function updateMetrics() {
	const fertCount = (productsData.fertilizantes || []).length;
	const adubCount = (productsData.adubos || []).length;
	const defCount = (productsData.defensivos || []).length;
	const impCount = (productsData.implementos || []).length;
	const totalCount = fertCount + adubCount + defCount + impCount;

	document.getElementById('count-total').textContent = totalCount;
	document.getElementById('count-fertilizantes').textContent = fertCount;
	document.getElementById('count-adubos').textContent = adubCount;
	document.getElementById('count-defensivos').textContent = defCount;
	document.getElementById('count-implementos').textContent = impCount;

	document.getElementById('tab-count-all').textContent = totalCount;
	document.getElementById('tab-count-fert').textContent = fertCount;
	document.getElementById('tab-count-adub').textContent = adubCount;
	document.getElementById('tab-count-def').textContent = defCount;
	document.getElementById('tab-count-imp').textContent = impCount;
}

function renderTable() {
	const allItems = [];

	const categories = ['fertilizantes', 'adubos', 'defensivos', 'implementos'];
	categories.forEach((cat) => {
		(productsData[cat] || []).forEach((prod, index) => {
			allItems.push({
				...prod,
				category: cat,
				originalIndex: index
			});
		});
	});

	// Filtragem
	const filtered = allItems.filter((item) => {
		const matchesCategory = currentCategoryFilter === 'all' || item.category === currentCategoryFilter;
		const searchLower = currentSearchTerm.toLowerCase();
		const matchesSearch = !currentSearchTerm || 
			item.name.toLowerCase().includes(searchLower) || 
			(item.description && item.description.toLowerCase().includes(searchLower));
		return matchesCategory && matchesSearch;
	});

	if (filtered.length === 0) {
		tableBody.innerHTML = '';
		emptyState.style.display = 'block';
		return;
	}

	emptyState.style.display = 'none';

	tableBody.innerHTML = filtered.map((item) => {
		const imgSrc = resolveProductImage(item.image);
		const descText = item.description ? escapeHtml(item.description) : '<span style="color: #94a3b8; font-style: italic;">Sem especificações</span>';

		return `
			<tr>
				<td>
					<div class="product-thumb-container">
						<img src="${imgSrc}" alt="${escapeHtml(item.name)}" class="product-thumb" loading="lazy" />
					</div>
				</td>
				<td class="product-title-cell">
					<strong>${escapeHtml(item.name)}</strong>
				</td>
				<td class="product-desc-cell">
					${descText}
				</td>
				<td>
					<span class="category-tag ${item.category}">${item.category}</span>
				</td>
				<td>
					<div class="table-actions">
						<button type="button" class="btn-icon edit" title="Editar produto" data-action="edit"
							data-category="${item.category}" data-index="${item.originalIndex}">
							✏️
						</button>
						<button type="button" class="btn-icon delete" title="Excluir produto" data-action="delete"
							data-category="${item.category}" data-index="${item.originalIndex}" data-product-name="${escapeHtml(item.name)}">
							🗑️
						</button>
					</div>
				</td>
			</tr>
		`;
	}).join('');
}

// 5. Gestão de Modais e Formulários
function openAddModal() {
	document.getElementById('modal-title').textContent = 'Novo Produto';
	editCategoryInput.value = '';
	editIndexInput.value = '-1';
	
	productCategorySelect.value = currentCategoryFilter !== 'all' ? currentCategoryFilter : 'fertilizantes';
	productCategorySelect.disabled = false;
	productNameInput.value = '';
	productDescInput.value = '';
	productImageSelect.value = '';
	productImageCustom.value = '';
	productImageFile.value = '';

	updateLivePreview();
	openModal(productModal);
}

function openEditModal(category, index) {
	const prod = productsData[category][index];
	if (!prod) return;

	document.getElementById('modal-title').textContent = 'Editar Produto';
	editCategoryInput.value = category;
	editIndexInput.value = index;

	productCategorySelect.value = category;
	productNameInput.value = prod.name || '';
	productDescInput.value = prod.description || '';

	if (availableImages.includes(prod.image)) {
		productImageSelect.value = prod.image;
		productImageCustom.value = '';
	} else {
		productImageSelect.value = '';
		productImageCustom.value = prod.image || '';
	}

	productImageFile.value = '';
	updateLivePreview();
	openModal(productModal);
}

function openDeleteModal(category, index, name) {
	pendingDelete = { category, index, name };
	document.getElementById('delete-product-name').textContent = name;
	openModal(deleteModal);
}

function openModal(modal) {
	modal.classList.add('active');
	modal.setAttribute('aria-hidden', 'false');
}

function closeModal(modal) {
	modal.classList.remove('active');
	modal.setAttribute('aria-hidden', 'true');
}

function closeAllModals() {
	document.querySelectorAll('.modal-overlay').forEach(closeModal);
}

// 6. Atualização da Prévia em Tempo Real
function updateLivePreview() {
	const name = productNameInput.value.trim() || 'Nome do Produto';
	const desc = productDescInput.value.trim();
	const image = getSelectedImageValue();

	previewName.textContent = name;
	if (desc) {
		previewDesc.textContent = desc;
		previewDesc.style.display = 'block';
	} else {
		previewDesc.style.display = 'none';
	}

	previewImg.src = resolveProductImage(image);
}

function getSelectedImageValue() {
	if (productImageCustom.value.trim()) {
		return productImageCustom.value.trim();
	}
	if (productImageSelect.value) {
		return productImageSelect.value;
	}
	return '';
}

// 7. Event Listeners
function setupEventListeners() {
	// Logout
	document.getElementById('btn-logout').addEventListener('click', async () => {
		if (confirm('Deseja sair do painel administrativo?')) {
			await secureLogout();
			window.location.href = './login.html';
		}
	});

	// Botões de Abertura de Modal
	document.getElementById('btn-add-product').addEventListener('click', openAddModal);
	document.getElementById('btn-empty-add').addEventListener('click', openAddModal);
	document.getElementById('btn-change-password').addEventListener('click', async () => {
		const { data: { user } } = await window.supabaseClient.auth.getUser();
		const currentEmail = user?.email || '';
		const emailInput = document.getElementById('admin-email-input');
		if (emailInput) emailInput.value = currentEmail;
		openModal(passwordModal);
	});

	// Ações da tabela são delegadas porque as linhas são renderizadas dinamicamente.
	tableBody.addEventListener('click', (event) => {
		const actionButton = event.target.closest('.btn-icon[data-action]');
		if (!actionButton) return;

		const category = actionButton.dataset.category;
		const index = Number.parseInt(actionButton.dataset.index, 10);

		if (actionButton.dataset.action === 'edit') {
			openEditModal(category, index);
			return;
		}

		if (actionButton.dataset.action === 'delete') {
			openDeleteModal(category, index, actionButton.dataset.productName);
		}
	});

	// Fechar Modais
	document.querySelectorAll('[data-close-modal]').forEach((btn) => {
		btn.addEventListener('click', closeAllModals);
	});

	document.querySelectorAll('.modal-overlay').forEach((modal) => {
		modal.addEventListener('click', (e) => {
			if (e.target === modal) closeModal(modal);
		});
	});

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') closeAllModals();
	});

	// Filtros por Aba de Categoria
	tabButtons.forEach((tab) => {
		tab.addEventListener('click', () => {
			tabButtons.forEach((b) => b.classList.remove('active'));
			tab.classList.add('active');
			currentCategoryFilter = tab.dataset.category;
			renderTable();
		});
	});

	// Busca
	searchInput.addEventListener('input', (e) => {
		currentSearchTerm = e.target.value.trim();
		renderTable();
	});

	// Inputs do Formulário para Prévia em Tempo Real
	productNameInput.addEventListener('input', updateLivePreview);
	productDescInput.addEventListener('input', updateLivePreview);
	
	productImageSelect.addEventListener('change', () => {
		if (productImageSelect.value) {
			productImageCustom.value = '';
		}
		updateLivePreview();
	});

	productImageCustom.addEventListener('input', () => {
		if (productImageCustom.value.trim()) {
			productImageSelect.value = '';
		}
		updateLivePreview();
	});

	// Upload de Imagem local (FileReader)
	productImageFile.addEventListener('change', (e) => {
		const file = e.target.files[0];
		if (!file) return;

		if (file.size > 2 * 1024 * 1024) {
			showToast('A imagem selecionada é maior que 2MB. Recomendamos imagens mais leves.', 'error');
		}

		const reader = new FileReader();
		reader.onload = (event) => {
			productImageCustom.value = event.target.result;
			productImageSelect.value = '';
			updateLivePreview();
			showToast('Imagem carregada com sucesso na prévia!', 'success');
		};
		reader.readAsDataURL(file);
	});

	// Salvar Produto (Novo ou Edição)
	productForm.addEventListener('submit', (e) => {
		e.preventDefault();

		const category = productCategorySelect.value;
		const name = productNameInput.value.trim();
		const description = productDescInput.value.trim();
		const image = getSelectedImageValue();

		if (!name) {
			showToast('Por favor, informe o nome do produto.', 'error');
			return;
		}

		if (!image) {
			showToast('Por favor, escolha uma imagem ou envie um arquivo.', 'error');
			return;
		}

		const newProduct = { name, image };
		if (description) newProduct.description = description;

		const prevCategory = editCategoryInput.value;
		const prevIndex = parseInt(editIndexInput.value, 10);

		if (prevIndex >= 0 && prevCategory) {
			// Se mudou de categoria na edição
			if (prevCategory !== category) {
				productsData[prevCategory].splice(prevIndex, 1);
				if (!productsData[category]) productsData[category] = [];
				productsData[category].push(newProduct);
			} else {
				productsData[category][prevIndex] = newProduct;
			}
			logSecurityEvent('product_edited', { product: name, category });
			showToast(`Produto "${name}" atualizado com sucesso!`, 'success');
		} else {
			// Inclusão
			if (!productsData[category]) productsData[category] = [];
			productsData[category].push(newProduct);
			logSecurityEvent('product_added', { product: name, category });
			showToast(`Produto "${name}" adicionado com sucesso!`, 'success');
		}

		saveStoredProducts(productsData);
		closeAllModals();
		renderDashboard();
	});

	// Confirmar Exclusão
	document.getElementById('btn-confirm-delete').addEventListener('click', () => {
		const { category, index, name } = pendingDelete;
		if (index >= 0 && category && productsData[category]) {
			productsData[category].splice(index, 1);
			saveStoredProducts(productsData);
			logSecurityEvent('product_deleted', { product: name, category });
			showToast(`Produto "${name}" excluído com sucesso!`, 'success');
			closeAllModals();
			renderDashboard();
		}
	});

	// Alterar Conta e Senha
	passwordForm.addEventListener('submit', async (e) => {
		e.preventDefault();
		const email = document.getElementById('admin-email-input').value.trim();
		const currentPass = document.getElementById('current-password').value;
		const newPass = document.getElementById('new-password').value;
		const confirmPass = document.getElementById('confirm-password').value;

		const { data: { user } } = await window.supabaseClient.auth.getUser();
		if (!user?.email) {
			window.location.href = './login.html';
			return;
		}

		if (newPass || email !== user.email) {
			if (!currentPass) {
				showToast('Informe sua senha atual para alterar os dados de acesso.', 'error');
				return;
			}
			const { error: signInError } = await window.supabaseClient.auth.signInWithPassword({ email: user.email, password: currentPass });
			if (signInError) {
				showToast('A senha atual informada está incorreta.', 'error');
				return;
			}
		}

		if (newPass) {
			if (newPass !== confirmPass) {
				showToast('A nova senha e a confirmação não conferem.', 'error');
				return;
			}
			const { error } = await window.supabaseClient.auth.updateUser({ password: newPass });
			if (error) {
				showToast(error.message, 'error');
				return;
			}
		}

		if (email && email !== user.email) {
			const { error } = await window.supabaseClient.auth.updateUser({ email });
			if (error) {
				showToast(error.message, 'error');
				return;
			}
		}

		logSecurityEvent('admin_password_changed', { email });
		showToast('Dados de acesso atualizados. A alteração de e-mail pode exigir confirmação.', 'success');
		passwordForm.reset();
		closeAllModals();
	});

	// Baixar arquivo products.js gerado
	document.getElementById('btn-download-js').addEventListener('click', downloadProductsJs);

	// Copiar código de products.js
	document.getElementById('btn-copy-code').addEventListener('click', copyProductsCode);

	// Restaurar Padrões
	document.getElementById('btn-reset-default').addEventListener('click', () => {
		if (confirm('Tem certeza de que deseja restaurar o catálogo para a versão inicial? Suas alterações salvas no navegador serão resetadas.')) {
			productsData = JSON.parse(JSON.stringify(defaultProductsByCategory));
			saveStoredProducts(productsData);
			renderDashboard();
			logSecurityEvent('catalog_reset', {});
			showToast('Catálogo restaurado para as configurações padrão!', 'info');
		}
	});

	// Backup e Restore
	if (document.getElementById('btn-backup-export')) {
		document.getElementById('btn-backup-export').addEventListener('click', handleBackupExport);
	}

	if (document.getElementById('btn-backup-import')) {
		document.getElementById('btn-backup-import').addEventListener('click', handleBackupImport);
	}
}

// 8. Exportação e Geração de Código JS
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
	} catch (error) {
		console.error('Erro ao salvar produtos no localStorage:', error);
		return false;
	}
}

function generateProductsJsCode() {
	return `// products.js - Catálogo de Produtos Canaã Soluções Agrícolas
// Atualizado via Painel Administrativo em ${new Date().toLocaleDateString('pt-BR')}

const defaultProductsByCategory = ${JSON.stringify(productsData, null, '\t')};

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
	} catch (error) {
		console.error('Erro ao salvar produtos no localStorage:', error);
		return false;
	}
}

function getStoredProducts() {
	try {
		const stored = localStorage.getItem('canaa_products');
		if (stored) {
			const parsed = JSON.parse(stored);
			return {
				fertilizantes: Array.isArray(parsed.fertilizantes) ? parsed.fertilizantes : [],
				adubos: Array.isArray(parsed.adubos) ? parsed.adubos : [],
				defensivos: Array.isArray(parsed.defensivos) ? parsed.defensivos : [],
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

function resolveProductImage(image) {
	if (!image) return './images/logo/logo-canaa-agricola.svg';
	if (image.startsWith('data:') || image.startsWith('http://') || image.startsWith('https://') || image.startsWith('./') || image.startsWith('/')) {
		return image;
	}
	return \`./images/products/\${image}\`;
}

function renderProducts() {
	document.querySelectorAll('.product-grid[data-category]').forEach((grid) => {
		const category = grid.dataset.category;
		const products = productsByCategory[category] || [];

		if (products.length === 0) {
			grid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--gray-500); padding: 2rem 0; font-size: 0.95rem;">Nenhum produto cadastrado nesta categoria no momento.</p>';
			return;
		}

		grid.innerHTML = products.map(({ name, image, description }) => \`
			<div class="product-card">
				<img src="\${resolveProductImage(image)}" alt="\${name}">
				<span>\${name}</span>
				\${description ? \`<small>\${description}</small>\` : ''}
				<button class="add-to-cart" type="button" data-product="\${name}">Adicionar</button>
			</div>
		\`).join('');
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
`;
}

function downloadProductsJs() {
	const code = generateProductsJsCode();
	const blob = new Blob([code], { type: 'application/javascript;charset=utf-8' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = 'products.js';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
	showToast('Arquivo products.js gerado e baixado com sucesso!', 'success');
}

function copyProductsCode() {
	const code = generateProductsJsCode();
	navigator.clipboard.writeText(code).then(() => {
		showToast('Código de products.js copiado para a área de transferência!', 'success');
	}).catch(() => {
		showToast('Erro ao copiar código. Tente novamente.', 'error');
	});
}

// 9. Utilitários
function showToast(message, type = 'info') {
	const container = document.getElementById('toast-container');
	const toast = document.createElement('div');
	toast.className = `toast ${type}`;
	
	const icon = type === 'success' ? '✅' : type === 'error' ? '⚠️' : 'ℹ️';
	toast.innerHTML = `<span>${icon}</span> <span>${escapeHtml(message)}</span>`;
	
	container.appendChild(toast);
	setTimeout(() => {
		toast.style.opacity = '0';
		toast.style.transform = 'translateX(100%)';
		toast.style.transition = 'all 0.3s ease';
		setTimeout(() => toast.remove(), 300);
	}, 3500);
}

function escapeHtml(str) {
	if (!str) return '';
	return String(str)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

function escapeQuotes(str) {
	if (!str) return '';
	return String(str).replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// 10. Backup e Restore
function handleBackupExport() {
	const backup = createBackup();
	if (!backup) {
		showToast('Erro ao criar backup', 'error');
		return;
	}

	const blob = new Blob([backup], { type: 'application/json;charset=utf-8' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = `canaa-backup-${new Date().toISOString().split('T')[0]}.json`;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
	
	logSecurityEvent('backup_created', { timestamp: new Date().toISOString() });
	showToast('✓ Backup exportado com sucesso!', 'success');
}

function handleBackupImport() {
	const input = document.createElement('input');
	input.type = 'file';
	input.accept = '.json';
	
	input.onchange = (e) => {
		const file = e.target.files[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (event) => {
			try {
				const result = restoreBackup(event.target.result);
				if (result.success) {
					showToast(result.message, 'success');
					setTimeout(() => {
						location.reload();
					}, 1000);
				} else {
					showToast(result.message, 'error');
				}
			} catch (error) {
				showToast(`Erro ao processar arquivo: ${error.message}`, 'error');
			}
		};
		reader.readAsText(file);
	};
	
	input.click();
}

// 11. Monitoramento de Sessão
function initSessionMonitoring() {
	// Verificar timeout de inatividade
	monitorSessionTimeout();

	// Verificar validade da sessão ao carregar
}

async function initializeAdmin() {
	const { data: { session }, error } = await window.supabaseClient.auth.getSession();
	if (error || !session) {
		window.location.replace('./login.html');
		return;
	}

	init();
}

document.addEventListener('DOMContentLoaded', initializeAdmin);
