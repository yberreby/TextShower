Presentation
====
[![release 1.0.2](http://b.repl.ca/v1/release-1.0.2-green.png)](https://github.com/filsmick/TextShower/releases/latest)

Ever wanted a simple and customisable jQuery plugin that allows you to fold / unfold text on click, with animations and custom behavior? I think you found the right place.

**TextShower** is probably the simplest flexible solution to create text sliders. It is written in CoffeeScript. You can either create sliders with a plug'n'play solution or customize settings page-to-page, and developers can add custom code at marked points in the code.

It is **not** a slideshow with arrows and images but a *text slider*.

[Example](http://filsmick.github.io/pages/TextShower/)

Requirements: jQuery 1.8+ (Recommended: 1.10.2)

Downloads:  
- [Developement (12 Ko)](https://github.com/filsmick/TextShower/releases/download/v1.0.2/TextShower.js)  
- [Minified (8 Ko)](https://github.com/filsmick/TextShower/releases/download/v1.0.2/TextShower.min.js)

How to use
====

There is two ways to use TextShower. One is for those who don't care about animation settings and just want to get the work done, and one is for those who want a fully-customized behavior. Let's start with the simplest.

## The simple solution

Firstly, ensure jQuery is embedded in your page. If it is not, go to [Google Hosted Libraries](https://developers.google.com/speed/libraries/devguide#jquery) and include it.

Then add the following code to your page:
``` html
<div class="TextShower-box"> 
	<strong class="TextShower-title">Headlines of the text</strong> 
	<p class="TextShower-text">Text you want to be showed after click</p>
</div>
```
And embed TextShower just before closing the `body` tag (*after* jQuery):

``` html
<script src="http://filsmick.github.io/javascripts/TextShower.min.js"></script>
```

…and you're done.


## The less simple one

You are not satisfied? You want to have another timing? Another transition? Well, you can.

Do everything like in the "Simple solution", excepted the embed. Don't load the script from GitHub servers. Instead, download TextShower.js or TextShower.min.js (the latter is the lighter), upload it on your FTP server then embed it as previously, but with your own path:  

```html
<script src="/path/to/TextShower.min.js"></script>
```
Now, open the .js file on your FTP with a text editor and edit these lines (at the beginning):

``` coffeescript
heightDelay = '0.5s'
marginDelay = '0.55s'
heightTiming = 'easeIn'
marginTiming = 'ease'
modifyTitle = true
CSSTransitions = true
```

Simply replace the default values by what you want, save and you changes will be reflected sitewide.


### Page by page settings

But let's imagine you have a website with two sliders. One is in the documentation and opens a very, very long piece of text. The other is a ridiculously small box of only one line. You may want to change certain settings page by page, the transition timing, in example. It's not really necessary since the transition is good in both cases but assume you really want to change some settings.

In order to do that, you must add a `meta` tag to the pages you want to change settings:

```html
<meta data-TextShower="default 0.3s default linear true true" />
```
In this example, you can see almost the same structure as in .js file's function. The differences are that here, you don't need quotes or commas, you can simply put spaces between settings, and you can tell the script to use the default settings (those in the js file, you know) for certain parameters.

And now, your pages have different transitions and everyone is happy.

## And if I want more?

The complete source of TextShower is annotated, so you can edit it to match your needs.

Browsers support
====

TextShower should support everything that jQuery support. Everything should work fine with jQuery 1.8+, even in old IE. If you have jQuery 2.x embedded instead, you will miss all these poor Internet Explorer 8 and lower users.

So if you have any bug in one of these browsers:

* Firefox 2.0+
* Internet Explorer 6+
* Safari 3+
* Opera 10.6+
* Chrome 8+ 

It is a real issue and should be [reported](https://github.com/filsmick/TextShower/issues/new) along with the error you encountered.

License
====

Copyright © 2013 Yohaï Berreby

You can freely upload, share, edit and / or distribute TextShower as long as you leave the copyright notice at the top of the .js files. You are not allowed to sell copies of TextShower.
