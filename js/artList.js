var isShop = sessionStorage.getItem('fromShop')
console.log(isShop)
const art = document.getElementById('art')
const shop = document.getElementById('shop')

function active() {
    if(isShop == "true") {
        shop.classList.add('active')
    } else 
    {
        art.classList.add('active')
    }
}

active()

function loc() {
    if(isShop == "true"){
        window.location.href="../artists/artShop.html"
    } else
    {
        window.location.href="../artists/artist/artAbout.html"
    }
}

function goTo(){
    sessionStorage.setItem('FromArtist', "SB19");
    loc();
}
function goTo1(){
    sessionStorage.setItem('FromArtist', "Bini");
    loc();
}
function goTo2(){
    sessionStorage.setItem('FromArtist', "Cup Of Joe");
    loc();
}
function goTo3(){
    sessionStorage.setItem('FromArtist', "Sarah Geronimo");
    loc();
}
function goTo4(){
    sessionStorage.setItem('FromArtist', "Juan Karlos Labajo");
    loc();
}

