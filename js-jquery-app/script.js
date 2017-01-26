$(document).ready(()=>
{
  $(document).on("click", function(){
    animateRed();
    animateGreen();
    animateBlue();
  });
});

function animateRed()
{
  $('#d1').animate({top: Math.floor(Math.random()*100) + "%", left: Math.floor(Math.random()*100) + "%"}, 3000, animateRed);
}

function animateGreen()
{
  $('#d2').animate({top: Math.floor(Math.random()*100) + "%", left: Math.floor(Math.random()*100) + "%"}, 3000, animateGreen);
}

function animateBlue()
{
  $('#d3').animate({top: Math.floor(Math.random()*100) + "%", left: Math.floor(Math.random()*100) + "%"}, 3000, animateBlue);
}
