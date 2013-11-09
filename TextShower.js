function TextShower(heightDelay, marginDelay, heightTiming, marginTiming, modifyTitle) {

	// Init

	var timer, timer2, boxes, deployed, actualHeight, prevHeight, prevHeight, prevPaddingTop, prevPaddingBottom, durationArray;

	heightDelay = typeof heightDelay !== 'undefined' ? heightDelay : '0.8s';
	marginDelay = typeof marginDelay !== 'undefined' ? marginDelay : '0.3s';
	heightTiming = typeof heightTiming !== 'undefined' ? heightTiming : 'ease';
	marginTiming = typeof marginTiming !== 'undefined' ? marginTiming : 'linear';
	modifyTitle = typeof modifyTitle !== 'undefined' ? modifyTitle : true;

	if (document.querySelector('meta[data-TextShower]') != null) {
		var settings = document.querySelector('meta[data-TextShower]').getAttribute('data-TextShower');
		var settingsArray = settings.split(' ');

		heightDelay = typeof settingsArray[0] !== 'undefined' && settingsArray[0] !== 'none' ? settingsArray[0] : heightDelay;
		marginDelay = typeof settingsArray[1] !== 'undefined' && settingsArray[1] !== 'none' ? settingsArray[1] : marginDelay;
		heightTiming = typeof settingsArray[2] !== 'undefined' && settingsArray[2] !== 'none' ? settingsArray[2] : heightTiming;
		marginTiming = typeof settingsArray[3] !== 'undefined' && settingsArray[3] !== 'none' ? settingsArray[3] : marginTiming;
		modifyTitle = typeof settingsArray[4] !== 'undefined' && settingsArray[4] !== 'none' ? (settingsArray[4] == 'true') : modifyTitle;
	}


	String.prototype.splice = function( idx, rem, s ) {
	    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
	};

	function addEvent(element, eventName, handler) {
	  if (element.addEventListener) {
	    element.addEventListener(eventName, handler, false);
	  }
	  else if (element.attachEvent) {
	    element.attachEvent('on' + eventName, handler);
	  }
	  else {
	    element['on' + eventName] = handler;
	  }
	}

	// Add transitions rules to the page
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = '.TextShower-title {\
	-moz-user-select: none;\
	-webkit-user-select: none;\
	-ms-user-select:none;\
	user-select:none;\
	} \
	.TextShower-text {\
	overflow: hidden;\
	-webkit-transition: height '+ heightDelay +' '+ heightTiming +', margin '+ marginDelay +' '+ marginTiming +', padding-top '+ marginDelay +' '+ marginTiming +', padding-bottom '+ heightDelay +' '+ heightTiming +';\
	-moz-transition: height '+ heightDelay +' '+ heightTiming +', margin '+ marginDelay +' '+ marginTiming +', padding-top '+ marginDelay +' '+ marginTiming +', padding-bottom '+ heightDelay +' '+ heightTiming +';\
	-o-transition: height '+ heightDelay +' '+ heightTiming +', margin '+ marginDelay +' '+ marginTiming +', padding-top '+ marginDelay +' '+ marginTiming +', padding-bottom '+ heightDelay +' '+ heightTiming +';\
	-ms-transition: height '+ heightDelay +' '+ heightTiming +', margin '+ marginDelay +' '+ marginTiming +', padding-top '+ marginDelay +' '+ marginTiming +', padding-bottom '+ heightDelay +' '+ heightTiming +';\
	transition: height '+ heightDelay +' '+ heightTiming +', margin '+ marginDelay +' '+ marginTiming +', padding-top '+ marginDelay +' '+ marginTiming +', padding-bottom '+ heightDelay +' '+ heightTiming +';\
	}\
	.notransition {\
	-webkit-transition: none !important;\
	-moz-transition: none !important;\
	-o-transition: none !important;\
	-ms-transition: none !important;\
	transition: none !important;\
	}';
	document.getElementsByTagName('head')[0].appendChild(style);

	// Function declarations

	function changeState(titleElement, textElement) {
		if (!deployed) {
			open(titleElement, textElement);
		}
		else {
			close(titleElement, textElement);
		}
	}


	function open(titleElement, textElement) {
		deployed = true;

		if (modifyTitle) { titleElement.textContent = titleElement.textContent.replace('+', '-'); };


		actualHeight = getComputedStyle(textElement).height;
		textElement.className += ' notransition';
		textElement.style.height = 'auto';
		prevHeight = getComputedStyle(textElement).height;
		textElement.style.height = actualHeight;

		setTimeout(function() {
			textElement.className = textElement.className.replace(' notransition', '');
			textElement.style.height = prevHeight;
			textElement.style.margin = prevMargin;
			textElement.style.paddingTop = prevPaddingTop;
			textElement.style.paddingBottom = prevPaddingBottom;
		}, 0);

		timer = setTimeout(function() {
		    textElement.className += ' notransition';
		    textElement.style.height = 'auto';
		    prevHeight = getComputedStyle(textElement).height;
		}, Math.max.apply(Math, durationArray) * 1000);
	}

	function close(titleElement, textElement) {
		deployed = false;

		clearTimeout(timer),
		clearTimeout(timer2);
		
		if (modifyTitle) { titleElement.textContent = titleElement.textContent.replace('-', '+'); };

		prevHeight = textElement.style.height = getComputedStyle(textElement).height;

		setTimeout(function() {
			textElement.className = textElement.className.replace(' notransition', '');
			textElement.style.height = '0px';
			textElement.style.margin = '0 0 0 0';
			textElement.style.paddingTop = '0';
			textElement.style.paddingBottom = '0';
		}, 0);
	}


	function anchorNav(titleElement, textElement) {
		textElement.className += ' notransition';

		if (!deployed) {
			changeState(titleElement, textElement);
		}

		setTimeout(function() {
	    		titleElement.scrollIntoView(true);
		}, 0);

		setTimeout(function() {
	   		textElement.className = textElement.className.replace(' notransition', '');
	   	}, Math.max.apply(Math, durationArray) * 1000);
	}

	// Activate TextShower

	function prepareBox(box) {
		var titleElement = box.getElementsByClassName('TextShower-title')[0],
		textElement = box.getElementsByClassName('TextShower-text')[0];

		if (modifyTitle) { titleElement.textContent = titleElement.textContent.splice(0, 0, "+ "); };

		textElement.className += ' notransition';

		prevHeight = getComputedStyle(textElement).height,
		prevMargin = getComputedStyle(textElement).margin,
		prevPaddingTop = getComputedStyle(textElement).paddingTop,
		prevPaddingBottom = getComputedStyle(textElement).paddingBottom;
		textElement.style.height = '0px';
		textElement.style.margin = '0 0 0 0';
		textElement.style.paddingTop = '0';
		textElement.style.paddingBottom = '0';

		titleElement.style.cursor = 'pointer';
		titleElement.style.marginBottom = titleElement.style.marginBottom / 2;

		textElement.offsetHeight;
		textElement.className = textElement.className.replace(' notransition', '');

		deployed = false;

		durationArray = [], 
		pureHeightDelay = parseFloat(heightDelay.match(/\d+\.?\d*/g)),
		pureMarginDelay = parseFloat(marginDelay.match(/\d+\.?\d*/g));
		durationArray.push(pureHeightDelay, pureMarginDelay);
		
		addEvent(titleElement, 'click', function() {
			changeState(titleElement, textElement);
		})

		if (window.location.hash.substring(1) == titleElement.id && window.location.hash.substring(1) != '') {
			anchorNav(titleElement, textElement);
		}
	}


	boxes = document.getElementsByClassName('TextShower-box');

	for (var i = boxes.length - 1; i >= 0; i--) {
		prepareBox(boxes[i]);
	};

	addEvent(window, 'hashchange', anchorNav);

}
// Edit the arguments of this function to customize the global script behavior
// Can be overwritten by the custom meta tag
TextShower('0.8s', '0.3s', 'ease', 'linear', true);