(function() {

// Useful stuff, init of the script

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
-webkit-transition: max-height 0.8s ease, margin 0.3s linear;\
-moz-transition: max-height 0.8s ease, margin 0.3s linear;\
-o-transition: max-height 0.8s ease, margin 0.3s linear;\
-ms-transition: max-height 0.8s ease, margin 0.3s linear;\
transition: max-height 0.8s ease, margin 0.3s linear;\
}';
document.getElementsByTagName('head')[0].appendChild(style);


// Beginning of the real script

function jSlide(box) {
	var titleElement = box.getElementsByClassName('jSlide-title')[0],
	textElement = box.getElementsByClassName('jSlide-text')[0];

	titleElement.textContent = titleElement.textContent.splice(0, 0, "+ ");

	var prevHeight = getComputedStyle(textElement).height;
	var prevMargin = getComputedStyle(textElement).margin;
	textElement.style.maxHeight = '0px';
	textElement.style.margin = '0 0 0 0';
	titleElement.style.cursor = 'pointer';

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
}) ();


