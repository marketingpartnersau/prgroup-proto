$(function() {
  'use strict';
  var count;
  $('.toggle-menu').on('click', function(e) {
    e.preventDefault();
    $('nav.menu').toggleClass('open');
    $(this).toggleClass('fa-bars fa-times');
    return $('body').toggleClass('menu-open');
  });
  $('.client-list .panel').on('mouseenter', function() {
    var company, name;
    company = $(this).text();
    name = $(this).data('person');
    $('.testimonial h4').text(company);
    $('.testimonial .cite').text(name);
    $('.clients .active').removeClass('active');
    return $(this).parent().addClass('active');
  });
  count = $('.contact form li').length;
  $('form .next').on('click', function(e) {
    var current, next;
    e.preventDefault();
    current = $('.contact form li:visible');
    next = current.next();
    console.log(count);
    if (count === 2) {
      $(this).hide();
      $('.contact form [type="submit"]').show();
    }
    if (next.length) {
      current.hide();
      next.show();
      return count--;
    }
  });
  $('.contact form').on('submit', function(e) {
    e.preventDefault();
    $(this).fadeOut();
    return $('.contact .message').text('Great! We will call or email you soon to further discuss your project.');
  });
  return $('a[href=""]').on('click', function() {
    return false;
  });
});
