async function carregarConteudo(elementoId, url) {
    var response = await fetch(url);
    if (response.ok) {
        var text = await response.text();
        document.getElementById(elementoId).innerHTML = text;
    } else {
        throw new Error(response.statusText);
    }
}

async function carregarTodosOsElementos() {
    try {
        await Promise.all([
            carregarConteudo("nav_area", "./source/modules/navbar.html"),
            carregarConteudo("footer", "./source/modules/footer.html"),
            carregarConteudo("warn_area", "./source/modules/warning.html")
        ]);
        console.log("[ OwO ] Página completamente carregada com êxito!");
        if (currentPage == "arts"){
            document.getElementById('arts').classList.add("active_nav_bt");
            document.getElementById('page_name').innerHTML = '<i class="fas fa-palette"></i>';
        }else if (currentPage == "projects"){
            document.getElementById('projects').classList.add("active_nav_bt");
            document.getElementById('page_name').innerHTML = '<i class="fas fa-gamepad"></i>';
        }else if (currentPage == "about"){
            document.getElementById('about').classList.add("active_nav_bt");
            document.getElementById('page_name').innerHTML = '<i class="fas fa-user"></i>';
        }else if (currentPage == "tos"){
            document.getElementById('tos').classList.add("active_nav_bt");
            document.getElementById('page_name').innerHTML = '<i class="fas fa-scroll"></i>';
        }else if (currentPage == "music"){
            document.getElementById('music').classList.add("active_nav_bt");
            document.getElementById('page_name').innerHTML = '<i class="fas fa-music"></i>';
        }else if (currentPage == "comms"){
            document.getElementById('comms').classList.add("active_nav_bt");
            document.getElementById('page_name').innerHTML = '<i class="fas fa-heart"></i>';
        }else{
            document.getElementById('page_name').innerHTML = '';
        }
    } catch (error) {
        console.error("[ ERR ] Falha ao carregar conteúdo da página! - " + error);
    }
}

console.log("[ UwU ] Carregando elementos da página...");
carregarTodosOsElementos();

var nav_open = false
function toggleMenu(){
    if (nav_open){
        nav_open = false
        document.getElementById('navbt_open').innerHTML = '<i class="fas fa-bars"></i>'
        document.getElementById('navbar').classList.remove('showing_all');
        document.getElementById('page_name').classList.remove('hide_element');
    }else{
        nav_open = true
        document.getElementById('navbt_open').innerHTML = '<i class="fas fa-times-circle"></i>'
        document.getElementById('navbar').classList.add('showing_all');
        document.getElementById('page_name').classList.add('hide_element');
    }

    
}

var loaded_images = 0;
var buf_size = 0;
var max_img = 0;

function loadArts() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const gallery = document.querySelector('.gallery');
            buf_size = Object.keys(data).length;
            while(max_img < 5 && loaded_images < buf_size){
                const galleryItem = document.createElement('div');
                galleryItem.classList.add('gallery-item');

                const image = document.createElement('img');
                image.src = data[loaded_images].foto;
                image.alt = 'Imagem';
                image.loading = 'lazy';
                
                const link = document.createElement('a');
                link.href = data[loaded_images].post;
                link.innerHTML = '<i class="fas fa-heart"></i>';
                link.target = "_blank";
                
                galleryItem.appendChild(image);
                galleryItem.appendChild(link);
                gallery.appendChild(galleryItem);
                max_img++;
                loaded_images++;
            }
            if (loaded_images >= buf_size - 1){
                document.getElementById('load_more_img').classList.add('hide_element');
            }
        })
        .catch(error => console.error('Erro ao carregar o JSON:', error));
}

function continueLoadingImages(){
    max_img = 0;
    loadArts();
}

function hide_splash(){
    document.getElementById('splash_all').classList.add('hide_element');
}

setTimeout(hide_splash, 2500);