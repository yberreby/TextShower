/*!
 * TextShower - Super simple CSS and JS TextSlider
 * (c) 2013 Yohaï Berreby <yohaiberreby@gmail.com>
 * License: https://github.com/filsmick/TextShower/blob/master/LICENSE
 *
 * http://filsmick.github.io/TextShower/
 * http://github.com/filsmick/TextShower/
 */

window.Modernizr=function(a,b,c){function w(a){i.cssText=a}function x(a,b){return w(prefixes.join(a+";")+(b||""))}function y(a,b){return typeof a===b}function z(a,b){return!!~(""+a).indexOf(b)}function A(a,b){for(var d in a){var e=a[d];if(!z(e,"-")&&i[e]!==c)return b=="pfx"?e:!0}return!1}function B(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:y(f,"function")?f.bind(d||b):f}return!1}function C(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+m.join(d+" ")+d).split(" ");return y(b,"string")||y(b,"undefined")?A(e,b):(e=(a+" "+n.join(d+" ")+d).split(" "),B(e,b,c))}var d="2.7.0",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j,k={}.toString,l="Webkit Moz O ms",m=l.split(" "),n=l.toLowerCase().split(" "),o={},p={},q={},r=[],s=r.slice,t,u={}.hasOwnProperty,v;!y(u,"undefined")&&!y(u.call,"undefined")?v=function(a,b){return u.call(a,b)}:v=function(a,b){return b in a&&y(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=s.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(s.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(s.call(arguments)))};return e}),o.csstransitions=function(){return C("transition")};for(var D in o)v(o,D)&&(t=D.toLowerCase(),e[t]=o[D](),r.push((e[t]?"":"no-")+t));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)v(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},w(""),h=j=null,e._version=d,e._domPrefixes=n,e._cssomPrefixes=m,e.testProp=function(a){return A([a])},e.testAllProps=C,e}(this,this.document);

$(function(){
/*Note: you can replace getPrefix() with Modernizr._vendorPrefix in production. I'm showing an alternative implementation here just so that you can
see what's effectively being done under the hood*/
        function getPrefix( prop ){
        var prefixes = ['Moz','Webkit','Khtml','0','ms'],
            elem     = document.createElement('div'),
            upper      = prop.charAt(0).toUpperCase() + prop.slice(1),
            pref     = "";
        for(var len = prefixes.length; len--;){
            if((prefixes[len] + upper) in elem.style){
                pref = (prefixes[len]);
            }
        }
        if(prop in elem.style){
            pref = (prop);
        }
        return '-' + pref.toLowerCase() + '-';
        }
        $.fn.extend({
            defaultAnimate: $.fn.animate,
            animate: function(props, speed, easing, callback) {
                        var options = speed && typeof speed === "object" ? jQuery.extend({}, speed) :{
                                complete: callback || !callback && easing ||
                                jQuery.isFunction( speed ) && speed,
                                duration: speed,
                                easing: callback && easing || easing && !jQuery.isFunction(easing) && easing
                            };
                          return $(this).each(function() {
                            var $this = $(this),
                                altTransition,
                                easing = (options.easing) ? easing : 'ease-in-out',
                                prefix = (getPrefix('transition'));
                                if (Modernizr.csstransitions)
                                {
                                      $this.css(prefix + 'transition', 'all ' + speed / 1000 + 's ease-in-out').css(props);
                                      setTimeout(function() {
                                        $this.css(prefix + 'transition', altTransition);
                                        if ($.isFunction(options.complete)) {
                                             options.complete();
                                        }
                                      }, speed);
                                }
                                else{
                                     $this.defaultAnimate(props, options);
                                }
                        });
                    }
        });
});

function TextShower(heightDelay, marginDelay, heightTiming, marginTiming, modifyTitle) {
    /*jshint multistr: true */

    // If an argument is not specified, use default one
    heightDelay = typeof heightDelay !== 'undefined' ? heightDelay : '0.8s';
    marginDelay = typeof marginDelay !== 'undefined' ? marginDelay : '0.3s';
    heightTiming = typeof heightTiming !== 'undefined' ? heightTiming : 'ease';
    marginTiming = typeof marginTiming !== 'undefined' ? marginTiming : 'linear';
    modifyTitle = typeof modifyTitle !== 'undefined' ? modifyTitle : true;

    // Check for the custom meta tag and retrieve its data
    if ($('meta[data-TextShower]') !== null) {
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
            textElement.className = textElement.className.replace(' notransition', '');
        }
    }

    // Add transitions rules to the page
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.TextShower-title {'+
	'-moz-user-select: none;'+
	'-webkit-user-select: none;'+
	'-ms-user-select:none;'+
	'user-select:none;'+
	'}'+
	'.TextShower-text {'+
	'overflow: hidden;'+
	'-webkit-transition: height ' + heightDelay + ', margin ' + marginDelay + ' ' + marginTiming + ', padding-top ' + marginDelay + ' ' + marginTiming + ', padding-bottom ' + heightDelay + ' ' + heightTiming + ';'+
	'-moz-transition: height ' + heightDelay + ' ' + heightTiming + ', margin ' + marginDelay + ' ' + marginTiming + ', padding-top ' + marginDelay + ' ' + marginTiming + ', padding-bottom ' + heightDelay + ' ' + heightTiming + ';'+
	'-o-transition: height ' + heightDelay + ' ' + heightTiming + ', margin ' + marginDelay + ' ' + marginTiming + ', padding-top ' + marginDelay + ' ' + marginTiming + ', padding-bottom ' + heightDelay + ' ' + heightTiming + ';'+
	'-ms-transition: height ' + heightDelay + ' ' + heightTiming + ', margin ' + marginDelay + ' ' + marginTiming + ', padding-top ' + marginDelay + ' ' + marginTiming + ', padding-bottom ' + heightDelay + ' ' + heightTiming + ';'+
	'transition: height ' + heightDelay + ' ' + heightTiming + ', margin ' + marginDelay + ' ' + marginTiming + ', padding-top ' + marginDelay + ' ' + marginTiming + ', padding-bottom ' + heightDelay + ' ' + heightTiming + ';'+
	'}'+
	'.notransition {'+
	'-webkit-transition: none !important;'+
	'-moz-transition: none !important;'+
	'-o-transition: none !important;'+
	'-ms-transition: none !important;'+
	'transition: none !important;'+
	'}';
    document.getElementsByTagName('head')[0].appendChild(style);


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
                prevHeight = textElement.height();
                textElement.css('height', actualHeight);

                textElement.height(); // Refreshes height
                textElement.removeClass('notransition');
                textElement.css('height', prevHeight);
                textElement.css('margin', prevMargin);
                textElement.css('padding-top', prevPaddingTop);
                textElement.css('padding-bottom', prevPaddingBottom);

                timer = setTimeout(function transEnd() {
                    textElement.addClass('notransition');
                    textElement.css('height', 'auto');
                    prevHeight = textElement.css('height');
                }, Math.max.apply(Math, durationArray) * 1000);
            } else {
                deployed = false;

                clearTimeout(timer);

                if (modifyTitle) {
                    titleElement.text(titleElement.text().replace('-', '+'));
                }

                prevHeight = textElement.height();
                textElement.css('height', textElement.height() + "px");

                setTimeout(function() {
                    textElement.removeClass('notransition');
                    textElement.css('height', '0px');
                    textElement.css('margin', '0 0 0 0');
                    textElement.css('padding-top', '0');
                    textElement.css('padding-bottom', '0');
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