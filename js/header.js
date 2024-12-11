//Responsive Menu Bar
const menuBtn = document.querySelector(".menu-btn");
const navigation = document.querySelector(".navigation");
const ABtitle = document.querySelector(".ABtitle");
const rightmost2 = document.querySelector(".rightmost2");

window.addEventListener("scroll", function(){
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
});

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    navigation.classList.toggle("active");
    ABtitle.classList.toggle("active");
    rightmost2.classList.toggle("active");
})


