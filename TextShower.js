/*!
 * TextShower v1.0.3 - jQuery version
 * © 2013 Yohaï Berreby <yohaiberreby@gmail.com>
 * See http://github.com/filsmick/TextShower/ for license and instructions
 */

function TextShower(heightDelay, marginDelay, heightTiming, modifyTitle) {
	marginTiming = 'ease-out';

	// If an argument is not specified, use default one
	heightDelay = typeof heightDelay !== 'undefined' ? heightDelay : '0.8s';
	marginDelay = typeof marginDelay !== 'undefined' ? marginDelay : '0.3s';
	heightTiming = typeof heightTiming !== 'undefined' ? heightTiming : 'ease';
	modifyTitle = typeof modifyTitle !== 'undefined' ? modifyTitle : true;

	// Check for the custom meta tag and retrieve its data
	if ($('meta[data-TextShower]').length !== 0) {
		var settings = $('meta[data-TextShower]').attr('data-TextShower'),
		    settingsArray = settings.split(' ');

		heightDelay = typeof settingsArray[0] !== 'undefined' && settingsArray[0] !== 'default' ? settingsArray[0] : heightDelay;
		marginDelay = typeof settingsArray[1] !== 'undefined' && settingsArray[1] !== 'default' ? settingsArray[1] : marginDelay;
		heightTiming = typeof settingsArray[2] !== 'undefined' && settingsArray[2] !== 'default' ? settingsArray[2] : heightTiming;
		modifyTitle = typeof settingsArray[3] !== 'undefined' && settingsArray[3] !== 'default' ? (settingsArray[3] == 'true') : modifyTitle;
	}

	// Snippet from https://gist.github.com/jackfuchs/556448 and http://stackoverflow.com/a/7265037/2754323
	var b = document.body || document.documentElement, s = b.style,
	    p = 'transition', i;

	if (typeof s[p] == 'string') {
		transitions = true;
	}

	// Tests for vendor specific prop
	var v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'],
	    vLength = v.length;

	p = p.charAt(0).toUpperCase() + p.substr(1);

	for (i = 0; i < vLength; i++) {
		if (typeof s[v[i] + p] == 'string') {
			transitions = true;
		}
	}

	transitions = false;
	// Uncomment the line above to use jQuery transitions instead of CSS ones

	// Add transitions rules to the page if CSS transitions are supported
	var style = document.createElement('style'), commonStyle =
		'.TextShower-title {'+
			'-moz-user-select: none;'+
			'-webkit-user-select: none;'+
			'-ms-user-select:none;'+
			'user-select:none;'+
			'cursor: pointer;'+
		'}';
	style.type = 'text/css';

	if (transitions) {
		transition = 'height ' + heightDelay + ' ' + heightTiming + ', margin ' + marginDelay + ' ' + marginTiming + ', padding-top ' + marginDelay + ' ' + marginTiming + ', padding-bottom ' + heightDelay + ' ' + heightTiming;
		style.innerHTML = commonStyle +
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
		
	} else {
		style.innerHTML = commonStyle;
	}
	document.getElementsByTagName('head')[0].appendChild(style);

	// Replaces hyphens of CSS properties
	/-(.)/.exec(heightTiming);
	heightTiming = heightTiming.replace(/-(.)/, RegExp.$1.toUpperCase());
	/-(.)/.exec(marginTiming);
	marginTiming = marginTiming.replace(/-(.)/, RegExp.$1.toUpperCase());
	
	// Constructor definition
	// All boxes are treated as instances of class TextShowerBox
	function TextShowerBox(box) {
		var that = this;
		this.titleElement = $(box).find($('.TextShower-title'));
		this.textElement = $(box).find($('.TextShower-text'));
		this.deployed = false;
		
		if (modifyTitle) {
			this.titleElement.text("+ " + this.titleElement.text());
		}

		this.textElement.addClass('notransition');

		this.prevHeight = this.textElement.css('height');
		this.prevMargin = this.textElement.css('margin');
		this.prevPaddingTop = this.textElement.css('paddingTop');
		this.prevPaddingBottom = this.textElement.css('paddingBottom');
		this.textElement.css('height', '0px');
		this.textElement.css('margin', '0 0 0 0');
		this.textElement.css('padding-top', '0');
		this.textElement.css('padding-bottom', '0');
		this.titleElement.css('margin-bottom', this.titleElement.css('margin-bottom').substring(0, -2) / 2);
		// You can add .css() here to define the "JavaScript" style of your boxes. Example:
		// this.titleElement.css('color', 'blue');
		// All your boxes will become blue!

		setTimeout(function() {
			that.textElement.removeClass('notransition');
		}, 0);

		this.durationArray = [];
		
		var pureHeightDelay = parseFloat(heightDelay.match(/\d+\.?\d*/g)),
		    pureMarginDelay = parseFloat(marginDelay.match(/\d+\.?\d*/g));
		this.durationArray.push(pureHeightDelay, pureMarginDelay);

		$(window).bind("hashchange", function() {
			that.anchorNav();
		});

		this.anchorNav();

		$(this.titleElement).click(function() {
			that.changeState();
		});
	}

	TextShowerBox.prototype = {
		openBox: function() {
			this.deployed = true;
			var that = this;
		
			if (modifyTitle) {
				this.titleElement.text(this.titleElement.text().replace('+', '-'));
			}
		
			var actualHeight = this.textElement.height() + 'px';
			this.textElement.addClass('notransition');
		
			this.textElement.css('height', 'auto');
			this.prevHeight = this.textElement.height() + 'px';
			this.textElement.css('height', actualHeight);
			// The style modifications you apply here won't be animated, even if their
			// properties are in the 'transitions' var.
		
			this.textElement.height(); // Refreshes height
			this.textElement.removeClass('notransition');

			function transEnd() {
				that.textElement.addClass('notransition');
				that.textElement.css('height', 'auto');
				that.prevHeight = that.textElement.height() + 'px';
			}
		
			if (!transitions) {
				this.textElement.animate({ height: this.prevHeight }, {
					duration: heightDelay,
					easing: 'swing',
					queue: false,
					complete: transEnd
				});
				
				this.textElement.animate({ margin: this.prevMargin }, {
					duration: marginDelay,
					easing: 'swing',
					queue: false
				});
				
				this.textElement.animate({ paddingTop: this.prevPaddingTop }, {
					duration: marginDelay,
					easing: 'swing',
					queue: false
				});
				
				this.textElement.animate({ paddingBottom: this.prevPaddingBottom }, {
					duration: marginDelay,
					easing: 'swing',
					queue: false
				});
				// You can add jQuery .animate() here
			} else {
				this.textElement.css('height', this.prevHeight);
				this.textElement.css('margin', this.prevMargin);
				this.textElement.css('padding-top', this.prevPaddingTop);
				this.textElement.css('padding-bottom', this.prevPaddingBottom);
				// Add code to be run with CSS transitions when the box is opened here
				// (will work only if you have added your properties to the 'transition' variable)
		
				this.timer = setTimeout(transEnd, Math.max.apply(Math, this.durationArray) * 1000);
			}
		},
		
		closeBox: function() {
			this.deployed = false;
		
			if (modifyTitle) {
				this.titleElement.text(this.titleElement.text().replace('-', '+'));
			}
		
			if (this.timer !== undefined) { clearTimeout(this.timer); }
			this.prevHeight = this.textElement.height();
			this.textElement.css('height', this.textElement.height() + "px");
		
			// Here code will be run without transitions when the box is closed

			var that = this;
			setTimeout(function() {
				// And, well, also here
				that.textElement.removeClass('notransition');
				if (!transitions) {
					that.textElement.animate({ height: '0px' }, {
						duration: heightDelay,
						easing: 'swing',
						queue: false
					});
					
					that.textElement.animate({ margin: '0 0 0 0' }, {
						duration: marginDelay,
						easing: 'swing',
						queue: false
					});
					
					that.textElement.animate({ paddingTop: '0' }, {
						duration: marginDelay,
						easing: 'swing',
						queue: false
					});
					
					that.textElement.animate({ paddingBottom: '0' }, {
						duration: marginDelay,
						easing: 'swing',
						queue: false
					});
					// You can add jQuery .animate() here
				} else {
					that.textElement.css('height', '0px');
					that.textElement.css('margin', '0 0 0 0');
					that.textElement.css('padding-top', '0');
					that.textElement.css('padding-bottom', '0');
					// Add code to be run with CSS transitions when the box is opened here
					// (will only work if you have added your properties to the 'transition' variable)
				}
			}, 0);
		},

		changeState: function(deployed) {
			if (deployed === undefined) {
				deployed = this.deployed;
			}

			if (!deployed) {
				this.openBox();
			} else {
				this.closeBox();
			}
		},
		
		// Anchors support
		anchorNav: function() {
			if (window.location.hash.substring(1) == this.titleElement.attr('id') && window.location.hash.substring(1) !== '') {
				this.changeState(false);
				this.titleElement[0].scrollIntoView(true);
			}
		}
	};

	var boxes = $('.TextShower-box'),
	    boxesLength = boxes.length;

	for (i = 0; i < boxesLength; i++) {
		new TextShowerBox(boxes[i]);
	}
}

// Edit the arguments of this function to customize the global script behavior
// Can be overwritten by the custom meta tag (see documentation on github.com/filsmick/TextShower)
TextShower('0.8s', '0.3s', 'ease', true);
