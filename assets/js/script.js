document.addEventListener('DOMContentLoaded', () => {
    const carrosselSections = document.querySelectorAll('.secao_filmes, .progresso_filmes');
    const cabecalho = document.querySelector('.cabecalho');
    const menuToggle = document.querySelector('.menu-toggle');
    const menuCabecalho = document.querySelector('.menu_cabecalho ul');
    const modal = document.getElementById('modal-pesquisa');
    const pesquisarLink = document.getElementById('pesquisar-link');
    const fecharModal = document.querySelector('.fechar');
    const botaoPesquisa = document.getElementById('botao-pesquisa');

    // Função para inicializar carrosséis
    function initCarousel(section) {
        const lista = section.querySelector('.lista_filmes');
        const items = lista.querySelectorAll('div');
        let currentIndex = 0;

        if (items.length === 0) {
            console.warn('Nenhum item encontrado no carrossel.');
            return;
        }

        function showNext() {
            currentIndex = (currentIndex + 1) % items.length;
            updateCarousel();
        }

        function showPrev() {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateCarousel();
        }

        function updateCarousel() {
            const itemWidth = items[0].offsetWidth;
            const gap = 10; // Espaço entre os itens
            const offset = -currentIndex * (itemWidth + gap);
            lista.style.transition = 'transform 0.5s ease-in-out';
            lista.style.transform = `translateX(${offset}px)`;
        }

        // Iniciar o scroll automático
        let autoScrollInterval = setInterval(showNext, 3000);

        // Parar o scroll automático quando o mouse está sobre o carrossel
        section.addEventListener('mouseenter', () => {
            clearInterval(autoScrollInterval);
        });

        // Reiniciar o scroll automático quando o mouse sai do carrossel
        section.addEventListener('mouseleave', () => {
            autoScrollInterval = setInterval(showNext, 3000);
        });

        // Adicionar botões de navegação
        const prevButton = document.createElement('button');
        prevButton.textContent = '<';
        prevButton.classList.add('carousel-button', 'prev-button');
        prevButton.addEventListener('click', (e) => {
            e.preventDefault();
            showPrev();
            clearInterval(autoScrollInterval);
        });

        const nextButton = document.createElement('button');
        nextButton.textContent = '>';
        nextButton.classList.add('carousel-button', 'next-button');
        nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            showNext();
            clearInterval(autoScrollInterval);
        });

        section.appendChild(prevButton);
        section.appendChild(nextButton);
    }

    // Inicializar todos os carrosséis
    carrosselSections.forEach(initCarousel);

    // Funcionalidade do botão de play do trailer
    const playTrailerButton = document.querySelector('.play-trailer');

    // Criar o modal
    const trailerModal = document.createElement('div');
    trailerModal.style.display = 'none';
    trailerModal.style.position = 'fixed';
    trailerModal.style.zIndex = '1000';
    trailerModal.style.left = '0';
    trailerModal.style.top = '0';
    trailerModal.style.width = '100%';
    trailerModal.style.height = '100%';
    trailerModal.style.backgroundColor = 'rgba(0,0,0,0.8)';

    // Criar o contêiner do vídeo
    const videoContainer = document.createElement('div');
    videoContainer.style.position = 'absolute';
    videoContainer.style.top = '50%';
    videoContainer.style.left = '50%';
    videoContainer.style.transform = 'translate(-50%, -50%)';
    videoContainer.style.maxWidth = '90%';
    videoContainer.style.maxHeight = '90%';

    // Criar o botão de fechar
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.style.position = 'absolute';
    closeButton.style.right = '10px';
    closeButton.style.top = '10px';
    closeButton.style.fontSize = '24px';
    closeButton.style.color = 'white';
    closeButton.style.backgroundColor = 'transparent';
    closeButton.style.border = 'none';
    closeButton.style.cursor = 'pointer';
    closeButton.style.zIndex = '1001';

    // Criar o elemento de vídeo
    const videoPlayer = document.createElement('video');
    videoPlayer.style.width = '100%';
    videoPlayer.style.height = 'auto';
    videoPlayer.controls = true;

    // Adicionar vídeo e botão de fechar ao contêiner
    videoContainer.appendChild(closeButton);
    videoContainer.appendChild(videoPlayer);

    // Adicionar contêiner ao modal
    trailerModal.appendChild(videoContainer);

    // Adicionar modal ao body
    document.body.appendChild(trailerModal);

    if (playTrailerButton) {
        playTrailerButton.addEventListener('click', () => {
            videoPlayer.src = 'assets/video/polaroid.mp4';
            trailerModal.style.display = 'block';
            videoPlayer.play();
        });
    }

    // Função para fechar o modal
    function closeTrailerModal() {
        trailerModal.style.display = 'none';
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    }

    // Fechar o modal ao clicar no botão de fechar
    closeButton.addEventListener('click', closeTrailerModal);

    // Fechar o modal ao clicar fora do vídeo
    trailerModal.addEventListener('click', (event) => {
        if (event.target === trailerModal) {
            closeTrailerModal();
        }
    });

    // Sistema de votação
    const votingButtons = document.querySelectorAll('.opcoes-votacao button');
    votingButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            alert(`Você votou em ${e.target.textContent}!`);
        });
    });

    // Efeito hover nos itens do menu
    const menuItems = document.querySelectorAll('.menu_cabecalho a, .menu_config a');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', (e) => {
            e.target.style.color = '#e50914';
        });
        item.addEventListener('mouseleave', (e) => {
            e.target.style.color = '#ffffff';
        });
    });

    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mudança de cor do cabeçalho ao rolar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            cabecalho.classList.add('scrolled');
        } else {
            cabecalho.classList.remove('scrolled');
        }
    });

    // Toggle do menu mobile
    menuToggle.addEventListener('click', () => {
        menuCabecalho.classList.toggle('show');
    });

    // Funcionalidade do modal de pesquisa
    pesquisarLink.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
    });

    fecharModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    botaoPesquisa.addEventListener('click', () => {
        const termoPesquisa = document.getElementById('campo-pesquisa').value;
        alert(`Pesquisando por: ${termoPesquisa}`);
        modal.style.display = 'none';
    });
});