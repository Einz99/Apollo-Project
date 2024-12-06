//Responsive Menu Bar
const menuBtn = document.querySelector(".menu-btn");
const navigation = document.querySelector(".navigation")

window.addEventListener("scroll", function(){
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
});

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    navigation.classList.toggle("active");
})


