$(document).ready(()=>{
  $('#d5').on("click", function(){
    // boxesAppear();
    animateBlog();
    animateRed();
    animateGreen();
    animateBlue();

  });
});

// function boxesAppear(){
//   $('.test').css({display: 'block'});
// }

function animateBlog(){
  console.log("Hi");
  $('#d4').animate({top: Math.floor(Math.random()*100) + "%", left: Math.floor(Math.random()*100) + "%"}, 3000, animateBlog);
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
