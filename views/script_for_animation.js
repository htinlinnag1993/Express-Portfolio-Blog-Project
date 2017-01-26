$(document).ready(()=>{
  $(#ani_click).on("click", function(){
    boxesAppear();
    animateRed();
    animateGreen();
    animateBlue();
  });
});

function boxesAppear(){
  $('.test').css({display: 'block'});
}

function animateRed(){
  $('#d1').animate({top: Math.floor(Math.random()*100) + "%", left: Math.floor(Math.random()*100) + "%"}, 3000, animateRed);
}

function animateGreen(){
  $('#d2').animate({top: Math.floor(Math.random()*100) + "%", left: Math.floor(Math.random()*100) + "%"}, 3000, animateGreen);
}

function animateBlue(){
  $('#d3').animate({top: Math.floor(Math.random()*100) + "%", left: Math.floor(Math.random()*100) + "%"}, 3000, animateBlue);
}
