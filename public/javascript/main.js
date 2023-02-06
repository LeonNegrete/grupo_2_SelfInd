let burguerBtn = document.querySelector('.burguer')
let mobileNav = document.querySelector('.burguer-nav')

burguerBtn.addEventListener('click',()=>{
    mobileNav.classList.toggle('is-active');
})