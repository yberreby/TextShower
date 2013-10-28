// Useful stuff

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

/* function ChangeCSSRule(xElement,xValue) {
    var strCSS = 'cssRules';
	if(document.all) {
        strCSS = 'rules';
    }
    document.styleSheets[0][strCSS][0].style[xElement] = xValue;
} */


// Beginning of the real script

function jSlide(box) {
	var titleElement = box.getElementsByClassName('jSlide-title')[0],
	textElement = box.getElementsByClassName('jSlide-text')[0];

	titleElement.textContent = titleElement.textContent.splice(0, 0, "+ ");

	//textElement.className = textElement.className.replace(' jSlide-deployed', ' jSlide-undeployed');
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

			//textElement.className = textElement.className.replace(' jSlide-undeployed', ' jSlide-deployed');
			textElement.style.maxHeight = prevHeight;
			textElement.style.margin = prevMargin;
		}

		else {
			deployed = false;

			titleElement.textContent = titleElement.textContent.replace('-', '+');
			//textElement.className = textElement.className.replace(' jSlide-deployed', ' jSlide-undeployed');
			textElement.style.maxHeight = '0px';
			textElement.style.margin = '0 0 0 0';
	}
})
}

var boxes = document.getElementsByClassName('jSlide-box');

for (var i = boxes.length - 1; i >= 0; i--) {
	jSlide(boxes[i]);
};


