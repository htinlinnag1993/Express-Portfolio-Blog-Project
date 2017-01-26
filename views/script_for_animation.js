$(document).ready(()=>{
  $('#d5').on("click", function(){
    // boxesAppear();
    animateRed();
    animateGreen();
    animateBlue();
    animateBlog();
  });
});

// function boxesAppear(){
//   $('.test').css({display: 'block'});
// }

function animateRed(){
  $('#d1').animate({top: Math.floor(Math.random()*100) + "%", left: Math.floor(Math.random()*100) + "%"}, 3000, animateRed);
}

function animateGreen(){
  $('#d2').animate({top: Math.floor(Math.random()*100) + "%", left: Math.floor(Math.random()*100) + "%"}, 3000, animateGreen);
}

function animateBlue(){
  $('#d3').animate({top: Math.floor(Math.random()*100) + "%", left: Math.floor(Math.random()*100) + "%"}, 3000, animateBlue);
}

function animateBlog(){
  $('#d4').animate({top: Math.floor(Math.random()*100) + "%", left: Math.floor(Math.random()*100) + "%"}, 3000, animateBlog);
}
