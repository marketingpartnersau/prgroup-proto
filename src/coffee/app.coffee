$ ->
	'use strict'

	$('.toggle-menu').on 'click', (e) ->
		e.preventDefault()
		$('nav.menu').toggleClass 'open'
		$(this).toggleClass 'fa-bars fa-times'
		$('body').toggleClass 'menu-open'

	$('.client-list .panel').on 'mouseenter', ->
		company = $(this).text()
		name = $(this).data 'person'

		$('.testimonial h4').text company
		$('.testimonial .cite').text name

		$('.clients .active').removeClass 'active'
		$(this).parent().addClass 'active'

	count = $('.contact form li').length
	$('form .next').on 'click', (e) ->
		e.preventDefault()

		current = $ '.contact form li:visible'
		next = current.next()
		
		console.log count

		if count is 2
			$(this).hide()
			$('.contact form [type="submit"]').show()

		if next.length
			current.hide()
			next.show()
			count--
		

	$('.contact form').on 'submit', (e) ->
		e.preventDefault()
		$(this).fadeOut()
		$('.contact .message').text 'Great! We will call or email you soon to further discuss your project.'

	$('a[href=""]').on 'click', ->
		return false;
