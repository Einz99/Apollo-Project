const button = document.querySelector('a.button')

button.addEventListener('click', () => {
    sessionStorage.setItem('fromShop', false);
    window.location.href="artList.html"
})