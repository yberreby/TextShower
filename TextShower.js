function TextShower(heightDelay, marginDelay, heightTiming, marginTiming) {

// Init

heightDelay = typeof heightDelay !== 'undefined' ? heightDelay : '0.8s';
marginDelay = typeof marginDelay !== 'undefined' ? marginDelay : '0.3s';
heightTiming = typeof heightTiming !== 'undefined' ? heightTiming : 'ease';
marginTiming = typeof marginTiming !== 'undefined' ? marginTiming : 'linear';

String.prototype.splice = function( idx, rem, s ) {
    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};

function addEvent(element, event, func) {
    if (element.addEventListener) {
        element.addEventListener(event, func, false);
    } 
    else {
        element.attachEvent('on' + event, func);
    }
};

// Add transitions to the page
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.jSlide-title {\
-moz-user-select: none;\
-webkit-user-select: none;\
-ms-user-select:none;\
user-select:none;\
} \
.jSlide-text {\
overflow: hidden;\
-webkit-transition: max-height '+ heightDelay +' '+ heightTiming +', margin '+ marginDelay +' '+ marginTiming +';\
-moz-transition: max-height '+ heightDelay +' '+ heightTiming +', margin '+ marginDelay +' '+ marginTiming +';\
-o-transition: max-height '+ heightDelay +' '+ heightTiming +', margin '+ marginDelay +' '+ marginTiming +';\
-ms-transition: max-height '+ heightDelay +' '+ heightTiming +', margin '+ marginDelay +' '+ marginTiming +';\
transition: max-height '+ heightDelay +' '+ heightTiming +', margin '+ marginDelay +' '+ marginTiming +';\
}\
.notransition {\
-webkit-transition: none !important;\
-moz-transition: none !important;\
-o-transition: none !important;\
-ms-transition: none !important;\
transition: none !important;\
}';
document.getElementsByTagName('head')[0].appendChild(style);


// Processing

function jSlide(box) {
	var titleElement = box.getElementsByClassName('jSlide-title')[0],
	textElement = box.getElementsByClassName('jSlide-text')[0];

	titleElement.textContent = titleElement.textContent.splice(0, 0, "+ ");

	textElement.className += ' notransition'; 

	var prevHeight = getComputedStyle(textElement).height;
	var prevMargin = getComputedStyle(textElement).margin;
	textElement.style.maxHeight = '0px';
	textElement.style.margin = '0 0 0 0';
	titleElement.style.cursor = 'pointer';

	textElement.offsetHeight;
	textElement.className = textElement.className.replace(' notransition', '');

	var deployed = false;

	addEvent(titleElement, 'click', function changeState(box) {
		if (!deployed) {
			deployed = true;

			titleElement.textContent = titleElement.textContent.replace('+', '-');

			textElement.style.maxHeight = prevHeight;
			textElement.style.margin = prevMargin;
		}

		else {
			deployed = false;

			titleElement.textContent = titleElement.textContent.replace('-', '+');
			textElement.style.maxHeight = '0px';
			textElement.style.margin = '0 0 0 0';
	}
})
}

var boxes = document.getElementsByClassName('jSlide-box');

for (var i = boxes.length - 1; i >= 0; i--) {
	jSlide(boxes[i]);
};
}

TextShower('0.8s', '0.3s', 'ease', 'linear');