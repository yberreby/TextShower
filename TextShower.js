function TextShower(heightDelay, marginDelay, heightTiming, marginTiming, doTransitions, modifyTitle) {

// Init

heightDelay = typeof heightDelay !== 'undefined' ? heightDelay : '0.8s';
marginDelay = typeof marginDelay !== 'undefined' ? marginDelay : '0.3s';
heightTiming = typeof heightTiming !== 'undefined' ? heightTiming : 'ease';
marginTiming = typeof marginTiming !== 'undefined' ? marginTiming : 'linear';
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
/* The margin of the textbox will be animated. If you don't want it to be, simple delete the ", margin '+ marginDelay +' '+ marginTiming +'" 
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
	textElement.style.maxHeight = '0px';
	textElement.style.margin = '0 0 0 0';
	titleElement.style.cursor = 'pointer';

	textElement.offsetHeight;
	if (!doTransitions) { textElement.className = textElement.className.replace(' notransition', ''); }; // Reactivate transitions

	var deployed = false;

	addEvent(titleElement, 'click', function changeState(box) {
		if (!deployed) {
			deployed = true;

			if (modifyTitle) { titleElement.textContent = titleElement.textContent.replace('+', '-'); };
			textElement.style.maxHeight = prevHeight;
			textElement.style.margin = prevMargin;
		}

		else {
			deployed = false;

			if (modifyTitle) { titleElement.textContent = titleElement.textContent.replace('-', '+'); };
			textElement.style.maxHeight = '0px';
			textElement.style.margin = '0 0 0 0';
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
