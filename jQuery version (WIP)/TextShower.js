/*!
 * TextShower - jQuery version
 * © 2013 Yohaï Berreby <yohaiberreby@gmail.com>
 * License: https://github.com/filsmick/TextShower/blob/master/LICENSE
 *
 * http://filsmick.github.io/TextShower/
 * http://github.com/filsmick/TextShower/
 */

// From https://gist.github.com/jackfuchs/556448 and http://stackoverflow.com/a/7265037/2754323

function supportsTransitions() {
	var b = document.body || document.documentElement;
	var s = b.style;
	var p = 'transition';
	if(typeof s[p] == 'string') { return true; }

	// Tests for vendor specific prop
	var v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'];
	p = p.charAt(0).toUpperCase() + p.substr(1);
	for(var i=0; i < v.length; i++) {
		if(typeof s[v[i] + p] == 'string') { return true; }
	}
	return false;
}

transitions = supportsTransitions();

function TextShower(heightDelay, marginDelay, heightTiming, marginTiming, modifyTitle) {
	/*jshint multistr: true */

	// If an argument is not specified, use default one
	heightDelay = typeof heightDelay !== 'undefined' ? heightDelay : '0.8s';
	marginDelay = typeof marginDelay !== 'undefined' ? marginDelay : '0.3s';
	heightTiming = typeof heightTiming !== 'undefined' ? heightTiming : 'ease';
	marginTiming = typeof marginTiming !== 'undefined' ? marginTiming : 'linear';
	modifyTitle = typeof modifyTitle !== 'undefined' ? modifyTitle : true;

	// Check for the custom meta tag and retrieve its data
	if ($('meta[data-TextShower]').length !== 0) {
		var settings = $('meta[data-TextShower]').attr('data-TextShower');
		var settingsArray = settings.split(' ');

		heightDelay = typeof settingsArray[0] !== 'undefined' && settingsArray[0] !== 'none' ? settingsArray[0] : heightDelay;
		marginDelay = typeof settingsArray[1] !== 'undefined' && settingsArray[1] !== 'none' ? settingsArray[1] : marginDelay;
		heightTiming = typeof settingsArray[2] !== 'undefined' && settingsArray[2] !== 'none' ? settingsArray[2] : heightTiming;
		marginTiming = typeof settingsArray[3] !== 'undefined' && settingsArray[3] !== 'none' ? settingsArray[3] : marginTiming;
		modifyTitle = typeof settingsArray[4] !== 'undefined' && settingsArray[4] !== 'none' ? (settingsArray[4] == 'true') : modifyTitle;
	}

	// New String object method - adds a string inside another at specified index
	String.prototype.addStrAt = function(idx, s) {
		return (this.slice(0, idx) + s + this.slice(idx + 0));
	};

	// Anchors support

	function anchorNav(titleElement, textElement, changeState, deployed, durationArray) {
		if (window.location.hash.substring(1) == titleElement.id && window.location.hash.substring(1) !== '') {
			textElement.className += ' notransition';

			if (!deployed) {
				changeState(titleElement, textElement);
			}

			titleElement.scrollIntoView(true);
			textElement.addClass('notransition');
		}
	}

	// Add transitions rules to the page if CSS transitions are supported
	if (transitions) {
		var style = document.createElement('style'),
		transition = 'height ' + heightDelay + ', margin ' + marginDelay + ' ' + marginTiming + ', padding-top ' + marginDelay + ' ' + marginTiming + ', padding-bottom ' + heightDelay + ' ' + heightTiming;
		style.type = 'text/css';
		style.innerHTML = '.TextShower-title {'+
		'-moz-user-select: none;'+
		'-webkit-user-select: none;'+
		'-ms-user-select:none;'+
		'user-select:none;'+
		'}'+
		'.TextShower-text {'+
		'overflow: hidden;'+
		'-webkit-transition: ' + transition + ';' +
		'-moz-transition: ' + transition + ';' +
		'-o-transition: ' + transition + ';' +
		'-ms-transition: ' + transition + ';' +
		'transition: ' + transition + ';' +
		'}'+
		'.notransition {'+
		'-webkit-transition: none !important;'+
		'-moz-transition: none !important;'+
		'-o-transition: none !important;'+
		'-ms-transition: none !important;'+
		'transition: none !important;'+
		'}';
		document.getElementsByTagName('head')[0].appendChild(style);
	}

	/-(.)/.exec(heightTiming);
	heightTiming = heightTiming.replace(/-(.)/, RegExp.$1.toUpperCase());
	/-(.)/.exec(marginTiming);
	marginTiming = marginTiming.replace(/-(.)/, RegExp.$1.toUpperCase());


	// Prepare boxes
	function prepareBox(box) {
		var titleElement = $(box).find($('.TextShower-title')),
			textElement = $(box).find($('.TextShower-text'));

		if (modifyTitle) {
			titleElement.text(titleElement.text().addStrAt(0, "+ "));
		}

		textElement.addClass('notransition');

		var prevHeight = textElement.css('height');
		var prevMargin = textElement.css('margin');
		var prevPaddingTop = textElement.css('paddingTop');
		var prevPaddingBottom = textElement.css('paddingBottom');
		textElement.css('height', '0px');
		textElement.css('margin', '0 0 0 0');
		textElement.css('padding-top', '0');
		textElement.css('padding-bottom', '0');

		titleElement.css('cursor', 'pointer');
		titleElement.css('margin-bottom', titleElement.css('margin-bottom').substring(0, -2) / 2);

		textElement.css('height');

		textElement.removeClass('notransition');

		var deployed = false;

		var durationArray = [],
			pureHeightDelay = parseFloat(heightDelay.match(/\d+\.?\d*/g)),
			pureMarginDelay = parseFloat(marginDelay.match(/\d+\.?\d*/g));
		durationArray.push(pureHeightDelay, pureMarginDelay);


		$(window).bind("hashchange", function() {
			anchorNav(titleElement, textElement, changeState, deployed, durationArray);
		});

		anchorNav(titleElement, textElement, changeState, deployed, durationArray);

		// Toggle box state
		function changeState(titleElement, textElement) {
			if (!deployed) {
				deployed = true;

				if (modifyTitle) {
					titleElement.text(titleElement.text().replace('+', '-'));
				}

				var actualHeight = textElement.css('height');
				textElement.addClass('notransition');
				textElement.css('height', 'auto');
				prevHeight = textElement.height() + 'px';
				textElement.css('height', actualHeight);

				textElement.height(); // Refreshes height
				textElement.removeClass('notransition');

				function transEnd() {
					textElement.addClass('notransition');
					textElement.css('height', 'auto');
					prevHeight = textElement.height() + 'px';
				}

				if (!transitions) {
					textElement.animate({height: prevHeight}, {duration: heightDelay, easing: 'swing', queue: false, complete: transEnd});
					textElement.animate({margin: prevMargin}, {duration: marginDelay, easing: 'linear', queue: false});
					textElement.animate({paddingTop: prevPaddingTop}, {duration: marginDelay, easing: 'linear', queue: false});
					textElement.animate({paddingBottom: prevPaddingBottom}, {duration: marginDelay, easing: 'linear', queue: false});
				} else {
					textElement.css('height', prevHeight);
					textElement.css('margin', prevMargin);
					textElement.css('padding-top', prevPaddingTop);
					textElement.css('padding-bottom', prevPaddingBottom);

					var timer = setTimeout(transEnd, Math.max.apply(Math, durationArray) * 1000);
				}
			} else {
				deployed = false;

				if (modifyTitle) {
					titleElement.text(titleElement.text().replace('-', '+'));
				}

				if (timer !== undefined) { clearTimeout(timer); }
				prevHeight = textElement.height();
				textElement.css('height', textElement.height() + "px");

				setTimeout(function() {
					textElement.removeClass('notransition');
					if (!transitions) {
						textElement.animate({height: '0px'}, {duration: heightDelay, easing: 'swing', queue: false});
						textElement.animate({margin: '0 0 0 0'}, {duration: marginDelay, easing: 'linear', queue: false});
						textElement.animate({paddingTop: '0'}, {duration: marginDelay, easing: 'linear', queue: false});
						textElement.animate({paddingBottom: '0'}, {duration: marginDelay, easing: 'linear', queue: false});
					} else {
						textElement.css('height', '0px');
						textElement.css('margin', '0 0 0 0');
						textElement.css('padding-top', '0');
						textElement.css('padding-bottom', '0');
					}
				}, 0);
			}
		}

		// Toggle box state on click
		$(titleElement).click(function() {
			changeState(titleElement, textElement);
		});
	}

	var boxes = document.getElementsByClassName('TextShower-box');

	for (var i = boxes.length - 1; i >= 0; i--) {
		prepareBox(boxes[i]);
	}
}

// Edit the arguments of this function to customize the global script behavior
// Can be overwritten by the custom meta tag
TextShower('0.8s', '0.3s', 'ease', 'linear', true);