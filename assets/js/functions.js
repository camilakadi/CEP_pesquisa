$(document).ready(function () {
	$(".nav-icon").click(function () {
		$(this).toggleClass("open");
	});
});

inicializar();

function inicializar() {
	document.getElementById("cep").focus();
}

function inserirClasseHamburger() {
	let hamburguer = document.getElementById("hamburger");

	if (hamburguer.classList.contains("menu-hamburger-active"))
		hamburguer.classList.remove("menu-hamburger-active");
	else
		hamburguer.classList.add("menu-hamburger-active");
}

function buscarCep(valor) {
	const cep = valor.replace(/\D/g, "");

	if (cep) {
		const script = document.createElement("script");
		script.src = "https://viacep.com.br/ws/" + cep + "/json/?callback=retornoCep";
		document.body.appendChild(script);
	}
}

function retornoCep(conteudo) {
	if (!("erro" in conteudo)) {
		retornoDados(conteudo);
		carregarMapa(conteudo);
		mostrarFecharDivEndereco();
	}
	else
		alert("CEP não encontrado.");
}

function retornoDados(conteudo) {
	document.getElementById("ruaSpan").innerHTML = conteudo.logradouro;
	document.getElementById("bairroSpan").innerHTML = conteudo.bairro;
	document.getElementById("cidadeSpan").innerHTML = conteudo.localidade;
	document.getElementById("ufSpan").innerHTML = conteudo.uf;
	document.getElementById("cepSpan").innerHTML = conteudo.cep;
}

function carregarMapa(conteudo) {
	const googleMap = document.getElementById("googleMap");
	const enderecoCompleto = conteudo.logradouro + conteudo.bairro + conteudo.localidade + conteudo.uf + conteudo.cep;

	googleMap.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCNPTO4SnvuQa2QwMKIdXi8m5wOG6_xFzQ&q=${enderecoCompleto}`;
}

function mostrarFecharDivEndereco() {
	const divPesquisa = document.getElementById("contentSearch");
	const botaoBuscar = document.getElementById("searchButton");
	const campoCep = document.getElementById("cep");

	if (divPesquisa.classList.contains("opened")) {
		divPesquisa.classList.remove("opened");
		botaoBuscar.disabled = false;
		campoCep.disabled = false;
		campoCep.value = "";
		campoCep.focus();
	}
	else {
		divPesquisa.classList.add("opened");
		botaoBuscar.disabled = true;
		campoCep.disabled = true;
	}
}

function aplicarMascaraCep(cep, mascara) {
	const regex = /^[0-9]*[-]*[0-9]*$/gm;
	const validador = cep.value.match(regex);

	if (validador) {
		const i = cep.value.length;
		const saida = mascara.substring(1, 0);
		const texto = mascara.substring(i);

		if (texto.substring(0, 1) != saida)
			cep.value += texto.substring(0, 1);
	}
	else
		cep.value = cep.value.substring(0, cep.value.length - 1);
}