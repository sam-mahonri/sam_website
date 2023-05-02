var lang = localStorage.getItem('lang');

if (lang == null){
    window.location.replace("lang.html");
    console.log("primeira vez aqui ne")
} else{
    switch(lang){
        case 'pt': window.location.replace("index_ptbr.html"); break;
        case 'en': window.location.replace("index.html"); break;
        case 'set': break;
    }
    

}