$(document).ready(function(){
  // For choosing Spotify music radio button
  $("track").on("click", function(){
    console.log("clicked!");
    var box = document.getElementsByClassName('rbChoice');
    box.innerHTML = "New text!";
  });



});
