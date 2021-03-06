###
TextShower v1.0.3
© 2013 Yohaï Berreby (@filsmick) <yohaiberreby@gmail.com>
See http://github.com/filsmick/TextShower/ for license and instructions
###

# Executes the main function, giving it $ as an alias of the jQuery object
# It allows the script to run under WordPress's noConflict mode
do ($ = window.jQuery) ->
	$ ->
		# Edit these variables to customize the script's behavior
		# Delete hyphens and make next letter uppercase in timings
		# Example: 'ease-in' becomes 'easeIn"
		heightDelay = '0.5s'
		marginDelay = '0.55s'
		heightTiming = 'easeIn'
		marginTiming = 'ease'
		modifyTitle = true
		CSSTransitions = true
		# Set the above variable to false to use only jQuery animations
		
		# These variables shouldn't be modified
		closedDynStr = '+ '
		openedDynStr = '- '
	
		# Checks for CSS transitions support
		if CSSTransitions
			transitions = false
			prefixes = ['Webkit', 'Moz', 'O', 'ms']
			div = document.createElement('div')
		
			if div.style.transition 
				transitions = true
			else
				prefixesLength = prefixes.length
				for i in prefixesLength
					if (div.style[prefixes[i] + 'Transition'] isnt undefined)
						transitions = true
						break
		else transitions = false
		
		# Checks for a custom meta tag and retrieve its data
		if $("meta[data-TextShower]").length isnt 0
			settings = $("meta[data-TextShower]").attr("data-TextShower").split(" ")
			heightDelay ?= settings[0] if settings[0] isnt "default"
			marginDelay ?= settings[1] if settings[1] isnt "default"
			heightTiming ?= settings[2] if settings[2] isnt "default"
			modifyTitle ?= (settings[3] is 'true') if settings[3] isnt "default"
			CSSTransitions ?= (settings[4] is 'true') if settings[4] isnt "default"
	
		# Adds transitions rules to the page if CSS transitions are supported
		style = document.createElement('style')
		commonStyle = 
			"""
			.TextShower-title {
				-moz-user-select: none;
				-webkit-user-select: none;
				-ms-user-select: none;
				user-select: none;
				cursor: pointer;
			}
			.TextShower-text {
				overflow: hidden;
			}
			"""
		style.type = 'text/css'
		
		if transitions
			transition = 
			"height #{heightDelay} #{heightTiming}, 
			margin #{marginDelay} #{marginTiming}, 
			padding-top #{marginDelay} #{marginTiming}, 
			padding-bottom #{heightDelay} #{heightTiming}"
			
			style.innerHTML = commonStyle +
				"""
				.TextShower-text {
					-Webkit-transition: #{transition};
					-Moz-transition: #{transition};
					-O-transition: #{transition};
					-ms-transition: #{transition};
					transition: #{transition};
				}
				.notransition { 
					-Webkit-transition: none !important;
					-Moz-transition: none !important;
					-O-transition: none !important;
					-ms-transition: none !important;
					transition: none !important;
				}
				"""
		# Else, use only the needed CSS
		else style.innerHTML = commonStyle
		document.querySelector('head').appendChild(style)
		
		# Constructor definition
		# All boxes are instances of the class TSBox
		class TSBox
			constructor: (box) ->
				@titleElement = $(box).find($('.TextShower-title'))
				@textElement = $(box).find($('.TextShower-text'))
				@deployed = false
				
				if modifyTitle
					@titleElement.text(closedDynStr + @titleElement.text())
		
				@textElement.addClass('notransition')
		
				@prevHeight = @textElement.css('height')
				@prevMargin = @textElement.css('margin')
				@prevPaddingTop = @textElement.css('paddingTop')
				@prevPaddingBottom = @textElement.css('paddingBottom')
				@textElement.css('height', '0px')
					.css('margin', '0 0 0 0')
					.css('padding-top', '0')
					.css('padding-bottom', '0')
				@titleElement.css('margin-bottom', @titleElement.css('margin-bottom').substring(0, -2) / 2)
				# You can add .css() here to define the "JavaScript" style of your boxes.
				# Example: @titleElement.css('color', 'blue')
				# All your titles would become blue, no need of a special stylesheet.
		
				setTimeout (=>
					@textElement.removeClass('notransition')
				), 0
		
				# Extracts the float value of the delays and converts the greatest in ms
				floatHeightDelay = parseFloat(heightDelay.match(/\d+\.?\d*/g))
				floatMarginDelay = parseFloat(marginDelay.match(/\d+\.?\d*/g))
				@longestDuration = Math.max.apply(Math, [floatHeightDelay, floatMarginDelay]) * 1000

				if $(box).hasClass('TextShower-open') then @changeState()
		
				$(@titleElement).click =>
					@changeState()
		
				$(window).bind "hashchange", =>
					@anchorNav()

				@anchorNav()

			openBox: ->
				@deployed = true
			
				if modifyTitle
					@titleElement.text(@titleElement.text().replace(closedDynStr,
						openedDynStr))
			
				actualHeight = @textElement.height() + 'px'
				@textElement.addClass('notransition')
			
				@textElement.css('height', 'auto')
				@prevHeight = @textElement.height() + 'px'
				@textElement.css('height', actualHeight)
				# The style modifications applied here won't be animated, even if 
				# their properties are in the 'transitions' var.
			
				@textElement.height() # Refreshes height
				@textElement.removeClass('notransition')
	
				transEnd = =>
					@textElement.addClass('notransition').css('height', 'auto')
					@prevHeight = @textElement.height() + 'px'
			
				if !transitions
					@textElement
					.animate({ height: @prevHeight }, {
						duration: heightDelay,
						easing: 'swing',
						queue: false,
						complete: transEnd
					})
					
					.animate({ margin: @prevMargin }, {
						duration: marginDelay,
						easing: 'swing',
						queue: false
					})

					.animate({ paddingTop: @prevPaddingTop }, {
						duration: marginDelay,
						easing: 'swing',
						queue: false
					})
					
					.animate({ paddingBottom: @prevPaddingBottom }, {
						duration: marginDelay,
						easing: 'swing',
						queue: false
					})
					# You can add jQuery .animate() here
				else
					@textElement.css('height', @prevHeight)
						.css('margin', @prevMargin)
						.css('padding-top', @prevPaddingTop)
						.css('padding-bottom', @prevPaddingBottom)
					# Add code to be run with CSS transitions when the box is opened here
					# (will work only if you have added your properties to the 'transition' variable)
	
					# When the longest transition ended, fix the height of the box
					@timer = setTimeout(transEnd, Math.max.apply(Math, @durationArray) * 1000)
			
			closeBox: ->
				@deployed = false
			
				if modifyTitle
					@titleElement.text(@titleElement.text().replace(openedDynStr, closedDynStr))
			
				if @timer? then clearTimeout(@timer)
				@prevHeight = @textElement.height()
				@textElement.css('height', @textElement.height() + "px")
			
				# Here the code will be run without transitions when the box is closed
	
				setTimeout (=>
					@textElement.removeClass('notransition')
					if !transitions
						@textElement
						.animate({ height: '0px' }, {
							duration: heightDelay,
							easing: 'swing',
							queue: false
						})
						
						.animate({ margin: '0 0 0 0' }, {
							duration: marginDelay,
							easing: 'swing',
							queue: false
						})
						
						.animate({ paddingTop: '0' }, {
							duration: marginDelay,
							easing: 'swing',
							queue: false
						})
						
						.animate({ paddingBottom: '0' }, {
							duration: marginDelay,
							easing: 'swing',
							queue: false
						})
						# You can add jQuery .animate() here
					else
						@textElement.css('height', '0px')
							.css('margin', '0 0 0 0')
							.css('padding-top', '0')
							.css('padding-bottom', '0')
						# Add code to be run with CSS transitions when the box is opened here
						# Will only work if you have added your properties to the 'transition' variable
				), 0
	
			changeState: (deployed) ->
				# If no argument is given, use the instance's deployed property
				if not deployed? then deployed = @deployed
	
				if deployed then @closeBox()
				if not deployed then @openBox()
			
			# Anchors support
			anchorNav: ->
				hash = window.location.hash.substring(1)
				if hash is @titleElement.attr('id') and hash isnt ''
					@changeState(false)
					# Scrolls to the title of the box once the longest transition ended
					setTimeout(@titleElement[0].scrollIntoView(true), @longestTransition)

		# Creates a TSBox instance for all HTML boxes
		boxes = $('.TextShower-box')
		for box in boxes
			new TSBox(box)
