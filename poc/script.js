$(document).ready(function() {
    // Função para carregar conteúdo da página
    function carregarConteudo(secao) {
        var conteudo = '';
        if (secao === 'home') {
            conteudo = '<p>Página inicial</p>';
        } else if (secao === 'about') {
            conteudo = '<p>Página Sobre</p>';
        } else if (secao === 'contact') {
            conteudo = '<p>Página contato</p>';
        }
        $('#content').html(conteudo);

        // Esconde todos os selects
        $('.selectState').hide();
        // Exibe o select correspondente à página atual
        $('#select_' + secao).show();

        // Esconde todos os campos de entrada
        $('.textInput').hide();
        // Exibe o campo de entrada correspondente à página atual
        $('#input_' + secao).show();
    }

    // Função para manipular a navegação
    function navegar(secao) {
        carregarConteudo(secao);
        // Atualiza o histórico do navegador
        window.history.pushState({ page: secao }, '', window.location.pathname);
    }

    // Manipuladores de eventos para os links
    $('#home').click(function(e) {
        e.preventDefault();
        navegar('home');
    });
    
    $('#about').click(function(e) {
        e.preventDefault();
        navegar('about');
    });
    
    $('#contact').click(function(e) {
        e.preventDefault();
        navegar('contact');
    });

    // Manipulador de evento popstate para a navegação do histórico
    window.onpopstate = function(event) {
        if (event.state && event.state.page) {
            carregarConteudo(event.state.page);
        }
    };

    // Carrega o conteúdo inicial
    var paginaInicial = window.location.hash.replace('#', '');
    if (paginaInicial) {
        navegar(paginaInicial);
    } else {
        carregarConteudo('home'); // Página inicial padrão
    }

    function getOptions(select, item) {
        $(select).append(`<option value="${item.value}">${item.summary}</option>`);
    }

    // Fazer solicitação AJAX para obter opções do select da API
    fetch('https://localhost:7090/weatherforecast')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                getOptions('#selectStateHome', item);
            });
            data.forEach(item => {
                getOptions('#selectStateAbout', item);
            });
            data.forEach(item => {
                getOptions('#selectStateContact', item);
            });

            // Adiciona os campos de entrada para todas as seções
            addTextInput('#inputContainer', 'input_home');
            addTextInput('#inputContainer', 'input_about');
            addTextInput('#inputContainer', 'input_contact');
        })
        .catch(error => console.error('Erro ao carregar opções do select:', error));

    function addTextInput(containerId, inputId) {
        $(containerId).append(`<input type="text" id="${inputId}" class="textInput" placeholder="Text Input for ${inputId.split('_')[1]}">`);
    }
});
