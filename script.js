document.addEventListener("DOMContentLoaded", () => {
	// --- LÓGICA DO MENU HAMBURGUER (MOBILE) --- //
	const botaoHamburger = document.getElementById("menu-hamburger");
	const menuLinks = document.querySelector(".menu-links");
	botaoHamburger.addEventListener("click", () => {
		menuLinks.classList.toggle("ativo");
	});
	for (const link of document.querySelectorAll(".menu-links a")) {
		link.addEventListener("click", () => {
			if (menuLinks.classList.contains("ativo")) {
				menuLinks.classList.remove("ativo");
			}
		});
	}

	// --- LÓGICA DAS ANIMAÇÕES DE SCROLL (FADE IN) --- //
	const observadorAnimacao = new IntersectionObserver(
		(entradas) => {
			for (const entrada of entradas) {
				if (entrada.isIntersecting) {
					entrada.target.classList.add("visivel");
				}
			}
		},
		{ threshold: 0.1 },
	);
	for (const el of document.querySelectorAll(".animar-aparecer")) {
		observadorAnimacao.observe(el);
	}

	// --- LÓGICA PARA MARCAR LINK ATIVO NO MENU CONFORME SCROLL --- //
	const secoes = document.querySelectorAll("main[id], section[id]");
	const linksNavegacao = document.querySelectorAll("nav .menu-links li a");
	const observadorSecao = new IntersectionObserver(
		(entradas) => {
			for (const entrada of entradas) {
				if (entrada.isIntersecting) {
					for (const link of linksNavegacao) {
						link.classList.remove("ativo");
					}
					const idSecaoAtual = entrada.target.id;
					const linkAtivo = document.querySelector(
						`nav .menu-links a[href="#${idSecaoAtual}"]`,
					);
					if (linkAtivo) {
						linkAtivo.classList.add("ativo");
					}
				}
			}
		},
		{ rootMargin: "-30% 0px -70% 0px" },
	);
	for (const secao of secoes) {
		observadorSecao.observe(secao);
	}

	// --- LÓGICA DO BOTÃO VOLTAR AO TOPO --- //
	const botaoVoltarTopo = document.getElementById("botao-voltar-topo");
	window.addEventListener("scroll", () => {
		if (window.scrollY > 300) {
			botaoVoltarTopo.classList.add("visivel");
		} else {
			botaoVoltarTopo.classList.remove("visivel");
		}
	});
	botaoVoltarTopo.addEventListener("click", () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	});

	// --- LÓGICA DO TEMA DARK --- //
	const botaoAlternarTema = document.getElementById("botao-alternar-tema");
	const iconeTema = botaoAlternarTema.querySelector("i");

	const aplicarTema = (tema) => {
		if (tema === "dark") {
			document.body.setAttribute("data-theme", "dark");
			iconeTema.classList.remove("fa-moon");
			iconeTema.classList.add("fa-sun");
			localStorage.setItem("theme", "dark");
		} else {
			document.body.removeAttribute("data-theme");
			iconeTema.classList.remove("fa-sun");
			iconeTema.classList.add("fa-moon");
			localStorage.setItem("theme", "light");
		}
	};

	const temaSalvo = localStorage.getItem("theme") || "light";
	aplicarTema(temaSalvo);

	botaoAlternarTema.addEventListener("click", () => {
		const temaAtual = localStorage.getItem("theme");
		if (temaAtual === "dark") {
			aplicarTema("light");
		} else {
			aplicarTema("dark");
		}
	});
});
