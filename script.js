document.addEventListener("DOMContentLoaded", () => {
	// --- LÓGICA DO MENU HAMBURGUER (MOBILE) ---
	const hamburger = document.getElementById("hamburger-menu");
	const navLinks = document.querySelector(".nav-links");

	// Quando o hamburguer for clicado, mostra/esconde os links
	hamburger.addEventListener("click", () => {
		navLinks.classList.toggle("active");
	});

	// Fecha o menu se um link for clicado (útil para navegação na mesma página)
	for (const link of document.querySelectorAll(".nav-links a")) {
		link.addEventListener("click", () => {
			if (navLinks.classList.contains("active")) {
				navLinks.classList.remove("active");
			}
		});
	}

	// --- LÓGICA DAS ANIMAÇÕES DE SCROLL (FADE IN) ---
	// Esta API é super eficiente para observar quando um elemento entra na tela
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				// Se o elemento estiver visível na tela
				if (entry.isIntersecting) {
					entry.target.classList.add("visible");
				}
			}
		},
		{
			threshold: 0.1, // A animação começa quando 10% do elemento estiver visível
		},
	);

	// Pega todos os elementos que devem ter a animação e manda o observer "observá-los"
	const elementsToFadeIn = document.querySelectorAll(".fade-in-element");
	for (const el of elementsToFadeIn) {
		observer.observe(el);
	}

	// --- LÓGICA PARA MARCAR LINK ATIVO NO MENU CONFORME SCROLL ---
	const sections = document.querySelectorAll(".content-section");
	const navLi = document.querySelectorAll("nav .nav-links li a");

	const sectionObserver = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					// Remove a classe 'active' de todos os links
					for (const link of navLi) {
						link.classList.remove("active");
					}

					// Pega o ID da seção atual (ex: 'about', 'services')
					const currentSectionId = entry.target.id;

					// Adiciona a classe 'active' ao link do menu correspondente
					const activeLink = document.querySelector(
						`nav .nav-links a[href="#${currentSectionId}"]`,
					);
					if (activeLink) {
						activeLink.classList.add("active");
					}
				}
			}
		},
		{
			rootMargin: "-30% 0px -70% 0px", // Ativa quando a seção está no meio da tela
		},
	);

	// Observa cada uma das seções de conteúdo
	for (const section of sections) {
		sectionObserver.observe(section);
	}
});
