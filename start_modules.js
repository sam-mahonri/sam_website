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
        if(page_lang == "pt"){
            await Promise.all([
                carregarConteudo("nav_area", "./source/modules/navbar.html"),
                carregarConteudo("footer", "./source/modules/footer.html"),
                carregarConteudo("warn_area", "./source/modules/warning.html"),
                carregarConteudo("floating_area", "./source/modules/goup.html"),
                carregarConteudo("lang_area", "./source/modules/lang.html")
            ]);
        }else if(page_lang == "en"){
            await Promise.all([
                carregarConteudo("nav_area", "./source/modules/navbar_en.html"),
                carregarConteudo("footer", "./source/modules/footer_en.html"),
                carregarConteudo("warn_area", "./source/modules/warning_en.html"),
                carregarConteudo("floating_area", "./source/modules/goup.html"),
                carregarConteudo("lang_area", "./source/modules/lang.html")
            ]);
        }
        
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

        if (localStorage.getItem('current_lang') == null){
            document.getElementById('lang_menu').classList.add('pop_lang_opened');
            localStorage.setItem('current_lang', "pt");
        }else if(localStorage.getItem('current_lang') == 'en'){
            if(page_lang == "pt"){
                window.location.href = '/en_' + currentPage
            }
        }

        if(page_lang == "pt"){
            localStorage.setItem('current_lang', "pt")
        }else if (page_lang == "en"){
            localStorage.setItem('current_lang', "en")
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

function openLangMenu(){
    document.getElementById('lang_menu').classList.add('pop_lang_opened');
}

function closeThisParent(self){
    self.parentNode.classList.remove('pop_lang_opened');
}

var loaded_images = 0;
var buf_size = 0;
var max_img = 0;

function gotoTranslation(lang){
    localStorage.setItem('current_lang', lang);
    if (lang == "en"){
        window.location.href = "/en_" + currentPage
    }else{
        window.location.href = "/" + currentPage
    }
    
}
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


var prices_show = false;

function seePrices(este){
    if(!prices_show){
        este.innerHTML = 'Ocultar preços<i class="fas fa-money-bill-wave"></i><i class="fas fa-chevron-circle-up"></i>';
        prices_show = true
        document.getElementById('prices').classList.remove('hide_element');
    }else{
        este.innerHTML = 'Ver preços<i class="fas fa-money-bill-wave"></i><i class="fas fa-chevron-circle-down"></i>';
        prices_show = false
        document.getElementById('prices').classList.add('hide_element');
    }
}

function onlyShowPrices(){
    document.getElementById('prices').classList.remove('hide_element');
    document.getElementById('show_prices').innerHTML = 'Ocultar preços<i class="fas fa-money-bill-wave"></i><i class="fas fa-chevron-circle-up"></i>';
    prices_show = true
}

