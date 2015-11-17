$(function() {
  $('.card').click(function(){
    $('.card').removeClass('card--big').addClass('card--small');
    $(this).toggleClass('.card--small card--big');
  });
  $('.card').flip(); 
});