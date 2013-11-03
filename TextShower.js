function TextShower(heightDelay, marginDelay, heightTiming, marginTiming, modifyTitle) {

// Init

var timer, timer2;

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


// Activate TextShower

function PrepareBox(box) {
	var titleElement = box.getElementsByClassName('TextShower-title')[0],
	textElement = box.getElementsByClassName('TextShower-text')[0];

	if (modifyTitle) { titleElement.textContent = titleElement.textContent.splice(0, 0, "+ "); };

	textElement.className += ' notransition';

	var prevHeight = getComputedStyle(textElement).height;
	var prevMargin = getComputedStyle(textElement).margin;
	var prevPaddingTop = getComputedStyle(textElement).paddingTop;
	var prevPaddingBottom = getComputedStyle(textElement).paddingBottom;
	textElement.style.height = '0px';
	textElement.style.margin = '0 0 0 0';
	textElement.style.paddingTop = '0';
	textElement.style.paddingBottom = '0';
	titleElement.style.cursor = 'pointer';

	textElement.offsetHeight;
	textElement.className = textElement.className.replace(' notransition', '');

	var deployed = false;

	var durationArray = [], 
	pureHeightDelay = parseFloat(heightDelay.match(/\d+\.?\d*/g)),
	pureMarginDelay = parseFloat(marginDelay.match(/\d+\.?\d*/g));
	durationArray.push(pureHeightDelay, pureMarginDelay);
	
	function anchorNav() {
		if (window.location.hash.substring(1) == titleElement.id && window.location.hash.substring(1) != '') {
		textElement.className += ' notransition';
		changeState(titleElement, textElement);
		setTimeout(function() {
	    		titleElement.scrollIntoView(true);
		}, 0);

		setTimeout(function() {
	   		textElement.className = textElement.className.replace(' notransition', '');
	   	}, Math.max.apply(Math, durationArray) * 1000);
		}
	}

	addEvent(window, 'hashchange', anchorNav)
	
	anchorNav();

	function changeState(titleElement, textElement, callback) {
		if (!deployed) {
			deployed = true;

			if (modifyTitle) { titleElement.textContent = titleElement.textContent.replace('+', '-'); };


			var actualHeight = getComputedStyle(textElement).height;
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

			timer = setTimeout(function transEnd() {
			    textElement.className += ' notransition';
			    textElement.style.height = 'auto';
			    prevHeight = getComputedStyle(textElement).height;
			}, Math.max.apply(Math, durationArray) * 1000);
		}

		else {
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

		if (typeof callback !== 'undefined') {
			callback();
		}
	}

	addEvent(titleElement, 'click', function() {
		changeState(titleElement, textElement);
	})
}

var boxes = document.getElementsByClassName('TextShower-box');

for (var i = boxes.length - 1; i >= 0; i--) {
	PrepareBox(boxes[i]);
};
}

// Edit the arguments of this function to customize the global script behavior
// Can be overwritten by the custom meta tag
TextShower('0.8s', '0.3s', 'ease', 'linear', true);
