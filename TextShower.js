function TextShower(heightDelay, marPadDelay, heightTiming, marPadTiming, doTransitions, modifyTitle) {

// Init

heightDelay = typeof heightDelay !== 'undefined' ? heightDelay : '0.8s';
marPadDelay = typeof marPadDelay !== 'undefined' ? marPadDelay : '0.3s';
heightTiming = typeof heightTiming !== 'undefined' ? heightTiming : 'ease';
marPadTiming = typeof marPadTiming !== 'undefined' ? marPadTiming : 'linear';
doTransitions = typeof doTransitions !== 'undefined' ? doTransitions : false;
modifyTitle = typeof modifyTitle !== 'undefined' ? modifyTitle : true;


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
-webkit-transition: height '+ heightDelay +' '+ heightTiming +', margin '+ marPadDelay +' '+ marPadTiming +', padding-top '+ marPadDelay +' '+ marPadTiming +', padding-bottom '+ heightDelay +' '+ marPadTiming +';\
-moz-transition: height '+ heightDelay +' '+ heightTiming +', margin '+ marPadDelay +' '+ marPadTiming +', padding-top '+ marPadDelay +' '+ marPadTiming +', padding-bottom '+ heightDelay +' '+ marPadTiming +';\
-o-transition: height '+ heightDelay +' '+ heightTiming +', margin '+ marPadDelay +' '+ marPadTiming +', padding-top '+ marPadDelay +' '+ marPadTiming +', padding-bottom '+ heightDelay +' '+ marPadTiming +';\
-ms-transition: height '+ heightDelay +' '+ heightTiming +', margin '+ marPadDelay +' '+ marPadTiming +', padding-top '+ marPadDelay +' '+ marPadTiming +', padding-bottom '+ heightDelay +' '+ marPadTiming +';\
transition: height '+ heightDelay +' '+ heightTiming +', margin '+ marPadDelay +' '+ marPadTiming +', padding-top '+ marPadDelay +' '+ marPadTiming +', padding-bottom '+ heightDelay +' '+ marPadTiming +';\
}\
.notransition {\
-webkit-transition: none !important;\
-moz-transition: none !important;\
-o-transition: none !important;\
-ms-transition: none !important;\
transition: none !important;\
}';
/* The margin of the textbox will be animated. If you don't want it to be, simple delete the ", margin '+ marPadDelay +' '+ marPadTiming +'" 
section of the CSS and any piece of Javascript which contains "margin". */
document.getElementsByTagName('head')[0].appendChild(style);


// Activate TextShower

function PrepareBox(box) {
	var titleElement = box.getElementsByClassName('TextShower-title')[0],
	textElement = box.getElementsByClassName('TextShower-text')[0];

	if (modifyTitle) { titleElement.textContent = titleElement.textContent.splice(0, 0, "+ "); };

	if (!doTransitions) { textElement.className += ' notransition'; }; // Temporarily disable transitions

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
	if (!doTransitions) { textElement.className = textElement.className.replace(' notransition', ''); }; // Reactivate transitions

	var deployed = false;

	addEvent(titleElement, 'click', function changeState(box) {
		if (!deployed) {
			deployed = true;

			if (modifyTitle) { titleElement.textContent = titleElement.textContent.replace('+', '-'); };
			textElement.style.height = prevHeight;
			textElement.style.margin = prevMargin;
			textElement.style.paddingTop = prevPaddingTop;
			textElement.style.paddingBottom = prevPaddingBottom;
		}

		else {
			deployed = false;

			if (modifyTitle) { titleElement.textContent = titleElement.textContent.replace('-', '+'); };
			textElement.style.height = '0px';
			textElement.style.margin = '0 0 0 0';
			textElement.style.paddingTop = '0';
			textElement.style.paddingBottom = '0';
		}
})
}

var boxes = document.getElementsByClassName('TextShower-box');

for (var i = boxes.length - 1; i >= 0; i--) {
	PrepareBox(boxes[i]);
};
}

// Edit the arguments of this function to customize the script behavior
TextShower('0.8s', '0.3s', 'ease', 'linear', false, true);
