var button= document.querySelector('.button');
var menu= document.querySelector('.menu');

button.onclick= function(){
    button.classList.toggle("active");
    menu.classList.toggle("active");
}