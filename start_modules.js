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
            carregarConteudo("nav_area", "./source/modules/navbar.html")
        ]);
        console.log("[ OwO ] Página completamente carregada com êxito!");
        if (currentPage == "arts"){
            document.getElementById('arts').classList.add("active_nav_bt");
            document.getElementById('page_name').innerHTML = 'Galeria de artes <i class="fas fa-palette"></i>';
        }else if (currentPage == "projects"){
            document.getElementById('projects').classList.add("active_nav_bt");
            document.getElementById('page_name').innerHTML = 'Meus Projetos <i class="fas fa-gamepad"></i>';
        }else if (currentPage == "about"){
            document.getElementById('about').classList.add("active_nav_bt");
            document.getElementById('page_name').innerHTML = 'Sobre mim <i class="fas fa-user"></i>';
        }else if (currentPage == "tos"){
            document.getElementById('tos').classList.add("active_nav_bt");
            document.getElementById('page_name').innerHTML = 'Termos de serviço <i class="fas fa-scroll"></i>';
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
    }else{
        nav_open = true
        document.getElementById('navbt_open').innerHTML = '<i class="fas fa-times-circle"></i>'
        document.getElementById('navbar').classList.add('showing_all');
    }

    
}