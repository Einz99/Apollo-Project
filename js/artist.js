const bini = document.getElementById('Bini');
const COJ = document.getElementById('COJ');
const JK = document.getElementById('JK');
const SG = document.getElementById('SG');
const SB19 = document.getElementById('SB19');

bini.addEventListener('click', () => {
    sessionStorage.setItem('FromArtist', "Bini");
    window.location.href="artist/artAbout.php";
})
COJ.addEventListener('click', () => {
    sessionStorage.setItem('FromArtist', "Cup of Joe");
    window.location.href="artist/artAbout.php";
})
JK.addEventListener('click', () => {
    sessionStorage.setItem('FromArtist', "Juan Karlos Labajo");
    window.location.href="artist/artAbout.php";
})
SG.addEventListener('click', () => {
    sessionStorage.setItem('FromArtist', "Sarah Geronimo");
    window.location.href="artist/artAbout.php";
})
SB19.addEventListener('click', () => {
    sessionStorage.setItem('FromArtist', "SB19");
    window.location.href="artist/artAbout.php";
})

function Binishop() {
    sessionStorage.setItem('FromArtist', "Bini");
    window.location.href="artist/artShop.php";
}
function COJShop() {
    sessionStorage.setItem('FromArtist', "Cup of Joe");
    window.location.href="artist/artShop.php";
}
function JKShop() {
    sessionStorage.setItem('FromArtist', "Juan Karlos Labajo");
    window.location.href="artist/artShop.php";
}
function SGShop() {
    sessionStorage.setItem('FromArtist', "Sarah Geronimo");
    window.location.href="artist/artShop.php";
}
function SB19Shop() {
    sessionStorage.setItem('FromArtist', "SB19");
    window.location.href="artist/artShop.php";
}